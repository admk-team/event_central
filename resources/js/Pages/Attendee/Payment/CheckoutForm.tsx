import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function CheckoutForm({ eventId, amount, tickets }: any) {
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

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: route("attendee.payment.success", eventId),
            },
            redirect: 'if_required'
        });

        if (!error) {
            //Update Purchased Tickets status
            axios.post(route('attendee.update.payment', eventId), { amount: amount, tickets: tickets }).then((response) => {
                console.log(response);
                router.visit(route("attendee.payment.success", eventId));
            }).catch((errorPost) => {
                console.log(errorPost);
            });
            console.log('callback running');
        } else {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occured.");
            }
        }
        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />

            {!(stripe && elements) && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            }

            <Button
                className="btn btn-success mt-2"
                disabled={isProcessing || !stripe || !elements}
                type="submit"
            >
                <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </Button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
