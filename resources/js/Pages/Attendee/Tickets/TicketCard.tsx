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
import TicketDetail from "./TicketDetail";

const TicketCard = ({ ticket, onTicketDetailsUpdated }: any) => {
    const isAddedToCart = ticket.is_added_to_cart;
    const [ticketQty, setTicketQty] = useState(0);
    const [ticketDetails, setTicketDetails] = useState<any>([]);
    const [removedIds, setRemovedIds] = useState<any>([]);

    // console.log(ticket);

    useEffect(() => {
        let list = [];
        let newIds = [];
        const ticketDetailsCopy = ticketDetails.map(item => ({ ...item }));

        for (let i = 0; i < ticketQty; i++) {
            let id = parseInt(ticket.id + "" + i);
            const foundItem = ticketDetailsCopy.find(item => item.id === id);
            if (foundItem) {
                list.push(foundItem);
            } else {
                list.push({
                    id: id,
                    ticket_no: i + 1,
                    ticket: Object.assign({}, ticket),
                    addons: [],
                });
                newIds.push(id);
            }
        }
        let prevIds = ticketDetails.map((item: any) => item.id);
        let removedIds = prevIds.filter((id: any) => !newIds.includes(id));
        setRemovedIds(removedIds);

        //Sort New ticketDetails by id asc
        list.sort((a, b) => a.id - b.id);

        setTicketDetails([...list]);
    }, [ticketQty]);

    const createQtyOptions = (items: any, ticket: any) => {
        const listItems = [];
        for (let i = 0; i < items; i++) {
            listItems.push(
                <option value={i} key={i + "-" + ticket.id}>
                    {i}
                </option>
            );
        }
        return listItems;
    };

    const handleAddonUpdated = (addons: any, ticket_no: any) => {
        setTicketDetails((prevItems: any) =>
            prevItems.map((item: any) =>
                item.ticket_no === ticket_no
                    ? { ...item, addons: addons }
                    : item
            )
        );
    };

    useEffect(() => {
        onTicketDetailsUpdated(ticketDetails, removedIds);
    }, [ticketDetails]);

    return (
        <Col lg={12}>
            <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <h5 className="mb-1 fw-bold">{ticket.name} {ticketQty > 0 ? ' x ' + ticketQty : ''}</h5>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row className="d-flex justify-content-centel align-items-center">
                            <Col md={8} lg={8}>
                                {/* <h5 className="mb-1 fw-bold">{ticket.name}</h5> */}
                                <span className="mb-1">{ticket.description}</span>
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
                                <Form.Select
                                    aria-label="Ticket Qty"
                                    disabled={isAddedToCart}
                                    name="ticket_quantity"
                                    value={ticketQty}
                                    onChange={(e: any) =>
                                        setTicketQty(parseInt(e.target.value))
                                    }
                                >
                                    {createQtyOptions(10, ticket)}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={12} lg={12}>
                                <h5 className="mb-1 fw-bold bg-light p-2 ">
                                    Sessions
                                </h5>
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

                        {ticketDetails.map((ticketDetail: any) => (
                            <TicketDetail
                                ticket={ticket}
                                ticket_no={ticketDetail.ticket_no}
                                key={
                                    "ticketDetail-" +
                                    ticket.id +
                                    "-" +
                                    ticketDetail.ticket_no
                                }
                                onAddonsUpdated={handleAddonUpdated}
                            ></TicketDetail>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    );
};

export default TicketCard;
