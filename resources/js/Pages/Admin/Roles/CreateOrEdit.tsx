import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, useForm, Link } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import Layout from '../../../Layouts';

function CreateOrEdit({ role, permissions }: { role: any | null, permissions: any }) {
    const isEdit = role != null ? true : false;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: role?.name ?? '',
        permissions: role?.permissions ?? '',
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.users.update', role.id), {
                preserveScroll: true,
                onSuccess: () => {
                }
            });
        } else {
            post(route('admin.users.store'), {
                preserveScroll: true,
                onSuccess: () => {
                }
            });
        }
    }
    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="RoleManagement" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="card-title">Create Role</div>
                                </div>
                                <div className="card-body">
                                    <Form onSubmit={submit} className="tablelist-form">
                                        <FormGroup className="mb-3">
                                            <Form.Label className="form-label">Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                value={data.name}
                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                isInvalid={!!errors.name}
                                            />
                                            {errors.name && (
                                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                            )}
                                        </FormGroup>
                                    </Form>
                                </div>
                                <div className="card-footer">

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
CreateOrEdit.layout = (page: any) => <Layout children={page} />;
export default CreateOrEdit;
