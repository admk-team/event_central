import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import Flatpickr from "react-flatpickr";
import { Button, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';


interface CreateModalProps {
    addEventModal: boolean;
    showModal: () => void;
}
function CreateModal({ addEventModal, showModal }: CreateModalProps) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        start_date: "",
        end_date: "",
        description: "",
        location_type: "",
        location_base: "",
        type: 'in-person',
        schedual_type: '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route('organizer.events.store'));

        console.log('data ', data);
        console.log('testing ', errors);
    }


    return (
        <Modal className='modal-dialog-centered' centered show={addEventModal} onHide={() => showModal()} backdrop={'static'}>
            <Modal.Header>
                <h5 className="modal-title" id="staticBackdropLabel">Create Event</h5>
                <Button type="button" className="btn-close"
                    onClick={() => {
                        showModal();
                    }} aria-label="Close"></Button>
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <form onSubmit={submit}>
                    <Row className="gy-3">
                        <Col md={12}>
                            <div className="">
                                <Form.Label htmlFor="name" className="form-label text-start w-100">Event Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.name} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="">
                                <Form.Label htmlFor="name" className="form-label text-start w-100">Start Date</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d M, Y"
                                    }}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            start_date: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                        }))
                                    }
                                    }
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.start_date} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="">
                                <Form.Label htmlFor="name" className="form-label text-start w-100">End Date</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d M, Y"
                                    }}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            end_date: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                        }))
                                    }
                                    }
                                />
                                < Form.Control.Feedback type="invalid" className='d-block mt-2' > {errors.end_date} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <Col>
                            <Tab.Container defaultActiveKey="2">
                                <Nav className="nav-tabs nav-justified mb-3">
                                    <Nav.Item
                                        onClick={() => setData('type', 'virtual')}>
                                        <Nav.Link eventKey="1">
                                            Virtual Event
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item
                                        onClick={() => setData('type', 'in-person')}>
                                        <Nav.Link eventKey="2">
                                            In-Person Event
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content className="text-muted">
                                    <Tab.Pane eventKey="1" id="base-justified-home">
                                        <div className="">
                                            <Form.Label htmlFor="virtual-location" className="form-label text-start w-100">Location</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="virtual-location"
                                                placeholder="Where does your event take place?"
                                                value={data.location_base}
                                                onChange={(e) => setData('location_base', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.location_base} </Form.Control.Feedback>
                                        </div>

                                    </Tab.Pane>

                                    <Tab.Pane eventKey="2" id="product">
                                        <div className="">
                                            <Form.Label htmlFor="in-person-location" className="form-label text-start w-100">Location</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="in-person-location"
                                                placeholder="Country used for default timezone"
                                                value={data.location_base}
                                                onChange={(e) => setData('location_base', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.location_base} </Form.Control.Feedback>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Col>
                        <Col md={12}>
                            <div className="">
                                <Form.Label htmlFor="description" className="form-label text-start w-100">Event Description</Form.Label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    placeholder="Enter description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.description} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <div className="">
                            <Form.Label htmlFor="location-type" className="form-label text-start w-100">Location Type</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="location-type"
                                placeholder="Enter location type"
                                value={data.location_type}
                                onChange={(e) => setData('location_type', e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.location_type} </Form.Control.Feedback>
                        </div>
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <div>
                                <Form.Label htmlFor="singleDay" className="form-label text-start w-100">Single Day</Form.Label>
                                <Form.Check.Input
                                    type="radio"
                                    name='schedualType'
                                    className="form-check-input"
                                    id="singleDay"
                                    value={data.schedual_type}
                                    onChange={(e) => setData('schedual_type', 'singleday')}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.schedual_type} </Form.Control.Feedback>
                            </div>
                            <div>
                                <Form.Label htmlFor="multiDays" className="form-label text-start w-100">Multi Days</Form.Label>
                                <Form.Check.Input
                                    type="radio"
                                    name='schedualType'
                                    className="form-check-input"
                                    id="multiDays"
                                    value={data.schedual_type}
                                    onChange={(e) => setData('schedual_type', 'multiday')}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.schedual_type} </Form.Control.Feedback>
                            </div>
                            <div>
                                <Form.Label htmlFor="recurring" className="form-label text-start w-100">Recurring</Form.Label>
                                <Form.Check.Input
                                    type="radio"
                                    name='schedualType'
                                    className="form-check-input"
                                    id="recurring"
                                    value={data.schedual_type}
                                    onChange={(e) => setData('schedual_type', 'recurring')}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.schedual_type} </Form.Control.Feedback>
                            </div>
                        </div>
                    </Row>

                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Link href="#" className="btn btn-link link-danger fw-medium" onClick={() => showModal()}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                        <Button type='submit' disabled={processing} className="btn btn-success">Create</Button>

                    </div>
                </form>
            </Modal.Body>
        </Modal >
    )
}

export default CreateModal