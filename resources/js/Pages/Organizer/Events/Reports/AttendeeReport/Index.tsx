import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import Layout from '../../../../../Layouts/Event';
import DataTable, { ColumnDef } from '../../../../../Components/DataTable';
import HasPermission from '../../../../../Components/HasPermission';
import { exportToCSV } from '../../../../../Components/ExportToCSV';

function Index({ attendees }: any) {


    const columns: ColumnDef<typeof attendees.data[0]> = [
        {
            exportValue: (attendee) => attendee.id,
            header: () => 'ID',
            headerStyle: { width: '70px' },
            cell: (attendee) => attendee.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Avatar',
            headerStyle: { width: '90px' },
            cell: (attendee) => (
                <img src={attendee.avatar_img} alt={attendee.name} width="50" height="50" className="rounded-circle" />
            ),
            exportable: false,
        },
        {
            accessorKey: 'first_name',
            header: () => 'First Name',
            headerStyle: { width: '100px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.first_name,
            cellStyle: { width: '100px', textWrap: 'wrap' ,textAlign:'center' },
            searchable: true,
        },
        {
            accessorKey: 'last_name',
            header: () => 'Last Name',
            headerStyle: { width: '100px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.last_name,
            cellStyle: { width: '100px', textWrap: 'wrap' ,textAlign:'center' },
            searchable: true,
        },
        {
            accessorKey: 'email',
            header: () => 'Email',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.email,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            searchable: true,
        },
        {
            accessorKey: 'position',
            header: () => 'Position',
            headerStyle: { width: '200px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.position,
            cellStyle: { width: '200px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            exportValue: (attendee) => attendee.attendee_event_sessions.length,
            header: () => 'Sessions',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.attendee_event_sessions.length,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            exportValue: (attendee) => attendee.attendee_fav_session.length,
            header: () => 'Favorite Sessions',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.attendee_fav_session.length,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            exportValue: (attendee) => attendee.event_selected_sessions.length,
            header: () => 'Selected Sessions',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.event_selected_sessions.length,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            accessorKey: 'payments',
            header: () => 'Payments',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.payments.length,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            exportValue: (attendee) => attendee.attendee_purchased_tickets.length,
            header: () => 'Tickets',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (attendee) => attendee.attendee_purchased_tickets.length,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            header: () => "Actions",
            cell: (attendee) => (
                <div className="hstack gap-4 fs-15 text-center">
                    <Link title='View attendee details' href={route('organizer.events.attendee.info', { id: attendee.id })} className="link-primary cursor-pointer"><i className="ri-eye-fill"></i></Link>
                </div>
            ),
            exportable: false,
        },
    ];

    const handleExport = async () => {
        const url = route('organizer.events.report.export.attendee.data');
        window.location.href = url;
    };

    return (
        <React.Fragment>
            <Head>
                <title>Attendees Report </title>
                <meta name="description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta name="keywords" content="event attendees, attendee management, conference attendees, admin dashboard" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="attendees Management | Organizer Dashboard" />
                <meta property="og:description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.report.attendee.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Attendees Report" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_attendee_report">
                                <DataTable
                                    data={attendees}
                                    columns={columns}
                                    title="Attendees"
                                    tableLayoutFixed={true}
                                    searchCombinations={[['first_name', 'last_name']]}
                                    actions={[
                                        // Delete multiple
                                        // {
                                        //     render: (dataTable) => (
                                        //         <HasPermission permission="delete_attendees">
                                        //             <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                        //         </HasPermission>
                                        //     ),
                                        //     showOnRowSelection: true,
                                        // },
                                        {
                                            render: (dataTable: any) => (
                                                <Button
                                                    variant="outline-primary"
                                                    className="me-2"
                                                    onClick={() => handleExport()}
                                                >
                                                    Export Attendee
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
