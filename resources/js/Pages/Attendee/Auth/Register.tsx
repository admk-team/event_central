import React, { useEffect } from 'react';
import GuestLayout from '../../../Layouts/Attendee/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import logoLight from '../../../../images/logo-white.png';

export default function Register() {
    const eventApp: any = usePage().props.eventApp;

    console.log(eventApp);

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
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
        console.log('here')
        post(route('attendee.register', [eventApp.id]));
    };

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Attendee Register" />
                <div className="text-center mt-2">
                    <h5 className="text-primary">Create An Account</h5>
                    <p className="text-muted">Register and Join the Event</p>
                </div>
                <div className="p-2 mt-4">
                    <form onSubmit={submit}>
                        <Row>
                            <Col md={6} lg={6}>
                                <Form.Label htmlFor="first_name" value="First Name" className='form-label'> First Name </Form.Label>
                                <span className="text-danger ms-1">*</span>
                                <Form.Control
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter First Name"
                                    value={data.first_name}
                                    className={'mt-1 form-control' + (errors.first_name ? 'is-invalid' : '')}
                                    autoComplete="first_name"
                                    onChange={(e: any) => setData('first_name', e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.first_name}</Form.Control.Feedback>
                            </Col>
                            <Col md={6} lg={6}>
                                <Form.Label htmlFor="last_name" value="Last Name" className='form-label'> Last Name </Form.Label>
                                <span className="text-danger ms-1">*</span>
                                <Form.Control
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter Last Name"
                                    value={data.last_name}
                                    className={'mt-1 form-control' + (errors.last_name ? 'is-invalid' : '')}
                                    autoComplete="last_name"
                                    onChange={(e: any) => setData('last_name', e.target.value)}
                                    required
                                />

                                <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.last_name}</Form.Control.Feedback>

                            </Col>
                        </Row>
                        <div>
                            <Form.Label htmlFor="email" value="Email" className='form-label'> Email </Form.Label>
                            <span className="text-danger ms-1">*</span>
                            <Form.Control
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter Email address"
                                value={data.email}
                                className={'mt-1 form-control' + (errors.email ? 'is-invalid' : '')}
                                autoComplete="username"
                                onChange={(e: any) => setData('email', e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.email}</Form.Control.Feedback>
                        </div>

                        <div className="mt-4">
                            <Form.Label htmlFor="password" value="Password" className='form-label'> Password </Form.Label>
                            <span className="text-danger ms-1">*</span>
                            <Form.Control
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={data.password}
                                className={"mt-1 form-control" + (errors.password ? 'is-invalid' : '')}
                                autoComplete="new-password"
                                onChange={(e: any) => setData('password', e.target.value)}
                                required
                            />

                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.password}</Form.Control.Feedback>
                        </div>

                        <div className="mt-4">
                            <Form.Label htmlFor="password_confirmation" value="Confirm Password" className='form-label'> Confirm Password </Form.Label>
                            <span className="text-danger ms-1">*</span>

                            <Form.Control
                                id="password_confirmation"
                                type="password"
                                placeholder="Confirm password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className={"mt-1 form-control" + (errors.password_confirmation ? 'is-invalid' : '')}
                                autoComplete="new-password"
                                onChange={(e: any) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.password_confirmation}</Form.Control.Feedback>
                        </div>

                        <Button type="submit" className="btn btn-success w-100 mt-4" disabled={processing}>
                            Sign Up
                        </Button>

                        <div className="mt-2 text-center">
                            <div className="signin-other-title">
                                <h5 className="fs-13 mb-2 title text-muted">Create account with</h5>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary btn-icon waves-effect waves-light"><i className="ri-facebook-fill fs-16"></i></button>{" "}
                                <button type="button" className="btn btn-danger btn-icon waves-effect waves-light"><i className="ri-google-fill fs-16"></i></button>{" "}
                                <button type="button" className="btn btn-dark btn-icon waves-effect waves-light"><i className="ri-github-fill fs-16"></i></button>{" "}
                                <button type="button" className="btn btn-info btn-icon waves-effect waves-light"><i className="ri-twitter-fill fs-16"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-4 text-center">
                    <p className="mb-0">Already have an account ? <Link href={route('attendee.login', [eventApp.id])} className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                </div>
            </GuestLayout>
        </React.Fragment>
    );
}
