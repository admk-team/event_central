import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState, CSSProperties, useRef } from "react";
import AttendeeLayout from "../../../Layouts/Attendee";
import EventLayout from "../../../Layouts/Event";
import {
    Button,
    Col,
    Container,
    Row,
    InputGroup,
    Form,
    Card,
    CardBody,
    Spinner,
    FormGroup,
} from "react-bootstrap";

import axios from "axios";
import toast from "react-hot-toast";
import Select, { StylesConfig } from "react-select";
import { max, set } from "date-fns";

type AttendeeOption = {
    id: number;
    value: string;
    label: string;
};

const Index = ({ organizerView, attendees, attendee_id, sessions }: any) => {
    console.log("sessions", sessions);

    const Layout = organizerView ? EventLayout : AttendeeLayout;
    const foundAttendee = attendees.find(
        (attendee: any) => attendee.value === parseInt(attendee_id)
    );
    const [alreadyPurchasedSessionIds, setAlreadyPurchasedSessionIds] =
        useState<Array<number>>([]);
    const [upgradedSessionIds, setUpgradedSessionIds] = useState<Array<number>>(
        []
    );
    const [grandTotal, setGrandTotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState("");
    const [discountCodeApplied, setDiscountCodeApplied] = useState("");
    const [discountCodeError, setDiscountCodeError] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("stripe");

    const [codeError, setCodeError] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [paymentNote, setPaymentNote] = useState<any>("");
    const [currentAttendee, setCurrentAttendee] = useState<any>(attendee_id);
    const [currentPurchasedTicket, setPurchasedTicket] = useState<any>(null);
    const [ticketOptions, setTicketOptions] = useState<Array<AttendeeOption>>(
        []
    );
    const [processing, setProcessing] = useState(false);
    const [filteredSessions, setFilteredSessions] = useState<any>(sessions);

    const paymentOptionRef = useRef(null);
    const paymentNoteRef = useRef(null);

    useEffect(() => {
        if (searchName.length > 0) {
            const filtered = sessions.filter((session: any) =>
                session.name.toLowerCase().includes(searchName.toLowerCase())
            );
            setFilteredSessions(filtered);
        } else {
            setFilteredSessions(sessions);
        }
    }, [searchName]);

    useEffect(() => {
        setGrandTotal(0);
        updateGrandTotal();
    }, [upgradedSessionIds]);

    useEffect(() => {
        setTotalAmount(grandTotal);
        setDiscount(0);
        setDiscountCodeApplied("");
        setDiscountCode("");
        setCodeError(false);
        setDiscountCodeError("");
    }, [grandTotal]);

    useEffect(() => {
        setPurchasedTicket(null);
        setFilteredSessions(sessions);
        setUpgradedSessionIds([]);
        setAlreadyPurchasedSessionIds([]);
        setGrandTotal(0);
        setTotalAmount(0);
        setDiscount(0);
        setDiscountCode("");
        setDiscountCodeApplied("");
        setCodeError(false);
        setDiscountCodeError("");
    },[currentAttendee])

    useEffect(() => {
        console.log("Current Attendee", currentAttendee);
        if (currentAttendee) {
            axios
                .get(route("get.attendee.purchased.ticlket", currentAttendee))
                .then((response) => {
                    console.log("response", response);
                    if (response.data.tickets.length > 0) {
                        let list = Array();
                        response.data.tickets.forEach((pticket: any) => {
                            list.push({
                                value: pticket.id,
                                label: pticket.ticket.name,
                                id: pticket.id,
                            });
                        });
                        setTicketOptions([...list]);
                        setPurchasedTicket(null);
                        paymentOptionRef.current?.focus();
                        console.log(list);
                    } else {
                        setTicketOptions([]);
                    }
                    setAlreadyPurchasedSessionIds(response.data.sessions);
                    console.log(
                        "Purchased Session IDs",
                        response.data.sessions
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [currentAttendee]);

    const updateGrandTotal = () => {
        console.log("upgradedSessionIds", upgradedSessionIds);
        upgradedSessionIds.forEach((id) => {
            const session = sessions.find((s: any) => s.id === id);
            if (session && session.price) {
                setGrandTotal((prev: any) =>
                    parseFloat((prev + parseFloat(session.price)).toFixed(2))
                );
            }
        });
    };

    const submitCheckOut = (e: any) => {
        e.preventDefault();

        const data = {
            upgradedSessionIds: [...upgradedSessionIds],
            discount: discount,
            discount_code: discountCodeApplied,
            subTotal: grandTotal,
            totalAmount: totalAmount,
            organizer_payment_note: paymentNote,
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
        setCodeError(false);
        let url = organizerView
            ? route("organizer.events.validateCode.post", discountCode)
            : route("attendee.validateCode.post", discountCode);
        axios
            .post(url)
            .then((response) => {
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

    const updateTotalAmount = (disc: any) => {
        let newV = grandTotal - disc;
        console.log(grandTotal, disc, newV);
        setDiscount(disc);
        setTotalAmount(newV);
        setDiscountCodeApplied(discountCode);
        setDiscountCode("");
        toast.success("Coupon Code applied successfuly");
    };

    const customSelect2Styles = {
        control: (base: any) => ({
            ...base,
            fontWeight: "400",
            fontSize: "1.03125rem", // increase text size
            border: "var(--vz- primary - border - subtle)",
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: "0 8px",
        }),
        indicatorsContainer: (base: any) => ({
            ...base,
            height: 35,
        }),
    };

    return (
        <Layout>
            <React.Fragment>
                <Head title="Upgrade Ticket" />
                <section className="section bg-light" id="tickets">
                    {/* <div className="bg-overlay bg-overlay-pattern"></div> */}
                    <Container>
                        {organizerView && (
                            <>
                                <Row className="justify-content-center mt-5 mb-2 mt-md-0">
                                    <Col md={12} className="text-center">
                                        <h2>
                                            Choose Attendee and Purchased Ticket
                                            to upgrade it's Sessions
                                        </h2>
                                        <hr />
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label
                                                htmlFor="attendee"
                                                className="form-label text-start w-100"
                                            >
                                                Attendee
                                            </Form.Label>
                                            <Select
                                                styles={customSelect2Styles}
                                                className="react-select-container15"
                                                value={foundAttendee}
                                                options={attendees}
                                                onChange={(option: any) => {
                                                    setCurrentAttendee(
                                                        option.value
                                                    );
                                                }}
                                            ></Select>
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <Form.Label
                                                htmlFor="payment_method"
                                                className="form-label text-start w-100"
                                            >
                                                Ticket To Upgrade
                                            </Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                className="form-control"
                                                id="payment_method"
                                                ref={paymentOptionRef}
                                                onChange={(e) =>
                                                    setPurchasedTicket(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>
                                                    Choose Ticket For Upgrade
                                                </option>
                                                {ticketOptions &&
                                                    ticketOptions.map(
                                                        (t: any) => (
                                                            <option
                                                                key={t.id}
                                                                value={t.value}
                                                            >
                                                                {t.id +
                                                                    "-" +
                                                                    t.label}
                                                            </option>
                                                        )
                                                    )}
                                            </Form.Select>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label className="">
                                                Organizer Note
                                            </Form.Label>
                                            <Form.Control
                                                ref={paymentNoteRef}
                                                as="textarea"
                                                type="text"
                                                rows={5}
                                                maxLength={255}
                                                onChange={(e) =>
                                                    setPaymentNote(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {currentPurchasedTicket && (
                                    <Row>
                                        <Col>
                                            <FormGroup className="mb-3">
                                                <Form.Label
                                                    htmlFor="payment_method"
                                                    className="form-label text-start w-100"
                                                >
                                                    Payment Method
                                                </Form.Label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className="form-control"
                                                    id="payment_method"
                                                    onChange={(e) =>
                                                        setPaymentMethod(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        key={22}
                                                        value="stripe"
                                                    >
                                                        Stripe
                                                    </option>
                                                    <option
                                                        key={23}
                                                        value="cash"
                                                    >
                                                        Cash
                                                    </option>
                                                    <option
                                                        key={24}
                                                        value="other"
                                                    >
                                                        Other
                                                    </option>
                                                </Form.Select>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup className="mb-3">
                                                <Form.Label className="form-label text-start w-100">
                                                    Search Sessions
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Search by session Name"
                                                    maxLength={150}
                                                    onChange={(e) =>
                                                        setSearchName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                )}
                            </>
                        )}
                        {currentPurchasedTicket && (
                            <Row>
                                <Col>
                                    <div className="container border border-1 bg-white rounded-3 p-4 shadow-sm">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fs-4 mb-2">
                                                Event Sessions
                                            </span>
                                            <span className="fs-4 mb-2">
                                                Total Amount :{grandTotal}
                                            </span>
                                        </div>
                                        <div className="mt-4 row">
                                            {filteredSessions &&
                                                filteredSessions.map(
                                                    (s: any) => (
                                                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                            <Form.Check
                                                                disabled={alreadyPurchasedSessionIds.includes(
                                                                    s.id
                                                                )}
                                                                defaultChecked={alreadyPurchasedSessionIds.includes(
                                                                    s.id
                                                                )}
                                                                key={s.id}
                                                                type={
                                                                    "checkbox"
                                                                }
                                                                id={
                                                                    "session-checkbox-" +
                                                                    s.id
                                                                }
                                                                label={
                                                                    s.name +
                                                                    (s.price
                                                                        ? "  ($" +
                                                                          s.price +
                                                                          ")"
                                                                        : "  (free)")
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        setUpgradedSessionIds(
                                                                            (
                                                                                prev
                                                                            ) => [
                                                                                ...prev,
                                                                                s.id,
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        setUpgradedSessionIds(
                                                                            (
                                                                                prev
                                                                            ) =>
                                                                                prev.filter(
                                                                                    (
                                                                                        id
                                                                                    ) =>
                                                                                        id !==
                                                                                        s.id
                                                                                )
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        {currentPurchasedTicket && (
                            <>
                                <Card className="border border-1 mt-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={4}
                                                lg={4}
                                                className="d-flex align-items-center"
                                            >
                                                <h5 className="fw-bold mb-0">
                                                    Coupon Code
                                                </h5>
                                            </Col>
                                            <Col md={4} lg={4}>
                                                <InputGroup>
                                                    <Form.Control
                                                        disabled={
                                                            totalAmount === 0
                                                        }
                                                        id="ticket-discount-code"
                                                        type="text"
                                                        isInvalid={codeError}
                                                        name="coupon code"
                                                        placeholder="Enter Coupon Code Here"
                                                        value={discountCode}
                                                        onChange={(e: any) =>
                                                            setDiscountCode(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        // disabled={
                                                        //     allTicketDetails.length ===
                                                        //     0
                                                        // }
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
                                            <Col
                                                md={4}
                                                lg={4}
                                                className="d-flex justify-content-end align-items-center"
                                            >
                                                <h5 className="mb-1 pt-2 pb-2 mr-2 text-end fs-4">
                                                    Discount :{" "}
                                                    <sup>
                                                        <small>$</small>
                                                    </sup>
                                                    {discount}
                                                </h5>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="border border-1 mt-4">
                                    <CardBody>
                                        <Row>
                                            <Col md={4} lg={4}></Col>
                                            <Col md={4} lg={4}>
                                                <Button
                                                    // disabled={
                                                    //     allTicketDetails.length === 0 ||
                                                    //     processing
                                                    // }
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
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </Spinner>
                                                    )}
                                                </Button>
                                            </Col>
                                            <Col
                                                md={4}
                                                lg={4}
                                                className="d-flex justify-content-end align-items-center"
                                            >
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
                        )}
                    </Container>
                </section>
            </React.Fragment>
        </Layout>
    );
};
export default Index;
