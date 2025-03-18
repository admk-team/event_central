import { Button, Form, FormGroup, ListGroup, ListGroupItem, Modal, Spinner } from "react-bootstrap";
import { FieldType } from "../../../../../../common/data/formBuilderFieldTypes";
import { useForm } from "@inertiajs/react";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { FormEventHandler } from "react";

export default function CreateEditFieldModal({ show, onHide, fieldType }: { show: boolean, onHide: () => void, fieldType: FieldType | null }) {
    const { data, setData, post, processing, errors } = useForm({
        label: '',
        placeholder: '',
        description: '',
        type: fieldType?.name,
        is_required: false,
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post(route('organizer.events.form-fields.store'), {
            preserveScroll: true,
            onSuccess: () => onHide(),
        });
    }


    if (fieldType === null) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {fieldType?.label}
                </h5>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body className="field-catalog">
                    <div>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Label</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={data.label}
                                onChange={(e) => setData({ ...data, label: e.target.value })}
                                isInvalid={!!errors.label}
                            />
                            {errors.label && (
                                <Form.Control.Feedback type="invalid">{errors.label}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Placeholder</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={data.placeholder}
                                onChange={(e) => setData({ ...data, placeholder: e.target.value })}
                                isInvalid={!!errors.placeholder}
                            />
                            {errors.placeholder && (
                                <Form.Control.Feedback type="invalid">{errors.placeholder}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                className="form-control"
                                value={data.description}
                                rows={3}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                isInvalid={!!errors.description}
                            />
                            {errors.description && (
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <ListGroup className="mb-3">
                            <ListGroupItem as="label" className="d-flex align-items-center justify-content-between">
                                <span className="fw-semibold">Required Field</span>
                                <div className="form-check form-switch form-switch-lg mb-0" dir='ltr'>
                                    <FormCheckInput
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={data.is_required}
                                        onChange={e => setData(prev => ({...prev, is_required: e.target.checked}))}
                                    />
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Modal.Body>
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={onHide}
                        >
                            Close
                        </button>
                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            {processing? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Saving
                                </span>
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}
