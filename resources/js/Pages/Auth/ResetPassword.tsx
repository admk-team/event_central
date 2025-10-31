import React, { useEffect } from 'react';
import GuestLayout from '../../Layouts/Theme/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import logoLight from '../../../images/logo-white.png';

export default function ResetPassword({ token, email }: any) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e: any) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Reset Password | Velzon - React Admin & Dashboard Template" />
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link href="/#" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-semibold">Your Ultimate Event Management Solution</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <Card.Body className="p-4">
                                        <div className="text-center mt-2">
                                            {/* --- Text Updated --- */}
                                            <h5 className="text-primary">Create New Password</h5>
                                            <p className="text-muted">Set your new password below.</p>
                                            <i className="ri-lock-password-line display-5 text-success"></i>
                                        </div>

                                        {/* --- Alert Text Updated --- */}
                                        <Alert className="border-0 alert-info text-center mb-2 mx-2" role="alert">
                                            Your new password must be different from the old one!
                                        </Alert>
                                        <div className="p-2">
                                            <form onSubmit={submit}>
                                                
                                                {/* --- Password Field Added --- */}
                                                <div className="mb-3">
                                                    <Form.Label htmlFor="password" value="Password" className='form-label'>Password</Form.Label>
                                                    <span className='text-danger ms-1'>*</span>
                                                    <Form.Control
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter new password"
                                                        value={data.password}
                                                        // Corrected className logic
                                                        className={`mt-1 form-control ${errors.password ? 'is-invalid' : ''}`}
                                                        autoComplete="new-password"
                                                        onChange={(e: any) => setData('password', e.target.value)}
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.password}</Form.Control.Feedback>
                                                </div>

                                                {/* --- Confirm Password Field Added --- */}
                                                <div className="mb-3">
                                                    <Form.Label htmlFor="password_confirmation" value="Confirm Password" className='form-label'>Confirm Password</Form.Label>
                                                    <span className='text-danger ms-1'>*</span>
                                                    <Form.Control
                                                        id="password_confirmation"
                                                        type="password"
                                                        name="password_confirmation"
                                                        placeholder="Confirm new password"
                                                        value={data.password_confirmation}
                                                        // Corrected className logic
                                                        className={`mt-1 form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                                        autoComplete="new-password"
                                                        onChange={(e: any) => setData('password_confirmation', e.target.value)}
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.password_confirmation}</Form.Control.Feedback>
                                                </div>


                                                <div className="flex items-center justify-end mt-4">
                                                    {/* --- Button Text Updated --- */}
                                                    <Button type="submit" className="btn btn-success w-100" disabled={processing}>
                                                        Reset Password
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Wait, I remember my password... <Link href={route('login')} className="fw-bold text-primary text-decoration-underline"> Click here </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </GuestLayout>
        </React.Fragment>
    );
}
