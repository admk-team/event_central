import Layout from "../../../../Layouts/Organizer/Event";
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';

function CreateOrEdit({ partner }: any) {
    // Determine if the form is in edit mode
    const isEdit = !!partner;
    const { data, setData, post, processing, errors, reset } = useForm({
        type: partner?.type || "exhibitor",
        company_name: partner?.company_name || "",
        email: partner?.email || "",
        description: partner?.description || "",
        web: partner?.web || "",
        phone: partner?.phone || "",
        address: partner?.address || "",
        exhibitor_logo: null,
        exhibitor_booth_no: partner?.exhibitor_booth_no || "",
        _method: partner?.id ? "PUT" : "POST", // Spoof method
    });


    const submit = (e: any) => {
        e.preventDefault();
        if (isEdit) {
            post(route('organizer.events.partner.update', partner.id))
        } else {
            post(route('organizer.events.partner.store'));
            console.log('testing ', errors);

        }
    };

    return (
        <React.Fragment>
            <Head title={isEdit ? 'Edit partner' : 'Create partner'} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={isEdit ? 'Edit partner' : 'Create partner'} pageTitle="Dashboard" />
                    <Row>
                        <Card className="mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-title">{isEdit ? 'Edit partner' : 'Create partner'}</div>
                            </div>
                            <Card.Body>
                                <div className="card-body">
                                    <form onSubmit={submit} >
                                        <Row className="gy-4">
<col>

</col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Company Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="company_name"
                                                        placeholder="Enter company name"
                                                        value={data.company_name}
                                                        onChange={(e) => setData('company_name', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.company_name} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Enter email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.email} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Phone</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        className="form-control"
                                                        id="phone"
                                                        placeholder="Enter phone"
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.phone} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="address"
                                                        placeholder="Enter address"
                                                        value={data.address}
                                                        onChange={(e) => setData('address', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.address} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="description"
                                                        placeholder="Enter description"
                                                        value={data.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.description} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Web</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="web"
                                                        placeholder="Enter web"
                                                        value={data.web}
                                                        onChange={(e) => setData('web', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.web} </Form.Control.Feedback>

                                                </div>
                                            </Col>





                                        </Row>

                                        <div className="mt-4 text-center ">
                                            <Button type="submit" className="btn btn-success px-3" disabled={processing}>
                                                {isEdit ? 'Update' : 'Create'}
                                            </Button>
                                        </div>

                                    </form>

                                </div>

                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

CreateOrEdit.layout = (page: any) => <Layout children={page} />;

export default CreateOrEdit;