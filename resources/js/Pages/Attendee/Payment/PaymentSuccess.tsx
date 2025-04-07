"use client"

import { Head } from "@inertiajs/react"
import React from "react"
import Layout from "../../../Layouts/Attendee"
import { Card, CardBody, Col, Container, Row } from "react-bootstrap"

const PaymentSuccess = () => {
    return (
        <React.Fragment>
            <Head title="Attendee Pass" />
            <section className="section bg-light mt-4" id="success">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
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
                                            <span className="fs-3 text-green">
                                                Payment was processed
                                                successfuly.
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
    )
}

PaymentSuccess.layout = (page) => <Layout children={page} />
export default PaymentSuccess

