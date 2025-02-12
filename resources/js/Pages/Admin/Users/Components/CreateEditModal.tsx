import { useForm } from '@inertiajs/react';
import React from 'react'
import { Form, Modal } from "react-bootstrap";

export default function CreateEditModal({ show, hide, onHide, user }: { show: boolean, hide: () => void, onHide: () => void, user: any|null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: user?.name ?? '',
        email:'test',
        password: '',
        role: 'test',
    });

    const submit = (e: any) => {
        console.log("Hello World");
        e.preventDefault();

        post(route('admin.users.store'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("reseting");
                reset();
                hide();
            }
        })
    }
    console.log('User', user);

    const submitEdit = (e: any) => {
        console.log("Hello World");
        e.preventDefault();

        post(route('admin.users.store'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("reseting");
                reset();
                hide();
            }
        })
    }

    console.log("data", data.name);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                {/* {!!isEdit ? "Edit Order" : "Add Order"} */}
                <h5 className="modal-title">
                    Add User
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <div className="mb-3">
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-control" 
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}
                        />
                        {errors.name && (
                            <span className="text-danger">{errors.name}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            className="form-control"
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                        />
                        {errors.email && (
                            <span className="text-danger">{errors.email}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <Form.Label className="form-label">Pasword</Form.Label>
                        <Form.Control 
                            type="password" 
                            className="form-control"
                            value={data.password}
                            onChange={(e) => setData({...data, password: e.target.value})}
                        />
                        {errors.password && (
                            <span className="text-danger">{errors.password}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <Form.Label className="form-label">Role</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-control" 
                            value={data.role}
                            onChange={(e) => setData({...data, role: e.target.value})}
                        />
                        {errors.role && (
                            <span className="text-danger">{errors.role}</span>
                        )}
                    </div>
                </Modal.Body>
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                                // setModal(false);
                            }}
                        >
                            Close
                        </button>

                        <button type="submit" className="btn btn-success" disabled={processing}>
                            {/* {!!isEdit
                                    ? "Update"
                                    : "Add Customer"} */}
                            {processing? (
                                <span>Adding User...</span>
                            ) : (
                                <span>Add User</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}
