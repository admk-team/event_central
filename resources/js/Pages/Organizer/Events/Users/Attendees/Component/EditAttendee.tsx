import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useForm } from "@inertiajs/react";


const EditAttendee = ({ show, handleClose, user, isEdit }:any) => {

    const [preview, setPreview] = useState<any>(user?.avatar ?? null);

    const { data, setData, put, processing, errors, reset } = useForm({
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        company: user?.company ?? '',
        position: user?.position ?? '',
        other_link: user?.other_link ?? '',
        facebook_link: user?.facebook_link ?? '',
        linkedin_link: user?.linkedin_link ?? '',
        twitter_link: user?.twitter_link ?? '',
        country: user?.country ?? '',
        phone: user?.phone ?? '',
        bio: user?.bio ?? '',
        avatar: user?.avatar ?? null,
    });

    // Handle Input Change
    const handleChange = (e:any) => {
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
    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(data);
        put(route('organizer.events.attendee.profile.update', user.id), {
            onSuccess: () => {
                handleClose();
                reset();
            }
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Edit Attendee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        type="text"
                        name="company"
                        value={data.company}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type="text"
                        name="position"
                        value={data.position}
                        onChange={handleChange}
                    />
                </Form.Group>

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
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="bio"
                        value={data.bio}
                        onChange={handleChange}
                    />
                </Form.Group>


                    {/* <Form.Label>Profile Image</Form.Label>
                    <Form.Group className="mb-3">
                            <label
                                htmlFor="logo-upload"
                                className="d-flex justify-content-center align-items-center"
                                style={{ cursor: "pointer" }}
                            >
                                <div
                                    className="overflow-hidden w-100 rounded-2"
                                    style={{
                                        // width: '170px',
                                        height: "170px",
                                        background: preview
                                            ? `url(${preview}) no-repeat center center / cover`
                                            : "#fff",
                                        border: "2px dashed #dee2e6", // Optional: Dashed border for better UX
                                    }}
                                >
                                    {!preview && (
                                        <span className="text-muted d-flex justify-content-center align-items-center h-100">
                                            Click to Upload Image
                                        </span>
                                    )}
                                </div>
                                <Form.Control
                                    type="file"
                                    id="logo-upload"
                                    className="d-none"
                                    onChange={handleImageChange}
                                    isInvalid={!!errors.avatar}
                                    accept="image/*" 
                                />
                            </label>
                            {errors.avatar && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.avatar}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group> */}

                <div className="hstack gap-2 justify-content-center mt-4">
                    <Button className="btn btn-light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={processing}>
                        {processing ? "Updating..." : "Update"}
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
    );
};

export default EditAttendee;
