import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from '../../../Layouts/Organizer';
// import Pagination2 from '../../../Pages/Admin/';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import DeleteManyModal from '../../../Components/Common/DeleteManyModal';

function Index({ speakers }: any) {
    const [deleteTheme, setDeleteSpeaker] = React.useState<any>(null);
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
        get(route('organizer.speaker.edit', speaker))
    }
    const deleteAction = (speaker: any) => {
        setDeleteSpeaker(speaker);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
    
        deleteForm.post(route('organizer.speaker.destroy', deleteTheme.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.speakers.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof speakers.data[0]> = [
        {
            header: () => 'ID',
            cell: (theme) => theme.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Name',
            cell: (theme) => theme.name,
        },
        {
            header: () => 'Company',
            cell: (theme) => theme.company,
        },
        {
            header: () => 'Position',
            cell: (theme) => theme.position,
        },
        {
            header: () => 'Action',
            cell: (theme) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(theme)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(theme)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
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
                <meta property="og:url" content={route('organizer.speaker.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Speakers" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={speakers}
                                columns={columns}
                                title="Speakers"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>,
                                        showOnRowSelection: true,
                                    },

                                    // Add new
                                    {
                                        render: <Link href={route('organizer.speaker.create')}><Button><i className="ri-add-fill"></i> Add New</Button></Link>
                                    },

                                ]}
                            />
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
