import { useForm } from "@inertiajs/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Col,
    Row,
    Button,
    Form,
    Spinner,
    InputGroup,
    Accordion,
    FormControl,
} from "react-bootstrap";
import TicketDetail from "./TicketDetail";
import { Minus, Plus } from "lucide-react";
import { useLaravelReactI18n } from "laravel-react-i18n";

type Fee = { id: number; name: string; fee_amount: number | string; fee_type: "flat" | "percentage" };
type Ticket = any;
type ExtraServiceSel = { name: string; quantity: number };

const TicketCard = ({
    currency_symbol,
    ticket,
    onTicketDetailsUpdated,
    ticket_array,
    submitCheckOut,
    onBlockCheckout,
    attendee_id,
}: {
    currency_symbol: string;
    ticket: Ticket;
    onTicketDetailsUpdated?: (details: any[], removedIds: number[]) => void;
    ticket_array: any[];
    submitCheckOut?: () => void;
    onBlockCheckout?: (blocked: boolean) => void;
    attendee_id: number | string;
}) => {
    const { t } = useLaravelReactI18n();

    const isAddedToCart = ticket.is_added_to_cart;
    const [processing, setProcessing] = useState(false);
    const [ticketQty, setTicketQty] = useState(0);
    const [ticketDetails, setTicketDetails] = useState<any[]>([]);
    const [removedIds, setRemovedIds] = useState<number[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [isWaitList, setIsWaitList] = useState(false);

    // addon UI state (local to this card)
    const [addonVariantErrors, setAddonVariantErrors] = useState<Record<number, string | null>>({});
    const [addonExtraFieldValues, setAddonExtraFieldValues] = useState<Record<number, Record<string, string>>>({});
    const [selectedAddons, setSelectedAddons] = useState<any[]>([]);

    const sessionsToShow = showAll ? ticket.sessions : ticket.sessions.slice(0, 5);

    // ---------- helpers ----------
    const calculateFeesSubTotal = (tkt: Ticket) => {
        let subTotal = 0;
        const ticket_base_price = Number(tkt.base_price) || 0;
        (tkt.fees || []).forEach((fee: Fee) => {
            const amt = Number(fee.fee_amount) || 0;
            subTotal += fee.fee_type === "flat" ? amt : (ticket_base_price * amt) / 100;
        });
        return Number(subTotal.toFixed(2));
    };

    const calculateAddonsSubTotal = (selAddons: any[]) => {
        let subTotal = 0;
        (selAddons || []).forEach((addon: any) => {
            subTotal += Number(addon.selectedVariant?.price ?? addon.price ?? 0);
        });
        return Number(subTotal.toFixed(2));
    };

    // ----- addon helpers -----
    const isAddonSelect = (addon: any) => selectedAddons.some((a: any) => a.id === addon.id);

    const isOptionSelected = (option: any, attribute: any) =>
        selectedAddons.some((a: any) =>
            (a.attributes || []).some(
                (attr: any) =>
                    attr.id === attribute.id &&
                    (attr.options || []).some((o: any) => o.id === option.id && o.isSelected)
            )
        );

    const handleCheckChanged = (_e: any, addon: any) => {
        if (addon.variants?.length) {
            addon.selectedVariant = addon.variants[0];
            addon.attributes = (addon.attributes || []).map((attr: any) => ({
                ...attr,
                options: (attr.options || []).map((option: any) => {
                    for (const av of addon.selectedVariant.attribute_values || []) {
                        if (option.id === av.addon_attribute_option_id) return { ...option, isSelected: true };
                    }
                    return option;
                }),
            }));
        }
        setSelectedAddons((prev: any[]) =>
            isAddonSelect(addon) ? prev.filter((i: any) => i.id !== addon.id) : [...prev, addon]
        );
    };

    const selectAddonAttributeOption = (addon: any, attribute: any, option: any) => {
        setSelectedAddons((prev: any[]) =>
            prev.map((a: any) => {
                if (a.id !== addon.id) return a;

                const newState = {
                    ...a,
                    attributes: (a.attributes || []).map((attr: any) => {
                        if (attr.id !== attribute.id) return attr;
                        return {
                            ...attr,
                            options: (attr.options || []).map((o: any) =>
                                o.id === option.id ? { ...o, isSelected: true } : { ...o, isSelected: false }
                            ),
                        };
                    }),
                };

                const selectedOptionIds: number[] = [];
                for (const attr of newState.attributes || []) {
                    for (const o of attr.options || []) {
                        if (o.isSelected) selectedOptionIds.push(o.id);
                    }
                }

                let selectedVariant: any = null;
                (newState.variants || []).forEach((v: any) => {
                    let ok = true;
                    (v.attribute_values || []).forEach((av: any) => {
                        if (!selectedOptionIds.includes(av.addon_attribute_option_id)) ok = false;
                    });
                    if (ok) selectedVariant = v;
                });

                newState.selectedVariant = selectedVariant;

                if (newState.selectedVariant && newState.selectedVariant.qty_sold >= newState.selectedVariant.qty) {
                    setAddonVariantErrors((prevErrs) => ({ ...prevErrs, [newState.id]: t("This variant is sold out. Please select another variant") }));
                } else {
                    setAddonVariantErrors((prevErrs) => ({ ...prevErrs, [newState.id]: null }));
                }

                return newState;
            })
        );
    };

    // ---------- derived UI (memoized) ----------
    const feesOptions = useMemo(() => {
        return (ticket.fees ?? []).map((fee: Fee) => {
            const id = `${ticket.id}-fee-${fee.id}`;
            return (
                <Col md={12} lg={12} key={`col-${id}`} className="d-flex flex-row">
                    <i className="ri-checkbox-circle-fill text-success fs-15 align-middle mr-2"></i>
                    <p key={id} className="m-0">
                        {fee.name}
                        <i className="fw-bold">
                            {fee.fee_type === "flat" ? ` (${currency_symbol}${fee.fee_amount})` : ` (${fee.fee_amount}%)`}
                        </i>
                    </p>
                </Col>
            );
        });
    }, [ticket.id, ticket.fees, currency_symbol]);

    const addonOptions = useMemo(() => {
        return (ticket.addons ?? []).map((addon: any) => {
            const id = `${ticket.id}-addon-${addon.id}`;
            const labelPrice = addon.selectedVariant?.price ?? addon.variants?.[0]?.price ?? addon.price ?? 0;

            return (
                <div key={id}>
                    <Form.Check
                        id={id}
                        type="checkbox"
                        label={addon.full_name.replace(/\([^)]*\)/g, `(${labelPrice})`)}
                        onChange={(e) => handleCheckChanged(e, addon)}
                        checked={isAddonSelect(addon)}
                    />
                    {addonVariantErrors[addon.id] && <p className="text-danger ps-4">{addonVariantErrors[addon.id]}</p>}

                    {isAddonSelect(addon) &&
                        (addon.attributes || []).map((attribute: any) => (
                            <div key={attribute.id} className="ps-4 mt-2 mb-3">
                                <Form.Label className="fw-bold mb-1">{attribute.name}:</Form.Label>
                                <div className="d-flex gap-2 flex-wrap">
                                    {(attribute.options || []).map((option: any) => (
                                        <div
                                            key={option.id}
                                            className={`border py-1 px-2 cursor-pointer text-black ${isOptionSelected(option, attribute) ? "bg-primary text-white border-primary" : ""
                                                }`}
                                            onClick={() => selectAddonAttributeOption(addon, attribute, option)}
                                        >
                                            {option.value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            );
        });
    }, [ticket.id, ticket.addons, addonVariantErrors, selectedAddons]);

    // ---------- rebuild ticketDetails (PRESERVE extra_services) ----------
    useEffect(() => {
        setTicketDetails((prevDetails: any[]) => {
            const basePrice = Number(ticket.base_price) || 0;
            const discountValue = Number(ticket.bulk_purchase_discount_value || 0);
            const discountQty = Number(ticket.bulk_purchase_qty || 0);
            const discountType = ticket.bulk_purchase_discount_type;
            const totalBaseAmount = basePrice * ticketQty;

            const shouldApplyDiscount = discountQty > 0 && discountValue > 0 && ticketQty >= discountQty;

            let finalPerTicketPrice = basePrice;
            if (shouldApplyDiscount && ticketQty > 0) {
                const totalDiscountedAmount =
                    discountType === "fixed"
                        ? Math.max(0, totalBaseAmount - discountValue)
                        : totalBaseAmount - totalBaseAmount * (discountValue / 100);
                finalPerTicketPrice = Number((totalDiscountedAmount / ticketQty).toFixed(2));
            }

            const byId = new Map(prevDetails.map((it) => [it.id, it]));
            const next: any[] = [];
            const newIds: number[] = [];

            for (let i = 0; i < ticketQty; i++) {
                const id = Number(`${ticket.id}${i}`);
                newIds.push(id);

                const adjustedBasePrice = shouldApplyDiscount ? finalPerTicketPrice : basePrice;

                const newTicketData = {
                    ...ticket,
                    base_price: adjustedBasePrice,
                    bulk_purchase_discount_type: discountType,
                    bulk_purchase_discount_value: discountValue,
                    bulk_purchase_qty: discountQty,
                };

                const fees_sub_total = calculateFeesSubTotal({
                    ...ticket,
                    base_price: adjustedBasePrice,
                });

                const existing = byId.get(id);
                if (existing) {
                    next.push({
                        ...existing,
                        ticket: newTicketData,
                        fees_sub_total,
                        // ✅ preserve extra services selection for this row
                        extra_services: existing.extra_services ?? [],
                    });
                } else {
                    next.push({
                        id,
                        ticket_no: i + 1,
                        ticket: newTicketData,
                        addons: [],
                        fees_sub_total,
                        addons_sub_total: 0,
                        // ✅ start empty; child will emit user’s selection
                        extra_services: [],
                    });
                }
            }

            next.sort((a, b) => a.id - b.id);

            const prevIds = prevDetails.map((it) => it.id);
            const removed = prevIds.filter((id) => !newIds.includes(id));
            setRemovedIds(removed);

            return next;
        });
    }, [
        ticketQty,
        ticket.id,
        ticket.base_price,
        ticket.bulk_purchase_discount_type,
        ticket.bulk_purchase_discount_value,
        ticket.bulk_purchase_qty,
    ]);

    // ---------- notify parent safely ----------
    const onChangeRef = useRef<typeof onTicketDetailsUpdated>();
    useEffect(() => {
        onChangeRef.current = onTicketDetailsUpdated;
    }, [onTicketDetailsUpdated]);

    useEffect(() => {
        onChangeRef.current?.(ticketDetails, removedIds);
    }, [ticketDetails, removedIds]);

    // ----- addons updated from child -----
    const handleAddonUpdated = (
        selAddons: any[],
        ticket_no: number,
        extraFieldValues: Record<number, Record<string, string>>
    ) => {
        setTicketDetails((prev: any[]) =>
            prev.map((row) =>
                row.ticket_no === ticket_no
                    ? {
                        ...row,
                        addons: selAddons.map((a: any) => ({ ...a, extraFields: extraFieldValues[a.id] || {} })),
                        addons_sub_total: calculateAddonsSubTotal(selAddons),
                    }
                    : row
            )
        );
    };

    // ----- EXTRA SERVICES updated from child (THIS IS WHAT FEEDS THE PAYLOAD) -----
    const handleExtraServicesUpdated = (extras: ExtraServiceSel[], ticket_no: number) => {
        console.log("TicketCard: received updated extra services for ticket_no", ticket_no, extras);
        setTicketDetails((prev: any[]) =>
            prev.map((row) => (row.ticket_no === ticket_no ? { ...row, extra_services: extras } : row))
        );
    };

    // ----- waiting list -----
    const { post } = useForm({ attendee_id, event_app_ticket_id: ticket.id });
    const handleWaitingList = () => {
        post(route("attendee.waitlist.post"), { onSuccess: () => setIsWaitList(true) });
    };

    // const availableQty =
    //     ticket.qty_total === null ? Infinity : Math.max(0, ticket.qty_total - ticket.qty_sold);

    // Determine if any selected session has sync_with_tickets true
    const ticketShouldBeSynced = ticket.selected_sessions.some((session: any) => session.sync_with_tickets);
    // If ticket should be synced, ensure all sessions have same capacity, otherwise tickets cannot be synced
    const ticketCanBeSynced = ticket.selected_sessions.every((session: any) => session.capacity === ticket.selected_sessions[0].capacity);
    const availableQty = (() => {
        if (ticketShouldBeSynced && ticketCanBeSynced) {
            return Math.max(0, ticket.selected_sessions[0].capacity - ticket.qty_sold);
        }

        return ticket.qty_total === null ? Infinity : Math.max(0, ticket.qty_total - ticket.qty_sold);
    })();
    
    const unlimitedQty = ticket.qty_total === null && !(ticketShouldBeSynced && ticketCanBeSynced);

    return (
        <Col lg={12}>
            <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h5 className="mb-1 fw-bold">
                                {ticket.name} {ticketQty > 0 ? " x " + ticketQty : ""}
                            </h5>
                            {!unlimitedQty && availableQty <= 0 && (
                                <div className="me-5 fw-bold text-danger">{t("Sold Out")}</div>
                            )}
                        </div>
                    </Accordion.Header>

                    <Accordion.Body>
                        <Row className="d-flex justify-content-centel align-items-center">
                            <Col md={5} lg={5}>
                                <span className="mb-5">{ticket.description}</span>
                                <br />
                                {ticket.bulk_purchase_status !== 0 && (
                                    <span className="mt-5 ff-secondary fw-bold text-warning">
                                        {t("Limited Offer:")} {ticket.bulk_purchase_qty}+ {t("tickets and Save")}{" "}
                                        {ticket.bulk_purchase_discount_type === "fixed"
                                            ? `${currency_symbol} ${parseInt(ticket.bulk_purchase_discount_value)}`
                                            : `${parseInt(ticket.bulk_purchase_discount_value)}%`}{" "}
                                        {t("instantly!")}
                                    </span>
                                )}
                            </Col>

                            <Col md={2} lg={2}>
                                <sup><small>{currency_symbol}</small></sup>
                                <span className="ff-secondary fw-bold fs-3">{ticket.base_price}</span>
                            </Col>

                            <Col md={3} lg={3}>
                                <span className="ff-secondary fw-bold">
                                    <span className="fs-5">{t("Available Quantity")}</span>:{" "}
                                    <span className="fs-5">{unlimitedQty ? t("Unlimited") : availableQty}</span>
                                </span>
                            </Col>

                            {!unlimitedQty && availableQty <= 0 ? (
                                <Col md={2} lg={2}>
                                    <span className="ff-secondary fw-bold d-flex justify-content-lg-end">
                                        <Button size="sm" onClick={handleWaitingList}>{t("Add Waiting List")}</Button>
                                    </span>
                                </Col>
                            ) : (
                                <Col md={2} lg={2}>
                                    <InputGroup>
                                        <Button size="sm" onClick={() => setTicketQty((prev) => Math.max(0, prev - 1))}>
                                            <Minus size={20} />
                                        </Button>
                                        <FormControl
                                            type="number"
                                            className="text-center"
                                            min={0}
                                            step={1}
                                            max={unlimitedQty ? undefined : availableQty}
                                            disabled={isAddedToCart}
                                            value={ticketQty}
                                            onChange={(e: any) => {
                                                const val = Number(e.target.value);
                                                if (!Number.isFinite(val)) return;
                                                if (unlimitedQty || val <= availableQty) setTicketQty(Math.max(0, val));
                                            }}
                                        />
                                        <Button
                                            size="sm"
                                            onClick={() => setTicketQty((prev) => (unlimitedQty || prev < availableQty ? prev + 1 : prev))}
                                        >
                                            <Plus size={20} />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            )}
                        </Row>

                        <Row className="mt-2 p-2 bg-light">
                            <Col md={12} lg={12}>
                                <h5 className="mb-1 fw-bold ">{t("Sessions")}</h5>
                                <ul className="list-unstyled text-muted vstack gap-1 m-0">
                                    {ticket.sessions.length > 0 &&
                                        sessionsToShow.map((session: any) => (
                                            <li key={session.id}>
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 text-success me-1">
                                                        <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                    </div>
                                                    <div className="flex-grow-1">{session.name}</div>
                                                </div>
                                            </li>
                                        ))}

                                    {ticket.sessions.length > 5 && (
                                        <button className="btn btn-link p-0 m-0 mt-2" onClick={() => setShowAll((prev) => !prev)}>
                                            {showAll ? t("Show less") : t("Show more")}
                                        </button>
                                    )}

                                    {(() => {
                                        const ticketExists = ticket_array.some((tkt: any) => tkt.ticket.id === ticket.id);
                                        if (!ticketExists || !submitCheckOut) return null;
                                        return (
                                            <Col md={4} lg={4}>
                                                <Button disabled={processing} onClick={submitCheckOut} className="btn btn-success w-100">
                                                    {t("Checkout")}
                                                    {processing && (
                                                        <Spinner animation="border" role="status" className="ml-3" size="sm">
                                                            <span className="visually-hidden">{t("Loading...")}</span>
                                                        </Spinner>
                                                    )}
                                                </Button>
                                            </Col>
                                        );
                                    })()}
                                </ul>
                            </Col>
                        </Row>

                        {ticketDetails.map((row: any) => (
                            <TicketDetail
                                key={`ticketDetail-${ticket.id}-${row.ticket_no}`}
                                currency_symbol={currency_symbol}
                                ticket={ticket}
                                ticket_no={row.ticket_no}
                                fees_sub_total={row.fees_sub_total}
                                addons_sub_total={row.addons_sub_total}
                                onAddonsUpdated={handleAddonUpdated}
                                onBlockCheckout={onBlockCheckout}
                                // ✅ EXTRA SERVICES: hydrate & receive updates
                                initialExtras={row.extra_services}
                                onExtraServicesUpdated={handleExtraServicesUpdated}
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    );
};

export default TicketCard;
