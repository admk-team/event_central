import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Layout from "../../../../Layouts/Event"
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import OrganizerRefundModal from './OrganizerRefundModal';
import moment from 'moment';

function Index({ refundPayments }: any) {
    // console.log(refundPayments);


    const [showRefundActionModal, setShowRefundActionModal] = useState(false);
    const [currentRefund, setCurrentRefund] = React.useState<any>(null);


    const handleShowRefundModal = (refund: any) => {

        console.log(refund);
        setCurrentRefund(refund);
        setShowRefundActionModal(true);
    }

    const columns: ColumnDef<typeof refundPayments.data[0]> = [
        {
            header: () => 'ID',
            cell: (refund) => refund.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Attendee Name',
            cell: (refund) => refund?.attendee ? refund?.attendee?.first_name + ' ' + refund?.attendee?.last_name : '',
        },
        {
            header: () => 'Total Amount',
            cell: (refund) => refund?.attendee_payment ? refund?.attendee_payment?.amount_paid : '',
        },
        {
            header: () => 'Payment Method',
            cell: (refund) => refund?.attendee_payment ? refund?.attendee_payment?.payment_method : '',
        },

        {
            header: () => 'Refund Type',
            cell: (refund) => refund.refund_type ?? '',
        },
        {
            header: () => 'Amount Requested',
            cell: (refund) => "$" + refund.refund_requested_amount,
        },
        {
            header: () => 'Refund Reason',
            cell: (refund) => refund.refund_reason ?? '',
        },

        {
            header: () => 'Requested On',
            cell: (refund) => refund.refund_requested_on ? moment(refund.refund_requested_on).format('MMM DD, YYYY') : '',
        },

        {
            header: () => 'Organizer Remarks',
            cell: (refund) => refund.organizer_remarks ?? '',
        },
        {
            header: () => 'Refund Approved',
            cell: (refund) => refund.refund_approved_amount > 0 ? refund.refund_approved_amount : '',
        },
        {
            header: () => 'Status',
            cell: (refund) => <span className='badge bg-secondary text-capitalize p-2'>{refund?.status ? refund.status : ""}</span>,
        },
        {
            header: () => 'Status Date',
            cell: (refund) => refund.refund_status_date ? moment(refund.refund_status_date).format('MMM DD, YYYY') : '',
        },
        {
            header: () => "Actions",
            cell: (refund) => (
                <div className="hstack gap-4 fs-15 text-center">
                    <Button size="sm" className="link-primary  cursor-pointer" onClick={() => handleShowRefundModal(refund)} >
                        <i className="text-white ri-refund-2-line"></i>
                    </Button>
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
                                data={refundPayments}
                                columns={columns}
                                title="Refund Tickets"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {currentRefund && (<OrganizerRefundModal
                show={showRefundActionModal}
                onCloseClick={() => { setShowRefundActionModal(false) }}
                refund={currentRefund}
            />)}

        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
