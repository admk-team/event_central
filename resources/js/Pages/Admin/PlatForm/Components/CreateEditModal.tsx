import { useForm, usePage } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditModal({ show, hide, onHide, platform }: { show: boolean, hide: () => void, onHide: () => void, platform: any|null }) {
    const isEdit = platform != null ? true : false;
         const { t } = useLaravelReactI18n();


    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: platform?.name ?? '',

    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('admin.platforms.update', platform.id), {
                preserveScroll: true,
                onSuccess: () => {
                    hide();
                }
            });
        } else {
            post(route('admin.platforms.store'), {
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
                    {isEdit ? t('Edit') : t('Add New')}
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Name")}</Form.Label>
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

                </Modal.Body>
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={hide}
                        >
                            {t("Close")}
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
                                    {isEdit ? t('Updating'): t('Creating')}
                                </span>
                            ) : (
                                <span>{isEdit ? t('Update'): t('Create')}</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}
