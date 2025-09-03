import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
const EditAttendee = ({ show, handleClose, user, isEdit }: any) => {
    const [preview, setPreview] = useState<any>(user?.avatar ?? null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { t } = useLaravelReactI18n();

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
        is_public: user?.is_public ?? "1",
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
                is_public: user?.is_public ?? "1",
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
                <Modal.Title>{t("Edit Attendee")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("First Name")}</Form.Label>
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
                                <Form.Label>{t("Last Name")}</Form.Label>
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
                        <Form.Label>{t("Email")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row>
                        <Col md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("Company")}</Form.Label>
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
                                <Form.Label>{t("Position")}</Form.Label>
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
                        <Form.Label>{t("Phone")}</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row className="mt-1">
                        <Col md={12} lg={12}>
                            <Form.Label htmlFor="account_type" className="form-label">
                                {t("Account Type")} {' '}
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
                    </Row>
                    <Form.Group className="mb-1"> <Form.Label>{t("Location")}</Form.Label> <Form.Control type="text" placeholder="Enter City, State/Province, Country"
                        value={data.location || ""}
                        onChange={(e) => setData('location', e.target.value)} /> <Form.Control.Feedback type="invalid" className="d-block mt-2"> {" "} {errors.location}{" "} </Form.Control.Feedback> </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("Country")}</Form.Label>
                        <span className="text-danger ms-1">*</span>
                        <Form.Select
                            name="country"
                            value={data.country || ""}
                            onChange={handleChange}
                        >
                            <option value="">{t("Select Country")}</option>
                            {usePage().props.countries.map((country) => (
                                <option key={country.code} value={country.title}>
                                    {country.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("Bio")}</Form.Label>
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
                                <Form.Label>{t("Password")}</Form.Label>
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
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? t("Updating...") : t("Update")}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditAttendee;
