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

function Index({ users }: any) {
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editUser, setEditUser] = React.useState<any>(null);
    const [deleteUser, setDeleteUser] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditUser(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (user: any) => {
        setEditUser(user);
        setShowCreateEditModal(true);
    }

    const deleteAction = (user: any) => {
        setDeleteUser(user);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('admin.users.destroy', deleteUser.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({...data, ids: ids}));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('admin.users.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof users.data[0]> = [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: (user) => user.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            cell: (user) => user.name,
            enableSorting: true,
        },
        {
            accessorKey: 'email',
            header: () => 'Email',
            cell: (user) => user.email,
            enableSorting: true,
        },
        {
            accessorKey: 'role',
            header: () => 'Role',
            cell: (user) => <span className="badge bg-success-subtle text-success">{user.roles[0]?.name}</span>,
            enableSorting: true,
        },
        {
            header: () => 'Action',
            cell: (user) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_users">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(user)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_users">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(user)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title='Users - Admin' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2 
                        title="Users"
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={users}
                                columns={columns}
                                title="Users"
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
                    user={editUser}
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
