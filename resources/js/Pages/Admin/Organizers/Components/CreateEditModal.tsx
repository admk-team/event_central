import { useForm } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";

export default function CreateEditModal({ show, hide, onHide, organizer }: { show: boolean, hide: () => void, onHide: () => void, organizer: any|null }) {
    const isEdit = organizer != null ? true : false;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: organizer?.name ?? '',
        email: organizer?.email ?? '',
        password: '',
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.organizers.update', organizer.id), {
                preserveScroll: true,
                onSuccess: () => {
                    hide();
                }
            });
        } else {
            post(route('admin.organizers.store'), {
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
                    {isEdit ? 'Edit Organizer' : 'Add Organizer'}
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
