import React, { useState } from 'react';
import { Badge, Button, Col, Container, Form, InputGroup, Row, Table, Spinner } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import BreadCrumb2 from '../../../../Components/Common/BreadCrumb2';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../../Components/HasPermission';
import CreateEditModal from './Components/CreateEditModal';
import CopyTextBox from '../../../../Components/CopyTextBox';
import moment from 'moment';

function Index({ liveStreams, eventTickets }: any) {
    console.log("live stream", liveStreams);
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editLiveStream, setEditLiveStream] = React.useState<any>(null);
    const [deleteLiveStream, setDeleteLiveStream] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditLiveStream(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (liveStream: any) => {
        setEditLiveStream(liveStream);
        setShowCreateEditModal(true);
    }

    const deleteAction = (liveStream: any) => {
        setDeleteLiveStream(liveStream);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('organizer.events.live-streams.destroy', deleteLiveStream.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.live-streams.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof liveStreams.data[0]> = [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: (liveStream) => liveStream.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'ticket',
            header: () => 'Ticket',
            cell: (liveStream) => liveStream?.event_tickets?.name ?? '—',
            enableSorting: true,
        },
        {
            accessorKey: 'title',
            header: () => 'Title',
            cell: (liveStream) => liveStream.title,
            enableSorting: true,
        },
        {
            accessorKey: 'stream_key',
            header: () => 'Stream Key',
            cell: (liveStream) => <CopyTextBox text={liveStream.stream_key} />,
        },
        // {
        //     accessorKey: 'live_asset_id',
        //     header: () => 'Live Asset Id',
        //     cell: (liveStream) => liveStream.live_asset_id,
        // },
        // {
        //     accessorKey: 'live_video_source_id',
        //     header: () => 'Live Video Source Id',
        //     cell: (liveStream) => liveStream.live_video_source_id,
        // },
        {
            accessorKey: 'resolution',
            header: () => 'Resolution',
            cell: (liveStream) => liveStream.resolution,
        },
        {
            accessorKey: 'stream_url',
            header: () => 'Stream Url',
            cell: (liveStream) => <CopyTextBox text={liveStream.stream_url} />,
        },
        {
            accessorKey: 'playback_url',
            header: () => 'Playback Url',
            cell: (liveStream) => <CopyTextBox text={liveStream.playback_url} />,
        },
        {
            accessorKey: 'start_time',
            header: () => 'Start Time',
            cell: (liveStream) => liveStream.start_time ? moment(liveStream.start_time).format('DD MMM YYYY, HH:mm') : '',
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            cell: (liveStream) => {
                switch (liveStream.status) {
                    case 'created':
                        return <Badge bg="secondary" className="fs-6">{liveStream.status}</Badge>;
                    case 'started':
                        return <Badge bg="success" className="fs-6">{liveStream.status}</Badge>;
                    case 'completed':
                        return <Badge bg="info" className="fs-6">{liveStream.status}</Badge>;
                }
            },
        },
        {
            header: () => 'Action',
            cell: (liveStream) => (
                <div className="hstack gap-3 fs-15">
                    {liveStream.status === 'created' && (
                        <HasPermission permission="edit_live_streams">
                            <StartStreamButton liveStream={liveStream} />
                        </HasPermission>
                    )}
                    {(liveStream.status === 'preparing' || liveStream.status === 'started') && (
                        <HasPermission permission="edit_live_streams">
                            <EndStreamButton liveStream={liveStream} />
                        </HasPermission>
                    )}
                    <HasPermission permission="edit_live_streams">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(liveStream)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_live_streams">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(liveStream)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title='Live Streams' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Live Streams"
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={liveStreams}
                                columns={columns}
                                title="Live Streams"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_live_streams">
                                                <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_live_streams">
                                                <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> Add New</Button>
                                            </HasPermission>
                                        )
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {showCreateEditModal && (
                <CreateEditModal
                    show={showCreateEditModal}
                    onHide={() => setShowCreateEditModal(false)}
                    liveStream={editLiveStream}
                    eventTickets={eventTickets}
                />
            )}

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => { setShowDeleteConfirmation(false) }}
            />

            <DeleteManyModal
                show={showDeleteManyConfirmation}
                onDeleteClick={handleDeleteMany}
                onCloseClick={() => { setShowDeleteManyConfirmation(false) }}
            />
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;


function StartStreamButton({ liveStream }: any) {
    const { post, processing } = useForm({
        id: liveStream.id,
    });

    const startStream = (id: number) => {
        post(route('organizer.events.live-streams.start'), {
            preserveScroll: true,
        })
    }

    return (
        <Button size="sm" onClick={() => startStream(liveStream.id)} disabled={processing}>
            {processing ? (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            ) : 'Start'}
        </Button>
    )
}

function EndStreamButton({ liveStream }: any) {
    const { get, processing } = useForm();

    const endStream = (id: number) => {
        get(route('organizer.events.live-streams.status', liveStream.id), {
            preserveScroll: true,
        })
    }

    return (
        <Button size="sm" onClick={() => endStream(liveStream.id)} disabled={processing}>
            {processing ? (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            ) : 'End'}
        </Button>
    )
}
