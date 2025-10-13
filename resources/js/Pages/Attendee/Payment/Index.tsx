import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Row,
    CardBody,
    Spinner,
    Tabs,
    Tab,
} from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./components/StripeCheckoutForm";
import PayPalButton from "./components/PayPalButton";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import AttendeeLayout from "../../../Layouts/Attendee";
import EventLayout from "../../../Layouts/Event";
import { Head } from "@inertiajs/react";

const Index = ({
    payment,
    stripe_pub_key,
    paypal_client_id,
    organizerView,
    getCurrency
}: any) => {

    const Layout = organizerView ? EventLayout : AttendeeLayout;

    const [stripePromise, setStripePromise] = useState(
        loadStripe(stripe_pub_key)
    );
    const [clientSecret, setClientSecret] = useState(payment.stripe_intent);
    const [loadingIntent, setLoadingIntent] = useState(false);

    const appearance = {
        theme: "stripe",
    };

    return (
        <Layout>
            <React.Fragment>
                <Head title="Payments" />
                <section className="section bg-light mt-4" id="payment">
                    <div className="bg-overlay bg-overlay-pattern"></div>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={6} lg={6}>
                                <Card className="pricing-rates starter-plan shadow bg-white p-4 rounded border-0">
                                    <CardBody>
                                        <Tabs
                                            fill
                                            defaultActiveKey="stripe"
                                            id="uncontrolled-tab-example"
                                            className="mb-3"
                                        >
                                            <Tab eventKey="stripe" title="Stripe">
                                                {loadingIntent && (
                                                    <div
                                                        className="d-flex justify-content-center align-items-center"
                                                        style={{
                                                            minHeight: "200px",
                                                        }}
                                                    >
                                                        <Spinner
                                                            animation="border"
                                                            role="status"
                                                        >
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </Spinner>
                                                    </div>
                                                )}
                                                {clientSecret && stripePromise && (
                                                    <Card
                                                        style={{
                                                            backgroundColor:
                                                                "var(--vz-border-color-translucent)",
                                                        }}
                                                    >
                                                        <CardBody>
                                                            <Elements
                                                                stripe={
                                                                    stripePromise
                                                                }
                                                                options={{
                                                                    clientSecret,
                                                                    appearance,
                                                                }}
                                                            >
                                                                <StripeCheckoutForm
                                                                    currency_symbol={getCurrency.currency_symbol}
                                                                    payment={payment}
                                                                    organizerView={organizerView}
                                                                />
                                                            </Elements>
                                                        </CardBody>
                                                    </Card>
                                                )}
                                            </Tab>
                                            <Tab eventKey="paypal" title="Paypal">
                                            <PayPalButton
                                                currency_code={getCurrency.currency}
                                                amount={payment.amount_paid}
                                                client_id={paypal_client_id}
                                            />
                                        </Tab>
                                        </Tabs>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        </Layout>
    );
};
// Index.layout = (page: any) => <Layout children={page} />;
export default Index;
