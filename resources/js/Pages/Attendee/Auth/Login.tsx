import React, { useEffect, useState } from 'react';
import GuestLayout from '../../../Layouts/Attendee/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import logoLight from "../../../../images/logo-light.png";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


export default function Login({ status, canResetPassword, registration_allowed }: any) {

    const eventApp: any = usePage().props.eventApp;

    console.log(eventApp);
    console.log(registration_allowed);

    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'attendee@gmail.com',
        password: '12345678',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: any) => {
        e.preventDefault();
        post(route('attendee.login', eventApp.id));
    };
    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Attendee login" />
                <div className="text-center mt-2">
                    <h5 className="text-primary">Login</h5>
                    <p className="text-muted">Login and Join the Event</p>
                </div>
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <div className='p-2 mt-4'>
                    <Form onSubmit={submit}>
                        <div className='mb-3'>
                            <Form.Label className='form-label' htmlFor="email" value="Email" > Email </Form.Label>
                            <span className="text-danger ms-1">*</span>
                            <Form.Control
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={data.email}
                                className={'mb-1 ' + (errors.email ? 'is-invalid' : ' ')}
                                autoComplete="username"
                                autoFocus
                                required
                                onChange={(e: any) => setData('email', e.target.value)}
                            />

                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.email} </Form.Control.Feedback>
                        </div>

                        <div className="mb-3">
                            <div className="float-end">

                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-muted">Forgot password?</Link>
                                )}
                            </div>

                            <Form.Label className='form-label' htmlFor="password" value="Password" > Password </Form.Label>
                            <span className="text-danger ms-1">*</span>
                            <div className="position-relative auth-pass-inputgroup mb-3">

                                <Form.Control
                                    id="password"
                                    type={passwordShow ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    placeholder="Enter Password"
                                    required
                                    className={'mt-1 ' + (errors.password ? 'is-invalid' : ' ')}
                                    autoComplete="current-password"
                                    onChange={(e: any) => setData('password', e.target.value)}
                                />

                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.password} </Form.Control.Feedback>
                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                            </div>
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Form.Check.Input
                                    className='form-check-input'
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e: any) => setData('remember', e.target.checked)}
                                />
                                <Form.Check.Label className="form-check-label" htmlFor="auth-remember-check">
                                    <span className='ms-2'>Remember me</span>
                                </Form.Check.Label>
                            </label>
                        </div>

                        <div className="mt-4">

                            <Button type="submit" className="btn btn-success w-100" disabled={processing}>
                                Sign In
                            </Button>
                        </div>

                        <div className="mt-4 text-center">
                            <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title">Sign In with</h5>
                            </div>
                            <div>
                                <Link
                                    href={route('attendee.google.redirect')}
                                    className="btn btn-primary btn-icon me-1"
                                >
                                    <i className="ri-facebook-fill fs-16" />
                                </Link>
                                <Link
                                    href="#"
                                    className="btn btn-danger btn-icon me-1"
                                >
                                    <i className="ri-google-fill fs-16" />
                                </Link>
                                <Button variant="dark" className="btn-icon btn-dark">
                                    <i className="ri-github-fill fs-16"></i>
                                </Button>{" "}
                                <Button variant="info" className="btn-icon btn-info">
                                    <i className="ri-twitter-fill fs-16"></i>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="mt-4 text-center">
                    {registration_allowed && <p className="mb-0">Don't have an account ? <Link href={route('attendee.register', [eventApp.id])} className="fw-semibold text-primary text-decoration-underline"> Signup </Link> </p>}
                </div>
            </GuestLayout >
        </React.Fragment >
    );
}

