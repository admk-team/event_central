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

    useEffect(() => {
        console.log("All Ticket Details", allTicketDetails);
    }, [allTicketDetails]);

    const hadleTicketCardChanged = (ticketDetails: any, removedIds: any) => {
        console.log(ticketDetails);
        setAllTicketsDetails((prev) => {
            const objectMap = new Map(prev.map((obj) => [obj.id, obj]));
            // console.log([...objectMap.keys()]);
            removedIds.forEach((id: any) => objectMap.delete(id));
            ticketDetails.forEach((obj: any) => {
                objectMap.set(obj.id, obj); // Add new or update existing
            });
            return Array.from(objectMap.values());
        });
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
