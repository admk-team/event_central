import React, { useEffect, useState } from "react"; // <-- useState import kiya (Password toggle ke liye)
import GuestLayout from "../../../Layouts/Attendee/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";
import logoLight from "../../../../images/logo-white.png";

// Props mein 'eventApp' add kiya gaya hai, taaki routes build ho sakein
export default function ResetPassword({ token, email, eventApp }: any) {
    // --- State Hooks (Login form ke format jaisa) ---
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [confirmPasswordShow, setConfirmPasswordShow] =
        useState<boolean>(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email, // Email ko form data mein rakha
        password: "",
        password_confirmation: "",
    });

    // --- useEffect (Login form ke format jaisa) ---
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    // --- Submit Handler (Login form ke format jaisa) ---
    const submit = (e: any) => {
        e.preventDefault();

        // Logic wahi hai, bas format clean hai
        post(route("attendee.password.update", { eventApp: eventApp.id }));
    };

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Reset Password" /> {/* Title change kiya */}
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link
                                            href="/#"
                                            className="d-inline-block auth-logo"
                                        >
                                            <img
                                                src={logoLight}
                                                alt=""
                                                height="20"
                                            />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-semibold">
                                        Your Ultimate Event Management Solution
                                    </p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            {/* Values ko aur barha diya hai */}
                            <Col md={11} lg={10} xl={9}>
                                <Card className="mt-4">
                                    <Card.Body className="p-4">
                                        <div className="text-center mt-2">
                                            {/* Text update kiya */}
                                            <h5 className="text-primary">
                                                Create New Password
                                            </h5>
                                            <p className="text-muted">
                                                Set your new password below.
                                            </p>
                                        </div>

                                        {/* General error message (invalid token, etc.) */}
                                        {errors.email && (
                                            <Alert
                                                variant="danger"
                                                className="text-center mb-3"
                                            >
                                                {errors.email}
                                            </Alert>
                                        )}

                                        {/* --- Form Section (Login form ke format mein) --- */}
                                        <div className="p-2 mt-4">
                                            {" "}
                                            {/* mt-4 add kiya Login jaisa */}
                                            <Form onSubmit={submit}>
                                                {/* Password Field */}
                                                <div className="mb-3">
                                                    <Form.Label
                                                        className="form-label"
                                                        htmlFor="password-input"
                                                    >
                                                        Password
                                                    </Form.Label>
                                                    <span className="text-danger ms-1">
                                                        *
                                                    </span>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Form.Control
                                                            id="password-input"
                                                            type={
                                                                passwordShow
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            name="password"
                                                            placeholder="Enter New Password"
                                                            value={
                                                                data.password
                                                            }
                                                            className={
                                                                "mt-1 " + // Login format
                                                                (errors.password
                                                                    ? "is-invalid"
                                                                    : " ")
                                                            }
                                                            autoComplete="new-password"
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setData(
                                                                    "password",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                        <button
                                                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                            type="button"
                                                            id="password-addon"
                                                            onClick={() =>
                                                                setPasswordShow(
                                                                    !passwordShow
                                                                )
                                                            }
                                                        >
                                                            <i className="ri-eye-fill align-middle"></i>
                                                        </button>
                                                        <Form.Control.Feedback
                                                            type="invalid"
                                                            className="d-block mt-2" // Login format
                                                        >
                                                            {errors.password}
                                                        </Form.Control.Feedback>
                                                    </div>
                                                </div>

                                                {/* Confirm Password Field */}
                                                <div className="mb-3">
                                                    <Form.Label
                                                        className="form-label"
                                                        htmlFor="password-confirmation-input"
                                                    >
                                                        Confirm Password
                                                    </Form.Label>
                                                    <span className="text-danger ms-1">
                                                        *
                                                    </span>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Form.Control
                                                            id="password-confirmation-input"
                                                            type={
                                                                confirmPasswordShow
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            name="password_confirmation"
                                                            placeholder="Confirm New Password"
                                                            value={
                                                                data.password_confirmation
                                                            }
                                                            className={
                                                                "mt-1 " + // Login format
                                                                (errors.password_confirmation
                                                                    ? "is-invalid"
                                                                    : " ")
                                                            }
                                                            autoComplete="new-password"
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                setData(
                                                                    "password_confirmation",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                        <button
                                                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                            type="button"
                                                            id="confirm-password-addon"
                                                            onClick={() =>
                                                                setConfirmPasswordShow(
                                                                    !confirmPasswordShow
                                                                )
                                                            }
                                                        >
                                                            <i className="ri-eye-fill align-middle"></i>
                                                        </button>
                                                        <Form.Control.Feedback
                                                            type="invalid"
                                                            className="d-block mt-2" // Login format
                                                        >
                                                            {
                                                                errors.password_confirmation
                                                            }
                                                        </Form.Control.Feedback>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <Button
                                                        type="submit"
                                                        className="btn btn-success w-100"
                                                        disabled={processing}
                                                    >
                                                        Reset Password
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                        {/* --- Form Section End --- */}
                                    </Card.Body>
                                </Card>
                                <div className="mt-4 text-center">
                                    {/* Yeh bhi ab 'eventApp' prop ki wajah se sahi kaam karega */}
                                    <p className="mb-0">
                                        Back to{" "}
                                        <Link
                                            href={route("attendee.login", {
                                                eventApp: eventApp.id,
                                            })}
                                            className="fw-bold text-primary text-decoration-underline"
                                        >
                                            {" "}
                                            Login{" "}
                                        </Link>{" "}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </GuestLayout>
        </React.Fragment>
    );
}
