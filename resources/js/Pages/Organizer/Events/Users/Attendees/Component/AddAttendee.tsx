import React, { useState } from "react";
import { Modal, Button, Form, Alert, ModalBody, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

const AddAttendee = ({ show, handleClose }: any) => {
    const { countries } = usePage().props;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { t } = useLaravelReactI18n();

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
                e.preventDefault();
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
                <Modal.Title>{t("Add Attendee")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("First Name")}</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" onChange={(e) => setData('first_name', e.target.value)} />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.first_name}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("Last Name")}</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" onChange={(e) => setData('last_name', e.target.value)} />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.last_name}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("Email")}</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setData('email', e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="d-block mt-2">
                            {" "} {errors.email}{" "}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("Company")}</Form.Label>
                                <Form.Control type="text" placeholder="Company Name" onChange={(e) => setData('company', e.target.value)} />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.company}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("Position")}</Form.Label>
                                <Form.Control type="text" placeholder="Enter Position" onChange={(e) => setData('position', e.target.value)} />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.position}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("Phone")}</Form.Label>
                        <Form.Control type="number" placeholder="Enter phone" onChange={(e) => setData('phone', e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="d-block mt-2">
                            {" "} {errors.phone}{" "}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mt-1">
                        <Col md={12} lg={12}>
                            <Form.Label htmlFor="account_type" className="form-label">
                                {t("Account Type")}{' '}
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                        <Tooltip id="account-type-tooltip">
                                            <span
                                                dangerouslySetInnerHTML={{ __html: t("Account Type Tooltip") }}
                                            />
                                        </Tooltip>
                                    }
                                >
                                    <span style={{ cursor: 'pointer', color: '#0d6efd', fontSize: '16px' }}>
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
                                <option value="">{t("Select Account Type")}</option>
                                <option value="1">{t("Public")}</option>
                                <option value="0">{t("Private")}</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid" className="mt-2 d-block">
                                {errors.is_public}
                            </Form.Control.Feedback>
                        </Col>
                        <Form.Group className="mb-1"> <Form.Label>{t("Location")}</Form.Label> <Form.Control type="text" placeholder="Enter City, State/Province, Country" onChange={(e) => setData('location', e.target.value)} /> <Form.Control.Feedback type="invalid" className="d-block mt-2"> {" "} {errors.location}{" "} </Form.Control.Feedback> </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("Country")}</Form.Label>
                        <span className="text-danger ms-1">*</span>
                        <Form.Select
                            value={data.country || ""} // this ensures the selected country stays set
                            onChange={(e) => setData('country', e.target.value)}
                        >
                            <option value="">{t("Select a country")}</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.title}>
                                    {country.title}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Control.Feedback type="invalid" className="d-block mt-2">
                            {errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>"{t("Bio")}"</Form.Label>
                        <Form.Control type="text" as="textarea" rows={4} placeholder="Enter Biography" onChange={(e) => setData('bio', e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="d-block mt-2">
                            {" "} {errors.bio}{" "}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("Password")}</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    name="password"
                                />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.password}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("Confirm Password")}</Form.Label>
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
                            {t("Close")}
                        </Button>
                        <Button variant="primary" type="submit" disabled={processing}>
                            {processing ? t("Saving...") : t("Add Attendee")}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default AddAttendee;
