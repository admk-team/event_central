import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../../Layouts/Event";

const EventAppTickets = ({ tickets }: any) => {
    return (
        <React.Fragment>
            <Head title="Event Tickets | Velzon - React Admin & Dashboard Template" />
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <h5 className="card-title mb-3">Tickets</h5>
                                    <div className="table-responsive">
                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Paid</th>
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tickets && tickets.length > 0 ? (
                                                    tickets.map((ticket: any, index: number) => (
                                                        <tr key={index}>
                                                            <td>{ticket.ticket_name}</td>
                                                            <td>{ticket.total}</td>
                                                            <td>{ticket.amount}</td>
                                                            <td>{ticket.discount}</td>
                                                            <td>{ticket.qty}</td>
                                                            <td>{ticket.type}</td>
                                                            <td style={{ color: "#0d6efd" }}><i className="ri-checkbox-circle-line fs-17 align-middle"></i> Paid</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="text-center">No record found !!</td>
                                                    </tr>
                                                )}
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

EventAppTickets.layout = (page: any) => <Layout children={page} />;

export default EventAppTickets;
