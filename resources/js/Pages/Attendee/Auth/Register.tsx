import React, { useEffect } from 'react';
import GuestLayout from '../../../Layouts/Attendee/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import logoLight from '../../../../images/logo-light.png';

export default function Register() {
    const eventApp = usePage().props.eventApp;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
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
                            <Form.Label htmlFor="name" value="Name" > Name </Form.Label>
                            <span className="text-danger ms-1">*</span>

                            <Form.Control
                                id="name"
                                name="name"
                                placeholder="Enter Your Name"
                                value={data.name}
                                className={"mt-1 form-control" + (errors.name ? 'is-invalid' : '')}
                                autoComplete="name"
                                autoFocus
                                onChange={(e: any) => setData('name', e.target.value)}
                                required
                            />

                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.name}</Form.Control.Feedback>
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

                        {/* <div className="mb-4 mt-4">
                            <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon
                                <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium ms-2"> Terms of Use</Link></p>
                        </div> */}

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
