import Layout from "../../../Layouts";
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';


function CreateOrEdit() {
    const { data, setData, post, processing, errors, reset } = useForm({
        "event_id": 1,
        "title": "",
        "bg_color": "",
        "header_bg_color": "",
        "nav_bg_color": "",
        "card_bg_color": "",
        "primary_color": "",
        "secondary_color": "",
        "footer_color": ""
    });
    const submit = (e: any) => {
        e.preventDefault();
        console.log(data);

        // post(route('login'));
    };
    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Color Themes" pageTitle="Dashboard" />
                    <Row>
                        <Card className="mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-title">Themes</div>
                                <Link href={route('admin.scheme.store')}><Button >Create</Button></Link>
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
                                                        defaultValue="#364574"
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
                                                        defaultValue="#364574"
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
                                                        defaultValue="#364574"
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
                                                        defaultValue="#364574"
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
                                                        defaultValue="#364574"
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
                                                        defaultValue="#364574"
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
                                                        defaultValue="#364574"
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
                                                // onChange={(e) => setData('event_select', e.target.value)}
                                                >
                                                    <option>Select your Event</option>
                                                    <option value="1">Declined Payment</option>
                                                    <option value="2">Delivery Error</option>
                                                    <option value="3">Wrong Amount</option>
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xxl={3} md={6}>
                                            <div className="mt-4">
                                                <Button type="submit" className="btn btn-success w-100" disabled={processing}>
                                                    Create
                                                </Button>
                                            </div>
                                            </Col>
                                        </Row>
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