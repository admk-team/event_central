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
    Accordion,
} from "react-bootstrap";

const TicketDetail = ({ ticket_no, ticket, onAddonsUpdated }: any) => {
    const [selectedAddons, setSelectedAddons] = useState<any>([]);
    const [addonOptions, setAddonsOptions] = useState<any>([]);
    const [addons, setAddons] = useState<any>([...ticket.addons]);

    // console.log(ticket.addons);

    useEffect(() => {
        createAddonOptions();
    }, [ticket]);

    useEffect(() => {
        // console.log("Selected Addon", selectedAddons);
        onAddonsUpdated(selectedAddons, ticket_no);
    }, [selectedAddons]);

    const createAddonOptions: any = () => {
        const listItems: any = [];
        addons.map((addon: any) => {
            let id = ticket.id + "-" + ticket_no + "-addon-" + addon.id;
            listItems.push(
                <Col md={12} lg={12} key={"col-" + id}>
                    <Form.Check
                        id={id}
                        type="checkbox"
                        label={addon.full_name}
                        key={id}
                        onChange={(e) => handleCheckChanged(e, addon)}
                    />
                </Col>
            );
        });
        setAddonsOptions(listItems);
    };

    const handleCheckChanged = (e: any, addon: any) => {
        if (e.target.checked) {
            addon.selected = true;
            updateSelectedAddons();
        } else {
            addon.selected = false;
            updateSelectedAddons();
        }
    };

    const updateSelectedAddons = () => {
        let list = [];
        list = addons.filter((item: any) => {
            return item.selected;
        });
        setSelectedAddons([...list]);
        console.log("Selected Addons", list);
    };

    return (
        <div>
            <p className="mb-1 fw-bold bg-light p-2 ">
                Ticket # {ticket_no} Details
            </p>
            <Row>
                <Col md={4} lg={4}>
                    <p className="p-2">{ticket.name + " "} Addons</p>
                </Col>
                <Col md={8} lg={8}>
                    <Row>{addonOptions}</Row>
                </Col>
            </Row>
        </div>
    );
};

export default TicketDetail;
