import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

const TicketDetail = ({ ticket_no, ticket, fees_sub_total, addons_sub_total, onAddonsUpdated, onBlockCheckout }: any) => {
    const [selectedAddons, setSelectedAddons] = useState<any>([]);
    const [addonOptions, setAddonsOptions] = useState<any>([]);
    const [addons, setAddons] = useState<any>(ticket.addons);
    const [fees, setFees] = useState<any>(ticket.fees);
    const [feesOptions, setFeesOptions] = useState<any>([]);
    const [addonVariantErrors, setAddonVariantErrors] = useState<Record<number, string | null>>({});

    useEffect(() => {
        createAddonOptions();
        createFeesList();
    }, [ticket]);

    useEffect(() => {
        createAddonOptions();
        onAddonsUpdated(selectedAddons, ticket_no);
    }, [selectedAddons]);

    const createFeesList: any = () => {
        const listItems: any = [];
        fees.map((fee: any) => {
            let id = ticket.id + "-" + ticket_no + "-fee-" + fee.id;
            listItems.push(
                <Col md={12} lg={12} key={"col-" + id} className="d-flex flex-row">
                    <i className="ri-checkbox-circle-fill text-success fs-15 align-middle mr-2"></i>
                    <p key={id} className="m-0">
                        {fee.name}
                        <i className="fw-bold">{fee.fee_type === 'flat' ? " ($" + fee.fee_amount + ")" : " (" + fee.fee_amount + "%)"}</i>
                    </p>
                </Col>
            );
        });
        setFeesOptions(listItems);
    };

    const createAddonOptions: any = () => {
        const listItems: any = [];
        addons.map((addon: any) => {
            let id = ticket.id + "-" + ticket_no + "-addon-" + addon.id;
            listItems.push(
                <div key={id}>
                    <Form.Check
                        id={id}
                        type="checkbox"
                        label={addon.full_name.replace(/\([^)]*\)/g, `(${getSelectedAddon(addon, selectedAddons).selectedVariant?.price ?? addon.variants[0]?.price ?? addon.price})`)}
                        key={id}
                        onChange={(e) => handleCheckChanged(e, addon)}
                    />
                    {addonVariantErrors[addon.id] && (
                        <p className="text-danger ps-4">{addonVariantErrors[addon.id]}</p>
                    )}
                    {isAddonSelect(addon, selectedAddons) && (
                        addon.attributes.map((attribute: any) => (
                            <div key={attribute.id} className="ps-4 mt-2 mb-3">
                                <Form.Label className="fw-bold mb-1">{attribute.name}:</Form.Label>
                                <div className="d-flex gap-2 flex-wrap">
                                    {attribute.options.map((option: any) => (
                                        <div
                                            key={option.id}
                                            className={`border py-1 px-2 cursor-pointer text-black ${isOptionSelected(option, attribute, selectedAddons) ? 'bg-primary text-white border-primary' : ''}`}
                                            onClick={() => selectAddonAttributeOption(addon, attribute, option)}
                                        >{option.value}</div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            );
        });
        setAddonsOptions(listItems);
    };

    const handleCheckChanged = (e: any, addon: any) => {
        // Select first variant by default
        if (addon.variants?.length) {
            addon.selectedVariant = addon.variants[0];
            addon.attributes = addon.attributes.map((attr: any) => {
                return {
                    ...attr,
                    options: attr.options.map((option: any) => {
                        for (const attrValue of addon.selectedVariant.attribute_values) {
                            if (option.id === attrValue.addon_attribute_option_id) {
                                return {
                                    ...option,
                                    isSelected: true,
                                }
                            }
                        }
                        return option;
                    }),
                };
            });
        }
        
        setSelectedAddons(
            (prev: any) =>
                isAddonSelect(addon, prev)
                    ? prev.filter((i: any) => i.id !== addon.id) // Remove if already selected
                    : [...prev, addon] // Add if newly selected
        );
    };

    const isAddonSelect = (addon: any, selectedAddons: any) => {
        for (const a of selectedAddons) {
            if (a.id === addon.id) return true;
        }

        return false;
    }

    const isOptionSelected = (option: any, attribute: any, selectedAddons: any) => {
        for (const a of selectedAddons) {
            for (const attr of a.attributes) {
                if (attr.id === attribute.id) {
                    for (const o of attr.options) {
                        if (o.id === option.id && o.isSelected) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    const getSelectedAddon = (addon: any, selectedAddons: any) => {
        for (const a of selectedAddons) {
            if (a.id === addon.id) {
                return a;
            }
        }

        return addon;
    }

    const selectAddonAttributeOption = (addon: any, attribute: any, option: any) => {
        setSelectedAddons((prev: any) => { 
            return prev.map((a: any) => {
                if (a.id === addon.id) {
                    const newState = {
                        ...a,
                        attributes: a.attributes.map((attr: any) => {
                            if (attr.id === attribute.id) {
                                return {
                                    ...attr,
                                    options: attr.options.map((o: any) => o.id === option.id ? {...o, isSelected: true} : {...o, isSelected: false})
                                };
                            }

                            return attr
                        }),
                    };

                    const selectedOptionIds: number[] = [];
                    for (const a of newState.attributes) {
                        for (const o of a.options) {
                            if (o.isSelected) {
                                selectedOptionIds.push(o.id);
                            }
                        }
                    }

                    let selectedVariant = null;
                    newState.variants.forEach((v: any) => {
                        let valuesMatched = true;
                        v.attribute_values.forEach((av: any) => {
                            if (! selectedOptionIds.includes(av.addon_attribute_option_id)) {
                                valuesMatched = false;
                            }
                        });
                        
                        if (valuesMatched) {
                            selectedVariant = v;
                        }
                    })

                    newState.selectedVariant = selectedVariant;

                    if (newState.selectedVariant.qty_sold >= newState.selectedVariant.qty) {
                        setAddonVariantErrors(prev => ({
                            ...prev,
                            [newState.id]: "This variant is sold out. Please select another variant",
                        }));
                    } else {
                        setAddonVariantErrors(prev => ({
                            ...prev,
                            [newState.id]: null,
                        }));
                    }

                    return newState;
                }
                return a;
            })
        })
    }

    useEffect(() => {
        let blockCheckout = false;
        for (const key in addonVariantErrors) {
            if (addonVariantErrors[key]) {
                blockCheckout = true;
                break;
            }
        }
        onBlockCheckout && onBlockCheckout(blockCheckout);
    }, [addonVariantErrors]);

    return (
        <Row className="mt-2 p-2 bg-light">
            <p className="mb-1 fs-4 fw-bold bg-light">
                Ticket # {ticket_no} Details
            </p>
            <hr className="mt-0 mb-1" />
            <Col md={6} lg={6}>
                <p className="fs-5 fw-bold mb-1">Fees applicable</p>
                {feesOptions}
                <span className="fs-5 fw-bold mt-1">
                    Fees Sub Total :
                    <sup><small>$</small></sup>
                    {fees_sub_total}</span>
            </Col>
            <Col md={6} lg={6}>
                <p className="fs-5 fw-bold mb-1">Ticket Add-ons</p>
                {addonOptions}
                <span className="fs-5 fw-bold mt-1">
                    Addons Sub Total :
                    <sup><small>$</small></sup>
                    {addons_sub_total}
                </span>
            </Col>
        </Row>
    );
};

export default TicketDetail;
