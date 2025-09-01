import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from "../../../Layouts/Attendee"
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import RefundTicketModal from './RefundTicketModal';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useLaravelReactI18n } from "laravel-react-i18n";

function RefundTickets({ payments, getCurrency }: any) {

    console.log(payments);
    const { t } = useLaravelReactI18n();

    const [showRefundModal, setShowRefundModal] = useState(false);
    const [currentPayment, setCurrentPayment] = useState<any>(null);

    const refundAction = (payment: any) => {
        console.log(payment);

        if (payment.refund_tickets && payment.refund_tickets?.status.length > 0) {
            toast.error(t('Refund request has already been submitted to event organizer'));
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
            header: () => t('ID'),
            cell: (payment) => payment.id,
            cellClass: "fw-medium"
        },
        {
            header: () => t('Total Amount'),
            cell: (payment) => getCurrency.currency_symbol + " " + payment.amount_paid,
        },
        {
            header: () => t('Payment Status'),
            cell: (payment) => <span className='rounded-pill badge bg-secondary text-capitalize p-2 w-100'>{payment.status}</span>,
        },
        {
            header: () => t('Payment Method'),
            cell: (payment) => <span className='text-capitalize p-20'>{payment.payment_method}</span>,
        },
        {
            header: () => t('Payment Date'),
            cell: (payment) => payment.created_at ? moment(payment.created_at).format('MMM DD, YYYY') : '',
        },
        {
            header: () => t('Refund Type'),
            cell: (payment) => (
                <>
                    {payment.refund_tickets?.refund_type === 'all_tickets' && <span>{t('All Tickets')}</span>}
                </>
            ),
        },
        {
            header: () => t('Amount Requested'),
            cell: (payment) => (payment.refund_tickets && payment.refund_tickets?.refund_requested_amount > 0 ? getCurrency.currency_symbol + " " : "") + (payment.refund_tickets?.refund_requested_amount ?? ''),
        },
        {
            header: () => t('Refund Reason'),
            cell: (payment) => payment.refund_tickets?.refund_reason ?? '',
        },
        {
            header: () => t('Requested On'),
            cell: (payment) => payment.refund_tickets ? moment(payment.refund_tickets?.refund_requested_on).format('MMM DD, YYYY') : '',
        },
        {
            header: () => t('Refund Status'),
            cell: (payment) => (
                <>
                    {payment.refund_tickets && payment.refund_tickets?.status === 'approved' && <span className='rounded-pill badge bg-secondary text-capitalize p-2 w-100'>{payment.refund_tickets?.status ?? ''}</span>}
                    {payment.refund_tickets && payment.refund_tickets?.status === 'rejected' && <span className='rounded-pill badge bg-warning text-dark text-capitalize p-2 w-100'>{payment.refund_tickets?.status ?? ''}</span>}
                </>
            ),
        },
        {
            header: () => t('Refund Status Date'),
            cell: (payment) => payment.refund_tickets && payment.refund_tickets?.refund_status_date ? moment(payment.refund_tickets?.refund_status_date).format('MMM DD, YYYY') : '',
        },
        {
            header: () => t('Organizer Remarks'),
            cell: (payment) => payment.refund_tickets?.organizer_remarks ?? '',
        },
        {
            header: () => t("Actions"),
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
                <title>{t('Refund Ticket ')}</title>
                <meta name="description" content={t("Manage event attendees, edit details, and delete records from the organizer's dashboard.")} />
                <meta name="keywords" content={t('event attendees, attendee management, conference attendees, admin dashboard')} />
                <meta name="robots" content={t('index, follow')} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={t('attendees Management | Organizer Dashboard')} />
                <meta property="og:description" content={t("Manage event attendees, edit details, and delete records from the organizer's dashboard.")} />
                <meta property="og:type" content={t('website')} />
                <meta property="og:url" content={route('organizer.events.attendees.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t("Attendees")} pageTitle={t("Dashboard")} />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={payments}
                                columns={columns}
                                title={t("Refund Tickets")}
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
