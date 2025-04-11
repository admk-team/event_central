import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";
import { useForm } from "@inertiajs/react";

const EditAttendee = ({ show, handleClose, user, isEdit }: any) => {
    const [preview, setPreview] = useState<any>(user?.avatar ?? null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { data, setData, put, processing, errors, reset } = useForm({
        first_name: user?.first_name ?? "",
        last_name: user?.last_name ?? "",
        email: user?.email ?? "",
        company: user?.company ?? "",
        position: user?.position ?? "",
        other_link: user?.other_link ?? "",
        facebook_link: user?.facebook_link ?? "",
        linkedin_link: user?.linkedin_link ?? "",
        twitter_link: user?.twitter_link ?? "",
        country: user?.country ?? "",
        phone: user?.phone ?? "",
        location: user?.location ?? "",
        bio: user?.bio ?? "",
        avatar: user?.avatar ?? null,
        password: "",
    });

    useEffect(() => {
        if (user) {
            setData({
                first_name: user?.first_name ?? "",
                last_name: user?.last_name ?? "",
                email: user?.email ?? "",
                company: user?.company ?? "",
                position: user?.position ?? "",
                other_link: user?.other_link ?? "",
                facebook_link: user?.facebook_link ?? "",
                linkedin_link: user?.linkedin_link ?? "",
                twitter_link: user?.twitter_link ?? "",
                country: user?.country ?? "",
                phone: user?.phone ?? "",
                location: user?.location ?? "",
                bio: user?.bio ?? "",
                avatar: user?.avatar ?? null,
                password: "",
            });
        }
    }, [user]);

    // Handle Input Change
    const handleChange = (e: any) => {
        setData(e.target.name, e.target.value);
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setData("avatar", file);
        }
    };

    // Handle Form Submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (password.trim() != "" || confirmPassword.trim() != "") {
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }
        }
        setError("");
        put(route("organizer.events.attendee.profile.update", user.id), {
            onSuccess: () => {
                handleClose();
                reset();
                setPassword("");
                setConfirmPassword("");
            },
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Attendee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block mt-2"
                                >
                                    {" "}
                                    {errors.first_name}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block mt-2"
                                >
                                    {" "}
                                    {errors.last_name}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            disabled
                            value={data.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="company"
                                    value={data.company}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="position"
                                    value={data.position}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={data.location}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="bio"
                            value={data.bio}
                            onChange={handleChange}
                        />
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
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditAttendee;
