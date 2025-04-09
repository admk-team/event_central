import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Col, Container, Form, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";

function Index({ attendees, eventApp }: { attendees: any; eventApp: any }) {
    const [search, setSearch] = useState("");

    const filteredAttendees = attendees.filter((attendee: any) =>
        (attendee.name + attendee.position).toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (dateString: any) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };



    // const printSingleBadge = (id: string) => {
    //     const badge = document.getElementById(id);
    //     if (!badge) {
    //         console.error('Badge not found');
    //         return;
    //     }

    //     console.log('Original badge content:', badge.innerHTML);  // Check the content

    //     // Clone the element deeply
    //     const clone = badge.cloneNode(true) as HTMLElement;
    //     console.log('Cloned content:', clone.innerHTML);  // Check the cloned content

    //     if (!clone.innerHTML) {
    //         console.error('Cloning failed: The clone is empty!');
    //         return;
    //     }

    //     const cloneWrapper = document.createElement('div');
    //     cloneWrapper.style.display = "block";
    //     cloneWrapper.appendChild(clone);

    //     const printContainer = document.createElement('div');
    //     printContainer.id = 'print-container';
    //     printContainer.appendChild(cloneWrapper);

    //     document.body.appendChild(printContainer);

    //     window.print();

    //     setTimeout(() => {
    //         printContainer.remove();
    //     }, 1000);
    // };





    return (
        <React.Fragment>
            <Head title="Badge Printing" />
            <style>{`
                .passWrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    font-family: 'Figtree', sans-serif;
                    overflow-x: hidden;
                    flex-direction: column;
                }

                .passes-container {
                    width: 100%;
                    max-width: 100vw;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .pass {
                    width: 100%;
                    max-width: 600px;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    padding: 30px 20px;
                    text-align: center;
                    box-sizing: border-box;
                }

                .heading-wraper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    margin-bottom: 20px;
                }

                .circle {
                    width: 150px;
                    object-fit: cover;
                    margin-left:50%;
                    margin-right:50%;
                    margin-bottom: 15px;
                }

                .event-name {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 8px;
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
                    width: 100%;
                    max-width: 600px;
                    height: auto;
                }

                .attendee-details {
                    margin-top: 15px;
                }

                .attendee-name {
                    font-weight: 1000;
                    letter-spacing: 0.5px;
                }

                .btn-print {
                    margin-top: 10px;
                    background-color: #28a745;
                    color: white;
                }
            `}</style>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Badge Printing" pageTitle="Dashboard" />

                    <Row className="mb-4 justify-between">
                        <Col md={6}>
                            <Form.Label>Search Attendee</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by name or position"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={4} className="mt-4">
                            <button type="button" className="btn btn-success" onClick={() => window.print()}>
                                🖨️ Print All Badges
                            </button>
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
                                            <div key={index} className="mb-4 p-3 border rounded bg-white shadow-sm">
                                                <Row>
                                                    <Col md={4}>
                                                        <strong>Name:</strong> {attendee.name} <br />
                                                        <strong>Position:</strong> {attendee.position}
                                                    </Col>
                                                    <Col md={8}>
                                                        <strong>QR Codes:</strong>
                                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                                            {attendee.qr_codes.map((qr: string, idx: number) => (
                                                                <img key={idx} src={qr} alt="QR Code" width="100" height="100" />
                                                            ))}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                {/* Print Button for Solo Badge */}
                                                {/* <div className="d-flex justify-content-end">
                                                    <button
                                                        type="button"
                                                        className="btn btn-print"
                                                        onClick={() => printSingleBadge(`badge-${index}`)}
                                                    >
                                                        🖨️ Print Badge
                                                    </button>
                                                </div> */}
                                            </div>
                                            {/* <div id={`badge-${index}`} style={{ display: "none" }}>
                                                <div className="passWrapper print-page-break">
                                                    <div className="passes-container">
                                                        <div className="pass div-gradient mt-4 mb-4">
                                                            <div className="heading-wraper">
                                                                <img
                                                                    className="circle"
                                                                    src={eventApp?.logo_img || "/placeholder.svg?height=80&width=80"}
                                                                    alt="event logo"
                                                                />
                                                                <p className="event-name">{eventApp?.name}</p>
                                                                <p className="event-date">{formatDate(eventApp?.start_date)}</p>
                                                                <h1 className="attendee-name">{attendee?.name}</h1>
                                                                <h3 className="attendee-name">{attendee?.position}</h3>
                                                            </div>
                                                            <div className="qrWrapper">
                                                                <img className="qr-code-img" src={attendee.qr_codes[0]} alt={`QR code`} />
                                                            </div>
                                                            <div className="attendee-details">
                                                                <p className="attendee-name">{attendee?.name}</p>
                                                                <p className="ticket-label">Ticket 1</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
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
                        <div key={idx} className="passWrapper print-page-break">
                            <div className="passes-container">
                                <div className="pass div-gradient mt-4 mb-4">
                                    <div className="heading-wraper">
                                        <img
                                            className="circle"
                                            src={eventApp?.logo_img || "/placeholder.svg?height=80&width=80"}
                                            alt="event logo"
                                        />
                                        <p className="event-name">{eventApp?.name}</p>
                                        <p className="event-date">{formatDate(eventApp?.start_date)}</p>
                                        <h1 className="attendee-name">
                                            {attendee?.name}
                                        </h1>
                                        <h3 className="attendee-name">{attendee?.position}</h3>
                                    </div>

                                    <div className="qrWrapper">
                                        <img
                                            className="qr-code-img"
                                            src={qr}
                                            alt={`QR code ${idx + 1}`}
                                        />
                                    </div>

                                    <div className="attendee-details">
                                        <p className="attendee-name">
                                            {attendee?.name}
                                        </p>
                                        <p className="ticket-label">Ticket {idx + 1}</p>
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
