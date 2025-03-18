import { Head } from "@inertiajs/react";
import React from "react";
import Layout from "../../Layouts/Attendee";
import { Button, Col, Container, Row } from "react-bootstrap";

const PaymentSuccess = () => {
    return (
        <React.Fragment>
            <Head title="Payment Successful" />
            <section className="section bg-light" id="plans">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-bold">
                                    Your Payment was Successful.
                                </h3>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};
PaymentSuccess.layout = (page: any) => <Layout children={page} />;
export default PaymentSuccess;
