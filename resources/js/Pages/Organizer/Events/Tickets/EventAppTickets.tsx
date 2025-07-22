import React, { useState } from "react";
import { Card, Col, Container, Row, Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "../../../../Layouts/Event";
import moment from "moment";
import DeleteModal from "../../../../Components/Common/DeleteModal";


const EventAppTickets = ({ tickets }: any) => {
    const [deleteTicket, setDeleteTicket] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const deleteForm = useForm({
        _method: "DELETE",
    });

    const deleteAction = (ticket: any) => {
        console.log(ticket);
        setDeleteTicket(ticket);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        console.log(deleteTicket.ticketId)
        deleteForm.post(
            route("organizer.events.delete.payment", deleteTicket.ticketId)
        );
        setShowDeleteConfirmation(false);
    };
    return (
        <React.Fragment>
            {/* <style>
                .tooltip-justify{
                    text - align: justify;
                }
            </style> */}
            <Head title="Event Tickets | Velzon - React Admin & Dashboard Template" />
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <h5 className="card-title mb-3">Payments</h5>
                                    <div className="table-responsive">
                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Attendee Name</th>
                                                    <th scope="col">Attendee Email</th>
                                                    <th scope="col">Ticket Name</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Paid</th>
                                                    <th scope="col">Discount Amount</th>
                                                    <th scope="col">Promo Code</th>
                                                    <th scope="col">Discount Percentage</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Type</th>
                                                    {/* <th scope="col">Payment Note</th> */}
                                                    <th scope="col">Create On</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tickets && tickets.length > 0 ? (
                                                    tickets.map((ticket: any, index: number) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <Link href={route('organizer.events.attendee.info', ticket.attendee_id)}>
                                                                    {`${ticket.attendee_first_name} ${ticket.attendee_last_name}`}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link href={route('organizer.events.attendee.info', ticket.attendee_id)}>
                                                                    {ticket.attendee_email}
                                                                </Link>
                                                            </td>
                                                            <td>{ticket.ticket_name}</td>
                                                            <td>{ticket.total}</td>
                                                            <td>{ticket.amount}</td>
                                                            <td>{ticket.discount}</td>
                                                            <td>{ticket.promo_code ?? 'N/A'}</td>
                                                            <td>
                                                                {ticket.discount && ticket.total != '0.00'
                                                                    ? `${Math.round((ticket.discount / ticket.total) * 100).toFixed(2)}%`
                                                                    : '0%'}
                                                                </td>
                                                            <td>{ticket.qty}</td>
                                                            <td>{ticket.type}</td>
                                                            {/* <td>{
                                                                ticket.payment_note.length > 15 ?
                                                                    <>
                                                                        <OverlayTrigger
                                                                            placement="left"
                                                                            overlay={
                                                                                <Tooltip className="text-justify" id="button-tooltip" style={{ textAlign: 'justify' }}>
                                                                                    {ticket.payment_note}
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <a className="cursor-pointer">{ticket.payment_note.substring(0, 15) + '...'}</a>
                                                                        </OverlayTrigger>
                                                                    </>

                                                                    : ticket.payment_note
                                                            }
                                                            </td> */}
                                                            <td>{ticket.created_at ? moment(ticket.created_at).format('MMM DD, YYYY') : ''}</td>
                                                            <td style={{ color: "#0d6efd" }}><i className="ri-checkbox-circle-line fs-17 align-middle"></i> Paid</td>
                                                            <td className="text-center"><i className="ri-delete-bin-5-line text-danger fs-17 align-middle" onClick={() => deleteAction(ticket)}></i></td>
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
            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => {
                    setShowDeleteConfirmation(false);
                }}
            />
        </React.Fragment>
    );
};

EventAppTickets.layout = (page: any) => <Layout children={page} />;

export default EventAppTickets;
