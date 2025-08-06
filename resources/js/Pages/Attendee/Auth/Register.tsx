import React, { useEffect } from "react";
import GuestLayout from "../../../Layouts/Attendee/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Button, Col, Container, Form, Row, Spinner,OverlayTrigger, Tooltip } from "react-bootstrap";
import logoLight from "../../../../images/logo-white.png";

export default function Register() {
    const eventApp: any = usePage().props.eventApp;

    // console.log(eventApp);

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        position: '',
        location: '',
        password_confirmation: "",
        is_public: "1",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e: any) => {
        e.preventDefault();
        // console.log(data);
        post(route("attendee.register", [eventApp.id]));
    };

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Attendee Register" />
                <div className="text-center mt-2">
                    <h5 className="text-primary">Create An Account</h5>
                    <p className="text-muted">Register and Join the Event</p>
                </div>
                <div className="p-2 mt-1">
                    <form onSubmit={submit}>
                        <Row>
                            <Col md={6} lg={6}>
                                <Form.Label
                                    htmlFor="first_name"
                                    value="First Name"
                                    className="form-label"
                                >
                                    {" "}
                                    First Name{" "}
                                </Form.Label>
                                <span className="text-danger ms-1">*</span>
                                <Form.Control
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter First Name"
                                    value={data.first_name}
                                    className={
                                        "mt-1 form-control" +
                                        (errors.first_name ? "is-invalid" : "")
                                    }
                                    autoComplete="first_name"
                                    onChange={(e: any) =>
                                        setData("first_name", e.target.value)
                                    }
                                    required
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                >
                                    {errors.first_name}
                                </Form.Control.Feedback>
                            </Col>
                            <Col md={6} lg={6}>
                                <Form.Label
                                    htmlFor="last_name"
                                    value="Last Name"
                                    className="form-label"
                                >
                                    {" "}
                                    Last Name{" "}
                                </Form.Label>
                                <span className="text-danger ms-1">*</span>
                                <Form.Control
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter Last Name"
                                    value={data.last_name}
                                    className={
                                        "mt-1 form-control" +
                                        (errors.last_name ? "is-invalid" : "")
                                    }
                                    autoComplete="last_name"
                                    onChange={(e: any) =>
                                        setData("last_name", e.target.value)
                                    }
                                    required
                                />

                                <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                >
                                    {errors.last_name}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col md={12} lg={12} >
                                <Form.Label htmlFor="position" value="Position" className='form-label'> Position </Form.Label>
                                <Form.Control
                                    id="position"
                                    type="text"
                                    name="position"
                                    placeholder="Enter Position"
                                    value={data.position}
                                    className={'mt-1 form-control' + (errors.position ? 'is-invalid' : '')}
                                    autoComplete="position"
                                    onChange={(e: any) => setData('position', e.target.value)}
                                />

                                <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.position}</Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col md={12} lg={12} >
                                <Form.Label htmlFor="location" value="location" className='form-label'> Location </Form.Label>
                                <Form.Control
                                    id="location"
                                    type="text"
                                    name="location"
                                    placeholder="Enter City, State/Province, Country"
                                    value={data.location}
                                    className={'mt-1 form-control' + (errors.location ? 'is-invalid' : '')}
                                    autoComplete="location"
                                    onChange={(e: any) => setData('location', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.location}</Form.Control.Feedback>
                            </Col>
                        </Row>
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
                        <div className="mt-1">
                            <Form.Label
                                htmlFor="email"
                                value="Email"
                                className="form-label"
                            >
                                {" "}
                                Email{" "}
                            </Form.Label>
                            <span className="text-danger ms-1">*</span>
                            <Form.Control
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter Email address"
                                value={data.email}
                                className={
                                    "mt-1 form-control" +
                                    (errors.email ? "is-invalid" : "")
                                }
                                autoComplete="username"
                                onChange={(e: any) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                className="mt-2 d-block"
                            >
                                {errors.email}
                            </Form.Control.Feedback>
                        </div>

                        <div className="mt-1">
                            <Form.Label
                                htmlFor="password"
                                value="Password"
                                className="form-label"
                            >
                                {" "}
                                Password{" "}
                            </Form.Label>
                            <span className="text-danger ms-1">*</span>
                            <Form.Control
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={data.password}
                                className={
                                    "mt-1 form-control" +
                                    (errors.password ? "is-invalid" : "")
                                }
                                autoComplete="new-password"
                                onChange={(e: any) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <Form.Control.Feedback
                                type="invalid"
                                className="mt-2 d-block"
                            >
                                {errors.password}
                            </Form.Control.Feedback>
                        </div>

                        <div className="mt-1">
                            <Form.Label
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="form-label"
                            >
                                {" "}
                                Confirm Password{" "}
                            </Form.Label>
                            <span className="text-danger ms-1">*</span>

                            <Form.Control
                                id="password_confirmation"
                                type="password"
                                placeholder="Confirm password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className={
                                    "mt-1 form-control" +
                                    (errors.password_confirmation
                                        ? "is-invalid"
                                        : "")
                                }
                                autoComplete="new-password"
                                onChange={(e: any) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <Form.Control.Feedback
                                type="invalid"
                                className="mt-2 d-block"
                            >
                                {errors.password_confirmation}
                            </Form.Control.Feedback>
                        </div>

                        <Button
                            type="submit"
                            className="btn btn-success w-100 mt-4"
                            disabled={processing}
                        >
                            {processing ? <Spinner size="sm" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> : 'Sign Up'}
                        </Button>

                        <div className="mt-2 text-center">
                            <div className="signin-other-title">
                                <h5 className="fs-13 mb-2 title text-muted">
                                    Create account with
                                </h5>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-icon waves-effect waves-light"
                                >
                                    <i className="ri-facebook-fill fs-16"></i>
                                </button>{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.href = route("attendee.google.redirect", [eventApp.id]);
                                    }}
                                    className="btn btn-danger btn-icon me-1"
                                >
                                    <i className="ri-google-fill fs-16" />
                                </button>{" "}
                                <button
                                    type="button"
                                    className="btn btn-dark btn-icon waves-effect waves-light"
                                >
                                    <i className="ri-github-fill fs-16"></i>
                                </button>{" "}
                                <button
                                    type="button"
                                    className="btn btn-dark btn-icon waves-effect waves-light"
                                >
                                    <i className="ri-twitter-x-line fs-16"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-4 text-center">
                    <p className="mb-0">
                        Already have an account ?{" "}
                        <Link
                            href={route("attendee.login", [eventApp.id])}
                            className="fw-semibold text-primary text-decoration-underline"
                        >
                            {" "}
                            Signin{" "}
                        </Link>{" "}
                    </p>
                </div>
            </GuestLayout>
        </React.Fragment>
    );
}
