import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import Layout from '../../../../../Layouts/Event';
import DataTable, { ColumnDef } from '../../../../../Components/DataTable';
import HasPermission from '../../../../../Components/HasPermission';

function Index({ tickets }: any) {


    const columns: ColumnDef<typeof tickets.data[0]> = [
        {
            header: () => 'ID',
            headerStyle: { width: '70px' },
            cell: (ticket) => ticket.id,
            cellClass: "fw-medium"
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            headerStyle: { width: '200px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (ticket) => ticket.name,
            cellStyle: { width: '200px', textWrap: 'wrap' ,textAlign:'center' },
            searchable: true,
        },
        {
            header: () => 'Price',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (ticket) => ticket.base_price ?? 0,
            cellStyle: { width: '100px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            header: () => 'Session',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center'},
            cell: (ticket) => ticket.selected_sessions.length,
            cellStyle: { width: '150px', textWrap: 'wrap', textAlign:'center' },
            searchable: true,
        },
        {
            header: () => 'Addon',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (ticket) => ticket.selected_addons.length,
            cellStyle: { width: '200px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            header: () => 'Promo Code',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (ticket) => ticket.promo_codes.length,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            header: () => 'Sold ticket',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (ticket) => ticket.sold_tickets.length,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
        },
        {
            header: () => 'Revenue',
            headerStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
            cell: (ticket) => "$ "+ticket.total_revenue,
            cellStyle: { width: '150px', textWrap: 'wrap' ,textAlign:'center' },
        },
        // {
        //     header: () => "Actions",
        //     cell: (session) => (
        //         <div className="hstack gap-4 fs-15 text-center">
        //             <Link title='View attendee details' href={route('organizer.events.attendee.info', { id: attendee.id })} className="link-primary cursor-pointer"><i className="ri-eye-fill"></i></Link>
        //         </div>
        //     ),
        // },
    ];


    return (
        <React.Fragment>
            <Head>
                <title>Tickets Report </title>
                <meta name="description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta name="keywords" content="event attendees, attendee management, conference attendees, admin dashboard" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="attendees Management | Organizer Dashboard" />
                <meta property="og:description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.report.ticket.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Tickets Report" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_ticket_report">
                                <DataTable
                                    data={tickets}
                                    columns={columns}
                                    title="Tickets"
                                    tableLayoutFixed={true}
                                    searchCombinations={[['name']]}
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
