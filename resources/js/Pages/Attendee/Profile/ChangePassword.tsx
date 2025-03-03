import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, usePage } from '@inertiajs/react';


const ChangePassword = (props: any) => {
    const user = usePage().props.auth.user;

    const [cpShow, setCpShow] = useState<boolean>(false);
    const [nPShow, setNpShow] = useState<boolean>(false);
    const [confPShow, setConfPShow] = useState<boolean>(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "POST",
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const submitPasswordChange = (e: any) => {
        e.preventDefault();
        post(route('attendee.change.password'));
        reset();
        console.log('Password form submitted');
    };

    return (
        <React.Fragment>
            <div className="p-4">
                <form onSubmit={submitPasswordChange}>
                    <div className="mt-4">
                        <Form.Label htmlFor="current_password" value="Current Password" className='form-label'> Current Password </Form.Label>
                        <span className="text-danger ms-1">*</span>
                        <Form.Control
                            id="current_password"
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
                        <Form.Label htmlFor="password" value="Password" className='form-label'> New Password </Form.Label>
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
                        <Form.Label htmlFor="password_confirmation" value="Confirm Password" className='form-label'> Confirm New Password </Form.Label>
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
                    <div className='d-flex justify-content-between'>
                        <Button type="submit" className="btn btn-success w-100 mt-4" disabled={processing}>
                            Change Password
                        </Button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default ChangePassword;
