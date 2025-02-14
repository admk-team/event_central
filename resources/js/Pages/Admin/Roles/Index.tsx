
import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, useForm, Link } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from '../../../Layouts';
import Pagination from '../../../Components/Common/Pagination';
import DeleteModal from '../../../Components/Common/DeleteModal';

function Index({ roles }: any) {
    const [deleteRole, setDeleteRole] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const editAction = (role: any) => {
        // setEditRole(role);
        // setShowCreateEditModal(true);
    }

    const deleteAction = (role: any) => {
        setDeleteRole(role);
        setShowDeleteConfirmation(true);
    }

    const createAction = () => {

    }

    const handleDelete = () => {
        deleteForm.post(route('admin.roles.destroy', deleteRole.id));
        setShowDeleteConfirmation(false);
    }

    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Roles" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="card-title">Roles</div>
                                    <Link href="/admin/roles/create"><Button>Add New</Button></Link>

                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table className="table-borderless align-middle table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roles.data.map((role: any) => (
                                                    <tr key={role.id}>
                                                        <td className="fw-medium">{role.id}</td>
                                                        <td>{role.name}</td>
                                                        <td>
                                                            <div className="hstack gap-3 fs-15">
                                                                <Link href={route('admin.roles.edit', role.id)}><span className="link-primary cursor-pointer"><i className="ri-edit-fill"></i></span></Link>
                                                                <span className="link-danger cursor-pointer" onClick={() => deleteAction(role)}>
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
                                    {roles.links.length > 3 && (
                                        <Pagination
                                            links={roles.links}

                                        />
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

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
