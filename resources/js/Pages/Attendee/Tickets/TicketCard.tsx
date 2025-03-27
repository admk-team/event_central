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
import TicketAddOns from "./TicketAddOns";


const TicketCard = ({ ticket, ticketIndex, onChange }: any) => {

    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [ticketQty, setTicketQty] = useState(0);
    const [tickets, setTickets] = useState<any>([]);

    useEffect(() => {
        let list = [];
        for (let i = 0; i < ticketQty; i++) {
            list.push(Object.assign({}, ticket));
        }
        setTickets([...list]);
    }, [ticketQty]);


    const createQtyOptions = (items: any, ticket: any) => {
        const listItems = []
        for (let i = 0; i < items; i++) {
            listItems.push(<option value={i} key={ticketIndex + i + '-' + ticket.id}>{i}</option>)
        }
        return listItems
    }

    const handleAddonSelected = (addon: any, ticketIndex: any) => {
        console.log(addon, ticketIndex);
    }

    const handleAddonRemoved = (addon: any, ticketIndex: any) => {
        console.log(addon, ticketIndex);
    }

    return (
        <Col lg={8}>
            <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <h5 className="mb-1 fw-bold">{ticket.name}</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row className="d-flex justify-content-centel align-items-center">
                            <Col md={8} lg={8}>
                                <h5 className="mb-1 fw-bold">{ticket.name}</h5>
                            </Col>
                            <Col md={2} lg={2}>
                                <sup>
                                    <small>$</small>
                                </sup>
                                <span className="ff-secondary fw-bold fs-3">
                                    {ticket.base_price}
                                </span>
                            </Col>
                            <Col md={2} lg={2}>
                                <Form.Select aria-label="Ticket Qty"
                                    disabled={isAddedToCart}
                                    name="ticket_quantity"
                                    value={ticketQty} onChange={(e: any) =>
                                        setTicketQty(
                                            parseInt(e.target.value)
                                        )
                                    }>
                                    {createQtyOptions(10, ticket)}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={12} lg={12}>
                                <h5 className="mb-1 fw-bold bg-light p-2 ">Sessions</h5>
                                <ul className="list-unstyled text-muted vstack gap-1">
                                    {ticket.sessions.length > 0 &&
                                        ticket.sessions.map((session: any) => (
                                            <li key={session.id}>
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 text-success me-1">
                                                        <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        {session.name}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </Col>
                        </Row>

                        {tickets.map((ticket: any, index: any) =>
                            <div>
                                <p className="mb-1 fw-bold bg-light p-2 ">Ticket # {index + 1} Details</p>
                                <TicketAddOns
                                    ticket={ticket}
                                    ticketIndex={index}
                                    ticketNo={ticketIndex + "-" + index}
                                    key={ticketIndex + '-addons-' + ticket.id + "-" + index}
                                    onAddonSelected={handleAddonSelected}
                                    onAddonRemoved={handleAddonRemoved}
                                >
                                </TicketAddOns>
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    );
};

export default TicketCard;
