import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

export default function CheckoutForm({
    amount,
    onPaymentSuccess,
    organizerView,
}: any) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    return_url: route("attendee.payment.success", amount),
                },
                redirect: "if_required",
            })
            .then((result) => {
                console.log("result", result);
                if (!result.error) {
                    console.log(
                        "Stripe checkout is complete. Attendee sessions are being updated."
                    );
                    // let session_upgrade_url = organizerView ? route('organizer.events.save.upgraded.sessions', payment.uuid) : route("attendee.save.upgraded.sessions", payment.uuid);
                    // let payment_success_url = organizerView ? route('organizer.events.payment.success', payment.uuid) : route("attendee.payment.success", payment.uuid);

                    onPaymentSuccess(result);
                    setIsProcessing(false);
                } else {
                    if (
                        result.error.type === "card_error" ||
                        result.error.type === "validation_error"
                    ) {
                        setMessage(result.error.message);
                    } else {
                        setMessage("An unexpected error occured.");
                    }
                    setIsProcessing(false);
                }
            });
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />

            {!(stripe && elements) && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            <Row className="d-flex justify-content-center">
                <Col md={4} lg={4}>
                    {stripe && elements && (
                        <Button
                            className="mt-3 btn btn-success mt-2 w-100"
                            disabled={isProcessing}
                            type="submit"
                        >
                            <span id="button-text">
                                {isProcessing
                                    ? "Processing ... "
                                    : "Pay $" + amount}
                            </span>
                        </Button>
                    )}
                </Col>
            </Row>

            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
