import React, { useState } from 'react';
import { Badge, Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from "../../../Layouts/Attendee"
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import moment from 'moment';
import CopyTextBox from '../../../Components/CopyTextBox';
import JoinLiveStream from './JoinLiveStream';
import { useLaravelReactI18n } from "laravel-react-i18n";

function RefundTickets({ liveStreams }: any) {

    console.log(liveStreams);
    const { t } = useLaravelReactI18n();

    const columns: ColumnDef<typeof liveStreams.data[0]> = [
        {
            accessorKey: 'id',
            header: () => t('ID'),
            cell: (liveStream) => liveStream.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'ticket',
            header: () => t('Ticket Purchased'),
            cell: (liveStream) => liveStream?.event_tickets?.name ?? '—',
            enableSorting: true,
        },
        {
            accessorKey: 'title',
            header: () => t('Title'),
            cell: (liveStream) => liveStream.title,
            enableSorting: true,
        },
        {
            accessorKey: 'resolution',
            header: () => t('Resolution'),
            cell: (liveStream) => liveStream.resolution,
        },
        {
            accessorKey: 'start_time',
            header: () => t('Start Time'),
            cell: (liveStream) => liveStream.start_time ? moment(liveStream.start_time).format('DD MMM YYYY, HH:mm') : '',
        },
        {
            accessorKey: 'status',
            header: () => t('Status'),
            cell: (liveStream) => {
                switch (liveStream.status) {
                    case 'created':
                        return <Badge bg="secondary" className="fs-6">{t('Up Coming')}</Badge>;
                    case 'preparing':
                        return <Badge bg="success" className="fs-6">{t('Live')}</Badge>;
                    case 'completed':
                        return <Badge bg="info" className="fs-6">{liveStream.status}</Badge>;
                }
            },
        },
        {
            header: () => t('Action'),
            cell: (liveStream) => (
                <div className="hstack gap-3 fs-15">
                    {(liveStream.status === 'preparing' || liveStream.status === 'started') && (
                        <Link
                            href={route('join.live.streams', liveStream.id)}
                            className='btn btn-secondary'
                        >
                            {t('Join')}
                        </Link>
                    )}
                </div>
            ),
        },
    ];


    return (
        <React.Fragment>
            <Head>
                <title>{t('Live Streams | Attendee Dashboard')}</title>
                <meta name="description" content={t('Join and watch live event streams directly from the attendee dashboard.')} />
                <meta name="keywords" content={t('live streams, event streams, attendee live streaming, conference live')} />
                <meta name="robots" content={t('index, follow')} />

                <meta property="og:title" content={t('Live Streams | Attendee Dashboard')} />
                <meta property="og:description" content={t('Join and watch live event streams directly from the attendee dashboard.')} />
                <meta property="og:type" content={t('website')} />
                <meta property="og:url" content={route('stream.index')} />
            </Head>


            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t('Attendees')} pageTitle={t('Dashboard')} />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={liveStreams}
                                columns={columns}
                                title={t('Live Streams')}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

RefundTickets.layout = (page: any) => <Layout children={page} />;

export default RefundTickets;
