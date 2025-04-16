import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from "../../../Layouts/Attendee"
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import RefundTicketModal from './RefundTicketModal';
import moment from 'moment';

function RefundTickets({ payments }: any) {
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [currentPayment, setCurrentPayment] = useState<any>(null);

    const refundAction = (payment: any) => {
        console.log(payment);

        if (payment.refund_tickets && payment.refund_tickets.status.length > 0) {
            alert('Refund has already been processed');
        } else {
            setCurrentPayment(payment);
            setShowRefundModal(true);
        }
    }

    const handleRefundProcessed = () => {

        setShowRefundModal(false);
        console.log('refund processed successfully');
    }

    const columns: ColumnDef<typeof payments.data[0]> = [
        {
            header: () => 'ID',
            cell: (payment) => payment.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Total Amount',
            cell: (payment) => '$' + payment.amount_paid,
        },
        {
            header: () => 'Payment Status',
            cell: (payment) => <span className='badge bg-secondary text-capitalize p-2 w-100'>{payment.status}</span>,
        },
        {
            header: () => 'Payment Method',
            cell: (payment) => payment.payment_method,
        },
        {
            header: () => 'Payment Date',
            cell: (payment) => payment.created_at ? moment(payment.created_at).format('MMM DD, YYYY') : '',
        },
        {
            header: () => 'Refund Type',
            cell: (payment) => payment.refund_tickets?.refund_type ?? '',
        },
        {
            header: () => 'Amount Requested',
            cell: (payment) => (payment.refund_tickets && payment.refund_tickets.refund_requested_amount > 0 ? "$" : "") + (payment.refund_tickets?.refund_requested_amount ?? ''),
        },
        {
            header: () => 'Refund Reason',
            cell: (payment) => payment.refund_tickets?.refund_reason ?? '',
        },
        {
            header: () => 'Requested On',
            cell: (payment) => payment.refund_tickets ? moment(payment.refund_tickets.refund_requested_on).format('MMM DD, YYYY') : '',
        },
        {
            header: () => 'Refund Status',
            cell: (payment) => <span className='badge bg-secondary text-capitalize p-2 w-100'>{payment.refund_tickets?.status ?? ''}</span>,
        },
        {
            header: () => 'Refund Status Date',
            cell: (payment) => payment.refund_tickets && payment.refund_tickets.refund_status_date ? moment(payment.refund_tickets.refund_status_date).format('MMM DD, YYYY') : '',
        },
        {
            header: () => 'Organizer Remarks',
            cell: (payment) => payment.refund_tickets?.organizer_remarks ?? '',
        },
        {
            header: () => "Actions",
            cell: (payment) => (
                <div className="hstack gap-4 fs-15 text-center">
                    <Button size="sm" className="link-primary cursor-pointer" onClick={() => refundAction(payment)} >
                        <i className="text-white ri-refund-2-line"></i>
                    </Button>
                </div>
            )
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
            {showRefundModal && <RefundTicketModal
                show={showRefundModal}
                onRefundProcessed={handleRefundProcessed}
                onCloseClick={() => { setShowRefundModal(false) }}
                paymentId={currentPayment.id}
                refundRequestedAmount={currentPayment.amount_paid}
            />

            }
        </React.Fragment>
    )
}

RefundTickets.layout = (page: any) => <Layout children={page} />;

export default RefundTickets;
