import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import Layout from '../../../../../Layouts/Event';
import DataTable, { ColumnDef } from '../../../../../Components/DataTable';
import HasPermission from '../../../../../Components/HasPermission';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ refundPayments }: any) {

    const { t } = useLaravelReactI18n();

    const columns: ColumnDef<typeof refundPayments.data[0]> = [
        {
            header: () => t('ID'),
            headerStyle: { width: '70px' },
            cell: (refund) => refund.id,
            cellClass: "fw-medium"
        },
        {
            // accessorKey: 'name',
            header: () => t('Attendee Name'),
            headerStyle: { width: '200px', textWrap: 'wrap', textAlign: 'center' },
            cell: (refund) => refund?.attendee ? refund?.attendee?.first_name + ' ' + refund?.attendee?.last_name : '',
            cellStyle: { width: '200px', textWrap: 'wrap', textAlign: 'center' },
            // searchable: true,
        },
        {
            header: () => t('Total Amount'),
            headerStyle: { width: '100px', textWrap: 'wrap', textAlign: 'center' },
            cell: (refund) => refund?.attendee_payment ? '$' + refund?.attendee_payment?.amount_paid : 0,
            cellStyle: { width: '100px', textWrap: 'wrap', textAlign: 'center' },
        },
        {
            header: () => t('Payment Method'),
            headerStyle: { width: '100px', textWrap: 'wrap', textAlign: 'center' },
            cell: (refund) => refund?.attendee_payment ? refund?.attendee_payment?.payment_method : '',
            cellStyle: { width: '100px', textWrap: 'wrap', textAlign: 'center' },
        },
        {
            header: () => t('Amount Requested'),
            headerStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            cell: (refund) => "$" + refund.refund_requested_amount,
            cellStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
        },
        {
            header: () => t('Refund Approved'),
            headerStyle: { width: '200px', textWrap: 'wrap', textAlign: 'center' },
            cell: (refund) => refund.refund_approved_amount > 0 ? '$' + refund.refund_approved_amount : 0,
            cellStyle: { width: '200px', textWrap: 'wrap', textAlign: 'center' },
        },
        {
            header: () => t('Status'),
            headerStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            cell: (refund) =>
                <>
                    {refund.status === 'approved' && <span className='w-100 fw-bold text-secondary  text-capitalize p-2'>{refund?.status ? refund.status : ""}</span>}
                    {refund.status === 'rejected' && <span className='w-100 fw-bold text-warning text-dark text-capitalize p-2'>{refund?.status ? refund.status : ""}</span>}
                    {refund.status === 'pending' && <span className='w-100 fw-bold text-primary text-capitalize p-2'>{refund?.status ? refund.status : ""}</span>}
                </>,
            cellStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
        },
        // {
        //     header: () => t("Actions"),
        //     cell: (session) => (
        //         <div className="hstack gap-4 fs-15 text-center">
        //             <Link title={t('View attendee details')} href={route('organizer.events.attendee.info', { id: attendee.id })} className="link-primary cursor-pointer"><i className="ri-eye-fill"></i></Link>
        //         </div>
        //     ),
        // },
    ];

    const handleExport = async () => {
        const url = route('organizer.events.report.export.refund.ticket.data');
        window.location.href = url;
    };
    return (
        <React.Fragment>
            <Head>
                <title>{t("Ticket Refund Report ")}</title>
                <meta name="description" content={t("Manage event attendees, edit details, and delete records from the organizer's dashboard.")} />
                <meta name="keywords" content={t("event attendees, attendee management, conference attendees, admin dashboard")} />
                <meta name="robots" content={t("index, follow")} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={t("attendees Management | Organizer Dashboard")} />
                <meta property="og:description" content={t("Manage event attendees, edit details, and delete records from the organizer's dashboard.")} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.report.refund-ticket.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t("Ticket Refund Report")} pageTitle={t("Dashboard")} />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_refund_ticket_report">
                                <DataTable
                                    data={refundPayments}
                                    columns={columns}
                                    title={t("Refund Tickets")}
                                    tableLayoutFixed={true}
                                    searchCombinations={[['attendee.first_name'], ['attendee.last_name']]}
                                    actions={[
                                        {
                                            render: (dataTable: any) => (
                                                <Button
                                                    variant="outline-primary"
                                                    className="me-2"
                                                    onClick={() => handleExport()}
                                                >
                                                    {t("Export Refund Ticket")}
                                                </Button>

                                            ),
                                            showOnRowSelection: false,
                                        }
                                    ]}
                                />
                            </HasPermission>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
