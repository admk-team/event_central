import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Card,
    Col,
    Container,
    Row,
    Button,
    Form,
    InputGroup,
    Accordion
} from "react-bootstrap";








const TicketAddOns = ({ ticket, ticketIndex, ticketNo, onAddonSelected, onAddonRemoved }: any) => {

    const [selectedAddon, setSelectedAddon] = useState([]);
    const [addonOptions, setAddonsOptions] = useState([]);

    console.log(ticket.addons);

    useEffect(() => {
        createAddonOptions();
    }, [ticket]);


    const createAddonOptions: any = () => {
        const listItems: any = []
        ticket.addons.map((addon: any, index: any) => {
            console.log(addon);
            let id = ticket.id + "-" + ticketNo + "-addon-" + addon.id + "-" + index;
            console.log(id);
            listItems.push(
                <Col md={12} lg={12} key={id + ticket.id}>
                    <Form.Check
                        id={id}
                        type="checkbox"
                        // defaultChecked={parseFloat(addon.price) === 0}
                        label={addon.full_name}
                        key={id}
                        onChange={(e) => handleCheckChanged(e, addon)}
                    />
                </Col >
            );
        })
        setAddonsOptions(listItems);
    }


    const handleCheckChanged = (e: any, addon: any) => {
        if (e.target.checked) {
            onAddonSelected(addon, ticketIndex);
        } else {
            onAddonRemoved(addon, ticketIndex);
        }
    }

    return (
        <div>
            <Row>
                <Col md={4} lg={4}><p className="p-2">{ticket.name + " "} Addons</p></Col>
                <Col md={8} lg={8}>
                    <Row>
                        {addonOptions}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default TicketAddOns;
