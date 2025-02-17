import Layout from "../../../Layouts/Admin";
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';


function CreateOrEdit({ colorTheme }: any) {
    // Determine if the form is in edit mode
    const isEdit = !!colorTheme;
    const { data,put, setData, post, processing, errors, reset } = useForm({
        event_id: colorTheme?.event_id || 1,
        title: colorTheme?.title || "",
        bg_color: colorTheme?.bg_color || "#364574",
        header_bg_color: colorTheme?.header_bg_color || "#364574",
        nav_bg_color: colorTheme?.nav_bg_color || "#364574",
        card_bg_color: colorTheme?.card_bg_color || "#364574",
        primary_color: colorTheme?.primary_color || "#364574",
        secondary_color: colorTheme?.secondary_color || "#364574",
        footer_color: colorTheme?.footer_color || "#364574",
        _method: colorTheme?.id ? "PUT" : "POST", // Spoof method
    });
    const submit = (e: any) => {
        e.preventDefault();
        console.log(data);
        if (isEdit) {
            post(route('admin.color-themes.update', colorTheme.id))
        }
        else{
        post(route('admin.color-themes.store'));
        }
    };
    return (
        <React.Fragment>
            <Head title={isEdit ? 'Edit Color Theme' : 'Create Color Theme'} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={isEdit ? 'Edit Color Theme' : 'Create Color Theme'} pageTitle="Dashboard" />
                    <Row>
                        <Card className="mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-title">{isEdit ? 'Edit Theme' : 'Create Theme'}</div>
                            </div>
                            <Card.Body>
                                <div className="card-body">
                                    <form onSubmit={submit}>
                                        <Row className="gy-4">

                                            <Col xxl={3} md={6}>
                                                <div className="mb-3">
                                                    <Form.Label htmlFor="title" className="form-label">Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="title"
                                                        placeholder="Enter title"
                                                        value={data.title}
                                                        onChange={(e) => setData('title', e.target.value)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="bg_color" className="form-label">Background Color</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        className="form-control form-control-color w-100"
                                                        id="bg_color"
                                                        value={data.bg_color}
                                                        onChange={(e) => setData('bg_color', e.target.value)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="header_bg_color" className="form-label">Header Background Color</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        className="form-control form-control-color w-100"
                                                        id="header_bg_color"
                                                        value={data.header_bg_color}
                                                        onChange={(e) => setData('header_bg_color', e.target.value)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="nav_bg_color" className="form-label">Navigation Background Color</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        className="form-control form-control-color w-100"
                                                        id="nav_bg_color"
                                                        value={data.nav_bg_color}
                                                        onChange={(e) => setData('nav_bg_color', e.target.value)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="card_bg_color" className="form-label">Card Background Color</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        className="form-control form-control-color w-100"
                                                        id="card_bg_color"
                                                        value={data.card_bg_color}
                                                        onChange={(e) => setData('card_bg_color', e.target.value)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="primary_color" className="form-label">Primary Color</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        className="form-control form-control-color w-100"
                                                        id="primary_color"
                                                        value={data.primary_color}
                                                        onChange={(e) => setData('primary_color', e.target.value)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="secondary_color" className="form-label">Secondary Color</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        className="form-control form-control-color w-100"
                                                        id="secondary_color"
                                                        value={data.secondary_color}
                                                        onChange={(e) => setData('secondary_color', e.target.value)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Form.Label htmlFor="footer_color" className="form-label">Footer Color</Form.Label>
                                                    <Form.Control
                                                        type="color"
                                                        className="form-control form-control-color w-100"
                                                        id="footer_color"
                                                        value={data.footer_color}
                                                        onChange={(e) => setData('footer_color', e.target.value)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <Form.Label htmlFor="event_select" className="form-label">Select Event</Form.Label>
                                                <select
                                                    className="form-select mb-3"
                                                    id="event_select"
                                                    aria-label="Select event"
                                                    value={data.event_id}
                                                    onChange={(e) => setData('event_id', e.target.value)}
                                                >
                                                    <option>Select your Event</option>
                                                    <option value="1">Declined Payment</option>
                                                    <option value="2">Delivery Error</option>
                                                    <option value="3">Wrong Amount</option>
                                                </select>
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
// CreateOrEdit.layout = (page: any) => <Layout children={page} />;

// export default CreateOrEdit;
CreateOrEdit.layout = (page: any) => <Layout children={page} />;

export default CreateOrEdit;