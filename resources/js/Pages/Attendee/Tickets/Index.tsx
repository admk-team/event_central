import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Layout from "../../../Layouts/Attendee";
import { Button, Col, Container, Row, InputGroup, Form, Card, CardBody } from "react-bootstrap";
import TicketCard from "./TicketCard";
import axios from "axios";
import toast from "react-hot-toast";

const Index = ({ eventApp }: any) => {
    const [grandTotal, setGrandTotal] = useState(0);
    const [allTicketDetails, setAllTicketsDetails] = useState(Array<any>);

    const [codeError, setCodeError] = useState<string | boolean | any>(null);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
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
            tickets: allTicketDetails,
            grandTotalAmount: grandTotal,
        }));

        post(route("attendee.tickets.post"), {
            preserveScroll: true,
        });
    };

    const validateCode = () => {
        setCodeError(false);
        axios
            .post(
                route("attendee.validateCode.post", discountCode)
            )
            .then((response) => {
                let codeObj = response.data.code;
                let newV = 0;
                let disc = parseFloat(codeObj.discount_value);
                switch (codeObj.discount_type) {
                    case "fixed":
                        disc = codeObj.discount_value;
                        updateTotalAmount(disc);
                        return;
                    case "percentage":
                        disc = grandTotal * (codeObj.discount_value / 100);
                        updateTotalAmount(disc);
                        return;
                }
            })
            .catch((error) => {
                console.log(error);
                setCodeError(error.response.data.message);
                setDiscount(0);
                setTotalAmount(grandTotal);
            });
    };

    useEffect(() => {
        console.log("All Ticket Details", allTicketDetails);
        setDiscount(0);
        setDiscountCode('');
        updateGrandTotal();
    }, [allTicketDetails]);

    const updateTotalAmount = (disc: any) => {
        let newV = grandTotal - disc;
        console.log(grandTotal, disc, newV);
        setDiscount(disc);
        setTotalAmount(newV);
        setDiscountCode('');
        toast.success("Coupon Code applied successfuly");
    }

    const updateGrandTotal = () => {
        console.log('updating total');
        let gTotal = 0;
        allTicketDetails.forEach((ticketDetail) => {
            gTotal += parseFloat(ticketDetail.ticket.base_price);
            ticketDetail.addons.forEach((addon: any) => {
                gTotal += parseFloat(addon.price);
            })
        });
        setGrandTotal(gTotal);
        setTotalAmount(gTotal);
    }

    const hadleTicketCardChanged = (ticketDetails: any, removedIds: any) => {

        setAllTicketsDetails((prev) => {
            const objectMap = new Map(prev.map((obj) => [obj.id, obj]));
            removedIds.forEach((id: any) => objectMap.delete(id));
            ticketDetails.forEach((obj: any) => {
                objectMap.set(obj.id, obj); // Add new or update existing
            });
            // console.log(objectMap);
            let newList = Array.from(objectMap.values());
            newList.sort((a, b) => a.id - b.id);
            return newList;
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

                    <Card className="mt-4">
                        <CardBody>
                            <Row>
                                <Col md={4} lg={4} className="d-flex align-items-center">
                                    <h5 className="fw-bold mb-0">Coupon Code</h5>
                                </Col>
                                <Col md={4} lg={4}>
                                    <InputGroup>
                                        <Form.Control
                                            disabled={allTicketDetails.length === 0}
                                            id="ticket-discount-code"
                                            type="text"
                                            isInvalid={codeError}
                                            name="coupon code"
                                            placeholder="Enter Coupon Code Here"
                                            value={discountCode}
                                            onChange={(e: any) =>
                                                setDiscountCode(
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />
                                        <Button disabled={allTicketDetails.length === 0}
                                            onClick={validateCode}
                                        >
                                            Apply
                                        </Button>
                                    </InputGroup>
                                    {codeError && (
                                        <div className="invalid-feedback d-block">
                                            Invalid or Expired Code
                                        </div>
                                    )}
                                </Col>
                                <Col md={4} lg={4} className="d-flex justify-content-end align-items-center">
                                    <h5 className="mb-1 pt-2 pb-2 mr-2 text-end fs-4">Discount : <sup>
                                        <small>$</small>
                                    </sup>{discount}</h5>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={4} lg={4}></Col>
                                <Col md={4} lg={4}>
                                    <Button
                                        disabled={allTicketDetails.length === 0}
                                        onClick={submitCheckOut}
                                        className="btn btn-success w-100"
                                    >
                                        Checkout
                                    </Button>
                                </Col>
                                <Col md={4} lg={4} className="d-flex justify-content-end align-items-center">
                                    <h5 className="mb-1 pt-2 pb-2 mr-2 text-end fs-4">
                                        Total Payable :{" "}
                                        <sup>
                                            <small>$</small>
                                        </sup>
                                        {totalAmount}
                                    </h5>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </section>
        </React.Fragment>
    );
};
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
