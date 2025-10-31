import React from 'react';
import GuestLayout from '../../../Layouts/Attendee/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, Button, Form } from 'react-bootstrap';

export default function ForgotPassword({ status }: any) {
    // Use usePage() to get eventApp, just like in Login.tsx
    const eventApp: any = usePage().props.eventApp;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        // Use eventApp.id from usePage() for the post route
        post(route('attendee.password.request', eventApp.id));
    };

    return (
        <React.Fragment>
            <GuestLayout>
                <Head title="Forgot Password" />
                
                {/* Header section, matching Login.tsx structure */}
                <div className="text-center mt-2">
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">Reset password for the event</p>
                    <i className="ri-mail-send-line display-5 text-success mb-3"></i>
                </div>

                {/* Alert message */}
                <Alert className="border-0 alert-warning text-center mb-2 mx-2" role="alert">
                    Enter your email and instructions will be sent to you!
                </Alert>

                {/* Status message, matching Login.tsx */}
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                {/* Form container div, matching Login.tsx */}
                <div className="p-2 mt-4">
                    <Form onSubmit={submit}>
                        
                        {/* Email field, matching Login.tsx structure */}
                        <div className="mb-3">
                            <Form.Label
                                className="form-label"
                                htmlFor="email"
                                value="Email"
                            >
                                {" "}
                                Email{" "}
                            </Form.Label>
                            <span className="text-danger ms-1">*</span>
                            <Form.Control
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={data.email}
                                // Classes matched with Login.tsx
                                className={
                                    "mb-1 " +
                                    (errors.email ? "is-invalid" : " ")
                                }
                                autoFocus
                                required
                                onChange={(e: any) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                // Classes matched with Login.tsx
                                className="d-block mt-2"
                            >
                                {" "}
                                {errors.email}{" "}
                            </Form.Control.Feedback>
                        </div>

                        {/* Submit button, matching Login.tsx structure */}
                        <div className="mt-4">
                            <Button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={processing}
                            >
                                Send Reset Link
                            </Button>
                        </div>
                    </Form>
                </div>

                {/* Bottom link section, matching Login.tsx structure */}
                <div className="mt-4 text-center">
                    <p className="mb-0">
                        Wait, I remember my password...{" "}
                        <Link
                            // Link back to the event-specific login page
                            href={route('attendee.login', [eventApp.id])}
                            className="fw-semibold text-primary text-decoration-underline"
                        >
                            {" "}
                            Click here{" "}
                        </Link>{" "}
                    </p>
                </div>
            </GuestLayout>
        </React.Fragment>
    );
}
