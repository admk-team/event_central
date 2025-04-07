import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Layout from "../../../Layouts/Attendee";
import { Card, Col, Container, Row, Table } from "react-bootstrap";

const PurchaseTickets = ({ eventApp, tickets }: any) => {

    return (
        <React.Fragment>
            <Head title="Purchase Tickets" />
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <h5 className="card-title mb-3">
                                        Purchase Tickets
                                    </h5>
                                    <div className="table-responsive">
                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="fw-bold">Ticket Name</th>
                                                    <th scope="col" className="fw-bold">Quantity</th>
                                                    <th scope="col" className="fw-bold">Discount</th>
                                                    <th scope="col" className="fw-bold">Total</th>
                                                    <th scope="col" className="fw-bold">Amount Paid</th>
                                                    <th scope="col" className="fw-bold">Payment Method</th>
                                                    <th scope="col" className="fw-bold">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { tickets && tickets.length > 0 ? ( tickets.map((payment:any, i:any) =>
                                                    payment.purchased_tickets.map((ticket:any, j:any) => (
                                                        <tr key={`${i}-${j}`}>
                                                            <td>{ticket.ticket?.name || "N/A"}</td>
                                                            <td>{ticket.qty}</td>
                                                            <td>{ticket.discount}</td>
                                                            <td>{ticket.total}</td>
                                                            <td>{payment.amount_paid}</td>
                                                            <td>{payment.payment_method}</td>
                                                            <td style={{ color: "#0d6efd" }}><i className="ri-checkbox-circle-line fs-17 align-middle"></i> Paid</td>
                                                        </tr> 
                                                    ))
                                                )) : ( <tr>
                                                        <td colSpan={5} className="text-center">No record found !!</td>
                                                    </tr>)
                                                }
                                                
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
PurchaseTickets.layout = (page: any) => <Layout children={page} />;
export default PurchaseTickets;
