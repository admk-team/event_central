import { Head } from "@inertiajs/react"
import React from "react"
import Layout from "../../../Layouts/Attendee"
import { Col, Container, Row, Card, CardBody } from "react-bootstrap"
import "../../../css/passes.css"

interface AttendeePassProps {
    event: {
        logo_img: string
        name: string
        description: string
        start_date: string
    }
    attendee: {
        id: string
        first_name: string
        last_name: string
    }
}

const PaymentSuccess = ({ event, attendee }: AttendeePassProps) => {
    // Format date similar to the Laravel Carbon format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
    }

    return (
        <React.Fragment>
            <Head title="Payment Successful" />
            <section className="section bg-light mt-4" id="success">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="passWrapper">
                                            <div className="pass div-gradient">
                                                <div className="heading-wraper">
                                                    <img className="circle" src={event?.logo_img || "/placeholder.svg"} alt="event logo" />
                                                    <p className="event-name">{event?.name}</p>
                                                    <p className="event-desc">{event?.description}</p>
                                                    <p className="event-date">{event?.start_date ? formatDate(event.start_date) : ""}</p>
                                                </div>
                                                <div className="qrWrapper">
                                                    <div>
                                                        <img
                                                            className="qr-code-img"
                                                            src={`${window.location.origin}/storage/qr-codes/${attendee?.id}.png`}
                                                            alt="qr code"
                                                        />

                                                    </div>
                                                </div>
                                                <div className="attendee-details">
                                                    <p className="attendee-name">
                                                        {attendee?.first_name} {attendee?.last_name}
                                                    </p>
                                                </div>
                                            </div>
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

PaymentSuccess.layout = (page: any) => <Layout children={page} />
export default PaymentSuccess

