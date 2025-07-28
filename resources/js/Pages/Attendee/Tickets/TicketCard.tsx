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
    Spinner,
    InputGroup,
    Accordion,
    FormControl,
} from "react-bootstrap";
import TicketDetail from "./TicketDetail";
import { Minus, Plus } from "lucide-react";

const TicketCard = ({ ticket, onTicketDetailsUpdated, ticket_array, submitCheckOut }: any) => {
    const isAddedToCart = ticket.is_added_to_cart;
    const [processing, setProcessing] = useState(false);
    const [ticketQty, setTicketQty] = useState(0);
    const [ticketDetails, setTicketDetails] = useState<any>([]);
    const [removedIds, setRemovedIds] = useState<any>([]);
    const [showAll, setShowAll] = useState(false);

    const sessionsToShow = showAll
        ? ticket.sessions
        : ticket.sessions.slice(0, 5);

    useEffect(() => {
        let list = [];
        let newIds = [];
        const ticketDetailsCopy = ticketDetails.map((item) => ({ ...item }));

        for (let i = 0; i < ticketQty; i++) {
            let id = parseInt(ticket.id + "" + i);
            const foundItem = ticketDetailsCopy.find((item) => item.id === id);
            if (foundItem) {
                list.push(foundItem);
            } else {
                list.push({
                    id: id,
                    ticket_no: i + 1,
                    ticket: { id: ticket.id, base_price: ticket.base_price },
                    addons: [],
                    fees_sub_total: calculateFeesSubTotal(ticket),
                    addons_sub_total: 0,
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

    console.log(ticket_array);
    const calculateFeesSubTotal = (ticket: any) => {
        let subTotal = 0;
        let ticket_base_price = ticket.base_price;
        ticket.fees.forEach((fee: any) => {
            if (fee.fee_type === "flat") {
                subTotal += parseFloat(fee.fee_amount);
            } else {
                //Percentage
                subTotal +=
                    (parseFloat(ticket_base_price) *
                        parseFloat(fee.fee_amount)) /
                    100;
            }
        });
        subTotal = parseFloat(subTotal.toFixed(2));
        return subTotal;
    };

    const calculateAddonsSubTotal = (addons: any) => {
        let subTotal = 0;
        addons.forEach((addon: any) => {
            subTotal += parseFloat(addon.selectedVariant?.price ?? addon.price);
        });
        subTotal = parseFloat(subTotal.toFixed(2));
        return subTotal;
    };

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
                    ? {
                        ...item,
                        addons: addons,
                        addons_sub_total: calculateAddonsSubTotal(addons),
                    }
                    : item
            )
        );
    };


    useEffect(() => {
        onTicketDetailsUpdated(ticketDetails, removedIds);
    }, [ticketDetails]);

    const availableQty = ticket.qty_total - ticket.qty_sold;

    return (
        <Col lg={12}>
            <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h5 className="mb-1 fw-bold">{ticket.name} {ticketQty > 0 ? ' x ' + ticketQty : ''}</h5>
                            {availableQty <= 0 && (
                                <div className="me-5 fw-bold text-danger">Sold Out</div>
                            )}
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row className="d-flex justify-content-centel align-items-center">
                            <Col md={6} lg={6}>
                                {/* <h5 className="mb-1 fw-bold">{ticket.name}</h5> */}
                                <span className="mb-1">
                                    {ticket.description}
                                </span>
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
                                <span className="ff-secondary fw-bold">
                                    <span className="fs-4">Stock</span>: <span className="fs-3">{availableQty}</span>
                                </span>
                            </Col>
                            {availableQty > 0 && (
                                <Col md={2} lg={2}>
                                    <InputGroup>
                                        <Button size="sm" onClick={e => setTicketQty(prev => prev === 0 ? prev : --prev)}><Minus size={20} /></Button>
                                        <FormControl
                                            type="number"
                                            className="text-center"
                                            min={0}
                                            step={1}
                                            max={availableQty}
                                            disabled={isAddedToCart}
                                            value={ticketQty}
                                            onChange={(e: any) =>
                                                parseInt(e.target.value) <= (availableQty) && setTicketQty(parseInt(e.target.value))
                                            }
                                        />
                                        <Button size="sm" onClick={e => setTicketQty(prev => prev >= (availableQty) ? prev : ++prev)}><Plus size={20} /></Button>
                                    </InputGroup>
                                    {/* <Form.Select
                                        aria-label="Ticket Qty"
                                        disabled={isAddedToCart}
                                        name="ticket_quantity"
                                        value={ticketQty}
                                        onChange={(e: any) =>
                                            setTicketQty(parseInt(e.target.value))
                                        }
                                    >
                                        {createQtyOptions(50, ticket)}
                                    </Form.Select> */}
                                </Col>
                            )}
                        </Row>
                        <Row className="mt-2 p-2  bg-light">
                            <Col md={12} lg={12}>
                                <h5 className="mb-1 fw-bold ">Sessions</h5>
                                <ul className="list-unstyled text-muted vstack gap-1 m-0">
                                    {ticket.sessions.length > 0 &&
                                        sessionsToShow.map((session: any) => (
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
                                    {ticket.sessions.length > 5 && (
                                        <button
                                            className="btn btn-link p-0 m-0 mt-2"
                                            onClick={() =>
                                                setShowAll((prev) => !prev)
                                            }
                                        >
                                            {showAll
                                                ? "Show less"
                                                : "Show more"}
                                        </button>
                                    )}
                                    {(() => {
                                        const ticketExists = ticket_array.some((t: any) => t.ticket.id === ticket.id);
                                        if (!ticketExists) return null;
                                        return (
                                            <Col md={4} lg={4}>
                                                <Button
                                                    disabled={processing}
                                                    onClick={submitCheckOut}
                                                    className="btn btn-success w-100"
                                                >
                                                    Checkout
                                                    {processing && (
                                                        <Spinner
                                                            animation="border"
                                                            role="status"
                                                            className="ml-3"
                                                            size="sm"
                                                        >
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                    )}
                                                </Button>
                                            </Col>
                                        );
                                    })()}
                                </ul>
                            </Col>
                        </Row>

                        {ticketDetails.map((ticketDetail: any) => (
                            <TicketDetail
                                ticket={ticket}
                                ticket_no={ticketDetail.ticket_no}
                                fees_sub_total={ticketDetail.fees_sub_total}
                                addons_sub_total={ticketDetail.addons_sub_total}
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
