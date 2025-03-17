import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const TicketCard = ({ ticket }: any) => {
    return (
        <Col lg={4}>
            <Card className="plan-box mb-0">
                <Card.Body className="p-4 m-2">
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                            <h5 className="mb-1 fw-bold">{ticket.name}</h5>
                            {/* <p className="text-muted mb-0">{ticket.description}</p> */}
                        </div>
                        <div className="flex-grow-2">
                            <h1 className="month">
                                <sup>
                                    <small>$</small>
                                </sup>
                                <span className="ff-secondary fw-bold">{ticket.price}</span>
                                <span
                                    className="fs-13 text-muted">
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="py-4 text-center">

                    </div>

                    <div>
                        <h5 className="mb-1 fw-bold bg-light p-2 ">Sessions</h5>
                        <ul className="list-unstyled text-muted vstack gap-3">
                            {ticket.sessions.length > 0 && ticket.sessions.map((session: any) =>
                                <li key={session.id}>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 text-success me-1">
                                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            {session.name}
                                        </div>
                                    </div>
                                </li>
                            )}

                        </ul>
                        <h5 className="mb-1 fw-bold bg-light p-2 ">Addon Features</h5>
                        <ul className="list-unstyled text-muted vstack gap-3">
                            {ticket.all_features.length > 0 && ticket.all_features.map((feature: any) =>
                                feature.selected > 0 ? <li key={feature.id}>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 text-success me-1">
                                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            {feature.name}
                                        </div>
                                    </div>
                                </li> :
                                    < li key={feature.id}>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 text-danger me-1">
                                                <i className="ri-close-circle-fill fs-15 align-middle"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                {feature.name}
                                            </div>
                                        </div>
                                    </li>
                            )}
                        </ul>
                        <div className="mt-4">
                            <Link href="#" className="btn btn-soft-success w-100">Get
                                Started</Link>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col >
    );
}

export default TicketCard;
