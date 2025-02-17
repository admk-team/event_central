import { useForm, usePage } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";

export default function CreateEditModal({ show, hide, onHide, user }: { show: boolean, hide: () => void, onHide: () => void, user: any|null }) {
    const isEdit = user != null ? true : false;

    const roles = usePage().props.roles as string[] ?? [];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        role: user?.roles[0]?.name ?? '',
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.users.update', user.id), {
                preserveScroll: true,
                onSuccess: () => {
                    hide();
                }
            });
        } else {
            post(route('admin.users.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    hide();
                }
            });
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit User' : 'Add User'}
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-control" 
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && (
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            className="form-control"
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                            isInvalid={!!errors.email}
                        />
                        {errors.email && (
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Pasword</Form.Label>
                        <Form.Control 
                            type="password" 
                            className="form-control"
                            value={data.password}
                            onChange={(e) => setData({...data, password: e.target.value})}
                            isInvalid={!!errors.password}
                        />
                        {errors.password && (
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Role</Form.Label>
                        <Form.Select 
                            className="form-control" 
                            value={data.role}
                            onChange={(e) => setData({...data, role: e.target.value})}
                            isInvalid={!!errors.role}
                        >
                            <option>Select</option>
                            {roles.map((role, index) => (
                                <option value={role} key={index}>{role}</option>
                            ))}
                        </Form.Select>
                        {errors.role && (
                            <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                </Modal.Body>
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={hide}
                        >
                            Close
                        </button>

                        <button type="submit" className="btn btn-success" disabled={processing}>
                            {processing? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {isEdit ? 'Updating': 'Creating'}
                                </span>
                            ) : (
                                <span>{isEdit ? 'Update': 'Create'}</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}
