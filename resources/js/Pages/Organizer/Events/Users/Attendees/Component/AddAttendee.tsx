import React, { useState } from "react";
import { Modal, Button, Form, Alert, ModalBody, Row, Col,OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "@inertiajs/react";

const AddAttendee = ({ show, handleClose }: any) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        company: '',
        position: '',
        phone: "",
        location: "",
        bio: '',
        password: "",
        is_public: "1",
    });

    const handleSubmit = (e: any) => {
         if (password.trim() != "" || confirmPassword.trim() != "") {
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }
        }
        setError("");
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
                    <Row className="mt-1">
                        <Col md={12} lg={12}>
                            <Form.Label htmlFor="account_type" className="form-label">
                            Account Type{' '}
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                <Tooltip id="account-type-tooltip">
                                    If the account is <strong>Private</strong>, it will not appear in search results for other users.  
                                    If two users are friends with each other, a private chat will be initiated between them.
                                </Tooltip>
                                }
                            >
                                <span style={{ cursor: 'pointer', color: '#0d6efd',fontSize:'16px' }}>
                                    <i className="bx bx-info-circle" />
                                </span>
                            </OverlayTrigger>
                            </Form.Label>

                            <Form.Select
                            id="account_type"
                            name="account_type"
                            value={data.is_public}
                            className={'mt-1 form-control' + (errors.is_public ? ' is-invalid' : '')}
                            onChange={(e: any) => setData('is_public', e.target.value)}
                            >
                            <option value="">Select Account Type</option>
                            <option value="1">Public</option>
                            <option value="0">Private</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid" className="mt-2 d-block">
                            {errors.is_public}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter City, State/Province, Country" onChange={(e) => setData('location', e.target.value)} />
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
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    name="password"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setData("password", e.target.value);
                                    }}
                                    name="confirmPassword"
                                />
                            </Form.Group>
                        </Col>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Row>
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
