import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState, CSSProperties } from "react";
import AttendeeLayout from "../../../Layouts/Attendee";
import EventLayout from "../../../Layouts/Event";
import { Button, Col, Container, Row, InputGroup, Form, Card, CardBody, Spinner, FormGroup } from "react-bootstrap";
import TicketCard from "./TicketCard";
import axios from "axios";
import toast from "react-hot-toast";
import Select, { StylesConfig } from 'react-select';


const Index = ({ eventApp, organizerView, attendees, attendee_id }: any) => {

    //Set Page Layout as per User [Organizer, Attendee]
    const Layout = organizerView ? EventLayout : AttendeeLayout;

    const foundAttendee = attendees.find(attendee => attendee.value === parseInt(attendee_id));

    // console.log(attendees, attendee_id, foundAttendee);

    //Options for Procession of Tickets from Organizer side
    const [currentAttendee, setCurrentAttendee] = useState<any>(attendee_id);
    const [paymentMethod, setPaymentMethod] = useState<any>('stripe');

    const [grandTotal, setGrandTotal] = useState(0);
    const [allTicketDetails, setAllTicketsDetails] = useState(Array<any>);

    const [codeError, setCodeError] = useState<string | boolean | any>(null);
    const [discountCode, setDiscountCode] = useState('');
    const [discountCodeApplied, setDiscountCodeApplied] = useState('');
    const [discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [processing, setProcessing] = useState(false);

    const submitCheckOut = (e: any) => {
        e.preventDefault();

        const data = {
            ticketsDetails: [...allTicketDetails],
            discount: discount,
            discount_code: discountCodeApplied,
            subTotal: grandTotal,
            totalAmount: totalAmount
        };

        console.log(data);

        setProcessing(true);
        if (organizerView && currentAttendee > 0) {
            if (totalAmount > 0 && paymentMethod === 'stripe') {
                axios.post(route("organizer.events.tickets.checkout", [currentAttendee, paymentMethod]), data).then((response) => {
                    // console.log(response);
                    router.visit(route('organizer.events.tickets.checkout.page', response.data.uuid));
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setProcessing(false);
                })
            } else if (totalAmount === 0 || paymentMethod === 'cash') {
                axios.post(route("organizer.events.tickets.checkout.free", [currentAttendee, paymentMethod]), data).then((response) => {
                    // console.log(response);
                    router.visit(route('organizer.events.payment.success', response.data.uuid));
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setProcessing(false);
                })
            }
        } else {
            if (totalAmount > 0) {
                //Process Stripe payment for Attendee
                axios.post(route("attendee.tickets.checkout"), data).then((response) => {
                    // console.log(response);
                    router.visit(route('attendee.tickets.checkout.page', response.data.uuid));
                }).catch((error) => {
                    //
                    console.log(error);
                }).finally(() => {
                    setProcessing(false);
                })
            } else {
                //Process free tickets for Attendee
                axios.post(route("attendee.tickets.checkout.free"), data).then((response) => {
                    console.log(response);
                    router.visit(route('attendee.payment.success', response.data.uuid));
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setProcessing(false);
                })
            }
        }
    };



    const validateCode = () => {
        setCodeError(false);
        let url = organizerView ? route("organizer.events.validateCode.post", discountCode) : route("attendee.validateCode.post", discountCode)
        axios.post(url).then((response) => {
            let codeObj = response.data.code;
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
        console.log("Ticket Details", allTicketDetails);
        setDiscount(0);
        setDiscountCode('');
        updateGrandTotal();
    }, [allTicketDetails]);

    const updateTotalAmount = (disc: any) => {
        let newV = grandTotal - disc;
        console.log(grandTotal, disc, newV);
        setDiscount(disc);
        setTotalAmount(newV);
        setDiscountCodeApplied(discountCode);
        setDiscountCode('');
        toast.success("Coupon Code applied successfuly");
    }

    const updateGrandTotal = () => {
        let gTotal = 0;
        allTicketDetails.forEach((ticketDetail) => {
            gTotal += parseFloat(ticketDetail.ticket.base_price);
            gTotal += parseFloat(ticketDetail.fees_sub_total);
            gTotal += parseFloat(ticketDetail.addons_sub_total);
        });
        gTotal = parseFloat(gTotal.toFixed(2));
        setGrandTotal(gTotal);
        setTotalAmount(gTotal);
    }

    const handleTicketCardChanged = (ticketDetails: any, removedIds: any) => {

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


    const customSelect2Styles = {
        control: (base: any) => ({
            ...base,
            // minHeight: 50,       // increase height
            // fontSize: '1.1rem',  // increase text size
            // padding: '0.7rem 0.7rem 1.2rem'
            border: 'var(--vz- primary - border - subtle)'
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: '0 8px',
        }),
        indicatorsContainer: (base: any) => ({
            ...base,
            height: 49,
        }),
    };


    return (
        <Layout>
            <React.Fragment>
                <Head title="Tickets" />
                <section className="section bg-light" id="tickets">
                    {/* <div className="bg-overlay bg-overlay-pattern"></div> */}
                    <Container>
                        {organizerView && <Row className="justify-content-center mt-5 mb-2 mt-md-0">
                            <Col md={12} className="text-center">
                                <h2>Purchase Ticket For Attendees</h2>
                                <hr />
                            </Col>
                            <Col>
                                <FormGroup className="mb-3">
                                    <Form.Label htmlFor="attendee" className="form-label fs-4 text-start w-100">Attendee</Form.Label>
                                    <Select
                                        styles={customSelect2Styles}
                                        className="react-select-container15"
                                        value={foundAttendee}
                                        options={attendees} onChange={(option: any) => {
                                            setCurrentAttendee(option.value)
                                        }}>
                                    </Select>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="mb-3">
                                    <Form.Label htmlFor="payment_method" className="form-label fs-4 text-start w-100">Payment Method</Form.Label>
                                    <Form.Select size="lg" aria-label="Default select example" className="form-control"
                                        id="payment_method" onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <option key={22} value="stripe">Stripe</option>
                                        <option key={23} value="cash">Cash</option>
                                    </Form.Select>
                                </FormGroup>
                            </Col>
                        </Row>}
                        {!organizerView && <Row className="justify-content-center mt-5 mt-md-0">
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
                        </Row>}
                        {(!organizerView || currentAttendee > 0) &&
                            <>
                                <Row className=" justify-content-center gy-4">
                                {organizerView && eventApp.tickets.length > 0 &&
                                    eventApp.tickets.map((ticket: any) => (
                                        <TicketCard
                                            ticket={ticket}
                                            key={ticket.id}
                                            onTicketDetailsUpdated={
                                                handleTicketCardChanged
                                            }
                                        ></TicketCard>
                                    ))}
                                {!organizerView && eventApp.public_tickets.length > 0 &&
                                    eventApp.public_tickets.map((ticket: any) => (
                                        <TicketCard
                                            ticket={ticket}
                                            key={ticket.id}
                                            onTicketDetailsUpdated={
                                                handleTicketCardChanged
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
                                            <InputGroup >
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
                                                disabled={allTicketDetails.length === 0 || processing}
                                                onClick={submitCheckOut}
                                                className="btn btn-success w-100"
                                            >
                                                Checkout
                                                {processing && <Spinner animation="border" role="status" className="ml-3" size="sm">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>}
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
                            </>
                        }
                    </Container>
                </section>
            </React.Fragment>
        </Layout >
    );
};
export default Index;
