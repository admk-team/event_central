import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { Col, Container, Form, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import "../../../../css/passes.css";

function Index({ attendees, eventApp, customBadgeDesign }: { attendees: any; eventApp: any; customBadgeDesign: any }) {
    const [search, setSearch] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);

    const filteredAttendees = attendees.filter((attendee: any) => {
        const ticketTypes = attendee.qr_codes.map((qr: any) => qr.ticket_type_name).join(" ");
        const searchString = (attendee.name + attendee.position + ticketTypes).toLowerCase();
        return searchString.includes(search.toLowerCase());
    });

    const [showLogo, setShowLogo] = useState(true);
    const [showGradient, setShowGradient] = useState(true);

    const printBadge = () => {
        if (customBadgeDesign && customBadgeDesign.mail_content) {
            const url = route('organizer.events.print.badge.design', { search });
            window.open(url, '_blank');
        } else {
            window.print();
        }
    }

    return (
        <React.Fragment>
            <Head title="Badge Printing" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Badge Printing" pageTitle="Dashboard" />

                    <Row className="mb-4 justify-between">
                        <Col md={6}>
                            <Form.Label className="text-black">Search Attendee</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by name or position"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={6} className="mt-4">
                            <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-stretch gap-2">
                                <button type="button" className="btn btn-success w-100 w-md-auto" onClick={printBadge}>
                                    🖨️ Print All Badges
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 w-md-auto"
                                    onClick={() => setShowLogo((prev) => !prev)}
                                >
                                    {showLogo ? "🙈 Hide Logo" : "👁️ Show Logo"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 w-md-auto"
                                    onClick={() => setShowGradient((prev) => !prev)}
                                >
                                    {showGradient ? "🧼 White Background" : "🌈 Gradient Background"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-info w-100 w-md-auto"
                                    onClick={() => setIsFlipped((prev) => !prev)}
                                >
                                    {isFlipped ? "↩️ Unflip" : "🔄 Flip"}
                                </button>
                            </div>
                        </Col>

                    </Row>

                    <Row>
                        <Col xs={12}>
                            <div className="border p-3 rounded bg-light">
                                <h5 className="mb-3">Attendees & QR Codes</h5>
                                {filteredAttendees.length === 0 ? (
                                    <div>No results found.</div>
                                ) : (
                                    filteredAttendees.map((attendee: any, index: number) => (
                                        <React.Fragment key={index}>
                                            <div key={index} className="mb-4 p-3 border rounded bg-transparent shadow-sm">
                                                <Row>
                                                    <Col md={4}>
                                                        <strong>Name:</strong> {attendee.name} <br />
                                                        <strong>Position:</strong> {attendee.position} <br />
                                                        <strong>Ticket Type:</strong> {attendee.qr_codes[0]?.ticket_type_name ?? "N/A"}
                                                    </Col>
                                                    <Col md={8}>
                                                        <strong>QR Codes:</strong>
                                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                                            {attendee.qr_codes.map((qr: string, idx: number) => (
                                                                <img key={idx} src={qr.qr_code} alt="QR Code" width="100" height="100" />
                                                            ))}
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </React.Fragment>
                                    ))
                                )}
                            </div >
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Printable Badges */}
            <div className="printable">
                {filteredAttendees.map((attendee: any, index: number) =>
                    attendee.qr_codes.map((qr: string, idx: number) => (
                        <div
                            key={idx}
                            className="passWrapper print-page-break"
                            style={{ transform: isFlipped ? "rotate(180deg)" : "none" }}
                        >
                            <div className="passes-container">
                                <div
                                    className={`pass ${showGradient ? "div-gradient" : "bg-transparent"} mt-4 mb-4`}
                                >
                                    <div className="heading-wraper">
                                        {showLogo ? (
                                            <img
                                                className="circle"
                                                src={eventApp?.logo_img || "/placeholder.svg?height=80&width=80"}
                                                alt="event logo"
                                            />
                                        ) : (
                                            <div className="eventlogodiv"></div>
                                        )}
                                        <p className="event-location">{eventApp?.location_base}</p>
                                        <h1 className="attendee-name">{attendee.qr_codes[idx]?.display_name}</h1>
                                        <h3 className="attendee-name">{attendee.qr_codes[idx]?.display_position}</h3>
                                    </div>

                                    <div className="qrWrapper">
                                        <img
                                            className="qr-code-img"
                                            src={qr.qr_code}
                                            alt={`QR code ${idx + 1}`}
                                        />
                                    </div>

                                    <div className="attendee-details">
                                        <span className="location">{attendee?.location}</span>
                                        <p className="attendee-name">{qr.ticket_type_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>


        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
