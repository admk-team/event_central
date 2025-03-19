import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, CardBody } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Layout from "../../../Layouts/Attendee";
import { Head } from "@inertiajs/react";

const Index = ({ eventApp, amount, tickets }: any) => {

    console.log(amount, tickets);

    const [stripePromise, setStripePromise] = useState(
        loadStripe(
            "pk_test_51R3iHCPNcWTtCzebbzvUsG7XMmMnTqUxbs4NE9v8CH5IJxtaMXDgz5FMA96HnS93ZQw9DN6wHLlxgtFW90XW0Q4z004QlcW5Z8"
        )
    );
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios.post(route("attendee.payment.intent"), { amount: amount }).then((response) => {
            let clientSecret = response.data.client_secret;
            setClientSecret(clientSecret);
            console.log(response);
        });
    }, []);

    const appearance = {
        theme: "stripe",
        // variables: {
        //     colorPrimary: "#0570de",
        //     colorBackground: "#ffffff",
        //     colorText: "#30313d",
        //     colorDanger: "#df1b41",
        //     fontFamily: "Ideal Sans, system-ui, sans-serif",
        //     spacingUnit: "2px",
        //     borderRadius: "4px",
        //     // See all possible variables below
        // },
    };

    return (
        <React.Fragment>
            <Head title="Payments" />
            <section className="section bg-light mt-4" id="payment">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} lg={6}>
                            <h1>Stripe Payment</h1>
                            {clientSecret && stripePromise && (
                                <Card>
                                    <CardBody>
                                        <Elements
                                            stripe={stripePromise}
                                            options={{
                                                clientSecret,
                                                appearance,
                                            }}
                                        >
                                            <CheckoutForm
                                                eventId={eventApp.id}
                                                amount={amount}
                                                tickets={tickets}
                                            />
                                        </Elements>
                                    </CardBody>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
