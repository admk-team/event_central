import React, { useState } from "react";
import { Modal, Button, Form, Alert, ModalBody, Row, Col } from "react-bootstrap";
import { useForm } from "@inertiajs/react";

const AddAttendee = ({ show, handleClose }: any) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        company: '',
        position: '',
        phone: "",
        location: "",
        bio: ''
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route('organizer.events.attendees.store'), {
            onSuccess: () => {
                handleClose();
                reset();
            }
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Attendee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" onChange={(e) => setData('first_name', e.target.value)} />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.first_name}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" onChange={(e) => setData('last_name', e.target.value)} />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.last_name}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setData('email', e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="d-block mt-2">
                            {" "} {errors.email}{" "}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" placeholder="Company Name" onChange={(e) => setData('company', e.target.value)} />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.company}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Position</Form.Label>
                                <Form.Control type="text" placeholder="Enter Position" onChange={(e) => setData('position', e.target.value)} />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.position}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" placeholder="Enter phone" onChange={(e) => setData('phone', e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="d-block mt-2">
                            {" "} {errors.phone}{" "}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter location" onChange={(e) => setData('location', e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="d-block mt-2">
                            {" "} {errors.location}{" "}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" as="textarea" rows={4} placeholder="Enter Biography" onChange={(e) => setData('bio', e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="d-block mt-2">
                            {" "} {errors.bio}{" "}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Button className="btn btn-light" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Add Attendee"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default AddAttendee;
