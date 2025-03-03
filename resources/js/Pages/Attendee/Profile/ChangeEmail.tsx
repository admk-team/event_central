import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, usePage } from '@inertiajs/react';


const ChangeEmail = (props: any) => {
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "POST",
        current_password: '',
        email: ''
    });

    const submitPasswordChange = (e: any) => {
        e.preventDefault();
        post(route('attendee.change.email'));
        console.log('Email form submitted');
    };

    return (
        <React.Fragment>
            <div className="p-4">
                <form onSubmit={submitPasswordChange}>
                    <div className="mt-4">
                        <Form.Label htmlFor="current_password_for_email" value="Current Password" className='form-label'> Current Password </Form.Label>
                        <span className="text-danger ms-1">*</span>
                        <Form.Control
                            id="current_password_for_email"
                            type="password"
                            name="current_password"
                            placeholder="Enter Current Password"
                            value={data.current_password}
                            className={"mt-1 form-control" + (errors.current_password ? 'is-invalid' : '')}
                            autoComplete="new-password"
                            onChange={(e: any) => setData('current_password', e.target.value)}
                            required
                        />

                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.current_password}</Form.Control.Feedback>
                    </div>

                    <div className="mt-4">
                        <Form.Label htmlFor="email" value="email" className='form-label'> Email </Form.Label>
                        <span className="text-danger ms-1">*</span>
                        <Form.Control
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Enter New Email"
                            value={data.email}
                            className={"mt-1 form-control" + (errors.email ? 'is-invalid' : '')}
                            autoComplete="email"
                            onChange={(e: any) => setData('email', e.target.value)}
                            required
                        />

                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.email}</Form.Control.Feedback>
                    </div>

                    <div className='d-flex justify-content-between'>
                        <Button type="submit" className="btn btn-success w-100 mt-4" disabled={processing}>
                            Change Email
                        </Button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default ChangeEmail;
