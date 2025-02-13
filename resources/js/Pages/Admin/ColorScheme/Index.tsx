import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from '../../../Layouts';
import Pagination2 from '../../../Components/Common/Pagination2';


function Index({ colorschemes }: any) {
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
        deleteForm.post(route('admin.users.destroy', deleteUser.id));
        setShowDeleteConfirmation(false);
    }

    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Thems" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="card-title">Themes</div>
                                    <Link href={route('admin.scheme.create')}><Button >Add New</Button></Link> 
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table className="table-borderless align-middle table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Background Color</th>
                                                    <th scope="col">Header Background Color</th>
                                                    <th scope="col">Navigation Background Color</th>
                                                    <th scope="col">Card Background Color</th>
                                                    <th scope="col">Primary Color</th>
                                                    <th scope="col">Secondary Color</th>
                                                    <th scope="col">Footer Color</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {colorschemes.data.map((color: any) => (
                                                    <tr key={color.event_id}>
                                                        <td className="fw-medium">{color.event_id}</td>
                                                        <td>{color.title}</td>
                                                        <td>{color.bg_color}</td>
                                                        <td>{color.header_bg_color}</td>
                                                        <td>{color.nav_bg_color}</td>
                                                        <td>{color.card_bg_color}</td>
                                                        <td>{color.primary_color}</td>
                                                        <td>{color.secondary_color}</td>
                                                        <td>{color.footer_color}</td>
                                                        <td>
                                                            <div className="hstack gap-3 fs-15">
                                                                <span className="link-primary cursor-pointer" onClick={() => editAction(color)}>
                                                                    <i className="ri-edit-fill"></i>
                                                                </span>
                                                                <span className="link-danger cursor-pointer" onClick={() => deleteAction(color)}>
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
                                    {colorschemes.links.length > 3 && (
                                        <Pagination2
                                            links={colorschemes.links}

                                        />
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
