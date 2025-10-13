import { Head, router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import EventLayout from "../../../Layouts/Attendee";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Row,
    Spinner,
} from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { useLaravelReactI18n } from "laravel-react-i18n";

const UpgradeTicketToTicket = ({
    attendee,
    attendeeTickets,
    tickets,
    currency,
}) => {
    const { t } = useLaravelReactI18n();
    const Layout = EventLayout;

    const [oldTicket, setOldTicket] = useState(null);
    const [newTicket, setNewTicket] = useState(null);
    const [priceDiff, setPriceDiff] = useState(0);
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1);

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentId, setPaymentId] = useState(null);

    const paymentNoteRef = useRef(null);

    /** Calculate price difference */
    useEffect(() => {
        if (oldTicket && newTicket) {
            const oldT = tickets.find((t) => t.id === parseInt(oldTicket));
            const newT = tickets.find((t) => t.id === parseInt(newTicket));

            if (oldT && newT) {
                const diff =
                    parseFloat(newT.base_price) - parseFloat(oldT.base_price);
                setPriceDiff(diff);
            } else {
                setPriceDiff(0);
            }
        } else {
            setPriceDiff(0);
        }
    }, [oldTicket, newTicket]);

    const makeStripeReady = async (response) => {
        const pubKey = response?.data?.stripe_pub_key;

        if (!pubKey) {
            console.error("Missing Stripe publishable key:", response);
            toast.error("Stripe configuration is missing for this event.");
            setProcessing(false);
            return;
        }

        const stripeInstance = await loadStripe(pubKey);
        setClientSecret(response.data.client_secret);
        setStripePromise(stripeInstance);
        setPaymentId(response.data.payment_id);
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    /** Handle successful payment */
    const handlePaymentSuccess = (stripeResult) => {
        saveUpgrade(
            stripeResult.paymentIntent.id,
            stripeResult.paymentIntent.client_secret
        );
    };

    /** Save upgrade (free or after payment) */
    const saveUpgrade = (stripeId = null, stripeIntent = null) => {
        if (!oldTicket || !newTicket) {
            toast.error(t("Please select your current and new ticket"));
            return;
        }

        if (priceDiff <= 0) {
            toast.error(
                t(
                    "Downgrade not allowed. Please choose a higher-priced ticket."
                )
            );
            return;
        }

        setProcessing(true);

        axios
            .post(route("attendee.tickets.toticket.save"), {
                old_ticket_id: oldTicket,
                new_ticket_id: newTicket,
                amount: priceDiff,
                payment_method: paymentMethod,
                note,
                stripe_payment_id: stripeId,
                stripe_payment_intent: stripeIntent,
            })
            .then((res) => {
                toast.success(t("Ticket upgraded successfully"));
                router.visit(
                    route(
                        "attendee.tickets.toticket.success",
                        res.data.payment.uuid
                    )
                );
            })
            .catch((err) => {
                console.error(err);
                toast.error(t("Upgrade failed. Please try again."));
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    /** Submit checkout */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!oldTicket || !newTicket) {
            toast.error(t("Please select your current and new ticket"));
            return;
        }

        if (priceDiff <= 0) {
            toast.error(
                t(
                    "Downgrade not allowed. Please choose a higher-priced ticket."
                )
            );
            return;
        }

        if (paymentMethod !== "stripe") {
            saveUpgrade();
            return;
        }

        setProcessing(true);
        setStep(2);

        axios
            .post(route("attendee.tickets.toticket.checkout"), {
                amount: priceDiff,
                currency: currency.currency,
            })
            .then((response) => {
                makeStripeReady(response);
            })
            .catch((error) => {
                console.error(error);
                toast.error(t("Unable to initiate checkout."));
                setProcessing(false);
            });
    };

    return (
        <EventLayout>
            <Head title={t("Upgrade Ticket to Another Ticket")} />
            <section className="section bg-light">
                <Container>
                    <Row className="justify-content-center mt-5 mb-4">
                        <Col md={12} className="text-center">
                            <h2>{t("Upgrade Your Ticket")}</h2>
                            <p className="text-muted">
                                {t(
                                    "Select your current ticket and upgrade to a higher tier. Downgrades are not allowed."
                                )}
                            </p>
                            <hr />
                        </Col>
                    </Row>

                    <Row>
                        {/* Old Ticket */}
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>
                                    {t("Your Current Ticket")}
                                </Form.Label>
                                <Form.Select
                                    value={oldTicket ?? ""}
                                    onChange={(e) =>
                                        setOldTicket(parseInt(e.target.value))
                                    }
                                >
                                    <option value="">
                                        {t("Select Current Ticket")}
                                    </option>
                                    {attendeeTickets.map((t) => {
                                        if (!t.ticket || !t.ticket.name)
                                            return null;
                                        return (
                                            <option
                                                key={t.ticket.id}
                                                value={t.ticket.id}
                                            >
                                                {t.ticket.name} (
                                                {currency.currency_symbol}
                                                {t.ticket.base_price})
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </FormGroup>
                        </Col>

                        {/* New Ticket */}
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>{t("Upgrade To")}</Form.Label>
                                <Form.Select
                                    value={newTicket ?? ""}
                                    onChange={(e) =>
                                        setNewTicket(parseInt(e.target.value))
                                    }
                                >
                                    <option value="">
                                        {t("Select New Ticket")}
                                    </option>
                                    {tickets.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name} ({currency.currency_symbol}
                                            {t.base_price})
                                        </option>
                                    ))}
                                </Form.Select>
                            </FormGroup>
                        </Col>
                    </Row>

                    {oldTicket && newTicket && (
                        <Card className="border border-1 mt-4">
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <FormGroup>
                                            <Form.Label>
                                                {t("Payment Method")}
                                            </Form.Label>
                                            <Form.Select
                                                value={paymentMethod}
                                                onChange={(e) =>
                                                    setPaymentMethod(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="stripe">
                                                    {t("Stripe")}
                                                </option>
                                                <option value="cash">
                                                    {t("Cash")}
                                                </option>
                                                <option value="other">
                                                    {t("Other")}
                                                </option>
                                            </Form.Select>
                                        </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                        <div className="mt-3 mt-md-0">
                                            <h5 className="mb-1">
                                                {t("Price Difference")}:{" "}
                                                <strong
                                                    className={
                                                        priceDiff <= 0
                                                            ? "text-danger"
                                                            : "text-success"
                                                    }
                                                >
                                                    {currency.currency_symbol}
                                                    {Math.abs(
                                                        priceDiff
                                                    ).toFixed(2)}
                                                </strong>
                                            </h5>

                                            {priceDiff < 0 && (
                                                <small className="text-danger d-block">
                                                    ⚠️{" "}
                                                    {t(
                                                        "Downgrade not allowed. Please select a higher-priced ticket."
                                                    )}
                                                </small>
                                            )}
                                        </div>
                                    </Col>

                                    <Col md={4} className="text-end">
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={
                                                processing || priceDiff <= 0
                                            }
                                            className="btn btn-success w-100"
                                        >
                                            {t("Proceed to Checkout")}
                                            {processing && (
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                    size="sm"
                                                    className="ms-2"
                                                />
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    )}

                    {step === 2 &&
                        clientSecret &&
                        stripePromise &&
                        priceDiff > 0 && (
                            <Card className="mt-3 border border-1">
                                <CardBody>
                                    <Elements
                                        stripe={stripePromise}
                                        options={{ clientSecret: clientSecret }}
                                    >
                                        <StripeCheckoutForm
                                            currency={currency.currency}
                                            currency_symbol={
                                                currency.currency_symbol
                                            }
                                            amount={priceDiff}
                                            onPaymentSuccess={
                                                handlePaymentSuccess
                                            }
                                            organizerView={false}
                                        />
                                    </Elements>
                                </CardBody>
                            </Card>
                        )}
                </Container>
            </section>
        </EventLayout>
    );
};

export default UpgradeTicketToTicket;
