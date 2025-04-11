import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from "../../../Layouts/Attendee"
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import DeleteModal from '../../../Components/Common/DeleteModalRefund';

function RefundTickets({ payments }: any) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteAttendee, setDeleteAttendee] = React.useState<any>(null);

    const deleteForm = useForm({
    });

    const deleteAction = (attendee: any) => {
        setDeleteAttendee(attendee);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        deleteForm.post(route('attendee.tickets.request', { id: deleteAttendee }));
        setShowDeleteConfirmation(false);
    }

    const columns: ColumnDef<typeof payments.data[0]> = [
        {
            header: () => 'ID',
            cell: (payment) => payment.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Total',
            cell: (payment) => payment.amount_paid,
        },
        {
            header: () => 'Payment Method',
            cell: (payment) => payment.payment_method,
        },
        {
            header: () => 'Status',
            cell: (payment) => payment.refund_tickets?.status ? payment.refund_tickets?.status : "",
        },
        {
            header: () => "Actions",
            cell: (payment) => (
                <div className="hstack gap-4 fs-15 text-center">
                    <a className="link-primary cursor-pointer" onClick={() => deleteAction(payment.id)} ><i className="ri-refund-2-line"></i></a>
                </div>
            ),
        },
    ];


    return (
        <React.Fragment>
            <Head>
                <title>Refund Ticket </title>
                <meta name="description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta name="keywords" content="event attendees, attendee management, conference attendees, admin dashboard" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="attendees Management | Organizer Dashboard" />
                <meta property="og:description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.attendees.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Attendees" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={payments}
                                columns={columns}
                                title="Refund Tickets"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => { setShowDeleteConfirmation(false) }}
            />

        </React.Fragment>
    )
}

RefundTickets.layout = (page: any) => <Layout children={page} />;

export default RefundTickets;
