import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from '@inertiajs/react';

// Define the structure of each attendee data item
interface AttendeeData {
    first_name: string;
    email: string;
    amountPaid: number;
}

// Define the structure of top10Attendee
interface Top10Attendee {
    totalAttendees: number;
    totalRevenue: number;
    attendeeData: AttendeeData[];
}

// Define props interface
interface TopReferralsProps {
    top10Attendee: Top10Attendee;
}

const TopReferrals = ({ top10Attendee }: TopReferralsProps) => {
    // Calculate total amount paid for progress bar (for visualization)
    const totalAmountPaid = top10Attendee.attendeeData.reduce((sum, attendee) => sum + attendee.amountPaid, 0);
    const maxAmount = top10Attendee.attendeeData[0]?.amountPaid || 1; // Avoid division by zero

    return (
        <React.Fragment>
            <Col xl={6} md={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Top 10 Attendees</h4>
                    </Card.Header>

                    <Card.Body>
                        <Row className="align-items-center">
                            <Col xs={6}>
                                <h6 className="text-muted text-uppercase fw-semibold text-truncate fs-12 mb-3">
                                Total Revenue  
                                </h6>
                                <h4 className="fs- mb-0">${top10Attendee.totalRevenue}</h4>
                                <p className="mb-0 mt-2 text-muted">
                                    <span className="badge bg-success-subtle text-success mb-0">
                                        <i className="ri-arrow-up-line align-middle"></i> {top10Attendee.totalAttendees.toLocaleString()}
                                    </span>{' '}
                                    Total Attendees
                                </p>
                            </Col>
                            <Col xs={6}>
                                <div className="text-center">
                                    {/* Optional: Replace with an attendee-related image if desired */}
                                    {/* <img src={illustrator} className="img-fluid" alt="Top Attendees" /> */}
                                </div>
                            </Col>
                        </Row>
                        <div className="mt-3 pt-2">
                            <div className="progress progress-lg rounded-pill">
                                {top10Attendee.attendeeData.map((attendee, index) => {
                                    const percentage = (attendee.amountPaid / maxAmount) * 100;
                                    const colors = ['bg-primary', 'bg-info', 'bg-success', 'bg-warning', 'bg-danger'];
                                    const color = colors[index % colors.length]; // Cycle through colors
                                    return (
                                        <div
                                            key={index}
                                            className={`progress-bar ${color}`}
                                            role="progressbar"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-3 pt-2">
                            {top10Attendee.attendeeData.map((attendee, index) => (
                                <div className="d-flex mb-2" key={index}>
                                    <div className="flex-grow-1">
                                        <p className="text-truncate text-muted fs-14 mb-0">
                                            <i className="mdi mdi-circle align-middle me-2" style={{ color: ['#405189', '#0AB39C', '#F06548', '#F7B84B', '#3577F1'][index % 5] }}></i>
                                            {attendee.first_name} ({attendee.email})
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <p className="mb-0">${attendee.amountPaid.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default TopReferrals;