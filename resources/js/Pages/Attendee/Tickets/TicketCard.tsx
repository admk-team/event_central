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

const TicketCard = ({ ticket, onTicketDetailsUpdated, ticket_array, submitCheckOut, onBlockCheckout }: any) => {
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
        const basePrice = parseFloat(ticket.base_price);
        const discountValue = parseFloat(ticket.bulk_purchase_discount_value ?? 0);
        const discountQty = Number(ticket.bulk_purchase_qty ?? 0);
        const discountType = ticket.bulk_purchase_discount_type;
        const totalBaseAmount = basePrice * ticketQty;
        let totalDiscountedAmount;

        if (discountType === 'fixed') {
            totalDiscountedAmount = Math.max(0, totalBaseAmount - discountValue);
        } else {
            totalDiscountedAmount = totalBaseAmount - (totalBaseAmount * (discountValue / 100));
        }
        const finalPerTicketPrice = totalDiscountedAmount / ticketQty;
        const shouldApplyDiscount = discountQty > 0 && discountValue > 0 && ticketQty >= discountQty;
        const existingTicketsMap = new Map(ticketDetails.map(item => [item.id, item]));
        const newTicketList = [];
        const newIds = [];
        for (let i = 0; i < ticketQty; i++) {
            const id = parseInt(`${ticket.id}${i}`);
            const existingTicket = existingTicketsMap.get(id);
            newIds.push(id);
            let adjustedBasePrice = basePrice;
            if (shouldApplyDiscount) {
                adjustedBasePrice = finalPerTicketPrice;
            }
            const newTicketData = {
                ...ticket,
                base_price: parseFloat(adjustedBasePrice.toFixed(2)),
                bulk_purchase_discount_type: discountType,
                bulk_purchase_discount_value: ticket.bulk_purchase_discount_value,
                bulk_purchase_qty: discountQty,
            };
            const feesSubTotal = calculateFeesSubTotal({ ...ticket, base_price: adjustedBasePrice });
            if (existingTicket) {
                newTicketList.push({
                    ...existingTicket,
                    ticket: newTicketData,
                    fees_sub_total: feesSubTotal,
                });
            } else {
                newTicketList.push({
                    id,
                    ticket_no: i + 1,
                    ticket: newTicketData,
                    addons: [],
                    fees_sub_total: feesSubTotal,
                    addons_sub_total: 0,
                });
            }
        }
        const prevIds = ticketDetails.map(item => item.id);
        const removedIds = prevIds.filter(id => !newIds.includes(id));
        newTicketList.sort((a, b) => a.id - b.id);
        setTicketDetails(newTicketList);
        setRemovedIds(removedIds);

    }, [ticketQty, ticketDetails]);


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

    const handleAddonUpdated = (addons: any, ticket_no: any, extraFieldValues: any) => {
        setTicketDetails((prevItems: any) =>
            prevItems.map((item: any) => {
                if (item.ticket_no === ticket_no) {
                    const updatedAddons = addons.map((addon: any) => ({
                        ...addon,
                        extraFields: extraFieldValues[addon.id] || {},
                    }));
                    return {
                        ...item,
                        addons: updatedAddons,
                        addons_sub_total: calculateAddonsSubTotal(addons),
                    };
                }
                return item;
            })
        );
    };


    useEffect(() => {
        onTicketDetailsUpdated(ticketDetails, removedIds);
    }, [ticketDetails]);

    const availableQty = ticket.qty_total - ticket.qty_sold;
    const unlimitedQty = ticket.qty_total === null;

    return (
        <Col lg={12}>
            <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h5 className="mb-1 fw-bold">{ticket.name} {ticketQty > 0 ? ' x ' + ticketQty : ''}</h5>
                            {(!unlimitedQty && availableQty <= 0) && (
                                <div className="me-5 fw-bold text-danger">Sold Out</div>
                            )}
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row className="d-flex justify-content-centel align-items-center">
                            <Col md={5} lg={5}>
                                {/* <h5 className="mb-1 fw-bold">{ticket.name}</h5> */}
                                <span className="mb-5">
                                    {ticket.description}
                                </span><br />

                                {ticket.bulk_purchase_status !== 0 && (
                                    <>
                                        <span className="mt-5 ff-secondary fw-bold text-warning">
                                            Limited Offer: {ticket.bulk_purchase_qty}+ tickets and Save{" "}
                                            {ticket.bulk_purchase_discount_type === "fixed"
                                                ? `$${parseInt(ticket.bulk_purchase_discount_value)}`
                                                : `${parseInt(ticket.bulk_purchase_discount_value)}%`
                                            } instantly!
                                        </span>

                                    </>
                                )}
                            </Col>
                            <Col md={2} lg={2}>
                                <sup>
                                    <small>$</small>
                                </sup>
                                <span className="ff-secondary fw-bold fs-3">
                                    {ticket.base_price}
                                </span>
                                <br />
                                {/* {ticket.bulk_purchase_status !== 0 && (
                                    <>
                                        <small>
                                            {ticket.bulk_purchase_discount_type === 'percentage' ? '%' : '$'}
                                        </small>
                                        <span className="ff-secondary fs-5">
                                            {ticket.bulk_purchase_discount_value}
                                        </span>
                                    </>

                                )} */}
                            </Col>
                            <Col md={3} lg={3}>
                                <span className="ff-secondary fw-bold">
                                    <span className="fs-5">Available Quantity</span>: <span className="fs-5">{unlimitedQty ? 'Unlimited' : availableQty}</span>
                                </span>
                            </Col>
                            {(availableQty > 0 || unlimitedQty) && (
                                <Col md={2} lg={2}>
                                    <InputGroup>
                                        <Button size="sm" onClick={e => setTicketQty(prev => prev === 0 ? prev : --prev)}><Minus size={20} /></Button>
                                        <FormControl
                                            type="number"
                                            className="text-center"
                                            min={0}
                                            step={1}
                                            max={unlimitedQty ? undefined : availableQty}
                                            disabled={isAddedToCart}
                                            value={ticketQty}
                                            onChange={(e: any) => {
                                                if (unlimitedQty || parseInt(e.target.value) <= (availableQty)) {
                                                    setTicketQty(parseInt(e.target.value))
                                                }
                                            }}
                                        />
                                        <Button size="sm" onClick={e => setTicketQty(prev => prev >= (availableQty) && !unlimitedQty ? prev : ++prev)}><Plus size={20} /></Button>
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
                                onBlockCheckout={onBlockCheckout}
                            ></TicketDetail>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    );
};

export default TicketCard;
