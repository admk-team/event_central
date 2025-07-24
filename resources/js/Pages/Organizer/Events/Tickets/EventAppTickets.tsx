import React, { useState } from "react";
import { Card, Col, Container, Row, Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "../../../../Layouts/Event";
import moment from "moment";
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
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

    const columns: ColumnDef<typeof tickets.data[0]> = [
            {
                header: () => 'Attendee Name',
                cell: (ticket) => ticket.attendee_first_name +" "+ticket.attendee_last_name,
            },
            {
                header: () => 'Attendee Email',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => 
                    <>
                        <Link href={route('organizer.events.attendee.info', ticket.attendee_id)}>
                            {ticket.attendee_email}
                        </Link>
                    </>,
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Ticket Name',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.ticket_name,
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Total',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.total,
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Paid',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.amount,
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Discount Amount',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.discount,
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Promo Code',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.promo_code ?? 'N/A',
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Discount Percentage',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.discount && ticket.total != '0.00'
                                ? `${((ticket.discount / ticket.total) * 100)}%`
                                : '0%',
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Quantity',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.qty,
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Type',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.type,
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Create On',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => ticket.created_at ? moment(ticket.created_at).format('MMM DD, YYYY') : '',
                cellStyle: { textWrap: 'wrap' },
            },
            {
                header: () => 'Status',
                headerStyle: { textWrap: 'wrap' },
                cell: (ticket) => <><i className="ri-checkbox-circle-line fs-17 align-middle"></i> Paid</>,
                cellStyle: { textWrap: 'wrap', color: 'rgb(13, 110, 253)' },
            },
            {
                header: () => "Actions",
                cell: (ticket) => (
                    <div className="hstack gap-4 fs-15 text-center">
                        <i className="ri-delete-bin-5-line text-danger fs-17 align-middle" onClick={() => deleteAction(ticket)}></i>
                    </div>
                ),
            },
        ];
    

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
                        <Col xs={12}>
                                <DataTable
                                    data={{ data: tickets, links: [] }}
                                    columns={columns}
                                    title="Payments"
                                    tableLayoutFixed={true}
                                    disableRowSelection={true}
                                />
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
