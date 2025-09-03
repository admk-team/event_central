import { useForm } from "@inertiajs/react";
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditModal({
    show,
    hide,
    onHide,
    badge,
}: {
    show: boolean;
    hide: () => void;
    onHide: () => void;
    badge: any | null;
}) {
    const isEdit = badge != null;

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        title: badge?.title ?? "",
        icon: null as File | null,
        type: badge?.type ?? "",
        points: badge?.points ?? "",
        milestone: badge?.milestone ?? "",
        description: badge?.description ?? "", // Changed from 0 to '' to treat as string
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("icon", file);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", data._method);
        formData.append("title", data.title);

        if (data.icon) { // Only append if user selected a file
            formData.append("icon", data.icon);
        }

        formData.append("type", data.type);
        formData.append("points", data.points.toString());
        formData.append("milestone", data.milestone.toString());
        formData.append("description", data.description);

        if (isEdit) {
            post(route("organizer.events.badge.update", badge.id), {
                data: formData,
                preserveScroll: true,
                onSuccess: () => {
                    hide();
                },
            });
        } else {
            post(route("organizer.events.badge.store"), {
                data: formData,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    hide();
                },
            });
        }
    };
    const { t } = useLaravelReactI18n();

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? t("Edit Badge") : t("Add Badge")}
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Title")}</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            isInvalid={!!errors.title}
                        />
                        {errors.title && (
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Icon")}</Form.Label>
                        <Form.Control
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                            isInvalid={!!errors.icon}
                        />
                        {isEdit && badge?.icon && !data.icon && (
                            <div className="mt-2">
                                <img
                                    src={`/storage/${badge.icon}`}
                                    alt="Current Icon"
                                    style={{ width: "32px", height: "32px" }}
                                />
                                <span className="ms-2">{t("Current Icon")}</span>
                            </div>
                        )}
                        {errors.icon && (
                            <Form.Control.Feedback type="invalid">
                                {errors.icon}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Type")}</Form.Label>
                        <Form.Select
                            className="form-select"
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            isInvalid={!!errors.type}
                        >
                            <option value="">{t("Select Type")}</option>
                            <option value="register"> {t("Register Account")}</option>
                            <option value="referral_link">{t("Referral Link")}</option>
                            <option value="session_rating">{t("Session Rating")}</option>
                            <option value="session_favorite">{t("Session Favorite")}</option>
                            <option value="purchase_ticket">{t("Purchase Ticket")}</option>
                            <option value="questionnaire">{t("Questionnaire")}</option>
                        </Form.Select>
                        {errors.type && (
                            <Form.Control.Feedback type="invalid">
                                {errors.type}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Points")}</Form.Label>
                        <Form.Control
                            type="number"
                            className="form-control"
                            value={data.points}
                            onChange={(e) =>
                                setData("points", parseInt(e.target.value) || '')
                            }

                            isInvalid={!!errors.points}
                        />
                        {errors.points && (
                            <Form.Control.Feedback type="invalid">
                                {errors.points}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">
                            {t("Milestone")}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            className="form-control"
                            value={data.milestone}
                            onChange={(e) =>
                                setData(
                                    "milestone",
                                    parseInt(e.target.value) || ''
                                )
                            }
                            isInvalid={!!errors.milestone}
                        />
                        {errors.milestone && (
                            <Form.Control.Feedback type="invalid">
                                {errors.milestone}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>

                    {/* <FormGroup className="mb-3">
                        <Form.Label className="form-label">
                            Description
                        </Form.Label>
                        <Form.Control
                            as="textarea" // Use as="textarea" instead of type="textarea"
                            className="form-control"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            } // Fix to update 'description'
                            isInvalid={!!errors.description}
                            rows={3} // Optional: Add rows for better textarea height
                        />
                        {errors.description && (
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup> */}
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

                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {isEdit ? t("Updating") : t("Creating")}
                                </span>
                            ) : (
                                <span>{isEdit ? t("Update") : t("Create")}</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}
