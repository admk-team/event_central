import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Layout from '../../../../Layouts/Event';
// import Pagination2 from '../../../Pages/Admin/';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../../Components/HasPermission';

function Index({ speakers }: any) {
    const [deletespeaker, setDeleteSpeaker] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const { get } = useForm()


    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });


    const editAction = (speaker: any) => {
        get(route('organizer.events.speaker.edit', speaker))
    }
    const deleteAction = (speaker: any) => {
        setDeleteSpeaker(speaker);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        deleteForm.post(route('organizer.events.speaker.destroy', deletespeaker.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.speakers.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof speakers.data[0]> = [
        {
            header: () => 'ID',
            cell: (speaker) => speaker.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Avatar',
            cell: (speaker) => (
                <img src={speaker.avatar} alt={speaker.name} width="50" height="50" className="rounded-circle" />
            ),
        },
        {
            header: () => 'Name',
            cell: (speaker) => speaker.name,
        },
        {
            header: () => 'Company',
            cell: (speaker) => speaker.company,
        },
        {
            header: () => 'Position',
            cell: (speaker) => speaker.position,
        },
        {
            header: () => 'Action',
            cell: (speaker) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_speakers">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(speaker)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_speakers">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(speaker)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];


    return (
        <React.Fragment>
            <Head>
                <title>Speakers Management | Organizer Dashboard</title>
                <meta name="description" content="Manage event speakers, edit details, and delete records from the organizer's dashboard." />
                <meta name="keywords" content="event speakers, speaker management, conference speakers, admin dashboard" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Speakers Management | Organizer Dashboard" />
                <meta property="og:description" content="Manage event speakers, edit details, and delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.speaker.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Speakers" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_speakers">
                                <DataTable
                                    data={speakers}
                                    columns={columns}
                                    title="Speakers"
                                    actions={[
                                        // Delete multiple
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_speakers">
                                                    <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },

                                        // Add new
                                        {
                                            render: (
                                                <HasPermission permission="create_speakers">
                                                    <Link href={route('organizer.events.speaker.create')}><Button><i className="ri-add-fill"></i> Add New</Button></Link>
                                                </HasPermission>
                                            )
                                        },

                                    ]}
                                />
                            </HasPermission>
                        </Col>
                    </Row>
                </Container>
            </div>
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
