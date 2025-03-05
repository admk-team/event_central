import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../../Layouts/Organizer';

import CreateEditModal from './Components/CreateEditModal';
import DeleteModal from '../../../Components/Common/DeleteModal';

import DataTable, { ColumnDef } from '../../../Components/DataTable';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import DeleteManyModal from '../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../Components/HasPermission';

function Index({ events, recurring_types, event_category_types }: any) {

    const [showCreateEditModal, setShowCreateEditModal] = React.useState(false);
    const [editEvent, setEditEvent] = React.useState<any>(null);
    const [deleteUser, setDeleteEvent] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);


    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (event: any) => {
        setEditEvent(event);
        setShowCreateEditModal(true);
    }

    const deleteAction = (event: any) => {
        setDeleteEvent(event);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('organizer.users.destroy', deleteUser.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.users.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof events.data[0]> = [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: (event) => event.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'logo',
            header: () => 'Logo',
            cell: (event) => event.logo,
            enableSorting: false,
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            cell: (event) => event.name,
            enableSorting: true,
        },
        {
            accessorKey: 'description',
            header: () => 'Description',
            cell: (event) => event.description,
            enableSorting: false,
        },
        {
            accessorKey: 'is_recurring',
            header: () => 'Is Recurring',
            cell: (event) => <span className="badge bg-success-subtle text-success">{event.is_recurring}</span>,
            enableSorting: true,
        },
        {
            header: () => 'Action',
            cell: (event) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_users">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(event)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_users">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(event)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title='Events' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Events"
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={events}
                                columns={columns}
                                title="Events"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_users">
                                                <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_users">
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
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    event={editEvent}
                    event_category_types={event_category_types}
                    recurring_types={recurring_types}
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
