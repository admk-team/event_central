import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function CheckoutForm({ payment, currency, getCurrency}: any) {
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

        stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: route("attendee.product.checkout.success"),
                },
                redirect: "if_required",
            })
            .then((result) => {
                if (!result.error) {
                    console.log("Stripe checkout is complete. Attendee paymnet status is being updated.");
                    let payment_update_url = route("attendee.product.update", payment.id);
                    let payment_success_url = route("attendee.product.checkout.success");

                    axios
                        .post(payment_update_url)
                        .then((response) => {
                            console.log("Attendee paymnet status updated. Redirecting to success page.");
                            router.visit(payment_success_url);
                        })
                        .catch((errorPost) => {
                            console.log(errorPost);
                        }).finally(() => {
                            setIsProcessing(false);
                        });
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

            <div className="d-flex justify-content-center">
                {(stripe && elements) && <Button
                    className="mt-3 btn btn-success mt-2 w-75 rounded-pill"
                    disabled={isProcessing}
                    type="submit"
                >
                    <span id="button-text">
                        {isProcessing ? "Processing ... " :  getCurrency + " " + payment.total_amount}
                    </span>
                </Button>}
            </div>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
