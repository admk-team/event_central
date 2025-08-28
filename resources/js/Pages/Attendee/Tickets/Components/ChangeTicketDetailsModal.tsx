import React from 'react';
import { useForm } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";

interface Props {
    show: boolean;
    onHide: () => void;
    purchasedId: string | number;
    initial: { name: string; position: string; location: string };
    onSaved: (vals: { name: string; position: string; location: string }) => void;
}

/**
 * Modal to let users change the attendee's name, position and location for a single purchased ticket.
 * NOTE: Adjust the backend route as needed for your app.
 */
const ChangeTicketDetailsModal: React.FC<Props> = ({ show, onHide, purchasedId, initial, onSaved }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        purchased_id: purchasedId,
        name: initial.name,
        position: initial.position,
        location: initial.location,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('attendee.tickets.update-details'), {
            preserveScroll: true,
            onSuccess: () => {
                onSaved({ name: data.name, position: data.position, location: data.location });
                reset();
            },
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">Change Ticket Details</h5>
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
                        <Form.Label className="form-label">Position</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            isInvalid={!!errors.position}
                        />
                        {errors.position && (
                            <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback>
                        )}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Location</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            isInvalid={!!errors.location}
                        />
                        {errors.location && (
                            <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                </Modal.Body>

                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-light" onClick={onHide}>
                            Close
                        </button>

                        <button type="submit" className="btn btn-success" disabled={processing}>
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    Saving
                                </span>
                            ) : (
                                <span>Save</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default ChangeTicketDetailsModal;
