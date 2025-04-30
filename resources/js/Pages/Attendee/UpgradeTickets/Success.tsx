"use client"

import { Head, router } from "@inertiajs/react"
import React, { useEffect, useState } from "react"
import AttendeeLayout from "../../../Layouts/Attendee"
import EventLayout from "../../../Layouts/Event"
import { Card, CardBody, Col, Container, Row } from "react-bootstrap"

const PaymentSuccess = ({ organizerView }: any) => {
    const Layout = organizerView ? EventLayout : AttendeeLayout
    const [secondsLeft, setSecondsLeft] = useState(5)

    useEffect(() => {
        // Set up the countdown interval
        const countdown = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown) // Stop the interval when reaching 0
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        // Set up the redirect timeout
        const redirect = setTimeout(() => {
            if (organizerView) {
                router.visit(route("organizer.events.tickets.upgrade"))
            } else {
                router.visit(route("attendee.tickets.upgrade"))
            }
        }, 5000)

        // Cleanup on component unmount
        return () => {
            clearInterval(countdown)
            clearTimeout(redirect)
        }
    }, [organizerView])

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
                                                    Checkout was processed successfully for ticket upgradation.
                                                    {/* Confirmation email with QR Codes has been sent to the Attendee's email address. */}
                                                </span>
                                                <p className="text-muted text-center">
                                                    Redirecting in <strong>{secondsLeft}</strong> second{secondsLeft !== 1 && 's'}...
                                                </p>
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

export default PaymentSuccess
