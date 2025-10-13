import { useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react'
import { Form, FormGroup, Modal, Spinner } from 'react-bootstrap';

type Props = {
    show: boolean;
    onHide: () => void
}

export default function BlueprintImportModal({ show, onHide }: Props) {
    const { t } = useLaravelReactI18n();

    const { setData, post, processing, errors } = useForm<{ blueprint: File | null }>({
        blueprint: null,
    });

    const submit = (e: any) => {
        e.preventDefault();

        post(route('organizer.events.event-platforms.blueprint-import'), {
            preserveScroll: true,
            onSuccess: () => onHide(),
        });
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    Import from Blueprint
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Upload Blueprint")}</Form.Label>
                        <Form.Control
                            type="file"
                            className="form-control"
                            onChange={(e) => setData('blueprint', (e.target as HTMLInputElement).files?.[0] ?? null)}
                            isInvalid={!!errors.blueprint}
                        />
                        {errors.blueprint && (
                            <Form.Control.Feedback type="invalid">{errors.blueprint}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                </Modal.Body>
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={onHide}
                        >
                            {t("Close")}
                        </button>
                        <button type="submit" className="btn btn-success" disabled={processing}>
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        aria-hidden="true"
                                    />
                                    Uploading
                                </span>
                            ) : (
                                <span>Upload</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}