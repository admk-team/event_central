import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Layout from "../../../Layouts/Attendee";
import { Button, Col, Container, Row } from "react-bootstrap";
import TicketCard from "./TicketCard";

const Index = ({ eventApp }: any) => {
    const [grandTotal, setGrandTotal] = useState(0);
    const [selectedTickets, setSelectedTicket] = useState(Array<any>);
    const [allTicketDetails, setAllTicketsDetails] = useState(Array<any>);

    // console.log(eventApp);

    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
            _method: "POST",
            event_app_id: eventApp.id,
            tickets: Array(),
            grandTotalAmount: 0,
        });

    const submitCheckOut = (e: any) => {
        e.preventDefault();
        transform((data: any) => ({
            ...data,
            tickets: selectedTickets,
        }));

        post(route("attendee.tickets.post"), {
            preserveScroll: true,
        });
    };

    const hadleTicketCardChanged = (ticketDetails: any) => {
        // let list = [...selectedTickets];
        // let index = list.findIndex((item: any) => item.id === ticket.id);
        // if (index > -1) {
        //     list.splice(index, 1);
        // } else {
        //     list.push(ticket);
        // }
        // setSelectedTicket(list);
        // let total = 0;
        // list.map((item: any) => {
        //     total += item.price;
        // });
        // setGrandTotal(total);
        // console.log("Selected Tickets", list);
        // console.log("Grand Total", total);
        // setData({
        //     ...data,
        //     tickets: list,
        //     grandTotalAmount: total,
        // });
        // console.log("Ticket Details", ticketDetails);
    };
    return (
        <React.Fragment>
            <Head title="Tickets" />
            <section className="section bg-light" id="tickets">
                {/* <div className="bg-overlay bg-overlay-pattern"></div> */}
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-bold">
                                    Choose the Ticket that's right for you
                                </h3>
                                <p className="text-muted mb-4">
                                    Simple pricing. No hidden fees.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className=" justify-content-center gy-4">
                        {eventApp.tickets.length > 0 &&
                            eventApp.tickets.map((ticket: any) => (
                                <TicketCard
                                    ticket={ticket}
                                    key={ticket.id}
                                    onTicketDetailsUpdated={
                                        hadleTicketCardChanged
                                    }
                                ></TicketCard>
                            ))}
                    </Row>
                    <Row className="mt-4 justify-content-center">
                        <Col md={3} lg={3}>
                            <h5 className="mb-1 pt-2 pb-2 mr-2 text-end">
                                Total Payable :{" "}
                                <sup>
                                    <small>$</small>
                                </sup>
                                {grandTotal}
                            </h5>
                        </Col>
                        <Col md={3} lg={3}>
                            <Button
                                disabled={selectedTickets.length === 0}
                                onClick={submitCheckOut}
                                className="btn btn-success w-100"
                            >
                                Checkout
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
