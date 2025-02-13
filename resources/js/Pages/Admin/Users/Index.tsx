import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from '../../../Layouts';
import Pagination from '../../../Components/Common/Pagination';
import Pagination2 from '../../../Components/Common/Pagination2';
import Create from './Components/CreateEditModal';
import CreateModal from './Components/CreateEditModal';
import CreateEditModal from './Components/CreateEditModal';
import DeleteModal from '../../../Components/Common/DeleteModal';

function Index({ users }: any) {
    const [showCreateEditModal, setShowCreateEditModal] = React.useState(false);
    const [editUser, setEditUser] = React.useState<any>(null);
    const [deleteUser, setDeleteUser] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Users" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="card-title">Users</div>
                                    <Button onClick={() => setShowCreateEditModal(true)}>Add New</Button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table className="table-borderless align-middle table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    {/* <th scope="col">Date</th> */}
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.data.map((user: any) => (
                                                    <tr key={user.id}>
                                                        <td className="fw-medium">{user.id}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        {/* <td>10, Nov 2021</td> */}
                                                        <td><span className="badge bg-success-subtle text-success">{user.role}</span></td>
                                                        <td>
                                                            <div className="hstack gap-3 fs-15">
                                                                <span className="link-primary cursor-pointer" onClick={() => editAction(user)}><i className="ri-edit-fill"></i></span>
                                                                <span className="link-danger cursor-pointer" onClick={() => deleteAction(user)}>
                                                                    <i className="ri-delete-bin-5-line"></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    {users.links.length > 3 && (
                                        <Pagination2
                                            links={users.links}

                                        />
                                    )}
                                </div>
                            </div>
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
