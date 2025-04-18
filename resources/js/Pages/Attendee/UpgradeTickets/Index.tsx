import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState, CSSProperties, useRef } from "react";
import AttendeeLayout from "../../../Layouts/Attendee";
import EventLayout from "../../../Layouts/Event";
import { Button, Col, Container, Row, InputGroup, Form, Card, CardBody, Spinner, FormGroup } from "react-bootstrap";

import axios from "axios";
import toast from "react-hot-toast";
import Select, { StylesConfig } from 'react-select';

type AttendeeOption = {
    id: number,
    value: string,
    label: string
}

const Index = ({ organizerView, attendees, attendee_id, sessions }: any) => {


    console.log(sessions);


    const Layout = organizerView ? EventLayout : AttendeeLayout;
    const foundAttendee = attendees.find(attendee => attendee.value === parseInt(attendee_id));

    const [paymentNote, setPaymentNote] = useState<any>('');
    const [currentAttendee, setCurrentAttendee] = useState<any>(attendee_id);
    const [currentPurchasedTicket, setPurchasedTicket] = useState<any>(null);
    const [ticketOptions, setTicketOptions] = useState<Array<AttendeeOption>>([]);
    const [processing, setProcessing] = useState(false);
    const paymentOptionRef = useRef(null);
    const paymentNoteRef = useRef(null);


    useEffect(() => {
        if (currentAttendee) {
            axios.get(route('get.attendee.purchased.ticlket', currentAttendee)).then((response) => {
                if (response.data.tickets.length > 0) {
                    let list = Array();
                    response.data.tickets.forEach((pticket: any) => {
                        list.push({
                            value: pticket.id,
                            label: pticket.ticket.name,
                            id: pticket.id
                        });
                    });
                    setTicketOptions([...list]);
                    setPurchasedTicket(null);
                    paymentOptionRef.current?.focus();
                    console.log(list);
                } else {
                    setTicketOptions([]);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [currentAttendee]);



    const submitCheckOut = (e: any) => {
        e.preventDefault();

        const data = {
            // ticketsDetails: [...allTicketDetails],
            // discount: discount,
            // discount_code: discountCodeApplied,
            // subTotal: grandTotal,
            // totalAmount: totalAmount,
            // organizer_payment_note: paymnetNote,
        };

        console.log(data);

        setProcessing(true);
        if (organizerView && currentAttendee > 0) {
            // if (totalAmount > 0 && paymentMethod === 'stripe') {
            //     axios.post(route("organizer.events.tickets.checkout", [currentAttendee, paymentMethod]), data).then((response) => {
            //         // console.log(response);
            //         router.visit(route('organizer.events.tickets.checkout.page', response.data.uuid));
            //     }).catch((error) => {
            //         console.log(error);
            //     }).finally(() => {
            //         setProcessing(false);
            //     })
            // } else if (totalAmount === 0 || paymentMethod !== 'stripe') {
            //     axios.post(route("organizer.events.tickets.checkout.free", [currentAttendee, paymentMethod]), data).then((response) => {
            //         // console.log(response);
            //         router.visit(route('organizer.events.payment.success', response.data.uuid));
            //     }).catch((error) => {
            //         console.log(error);
            //     }).finally(() => {
            //         setProcessing(false);
            //     })
            // }
        } else {
            // if (totalAmount > 0) {
            //     //Process Stripe payment for Attendee
            //     axios.post(route("attendee.tickets.checkout"), data).then((response) => {
            //         // console.log(response);
            //         router.visit(route('attendee.tickets.checkout.page', response.data.uuid));
            //     }).catch((error) => {
            //         //
            //         console.log(error);
            //     }).finally(() => {
            //         setProcessing(false);
            //     })
            // } else {
            //     //Process free tickets for Attendee
            //     axios.post(route("attendee.tickets.checkout.free"), data).then((response) => {
            //         console.log(response);
            //         router.visit(route('attendee.payment.success', response.data.uuid));
            //     }).catch((error) => {
            //         console.log(error);
            //     }).finally(() => {
            //         setProcessing(false);
            //     })
            // }
        }
    };



    const validateCode = () => {
        // // setCodeError(false);
        // let url = organizerView ? route("organizer.events.validateCode.post", discountCode) : route("attendee.validateCode.post", discountCode)
        // axios.post(url).then((response) => {
        //     let codeObj = response.data.code;
        //     let disc = parseFloat(codeObj.discount_value);
        //     switch (codeObj.discount_type) {
        //         case "fixed":
        //             disc = codeObj.discount_value;
        //             updateTotalAmount(disc);
        //             return;
        //         case "percentage":
        //             disc = grandTotal * (codeObj.discount_value / 100);
        //             updateTotalAmount(disc);
        //             return;
        //     }
        // })
        //     .catch((error) => {
        //         console.log(error);
        //         // setCodeError(error.response.data.message);
        //         // setDiscount(0);
        //         // setTotalAmount(grandTotal);
        //     });
    };

    // useEffect(() => {
    //     console.log("Ticket Details", allTicketDetails);
    //     // setDiscount(0);
    //     // setDiscountCode('');
    //     updateGrandTotal();
    // }, [allTicketDetails]);

    const updateTotalAmount = (disc: any) => {
        // let newV = grandTotal - disc;
        // console.log(grandTotal, disc, newV);
        // setDiscount(disc);
        // setTotalAmount(newV);
        // setDiscountCodeApplied(discountCode);
        // setDiscountCode('');
        toast.success("Coupon Code applied successfuly");
    }

    const updateGrandTotal = () => {
        // let gTotal = 0;
        // allTicketDetails.forEach((ticketDetail) => {
        //     gTotal += parseFloat(ticketDetail.ticket.base_price);
        //     gTotal += parseFloat(ticketDetail.fees_sub_total);
        //     gTotal += parseFloat(ticketDetail.addons_sub_total);
        // });
        // gTotal = parseFloat(gTotal.toFixed(2));
        // setGrandTotal(gTotal);
        // setTotalAmount(gTotal);
    }

    const handleTicketCardChanged = (ticketDetails: any, removedIds: any) => {

        // setAllTicketsDetails((prev) => {
        //     const objectMap = new Map(prev.map((obj) => [obj.id, obj]));
        //     removedIds.forEach((id: any) => objectMap.delete(id));
        //     ticketDetails.forEach((obj: any) => {
        //         objectMap.set(obj.id, obj); // Add new or update existing
        //     });
        //     // console.log(objectMap);
        //     let newList = Array.from(objectMap.values());
        //     newList.sort((a, b) => a.id - b.id);
        //     return newList;
        // });
    };


    const customSelect2Styles = {
        control: (base: any) => ({
            ...base,
            fontWeight: '400',
            fontSize: '1.03125rem', // increase text size
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
                <Head title="Upgrade Ticket" />
                <section className="section bg-light" id="tickets">
                    {/* <div className="bg-overlay bg-overlay-pattern"></div> */}
                    <Container>
                        {organizerView && <Row className="justify-content-center mt-5 mb-2 mt-md-0">
                            <Col md={12} className="text-center">
                                <h2>Choose Attendee and Purchased Ticket to upgrade it's Sessions</h2>
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
                                    <Form.Label htmlFor="payment_method" className="form-label fs-4 text-start w-100">Purchased Tickets</Form.Label>
                                    <Form.Select size="lg" aria-label="Default select example"
                                        className="form-control"
                                        id="payment_method" ref={paymentOptionRef}
                                        onChange={(e) => setPurchasedTicket(e.target.value)}
                                    >
                                        <option >Choose Ticket For Upgrade</option>
                                        {ticketOptions && ticketOptions.map((t: any) => (
                                            <option key={t.id} value={t.value}>{t.id + '-' + t.label}</option>
                                        ))}
                                    </Form.Select>
                                </FormGroup>
                            </Col>
                        </Row>}
                        {organizerView && < Row >
                            <Col>
                                <FormGroup className="mb-3">
                                    <Form.Label className="fs-4">Organizer Note</Form.Label>
                                    <Form.Control
                                        ref={paymentNoteRef}
                                        as='textarea'
                                        type="text"
                                        rows={4}
                                        maxLength={255}
                                        onChange={(e) => setPaymentNote(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>}
                        <FormGroup className="mb-3">
                            <Form.Label className="fs-4">Event Sessions</Form.Label>
                        </FormGroup>
                        <div className="container">
                            <div className="row">
                                {sessions && sessions.map((s) => (
                                    <div className="col ">
                                        <Form.Check
                                            key={s.id}
                                            type={'checkbox'}
                                            id={'session-checkbox-' + s.id}
                                            label={s.name}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            </React.Fragment>
        </Layout >
    );
};
export default Index;
