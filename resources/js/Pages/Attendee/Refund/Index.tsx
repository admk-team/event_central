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
    const [currentPaymentId, setCurrentPaymentId] = useState<any>(null);

    const refundAction = (paymentId: any) => {
        console.log(paymentId);
        setCurrentPaymentId(paymentId);
        setShowRefundModal(true);
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
            cell: (payment) => payment.status,
        },
        {
            header: () => 'Payment Method',
            cell: (payment) => payment.payment_method,
        },
        {
            header: () => 'Refund Type',
            cell: (payment) => payment.refund_tickets?.refund_type ?? '',
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
            cell: (payment) => payment.refund_tickets?.refund_status ?? '',
        },

        {
            header: () => 'Refund Status Date',
            cell: (payment) => payment.refund_tickets?.refund_status_date ?? '',
        },

        {
            header: () => 'Organizer Remarks',
            cell: (payment) => payment.refund_tickets?.organizer_remarks ?? '',
        },
        {
            header: () => "Actions",
            cell: (payment) => (
                <div className="hstack gap-4 fs-15 text-center">
                    <a className="link-primary cursor-pointer" onClick={() => refundAction(payment.id)} ><i className="ri-refund-2-line"></i></a>
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
            {showRefundModal && <RefundTicketModal
                show={showRefundModal}
                onRefundProcessed={handleRefundProcessed}
                onCloseClick={() => { setShowRefundModal(false) }}
                paymentId={currentPaymentId}
            />

            }
        </React.Fragment>
    )
}

RefundTickets.layout = (page: any) => <Layout children={page} />;

export default RefundTickets;
