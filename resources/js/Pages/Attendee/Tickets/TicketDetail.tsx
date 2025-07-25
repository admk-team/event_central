import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

const TicketDetail = ({ ticket_no, ticket, fees_sub_total, addons_sub_total, onAddonsUpdated }: any) => {
    const [selectedAddons, setSelectedAddons] = useState<any>([]);
    const [addonOptions, setAddonsOptions] = useState<any>([]);
    const [addons, setAddons] = useState<any>(ticket.addons);
    const [fees, setFees] = useState<any>(ticket.fees);
    const [feesOptions, setFeesOptions] = useState<any>([]);

    useEffect(() => {
        createAddonOptions();
        createFeesList();
    }, [ticket]);

    useEffect(() => {
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
                <Form.Check
                    id={id}
                    type="checkbox"
                    label={addon.full_name}
                    key={id}
                    onChange={(e) => handleCheckChanged(e, addon)}
                />
            );
        });
        setAddonsOptions(listItems);
    };

    const handleCheckChanged = (e: any, addon: any) => {
        setSelectedAddons(
            (prev: any) =>
                prev.includes(addon)
                    ? prev.filter((i: any) => i.id !== addon.id) // Remove if already selected
                    : [...prev, addon] // Add if newly selected
        );
    };

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
