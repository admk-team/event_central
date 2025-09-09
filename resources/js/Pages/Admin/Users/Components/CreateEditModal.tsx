import { useForm, usePage } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditModal({ show, hide, onHide, user }: { show: boolean, hide: () => void, onHide: () => void, user: any|null }) {
    const isEdit = user != null ? true : false;
      const { t } = useLaravelReactI18n();

    const roles = (usePage().props.roles ?? []) as any[];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        role_id: user?.roles[0]?.id ?? '',
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
                    {isEdit ? t('Edit User') : t('Add User')}
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
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Email")}</Form.Label>
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
                        <Form.Label className="form-label">{t("Pasword")}</Form.Label>
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
                        <Form.Label className="form-label">{t("Role")}</Form.Label>
                        <Form.Select
                            className="form-control"
                            value={data.role_id}
                            onChange={(e) => setData({...data, role_id: e.target.value})}
                            isInvalid={!!errors.role_id}
                        >
                            <option>{t("Select")}</option>
                            {roles.map((role) => (
                                <option value={role.id} key={role.id}>{role.name}</option>
                            ))}
                        </Form.Select>
                        {errors.role_id && (
                            <Form.Control.Feedback type="invalid">{errors.role_id}</Form.Control.Feedback>
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
