import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Dropdown, Form, FormGroup, Modal, Spinner, Button } from "react-bootstrap";

export default function CreateEditPlatformModal({ show, hide, onHide, platforms, event_platforms }: { show: boolean, hide: () => void, onHide: () => void, platforms: any, event_platforms: any | null }) {
    const isEdit = event_platforms != null ? true : false;
    const [deletePlatform, setDeletePlatform]: any = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: event_platforms?.name ?? '',
        type: event_platforms?.type ?? '',
    });

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteAction = (platform: any) => {
        setDeletePlatform(platform);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        if (deletePlatform) {
            deleteForm.post(route('organizer.events.event-platforms.destroy', deletePlatform.id), {
                onSuccess: () => {
                    setShowDeleteConfirmation(false);
                    setDeletePlatform(null);
                    hide();
                },
            });
        }
    };

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.events.event-platforms.update', event_platforms.id), {
                preserveScroll: true,
                onSuccess: () => {
                    hide();
                }
            });
        } else {
            post(route('organizer.events.event-platforms.store', data), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    hide();
                }
            });
        }
    }

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header className="bg-light p-3" closeButton>
                    <h5 className="modal-title">
                        {isEdit ? 'Edit platform' : 'Add platform'}
                    </h5>
                </Modal.Header>

                <Form onSubmit={submit} className="tablelist-form">
                    <Modal.Body>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Select Platform</Form.Label>
                            <Form.Select
                                className="form-control"
                                value={data.type}
                                onChange={(e) => setData({ ...data, type: e.target.value })}
                                isInvalid={!!errors.type}
                            >
                                <option>Select Platform</option>
                                {platforms?.map((platform: any, index: any) => (
                                    <option value={platform.name} key={index}>{platform.name}</option>
                                ))}
                            </Form.Select>
                            {errors.type && (
                                <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">{data.type} Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                isInvalid={!!errors.name}
                            />
                            {errors.name && (
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
                            {isEdit && (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => deleteAction(event_platforms)}
                                >
                                    Delete
                                </button>
                            )}
                            <button type="submit" className="btn btn-success" disabled={processing}>
                                {processing ? (
                                    <span className="d-flex gap-1 align-items-center">
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
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

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this platform?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}