import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import Layout from '../../../../../Layouts/Event';
import DataTable, { ColumnDef } from '../../../../../Components/DataTable';
import HasPermission from '../../../../../Components/HasPermission';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ tickets }: any) {

    const { t } = useLaravelReactI18n();

    const columns: ColumnDef<typeof tickets.data[0]> = [
        {
            header: () => t("ID"),
            headerStyle: { width: '70px' },
            cell: (ticket) => ticket.id,
            cellClass: "fw-medium"
        },
        {
            accessorKey: 'name',
            header: () => t("Name"),
            headerStyle: { width: '200px', textWrap: 'wrap', textAlign: 'center' },
            cell: (ticket) => ticket.name,
            cellStyle: { width: '200px', textWrap: 'wrap', textAlign: 'center' },
            searchable: true,
        },
        {
            header: () => t("Price"),
            headerStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            cell: (ticket) => ticket.base_price ?? 0,
            cellStyle: { width: '100px', textWrap: 'wrap', textAlign: 'center' },
        },
        {
            header: () => t("Session"),
            headerStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            cell: (ticket) => ticket.selected_sessions.length,
            cellStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            searchable: true,
        },
        {
            header: () => t("Addon"),
            headerStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            cell: (ticket) => ticket.selected_addons.length,
            cellStyle: { width: '200px', textWrap: 'wrap', textAlign: 'center' },
        },
        {
            header: () => t("Promo Code"),
            headerStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            cell: (ticket) => ticket.promo_codes.length,
            cellStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
        },
        {
            header: () => t("Sold ticket"),
            headerStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            cell: (ticket) => ticket.sold_tickets.length,
            cellStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
        },
        {
            header: () => t("Revenue"),
            headerStyle: { width: '150px', textWrap: 'wrap', textAlign: 'center' },
            cell: (ticket) => "$ " + ticket.total_revenue,
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
        const url = route('organizer.events.report.export.ticket.data');
        window.location.href = url;
    };
    return (
        <React.Fragment>
            <Head>
                <title>{t("Tickets Report ")}</title>
                <meta name="description" content={t("Manage event attendees, edit details, and delete records from the organizer's dashboard.")} />
                <meta name="keywords" content={t("event attendees, attendee management, conference attendees, admin dashboard")} />
                <meta name="robots" content={t("index, follow")} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={t("attendees Management | Organizer Dashboard")} />
                <meta property="og:description" content={t("Manage event attendees, edit details, and delete records from the organizer's dashboard.")} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.report.ticket.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t("Tickets Report")} pageTitle={t("Dashboard")} />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_ticket_report">
                                <DataTable
                                    data={tickets}
                                    columns={columns}
                                    title={t("Tickets")}
                                    tableLayoutFixed={true}
                                    searchCombinations={[['name']]}
                                    actions={[
                                        {
                                            render: (dataTable: any) => (
                                                <Button
                                                    variant="outline-primary"
                                                    className="me-2"
                                                    onClick={() => handleExport()}
                                                >
                                                    {t("Export Ticket")}
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
