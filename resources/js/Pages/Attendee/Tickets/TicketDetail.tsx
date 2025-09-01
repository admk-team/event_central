import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

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

type Props = {
    currency_symbol: string;
    ticket_no: number;
    ticket: any;
    fees_sub_total: number;
    addons_sub_total: number;
    onAddonsUpdated?: (selectedAddons: any[], ticket_no: number, extraFieldValues: Record<number, Record<string, string>>) => void;
    onBlockCheckout?: (blocked: boolean) => void;

    // NEW: pass current selection from parent row and receive updates back
    initialExtras?: Array<{ name: string; quantity: number }>;
    onExtraServicesUpdated?: (extras: Array<{ name: string; quantity: number }>, ticket_no: number) => void;
};

const TicketDetail: React.FC<Props> = ({
    currency_symbol,
    ticket_no,
    ticket,
    fees_sub_total,
    addons_sub_total,
    onAddonsUpdated,
    onBlockCheckout,

    initialExtras = [],
    onExtraServicesUpdated,
}) => {
    const { t } = useLaravelReactI18n();

    /** ---------------- Add-ons & fees state ---------------- */
    const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
    const [addonVariantErrors, setAddonVariantErrors] = useState<Record<number, string | null>>({});
    const [addonExtraFieldValues, setAddonExtraFieldValues] = useState<Record<number, Record<string, string>>>({});

    /** --------------- Extra services state ----------------- */
    type ExtraRow = { name: string; max: number; selected: boolean; qty: number };

    // Memoize extras configured on ticket
    const normalizedExtras = useMemo(
        () => normalizeExtraServices(ticket?.extra_services),
        [ticket?.extra_services]
    );

    // Build rows from ticket extras but mark selection/qty from parent-provided initialExtras
    const buildRows = (init: Array<{ name: string; quantity: number }>) => {
        const selectedMap = new Map(init.map(e => [e.name, toInt(e.quantity, 0)]));
        return normalizedExtras.map((e) => {
            const max = Math.max(0, toInt(e.quantity, 0));
            const selQty = selectedMap.get(e.name) ?? 0;
            return {
                name: e.name ?? "",
                max,
                selected: selQty > 0,
                qty: selQty > 0 ? Math.min(selQty, max || selQty) : 0, // default 0 until user types
            };
        });
    };

    // Keep a JSON snapshot so we only reset rows when content/initial changes
    const extrasSnapshotRef = useRef<string>("");
    const [extraRows, setExtraRows] = useState<ExtraRow[]>(() => {
        const snap = JSON.stringify({ normalizedExtras, initialExtras });
        extrasSnapshotRef.current = snap;
        return buildRows(initialExtras);
    });

    // Rehydrate when ticket extras OR initial selection from parent changes
    useEffect(() => {
        const snap = JSON.stringify({ normalizedExtras, initialExtras });
        if (snap !== extrasSnapshotRef.current) {
            extrasSnapshotRef.current = snap;
            setExtraRows(buildRows(initialExtras));
        }
    }, [ticket?.id, normalizedExtras, initialExtras]);

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
                        [newState.id]: t("This variant is sold out. Please select another variant"),
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

    /** --------- Emit callbacks (use refs to avoid render loops) ---------- */
    const addonsUpdatedRef = useRef<typeof onAddonsUpdated>();
    useEffect(() => {
        addonsUpdatedRef.current = onAddonsUpdated;
    }, [onAddonsUpdated]);

    useEffect(() => {
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

    // NEW: emit the actual user-selected extra services (checked + qty)
    const extraUpdatedRef = useRef<typeof onExtraServicesUpdated>();
    useEffect(() => {
        extraUpdatedRef.current = onExtraServicesUpdated;
    }, [onExtraServicesUpdated]);

    useEffect(() => {
        const payload = extraRows
            .filter((r) => r.selected && r.qty > 0)
            .map((r) => ({ name: r.name, quantity: r.qty })); // quantity as number
        extraUpdatedRef.current?.(payload, ticket_no);
    }, [extraRows, ticket_no]);

    /** ---------------- Extra services handlers ---------------- */
    const toggleExtra = (idx: number, checked: boolean) => {
        setExtraRows((prev) =>
            prev.map((r, i) =>
                i === idx ? { ...r, selected: checked, qty: checked ? (r.qty || 1) : 0 } : r
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
            <p className="mb-1 fs-4 fw-bold bg-light">{t("Ticket #")} {ticket_no} {t("Details")}</p>
            <hr className="mt-0 mb-1" />

            {/* Fees */}
            <Col md={6} lg={6}>
                <p className="fs-5 fw-bold mb-1">{t("Fees applicable")}</p>
                {feesOptions}
                <span className="fs-5 fw-bold mt-1">
                    {t("Fees Sub Total :")}{" "}
                    <sup><small>{currency_symbol}</small></sup>
                    {fees_sub_total}
                </span>
            </Col>

            {/* Add-ons */}
            <Col md={6} lg={6}>
                <p className="fs-5 fw-bold mb-1">{t("Ticket Add-ons")}</p>
                {addonOptions}
                <span className="fs-5 fw-bold mt-1">
                    {t("Addons Sub Total :")}{" "}
                    <sup><small>{currency_symbol}</small></sup>
                    {addons_sub_total}
                </span>
            </Col>

            {/* Extra Services */}
            {(ticket?.extra_service_name || normalizedExtras.length > 0) && (
                <Col md={12} className="mt-3">
                    <hr className="mt-2 mb-2" />
                    <p className="fs-5 fw-bold mb-2">{ticket?.extra_service_name || t("Extra Services")}</p>

                    {extraRows.length === 0 && <div className="text-muted">{t("No extra services available.")}</div>}

                    {extraRows.map((row, idx) => {
                        const id = `extra-${ticket?.id}-${ticket_no}-${idx}`;
                        if (row.max > 0) {
                            return (
                                <div key={id} className="d-flex align-items-center gap-3 mb-2">
                                    <Form.Check
                                        id={id}
                                        type="checkbox"
                                        label={row.name}
                                        checked={row.selected}
                                        onChange={(e) => toggleExtra(idx, e.target.checked)}
                                    />
                                    {/* <div className="d-flex align-items-center gap-2">
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
                                </div> */}
                                </div>
                            );
                        } else {
                            null;
                        }

                    })}
                </Col>
            )}
        </Row>
    );
};

export default TicketDetail;
