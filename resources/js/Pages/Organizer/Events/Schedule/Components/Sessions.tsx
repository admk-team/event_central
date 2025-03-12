import { usePage } from '@inertiajs/react';
import React from 'react'
import { Col, Row } from 'react-bootstrap';

export default function Sessions({ selectedDate, selectedPlatform }: { selectedDate: any; selectedPlatform: any }) {
    const eventSessions = usePage().props.eventSessions as any;

    return (
        <Row>
            <Col lg={12}>
                <div>
                    <div className="timeline-2">
                        <div className="timeline-continue">
                            <Row className="timeline-right">
                                <Col xs={12}>
                                    <p className="timeline-date">
                                        02:35AM to 04:30PM
                                    </p>
                                </Col>
                                <Col xs={12}>
                                    <div className="timeline-box">
                                        <div className="timeline-text">
                                            <div className="d-flex">
                                                {/* <img src={avatar7} alt="" className="avatar-sm rounded" /> */}
                                                <div className="flex-grow-1 ms-3">
                                                    <h5 className="mb-1 fs-15">Frank hook joined with our company</h5>
                                                    <p className="text-muted mb-0">It makes a statement, it’s impressive graphic design. Increase or decrease the letter spacing depending on the situation and try, try again until it looks right, and each letter has the perfect spot of its own. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="timeline-right">
                                <Col xs={12}>
                                    <p className="timeline-date">
                                        02:35AM to 04:30PM
                                    </p>
                                </Col>
                                <Col xs={12}>
                                    <div className="timeline-box">
                                        <div className="timeline-text">
                                            <h5 className="fs-15">Trip planning</h5>
                                            <p className="text-muted">In the trip planner, keep only one or two activities in a day if the purpose of the trip is to relax and take it easy during the vacation :</p>
                                            {/* <Row className="border border-dashed rounded gx-2 p-2">
                                                    <Col xs={3}>
                                                        <Link href="#"><img src={small7} alt="" className="img-fluid rounded" /></Link>
                                                    </Col>
                                                    <Col xs={3}>
                                                        <Link href="#"><img src={small3} alt="" className="img-fluid rounded" /></Link>
                                                    </Col>
                                                    <Col xs={3}>
                                                        <Link href="#"><img src={small10} alt="" className="img-fluid rounded" /></Link>
                                                    </Col>
                                                    <Col xs={3}>
                                                        <Link href="#"><img src={small9} alt="" className="img-fluid rounded" /></Link>
                                                    </Col>
                                                </Row> */}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
