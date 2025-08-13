"use client";

import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Layout from "../../../Layouts/Attendee";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";

const PaymentSuccess = () => {
    const [secondsLeft, setSecondsLeft] = useState(5);

    // Determine the redirect URL based on organizerView
    const redirectRoute = route("attendee.event.products");

    useEffect(() => {
        // Set up the countdown interval
        const countdown = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown); // Stop the interval when reaching 0
                    // Trigger the redirect immediately when countdown reaches 0
                    router.visit(redirectRoute, { preserveScroll: true });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup on component unmount
        return () => {
            clearInterval(countdown);
        };
    }, [redirectRoute]);

    return (
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
                                                successfully
                                            </span>
                                            {secondsLeft > 0 ? (
                                                <p className="text-muted text-center">
                                                    Redirecting in{" "}
                                                    <strong>
                                                        {secondsLeft}
                                                    </strong>{" "}
                                                    second
                                                    {secondsLeft !== 1 && "s"}
                                                    ...
                                                </p>
                                            ) : (
                                                <p className="text-muted text-center">
                                                    Redirecting now... If you
                                                    are not redirected,{" "}
                                                    <Link
                                                        href={redirectRoute}
                                                        className="text-primary"
                                                    >
                                                        click here
                                                    </Link>
                                                    .
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};
PaymentSuccess.layout = (page: any) => <Layout children={page} />;
export default PaymentSuccess;
