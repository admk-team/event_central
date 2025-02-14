import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../../Layouts/Admin';
import CreateEditModal from './Components/CreateEditModal';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';

function Index({ users }: any) {
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editUser, setEditUser] = React.useState<any>(null);
    const [deleteUser, setDeleteUser] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditUser(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
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

    const columns: ColumnDef<typeof users.data[0]> = [
        {
            header: () => 'ID',
            cell: (user) => user.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Name',
            cell: (user) => user.name,
        },
        {
            header: () => 'Email',
            cell: (user) => user.email,
        },
        {
            header: () => 'Role',
            cell: (user) => <span className="badge bg-success-subtle text-success">{user.role}</span>,
        },
        {
            header: () => 'Action',
            cell: (user) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(user)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(user)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
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
                                    {
                                        render: <Button onClick={() => setShowCreateEditModal(true)}>Add New</Button>
                                    }
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
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
