import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import Layout from '../../../../../Layouts/Organizer/Event';
// import Pagination2 from '../../../Pages/Admin/';
import DeleteModal from '../../../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../../../Components/DataTable';
import DeleteManyModal from '../../../../../Components/Common/DeleteManyModal';
import CreateEditModal from './Component/CreateEditModal';

function Index({ newsfeeds }: any) {
    const [deleteNewsfeed, setDeleteNewsfeed] = React.useState<any>(null);
    const [editPost, setEditPost] = React.useState<any>(null);
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

    const [addNewsfeedModal, setAddNewsfeedModal] = useState(false);
    function showModal() {
        setAddNewsfeedModal(!addNewsfeedModal);
    }

    const editAction = (newsfeed: any) => {
        setEditPost(newsfeed);
        console.log('post', newsfeed);
        showModal();
    }
    const deleteAction = (newsfeed: any) => {
        setDeleteNewsfeed(newsfeed);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {

        deleteForm.post(route('organizer.events.engagement.newsfeed.destroy', deleteNewsfeed.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.engagement.newsfeed.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof newsfeeds.data[0]> = [
        {
            header: () => 'ID',
            cell: (newsfeed) => newsfeed.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Image',
            cell: (newsfeed) => (
                <img src={newsfeed.img} alt={newsfeed.name} width="50" height="50" />
            ),
        },
        {
            header: () => 'Title',
            cell: (newsfeed) => newsfeed.title,
        },
        {
            header: () => 'Content',
            cell: (newsfeed) => newsfeed.content,
        },
        {
            header: () => 'Send Notification',
            cell: (newsfeed) => newsfeed.send_notification ? 'Yes' : 'No',
        },
        {
            header: () => 'Sending Date',
            cell: (newsfeed) => newsfeed.sending_date,
        },
        {
            header: () => 'Sending Time',
            cell: (newsfeed) => newsfeed.sending_time,
        },
        {
            header: () => 'Action',
            cell: (newsfeed) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(newsfeed)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(newsfeed)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];


    return (
        <React.Fragment>
            <Head>
                <title>Newsfeed | Organizer Dashboard</title>
                <meta name="description" content="Manage event Newsfeeds, edit details, and delete records from the organizer's dashboard." />
                <meta name="keywords" content="event Newsfeeds, Newsfeed management, conference Newsfeeds, admin dashboard" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Newsfeed | Organizer Dashboard" />
                <meta property="og:description" content="Manage event Newsfeeds, edit details, and delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.engagement.newsfeed.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Newsfeed" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={newsfeeds}
                                columns={columns}
                                title="Newsfeed"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>,
                                        showOnRowSelection: true,
                                    },

                                    // Add new
                                    {
                                        render: <Button className='btn btn-primary' onClick={() => showModal()}><i className="ri-login-box-line"></i> Add New</Button>
                                    }

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
            {addNewsfeedModal && <CreateEditModal addNewsfeedModal={addNewsfeedModal} showModal={showModal} editPost={editPost} />}
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
