import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

/** ---------- Types (loose to match your data) ---------- */
type ExtraService = { name: string; quantity: number | string };

function normalizeExtraServices(val: unknown): ExtraService[] {
    if (Array.isArray(val)) return val as ExtraService[];
    if (typeof val === "string") {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? (parsed as ExtraService[]) : [];
        } catch {
            return [];
        }
    }
    return [];
}

const toInt = (v: any, fallback = 0) => {
    const n = parseInt(String(v), 10);
    return Number.isFinite(n) ? n : fallback;
};

const TicketDetail = ({
    currency_symbol,
    ticket_no,
    ticket,
    fees_sub_total,
    addons_sub_total,
    onAddonsUpdated,
    onBlockCheckout,
}: any) => {
    /** ---------------- Add-ons & fees state ---------------- */
    const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
    const [addonVariantErrors, setAddonVariantErrors] = useState<Record<number, string | null>>({});
    const [addonExtraFieldValues, setAddonExtraFieldValues] = useState<
        Record<number, Record<string, string>>
    >({});

    /** --------------- Extra services state ----------------- */
    type ExtraRow = { name: string; max: number; selected: boolean; qty: number };

    // Memoize normalized extras to avoid re-parsing on every render
    const normalizedExtras = useMemo(
        () => normalizeExtraServices(ticket?.extra_services),
        [ticket?.extra_services]
    );

    // Keep a JSON snapshot so we only reset rows when content really changes
    const extrasSnapshotRef = useRef<string>("");
    const [extraRows, setExtraRows] = useState<ExtraRow[]>(() => {
        const snap = JSON.stringify(normalizedExtras);
        extrasSnapshotRef.current = snap;
        return normalizedExtras.map((e) => {
            const max = Math.max(0, toInt(e.quantity, 0));
            return { name: e.name ?? "", max, selected: false, qty: max > 0 ? 1 : 0 };
        });
    });

    // Reset extra rows if the extras content actually changed (or ticket id changed)
    useEffect(() => {
        const snap = JSON.stringify(normalizedExtras);
        if (snap !== extrasSnapshotRef.current || String(ticket?.id ?? "") === "") {
            extrasSnapshotRef.current = snap;
            setExtraRows(
                normalizedExtras.map((e) => {
                    const max = Math.max(0, toInt(e.quantity, 0));
                    return { name: e.name ?? "", max, selected: false, qty: max > 0 ? 1 : 0 };
                })
            );
        }
    }, [ticket?.id, normalizedExtras]);

    /** ---------------- Derived UI for fees ------------------ */
    const feesOptions = useMemo(() => {
        return (ticket.fees ?? []).map((fee: any) => {
            const id = `${ticket.id}-${ticket_no}-fee-${fee.id}`;
            return (
                <Col md={12} lg={12} key={`col-${id}`} className="d-flex flex-row">
                    <i className="ri-checkbox-circle-fill text-success fs-15 align-middle mr-2"></i>
                    <p key={id} className="m-0">
                        {fee.name}
                        <i className="fw-bold">
                            {fee.fee_type === "flat"
                                ? ` (${currency_symbol}${fee.fee_amount})`
                                : ` (${fee.fee_amount}%)`}
                        </i>
                    </p>
                </Col>
            );
        });
    }, [ticket.id, ticket_no, ticket.fees, currency_symbol]);

    /** ------------- Add-ons helpers & derived UI ------------ */
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
        // Preselect first variant if present
        if (addon.variants?.length) {
            addon.selectedVariant = addon.variants[0];
            addon.attributes = (addon.attributes || []).map((attr: any) => ({
                ...attr,
                options: (attr.options || []).map((option: any) => {
                    for (const av of addon.selectedVariant.attribute_values || []) {
                        if (option.id === av.addon_attribute_option_id) {
                            return { ...option, isSelected: true };
                        }
                    }
                    return option;
                }),
            }));
        }
        setSelectedAddons((prev) =>
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
                    let matched = true;
                    (v.attribute_values || []).forEach((av: any) => {
                        if (!selectedOptionIds.includes(av.addon_attribute_option_id)) matched = false;
                    });
                    if (matched) selectedVariant = v;
                });

                newState.selectedVariant = selectedVariant;

                if (newState.selectedVariant && newState.selectedVariant.qty_sold >= newState.selectedVariant.qty) {
                    setAddonVariantErrors((prevErrs) => ({
                        ...prevErrs,
                        [newState.id]: "This variant is sold out. Please select another variant",
                    }));
                } else {
                    setAddonVariantErrors((prevErrs) => ({
                        ...prevErrs,
                        [newState.id]: null,
                    }));
                }

                return newState;
            })
        );
    };

    const addonOptions = useMemo(() => {
        return (ticket.addons ?? []).map((addon: any) => {
            const id = `${ticket.id}-${ticket_no}-addon-${addon.id}`;
            const priceLabel =
                addon.selectedVariant?.price ?? addon.variants?.[0]?.price ?? addon.price ?? 0;

            return (
                <div key={id}>
                    <Form.Check
                        id={id}
                        type="checkbox"
                        label={addon.full_name.replace(/\([^)]*\)/g, `(${priceLabel})`)}
                        onChange={(e) => handleCheckChanged(e, addon)}
                        checked={isAddonSelect(addon)}
                    />

                    {addonVariantErrors[addon.id] && (
                        <p className="text-danger ps-4">{addonVariantErrors[addon.id]}</p>
                    )}

                    {isAddonSelect(addon) &&
                        (addon.attributes || []).map((attribute: any) => (
                            <div key={attribute.id} className="ps-4 mt-2 mb-3">
                                <Form.Label className="fw-bold mb-1">{attribute.name}:</Form.Label>
                                <div className="d-flex gap-2 flex-wrap">
                                    {(attribute.options || []).map((option: any) => (
                                        <div
                                            key={option.id}
                                            className={`border py-1 px-2 cursor-pointer text-black ${isOptionSelected(option, attribute)
                                                ? "bg-primary text-white border-primary"
                                                : ""
                                                }`}
                                            onClick={() => selectAddonAttributeOption(addon, attribute, option)}
                                        >
                                            {option.value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    {isAddonSelect(addon) && addon.extra_fields && (
                        <div className="ps-4 mt-2 mb-3">
                            {JSON.parse(addon.extra_fields).map((label: string) => {
                                const inputKey = label;
                                return (
                                    <div key={inputKey} className="mb-2">
                                        <Form.Label>{label}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={addonExtraFieldValues[addon.id]?.[inputKey] ?? ""}
                                            onChange={(e) =>
                                                setAddonExtraFieldValues((prev) => ({
                                                    ...prev,
                                                    [addon.id]: {
                                                        ...prev[addon.id],
                                                        [inputKey]: e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        });
    }, [
        ticket.id,
        ticket_no,
        ticket.addons,
        addonVariantErrors,
        addonExtraFieldValues,
        selectedAddons,
    ]);

    /** --------- Callbacks via refs to avoid loops ---------- */
    const addonsUpdatedRef = useRef<typeof onAddonsUpdated>();
    useEffect(() => {
        addonsUpdatedRef.current = onAddonsUpdated;
    }, [onAddonsUpdated]);

    useEffect(() => {
        // Only fire when the actual addon selection/extra fields change
        addonsUpdatedRef.current?.(selectedAddons, ticket_no, addonExtraFieldValues);
    }, [selectedAddons, addonExtraFieldValues, ticket_no]);

    const blockCheckoutRef = useRef<typeof onBlockCheckout>();
    useEffect(() => {
        blockCheckoutRef.current = onBlockCheckout;
    }, [onBlockCheckout]);

    useEffect(() => {
        const blocked = Object.values(addonVariantErrors).some(Boolean);
        blockCheckoutRef.current?.(blocked);
    }, [addonVariantErrors]);

    /** ---------------- Extra services handlers ---------------- */
    const toggleExtra = (idx: number, checked: boolean) => {
        setExtraRows((prev) =>
            prev.map((r, i) =>
                i === idx ? { ...r, selected: checked, qty: checked ? Math.max(1, r.qty || 1) : 0 } : r
            )
        );
    };

    const changeExtraQty = (idx: number, value: string) => {
        setExtraRows((prev) =>
            prev.map((r, i) => {
                if (i !== idx) return r;
                let q = toInt(value, 0);
                if (q < 0) q = 0;
                if (r.max > 0 && q > r.max) q = r.max;
                return { ...r, qty: q, selected: q > 0 ? true : r.selected };
            })
        );
    };

    return (
        <Row className="mt-2 p-2 bg-light">
            <p className="mb-1 fs-4 fw-bold bg-light">Ticket # {ticket_no} Details</p>
            <hr className="mt-0 mb-1" />

            {/* Fees */}
            <Col md={6} lg={6}>
                <p className="fs-5 fw-bold mb-1">Fees applicable</p>
                {feesOptions}
                <span className="fs-5 fw-bold mt-1">
                    Fees Sub Total :{" "}
                    <sup>
                        <small>{currency_symbol}</small>
                    </sup>
                    {fees_sub_total}
                </span>
            </Col>

            {/* Add-ons */}
            <Col md={6} lg={6}>
                <p className="fs-5 fw-bold mb-1">Ticket Add-ons</p>
                {addonOptions}
                <span className="fs-5 fw-bold mt-1">
                    Addons Sub Total :{" "}
                    <sup>
                        <small>{currency_symbol}</small>
                    </sup>
                    {addons_sub_total}
                </span>
            </Col>

            {/* Extra Services */}
            {(ticket?.extra_service_name || normalizedExtras.length > 0) && (
                <Col md={12} className="mt-3">
                    <hr className="mt-2 mb-2" />
                    <p className="fs-5 fw-bold mb-2">{ticket?.extra_service_name || "Extra Services"}</p>

                    {extraRows.length === 0 && <div className="text-muted">No extra services available.</div>}

                    {extraRows.map((row, idx) => {
                        const id = `extra-${ticket?.id}-${ticket_no}-${idx}`;
                        return (
                            <div key={id} className="d-flex align-items-center gap-3 mb-2">
                                <Form.Check
                                    id={id}
                                    type="checkbox"
                                    label={row.name}
                                    checked={row.selected}
                                    onChange={(e) => toggleExtra(idx, e.target.checked)}
                                />

                                <div className="d-flex align-items-center gap-2">
                                    <Form.Label htmlFor={`${id}-qty`} className="m-0">
                                        Quantity
                                    </Form.Label>
                                    <Form.Control
                                        id={`${id}-qty`}
                                        type="number"
                                        min={0}
                                        max={row.max || undefined}
                                        value={row.qty}
                                        onChange={(e) => changeExtraQty(idx, e.target.value)}
                                        style={{ width: 120 }}
                                        disabled={!row.selected}
                                    />
                                    {row.max > 0 && <small className="text-muted">max {row.max}</small>}
                                </div>
                            </div>
                        );
                    })}
                </Col>
            )}
        </Row>
    );
};

export default TicketDetail;
