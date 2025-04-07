"use client"

import { Head } from "@inertiajs/react"
import React from "react"
import Layout from "../../../Layouts/Attendee"
import { Card, CardBody, Col, Container, Row } from "react-bootstrap"

const PaymentSuccess = ({ eventApp, attendee, image }) => {
    // Format date similar to Carbon\Carbon::create($event->start_date)->format('d M, Y')
    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
    }

    // Check if image is an array or convert it to an array if it's a single item
    const images = Array.isArray(image) ? image : [image]

    return (
        <React.Fragment>
            <Head title="Attendee Pass" />
            <style jsx>{`
        .passWrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          font-family: 'Figtree', sans-serif;
        }

        .pass {
          width: 100%;
          max-width: 400px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 30px 20px;
          text-align: center;
        }

        .div-gradient {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
        }

        .heading-wraper {
          margin-bottom: 20px;
        }

        .circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          margin-bottom: 15px;
        }

        .event-name {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .event-desc {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
          padding: 0 20px;
        }

        .event-date {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .qrWrapper {
          background: white;
          padding: 20px;
          border-radius: 12px;
          display: inline-block;
          margin-bottom: 20px;
        }

        .qr-code-img {
          width: 200px;
          height: 200px;
        }

        .attendee-details {
          margin-top: 15px;
        }

        .attendee-name {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
      `}</style>
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
            <div className="passWrapper">
                <div className="passes-container">
                    {images.map((img, index) => (
                        <div key={index} className="pass div-gradient">
                            <div className="heading-wraper">
                                <img
                                    className="circle"
                                    src={eventApp?.logo_img || "/placeholder.svg?height=80&width=80"}
                                    alt="event logo"
                                />
                                <p className="event-name">{eventApp?.name}</p>
                                <p className="event-desc">{eventApp?.description}</p>
                                <p className="event-date">{formatDate(eventApp?.start_date)}</p>
                            </div>
                            <div className="qrWrapper">
                                <div>
                                    <img
                                        className="qr-code-img"
                                        src={img.qr_code}
                                        alt={`QR code ${index + 1}`}
                                    />
                                </div>
                            </div>
                            <div className="attendee-details">
                                <p className="attendee-name">
                                    {attendee?.first_name} {attendee?.last_name}
                                </p>
                                <p className="ticket-label">Ticket {index + 1}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

PaymentSuccess.layout = (page) => <Layout children={page} />
export default PaymentSuccess

