"use client"

import { Head } from "@inertiajs/react"
import React from "react"
// import Layout from "../../../Layouts/Attendee"
import AttendeeLayout from "../../../Layouts/Attendee";
import EventLayout from "../../../Layouts/Event";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap"

const PaymentSuccess = ({ organizerView }: any) => {
    const Layout = organizerView ? EventLayout : AttendeeLayout;

    return (
        <Layout>
            <React.Fragment>
                <Head title="Attendee Pass" />
                <section className="section bg-light mt-4" id="success">
                    <div className="bg-overlay bg-overlay-pattern"></div>
                    <Container>
                        <Row className="flex items-center justify-content-center h-screen">
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ height: "300px" }}
                                        >
                                            <div className="d-flex justify-content-center align-items-center flex-column">
                                                <i
                                                    className="bx bxs-check-circle"
                                                    style={{
                                                        fontSize: "50px",
                                                        color: "green",
                                                    }}
                                                ></i>
                                                <span className="fs-3 text-green p-4 text-center">
                                                    Checkout was processed
                                                    successfuly. Confirmation email with QR Codes have emailed to your provided Email address.
                                                </span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        </Layout>
    )
}

// PaymentSuccess.layout = (page) => <Layout children={page} />
export default PaymentSuccess

