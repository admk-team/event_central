import { Head, router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import EventLayout from "../../../../Layouts/Event";
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
import Select from "react-select";
import { useLaravelReactI18n } from "laravel-react-i18n";

const UpgradeTicketToTicket = ({ attendees, tickets, currency }) => {
    const { t } = useLaravelReactI18n();
    const Layout = EventLayout;

    const [selectedAttendee, setSelectedAttendee] = useState(null);
    const [attendeeTickets, setAttendeeTickets] = useState([]);
    const [oldTicket, setOldTicket] = useState(null);
    const [newTicket, setNewTicket] = useState(null);
    const [priceDiff, setPriceDiff] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const [note, setNote] = useState("");
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1);

    // Stripe
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentId, setPaymentId] = useState(null);

    const paymentNoteRef = useRef(null);

    /** Load purchased tickets for selected attendee */
    useEffect(() => {
        if (!selectedAttendee) return;
        axios
            .get(
                route(
                    "organizer.events.tickets.toticket.attendee.tickets",
                    selectedAttendee
                )
            )
            .then((res) => {
                setAttendeeTickets(res.data.tickets);
                setOldTicket(null);
                setNewTicket(null);
                setPriceDiff(0);
            })
            .catch((err) => console.error(err));
    }, [selectedAttendee]);

    /** Calculate difference when both tickets selected */
    useEffect(() => {
        if (oldTicket && newTicket) {
            const oldT = tickets.find((t) => t.id === parseInt(oldTicket));
            const newT = tickets.find((t) => t.id === parseInt(newTicket));

            if (oldT && newT) {
                const diff =
                    parseFloat(newT.base_price) - parseFloat(oldT.base_price);
                setPriceDiff(diff); // can be positive or negative
            } else {
                setPriceDiff(0);
            }
        } else {
            setPriceDiff(0);
        }
    }, [oldTicket, newTicket]);

    /** Prepare Stripe payment */
    const makeStripeReady = async (response) => {
        const stripeInstance = await loadStripe(response.data.stripe_pub_key);
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
        if (!selectedAttendee || !oldTicket || !newTicket) {
            toast.error(t("Please select attendee and tickets"));
            return;
        }

        setProcessing(true);

        axios
            .post(
                route(
                    "organizer.events.tickets.toticket.save",
                    selectedAttendee
                ),
                {
                    old_ticket_id: oldTicket,
                    new_ticket_id: newTicket,
                    amount: Math.abs(priceDiff), // use absolute value for record
                    payment_method: paymentMethod,
                    note: note,
                    stripe_payment_id: stripeId,
                    stripe_payment_intent: stripeIntent,
                    refund_required: priceDiff < 0, // mark refunds for backend record
                }
            )
            .then((res) => {
                toast.success(t("Ticket upgraded successfully"));
                router.visit(
                    route(
                        "organizer.events.tickets.toticket.success",
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

        if (!selectedAttendee || !oldTicket || !newTicket) {
            toast.error(t("Please select attendee and tickets"));
            return;
        }

        if (note.trim().length === 0) {
            toast.error(t("Please enter a note for organizer"));
            paymentNoteRef.current?.focus();
            return;
        }

        // Free, refund, or non-stripe case
        if (priceDiff <= 0 || paymentMethod !== "stripe") {
            saveUpgrade();
            return;
        }

        setProcessing(true);
        setStep(2);

        axios
            .post(
                route(
                    "organizer.events.tickets.toticket.checkout",
                    selectedAttendee
                ),
                {
                    amount: priceDiff,
                    currency: currency.currency,
                }
            )
            .then((response) => {
                makeStripeReady(response);
            })
            .catch((error) => {
                console.error(error);
                toast.error(t("Unable to initiate checkout."));
                setProcessing(false);
            });
    };

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            fontWeight: "400",
            fontSize: "1.03125rem",
        }),
    };

    return (
        <EventLayout>
            <Head title={t("Upgrade Ticket to Another Ticket")} />
            <section className="section bg-light">
                <Container>
                    <Row className="justify-content-center mt-5 mb-4">
                        <Col md={12} className="text-center">
                            <h2>
                                {t("Upgrade Attendee Ticket to Another Ticket")}
                            </h2>
                            <hr />
                        </Col>
                    </Row>

                    {/* Attendee Selection */}
                    <Row>
                        <Col md={4}>
                            <FormGroup className="mb-3">
                                <Form.Label>{t("Select Attendee")}</Form.Label>
                                <Select
                                    styles={customSelectStyles}
                                    options={attendees}
                                    onChange={(opt) =>
                                        setSelectedAttendee(opt.value)
                                    }
                                    placeholder={t("Choose Attendee")}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup className="mb-3">
                                <Form.Label>
                                    {t("Old Ticket (Purchased)")}
                                </Form.Label>
                                <Form.Select
                                    value={oldTicket ?? ""}
                                    disabled={!attendeeTickets.length}
                                    onChange={(e) =>
                                        setOldTicket(parseInt(e.target.value))
                                    }
                                >
                                    <option value="">
                                        {attendeeTickets.length
                                            ? t("Select Old Ticket")
                                            : t(
                                                  "Select"
                                              )}
                                    </option>

                                    {attendeeTickets.length > 0 &&
                                        attendeeTickets.map((t) => {
                                            if (!t.ticket || !t.ticket.name)
                                                return null;
                                            const ticketId =
                                                t.ticket_id ?? t.ticket.id;
                                            const ticketName =
                                                t.ticket.name ??
                                                t.ticket_name ??
                                                t.ticket_label ??
                                                `Ticket #${t.id}`;
                                            return (
                                                <option
                                                    key={ticketId}
                                                    value={ticketId}
                                                >
                                                    {ticketName} (
                                                    {currency.currency_symbol}
                                                    {t.ticket?.base_price})
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup className="mb-3">
                                <Form.Label>
                                    {t("New Ticket (Upgrade To)")}
                                </Form.Label>
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

                    {/* Organizer Note */}
                    <Row>
                        <Col md={12}>
                            <FormGroup className="mb-3">
                                <Form.Label>{t("Organizer Note")}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    ref={paymentNoteRef}
                                    rows={3}
                                    maxLength={255}
                                    placeholder={t(
                                        "Enter note about this upgrade"
                                    )}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Payment & Summary */}
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
                                                <strong>
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
                                                        "The new ticket is cheaper. Please refund the difference manually. This will be processed as a free checkout."
                                                    )}
                                                </small>
                                            )}
                                        </div>
                                    </Col>

                                    <Col md={4} className="text-end">
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={processing}
                                            className="btn btn-success w-100"
                                        >
                                            {priceDiff > 0
                                                ? t("Proceed to Checkout")
                                                : t("Process Free Upgrade")}
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

                    {/* Stripe Checkout */}
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
                                            organizerView={true}
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
