import { useForm } from "@inertiajs/react";
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditModal({
    show,
    hide,
    onHide,
    prayer,
}: {
    show: boolean;
    hide: () => void;
    onHide: () => void;
    prayer: any | null;
}) {
    const isEdit = prayer != null;
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? "PUT" : "POST",
        message: prayer?.message ?? "",
        status: prayer?.status ?? "pending",
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route("organizer.prayer-requests.update", prayer.id), {
            preserveScroll: true,
            onSuccess: hide,
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-light p-3">
                <h5 className="modal-title">{t("Edit Prayer Request")}</h5>
            </Modal.Header>

            <Form onSubmit={submit}>
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label>{t("Request")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            isInvalid={!!errors.message}
                        />
                        {errors.message && (
                            <Form.Control.Feedback type="invalid">
                                {errors.message}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Form.Label>{t("Status")}</Form.Label>
                        <Form.Select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            isInvalid={!!errors.status}
                        >
                            <option value="pending">{t("Pending")}</option>
                            <option value="approved">{t("Approved")}</option>
                            <option value="rejected">{t("Rejected")}</option>
                        </Form.Select>
                        {errors.status && (
                            <Form.Control.Feedback type="invalid">
                                {errors.status}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>
                </Modal.Body>

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={hide}
                    >
                        {t("Cancel")}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={processing}
                    >
                        {processing ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            t("Update")
                        )}
                    </button>
                </div>
            </Form>
        </Modal>
    );
}
