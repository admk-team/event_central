import { useForm } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";

export default function CreateEditModal({ show, hide, onHide, refferal }: { show: boolean, hide: () => void, onHide: () => void, refferal: any | null }) {
    const isEdit = refferal != null;

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: refferal?.name ?? '',
        url: refferal?.url ?? '',
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.events.refferal-link.update', refferal.id), {
                preserveScroll: true,
                onSuccess: () => {
                    hide();
                }
            });
        } else {
            post(route('organizer.events.refferal-link.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    hide();
                }
            });
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit Link' : 'Add Link'}
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
                            onChange={(e) => setData('name', e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && (
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Link Title</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                            isInvalid={!!errors.url}
                        />
                        {errors.url && (
                            <Form.Control.Feedback type="invalid">{errors.url}</Form.Control.Feedback>
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
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {isEdit ? 'Updating' : 'Creating'}
                                </span>
                            ) : (
                                <span>{isEdit ? 'Update' : 'Create'}</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}
