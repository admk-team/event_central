import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, CardBody, Spinner, Tabs, Tab } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Layout from "../../../Layouts/Attendee";
import { Head } from "@inertiajs/react";

const Index = ({ eventApp, amount, tickets, stripe_pub_key }: any) => {

    // console.log(amount, stripe_pub_key);

    const [stripePromise, setStripePromise] = useState(
        loadStripe(
            stripe_pub_key
        )
    );
    const [clientSecret, setClientSecret] = useState("");
    const [loadingIntent, setLoadingIntent] = useState(false);

    useEffect(() => {
        setLoadingIntent(true);
        axios.post(route("attendee.payment.intent"), { amount: amount }).then((response) => {
            let clientSecret = response.data.client_secret;
            setClientSecret(clientSecret);
            console.log(response);
        }).finally(() => {
            setLoadingIntent(false);
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
                            <Card>
                                <CardBody>
                                    <Tabs
                                        fill
                                        defaultActiveKey="stripe"
                                        id="uncontrolled-tab-example"
                                        className="mb-3"
                                    >
                                        <Tab eventKey="stripe" title="Stripe">
                                            {loadingIntent && <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </div>
                                            }
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
                                        </Tab>
                                        <Tab eventKey="paypal" title="Paypal">
                                            Under development
                                        </Tab>
                                    </Tabs>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
