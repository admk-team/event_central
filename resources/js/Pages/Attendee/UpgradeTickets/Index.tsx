import { Head, router } from "@inertiajs/react";
import React, { useEffect, useState, CSSProperties, useRef } from "react";
import AttendeeLayout from "../../../Layouts/Attendee";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
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

type AttendeeOption = {
    id: number;
    value: string;
    label: string;
};

const Index = React.memo(({ organizerView, attendees, attendee_id, sessions, purchasedTickets }: any) => {

    console.log(organizerView, attendees, attendee_id, sessions, purchasedTickets);

    const Layout = organizerView ? EventLayout : AttendeeLayout;
    const foundAttendee = attendees.find(
        (attendee: any) => attendee.value === parseInt(attendee_id)
    );
    const [alreadyPurchasedSessionIds, setAlreadyPurchasedSessionIds] = useState<Array<number>>([]);
    const [upgradedSessionIds, setUpgradedSessionIds] = useState<Array<number>>([]);
    const [filteredSessions, setFilteredSessions] = useState<any>(sessions);
    const [updateList, setUpdateList] = useState(Date.now());

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
    const [currentPurchasedTicket, setCurrentPurchasedTicket] = useState<any>(null);
    const [ticketOptions, setTicketOptions] = useState<Array<AttendeeOption>>(
        []
    );
    const [fetchingSessions, setFetchingSessions] = useState(false);
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [step, setStep] = useState(1);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [stripPubKey, setStripePubKey] = useState(null);
    const [paymentId, setPaymentId] = useState(null);
    const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

    const paymentOptionRef = useRef(null);
    const paymentNoteRef = useRef(null);
    const stripeElementContainerRef = useRef(null);


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
        setCurrentPurchasedTicket(null);
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
    }, [currentAttendee]);

    useEffect(() => {
        if (currentAttendee) {
            axios
                .get(route("get.attendee.purchased.tickets", currentAttendee))
                .then((response) => {
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
                        setCurrentPurchasedTicket(null);
                        paymentOptionRef.current?.focus();
                    } else {
                        setTicketOptions([]);
                    }
                    setAlreadyPurchasedSessionIds([]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [currentAttendee]);

    useEffect(() => {
        if (currentPurchasedTicket) {
            setFetchingSessions(true);
            axios.get(route('get.attendee.purchased.ticket.sessions', currentPurchasedTicket)).then((response) => {
                // console.log(response);
                setFilteredSessions([]);
                setFilteredSessions([...sessions]);
                setAlreadyPurchasedSessionIds([...response.data.sessions]);
                setUpgradedSessionIds([]);
                setUpdateList(Date.now());
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setFetchingSessions(false);
            })
        }
    }, [currentPurchasedTicket]);

    const updateGrandTotal = () => {
        upgradedSessionIds.forEach((id) => {
            const session = sessions.find((s: any) => s.id === id);
            if (session && session.price) {
                setGrandTotal((prev: any) =>
                    parseFloat((prev + parseFloat(session.price)).toFixed(2))
                );
            }
        });
    };

    const handleCheckboxChange = (e: any, s: any) => {
        if (e.target.checked) {
            setUpgradedSessionIds((prev) => [...prev, s.id]);
            setStep(1);
        } else {
            setUpgradedSessionIds((prev) =>
                prev.filter((id) => id !== s.id)
            );
            setStep(1);
        }
    }

    const handlePaymentSuccess = (stripeResult: any) => {
        const data = {
            attendee_id: currentAttendee,
            attendee_purchased_ticket_id: currentPurchasedTicket,
            upgradedSessionIds: [...upgradedSessionIds],
            discount: discount,
            discount_code: discountCodeApplied,
            subTotal: grandTotal,
            totalAmount: totalAmount,
            organizer_payment_note: paymentNote,
            stripe_payment_id: '',
            stripe_payment_intent: paymentIntent,
            payment_method: paymentMethod
        };

        if (stripeResult) {
            setPaymentProcessed(true);
            setPaymentId(stripeResult.paymentIntent.id);
            data.stripe_payment_id = stripeResult.paymentIntent.id;
            console.log(data);
            let url_payment_update = organizerView
                ? route(
                    "organizer.events.save.upgraded.sessions",
                    currentAttendee
                )
                : route("attendee.save.upgraded.sessions", currentAttendee);
            axios
                .post(url_payment_update, data)
                .then((response) => {
                    // console.log("response upgrade", response);
                    let payment = response.data.payment;
                    let url_payment_success = organizerView
                        ? route(
                            "organizer.events.upgrade.payment.success",
                            payment.uuid
                        )
                        : route("attendee.upgrade.payment.success", payment.uuid);
                    router.visit(url_payment_success);
                })
                .catch((error) => {
                    console.log("error", error);
                })
                .finally(() => {
                    setProcessing(false);
                });
        }
    };

    const scrollBodyToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,  // Scroll to the bottom
            behavior: 'smooth',               // Smooth scrolling
        });
    };

    const makeStripeReady = async (response: any) => {
        const stripeInstance = await loadStripe(response.data.stripe_pub_key)
        setPaymentIntent(response.data.client_secret);
        setStripePubKey(response.data.stripe_pub_key);
        setStripePromise(stripeInstance);
        scrollBodyToBottom();
    }

    const submitCheckOut = (e: any) => {
        e.preventDefault();

        if (organizerView && paymentNote.length === 0) {
            toast.error('Enter Organizer Note to proceed further');
            paymentNoteRef.current?.focus();
            return;
        }

        setProcessing(true);
        setStep(2);
        if (organizerView && currentAttendee > 0) {
            if (totalAmount > 0 && paymentMethod === "stripe") {
                axios
                    .post(
                        route(
                            "organizer.events.upgrade.ticket.proceed.checkout",
                            [currentAttendee]
                        ),
                        {
                            amount: totalAmount,
                            currency: "usd",
                        }
                    )
                    .then((response) => {
                        makeStripeReady(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        setProcessing(false);
                    });
            } else if (totalAmount === 0 || paymentMethod !== "stripe") {
                const data = {
                    attendee_id: currentAttendee,
                    attendee_purchased_ticket_id: currentPurchasedTicket,
                    upgradedSessionIds: [...upgradedSessionIds],
                    discount: discount,
                    discount_code: discountCodeApplied,
                    subTotal: grandTotal,
                    totalAmount: totalAmount,
                    organizer_payment_note: paymentNote,
                    stripe_payment_id: null,
                    stripe_payment_intent: null,
                    payment_method: paymentMethod
                };
                axios
                    .post(
                        route("organizer.events.save.upgraded.sessions.free", [
                            currentAttendee
                        ]), data
                    )
                    .then((response) => {
                        console.log(response);
                        router.visit(route('organizer.events.upgrade.payment.success', response.data.payment.uuid));
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        setProcessing(false);
                    });
            }
        } else {
            if (totalAmount > 0) {
                //Process Stripe payment for Attendee
                axios
                    .post(route("attendee.upgrade.ticket.proceed.checkout", [currentAttendee]), {
                        amount: totalAmount,
                        currency: "usd",
                    })
                    .then((response) => {
                        console.log(response);
                        makeStripeReady(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        setProcessing(false);
                    });
            } else {
                //Process free tickets for Attendee
                const data = {
                    attendee_id: currentAttendee,
                    attendee_purchased_ticket_id: currentPurchasedTicket,
                    upgradedSessionIds: [...upgradedSessionIds],
                    discount: discount,
                    discount_code: discountCodeApplied,
                    subTotal: grandTotal,
                    totalAmount: totalAmount,
                    organizer_payment_note: paymentNote,
                    stripe_payment_id: null,
                    stripe_payment_intent: null,
                    payment_method: paymentMethod
                };
                axios
                    .post(route("save.upgraded.sessions.free", currentAttendee), data)
                    .then((response) => {
                        console.log(response);
                        router.visit(
                            route(
                                "attendee.upgrade.payment.success",
                                response.data.payment.uuid
                            )
                        );
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        setProcessing(false);
                    });
            }
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
                        disc = parseFloat((grandTotal * (codeObj.discount_value / 100)).toFixed(2));
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
                                                onChange={(e) => {
                                                    let id = parseInt(e.target.value);
                                                    setCurrentPurchasedTicket(id ? id : null)
                                                }
                                                }
                                            >
                                                <option value={""}>
                                                    Choose Ticket To Upgrade
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
                                                <Form.Label className="form-label text-start w-100">
                                                    Filter Event Sessions
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
                                        <Col>
                                            <FormGroup className="mb-3">
                                                <Form.Label
                                                    htmlFor="payment_method2"
                                                    className="form-label text-start w-100"
                                                >
                                                    Payment Method
                                                </Form.Label>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    className="form-control"
                                                    id="payment_method2"
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
                                    </Row>
                                )}
                            </>
                        )}
                        {/* Attendee View */}
                        {!organizerView && (
                            <>
                                <Row className="d-flex flex-col justify-content-center mt-5 mt-md-0">
                                    <Col md={6} lg={6} className="text-center">
                                        <h2>
                                            Choose Purchased Ticket
                                            to upgrade it's Sessions
                                        </h2>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row className="d-flex flex-col justify-content-center mt-md-0">
                                    <Col md={6} lg={6}>
                                        <FormGroup className="mb-3">
                                            <Form.Label
                                                htmlFor="purchased_ticket"
                                                className="form-label text-start w-100"
                                            >
                                                Choose Ticket To Upgrade
                                            </Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                className="form-control"
                                                id="purchased_ticket"
                                                ref={paymentOptionRef}
                                                onChange={(e) => {
                                                    let id = parseInt(e.target.value);
                                                    setCurrentPurchasedTicket(id ? id : null)
                                                }
                                                }
                                            >
                                                <option value={""}>
                                                    Choose Ticket For Upgrade
                                                </option>
                                                {purchasedTickets &&
                                                    purchasedTickets.map(
                                                        (t: any) => (
                                                            <option
                                                                key={t.id}
                                                                value={t.id}
                                                            >
                                                                {t.id +
                                                                    "-" +
                                                                    t.ticket.name}
                                                            </option>
                                                        )
                                                    )}
                                            </Form.Select>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </>
                        )}

                        {currentPurchasedTicket && (
                            <Row>
                                <Col>
                                    <div className="container border border-1 bg-white rounded-3 p-4 shadow-sm">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex flex-row justify-content-start align-items-center">
                                                <h5 className="fw-bold fs-5 mr-2">
                                                    Event Sessions
                                                </h5>
                                                {fetchingSessions && <Spinner
                                                    animation="border"
                                                    role="status"
                                                    size="sm"
                                                    className="mb-2"
                                                >
                                                    <span className="visually-hidden">
                                                        Fetching sessions...
                                                    </span>
                                                </Spinner>}
                                            </div>

                                            <h5 className="fw-bold fs-5 mb-2">
                                                Total Amount : <sup>
                                                    <small>$</small>
                                                </sup>{grandTotal}
                                            </h5>
                                        </div>
                                        <div className="row" key={updateList}>
                                            <hr></hr>
                                            {filteredSessions &&
                                                filteredSessions.map(
                                                    (s: any) => (
                                                        <div className="col-12 col-md-6 col-lg-4 mb-3" key={'div-' + s.id}>
                                                            {alreadyPurchasedSessionIds.includes(s.id) && <Form.Check
                                                                title="Session alreay available to Attendee"
                                                                disabled
                                                                defaultChecked
                                                                key={'checkbox-checked-' + s.id}
                                                                type={"checkbox"}
                                                                id={
                                                                    "session-checkbox-checked-" +
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
                                                                onChange={(e) => { handleCheckboxChange(e, s) }
                                                                }
                                                            />}
                                                            {!alreadyPurchasedSessionIds.includes(s.id) && <Form.Check
                                                                key={'checkbox-' + s.id}
                                                                type={"checkbox"}
                                                                id={"session-checkbox-" + s.id}
                                                                label={
                                                                    s.name +
                                                                    (s.price
                                                                        ? "  ($" +
                                                                        s.price +
                                                                        ")"
                                                                        : "  (free)")
                                                                }
                                                                onChange={(e) => { handleCheckboxChange(e, s) }
                                                                }
                                                            />}
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        {currentPurchasedTicket && step === 1 && (
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
                                                        disabled={grandTotal === 0}
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
                                                <h5 className="mb-1 pt-2 pb-2 mr-2 text-end fs-5">
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
                                                    disabled={
                                                        step === 2 || (totalAmount === 0 && discount === 0 && upgradedSessionIds.length === 0)
                                                    }
                                                    onClick={submitCheckOut}
                                                    className="btn btn-success w-100"
                                                >
                                                    {totalAmount > 0
                                                        ? "Proceed Checkout"
                                                        : "Process Free Upgrade"}
                                                    {processing && (
                                                        <Spinner
                                                            animation="border"
                                                            role="status"
                                                            style={{ marginLeft: '5px' }}
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
                                                <h5 className="mb-1 pt-2 pb-2 mr-2 text-end fs-5">
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

                        {/* Stripe Elements Conatiner */}
                        {step === 2 && !(paymentIntent || stripePromise) && <div ref={stripeElementContainerRef} className="d-flex justify-content-center p-5 mt-3 rounded-md" style={{
                            backgroundColor:
                                "var(--vz-border-color-translucent)",
                        }}>
                            <Spinner
                                animation="border"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </Spinner>
                        </div>}
                        {step === 2 && paymentIntent && stripePromise && totalAmount > 0 && (
                            <Card
                                className="mt-3"
                                style={{
                                    backgroundColor:
                                        "var(--vz-border-color-translucent)",
                                }}
                            >
                                <CardBody>
                                    <Elements
                                        stripe={stripePromise}
                                        options={{
                                            clientSecret: paymentIntent,
                                        }}
                                    >
                                        <StripeCheckoutForm
                                            amount={totalAmount}
                                            onPaymentSuccess={
                                                handlePaymentSuccess
                                            }
                                            organizerView={
                                                organizerView
                                            }
                                        />
                                    </Elements>
                                </CardBody>
                            </Card>
                        )}
                    </Container>
                </section>
            </React.Fragment>
        </Layout>
    );
});
export default Index;
