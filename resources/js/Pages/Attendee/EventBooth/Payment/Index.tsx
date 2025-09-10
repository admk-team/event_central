// resources/js/Pages/Attendee/EventBooth/Payment/Index.tsx
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Layout from "../../../../Layouts/Attendee";
import { Head } from "@inertiajs/react";
import { Card, CardBody, Col, Container, Row, Spinner, Tabs, Tab } from "react-bootstrap";
import CheckoutForm from "./components/StripeCheckoutForm";
import PayPalButton from "./components/PayPalButton";

const Index = ({ payment, stripe_pub_key, paypal_client_id, currency, getCurrency }: any) => {
  const [stripePromise] = useState(loadStripe(stripe_pub_key));
  const [clientSecret] = useState(payment?.stripe_intent);
  const [loadingIntent] = useState(false);

  const appearance = { theme: "stripe" };

  return (
    <>
      <Head title="Payments" />
      <section className="section bg-light mt-4" id="payment">
        <div className="bg-overlay bg-overlay-pattern"></div>
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={6}>
              <Card className="pricing-rates starter-plan shadow bg-white p-4 rounded border-0">
                <CardBody>
                  <Tabs fill defaultActiveKey="stripe" id="booth-payment-tabs" className="mb-3">
                    <Tab eventKey="stripe" title="Stripe">
                      {loadingIntent && (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      )}

                      {clientSecret && stripePromise && (
                        <Card style={{ backgroundColor: "var(--vz-border-color-translucent)" }}>
                          <CardBody>
                            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                              <CheckoutForm
                                payment={payment}
                                currency={currency}
                                getCurrency={getCurrency?.currency_symbol}
                              />
                            </Elements>
                          </CardBody>
                        </Card>
                      )}
                    </Tab>

                    <Tab eventKey="paypal" title="Paypal" disabled={!paypal_client_id}>
                      {!!paypal_client_id ? (
                        <PayPalButton amount={payment.total_amount} client_id={paypal_client_id} />
                      ) : (
                        <div className="text-muted">PayPal is not configured.</div>
                      )}
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
