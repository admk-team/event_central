import {
    Button,
    Dropdown,
    Form,
    FormControl,
    FormGroup,
    ListGroup,
    ListGroupItem,
    Modal,
    Spinner
} from "react-bootstrap";
import { FieldType, fieldTypes } from "../../../../../../common/data/formBuilderFieldTypes";
import { useForm } from "@inertiajs/react";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { FormEventHandler } from "react";
import { Ellipsis, Plus } from "lucide-react";
import FieldTypeHas from "./FieldTypeHas";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditFieldModal({
    show,
    onHide,
    fieldType,
    field
}: {
    show: boolean;
    onHide: () => void;
    fieldType?: FieldType | null;
    field?: any;
}) {
    const { t } = useLaravelReactI18n();
    const isEdit = field ? true : false;
    const type = field?.type ?? fieldType?.name;

    const { data, setData, post, processing, errors } = useForm<{
        _method: string;
        label: string;
        placeholder: string;
        description: string;
        type: string;
        options: string[];
        multi_selection: boolean;
        is_required: boolean;
    }>({
        _method: isEdit ? "PUT" : "POST",
        label: field?.label ?? "",
        placeholder: field?.placeholder ?? "",
        description: field?.description ?? "",
        type: type,
        options:
            field?.options ??
            (type !== "choice" && type !== "dropdown"
                ? []
                : [t("Option 1"), t("Option 2")]),
        multi_selection: field?.multi_selection ?? false,
        is_required: field?.is_required ?? false
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(route("organizer.events.settings.questionnaire-form-fields.update", field.id), {
                preserveScroll: true,
                onSuccess: () => onHide()
            });
        } else {
            post(route("organizer.events.settings.questionnaire-form-fields.store"), {
                preserveScroll: true,
                onSuccess: () => onHide()
            });
        }
    };

    const addOption = () => {
        setData((prev) => ({ ...prev, options: [...prev.options, ""] }));
        setTimeout(
            () =>
                (
                    document.querySelector(
                        ".list-group-item:last-child .form-field-option"
                    ) as HTMLElement
                )?.focus(),
            0
        );
    };

    const deleteOption = (index: number) => {
        setData((prev) => ({
            ...prev,
            options: prev.options.filter((opt, i) => i !== index)
        }));
    };

    if (fieldType === null) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {fieldType?.label ?? fieldTypes[field.type]?.label}
                </h5>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body className="field-catalog">
                    <div>
                        <FieldTypeHas type={type} name="label">
                            <FormGroup className="mb-3">
                                <Form.Label className="form-label">{t("Label")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    value={data.label}
                                    onChange={(e) => setData("label", e.target.value)}
                                    isInvalid={!!errors.label}
                                />
                                {errors.label && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.label}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                        </FieldTypeHas>

                        <FieldTypeHas type={type} name="placeholder">
                            <FormGroup className="mb-3">
                                <Form.Label className="form-label">
                                    {t("Placeholder")}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    value={data.placeholder}
                                    onChange={(e) => setData("placeholder", e.target.value)}
                                    isInvalid={!!errors.placeholder}
                                />
                                {errors.placeholder && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.placeholder}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                        </FieldTypeHas>

                        <FieldTypeHas type={type} name="description">
                            <FormGroup className="mb-4">
                                <Form.Label className="form-label">
                                    {t("Description")}
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="form-control"
                                    value={data.description}
                                    rows={3}
                                    onChange={(e) => setData("description", e.target.value)}
                                    isInvalid={!!errors.description}
                                />
                                {errors.description && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                        </FieldTypeHas>

                        {/* Options */}
                        <FieldTypeHas type={type} name="options">
                            <FormGroup className="mb-4">
                                <Form.Label className="form-label">
                                    {t("Options")}
                                </Form.Label>
                                <ListGroup>
                                    {(data.options ?? []).map((option, index) => (
                                        <ListGroupItem
                                            key={index}
                                            as="label"
                                            className="d-flex align-items-center justify-content-between p-0 position-relative"
                                        >
                                            <FormControl
                                                type="text"
                                                value={option}
                                                onChange={(e) =>
                                                    setData(
                                                        "options",
                                                        data.options.map((opt, i) =>
                                                            i === index ? e.target.value : opt
                                                        )
                                                    )
                                                }
                                                className="border-0 form-field-option"
                                                style={{
                                                    padding: "11.2px 48px 11.2px 16px"
                                                }}
                                            />
                                            <Dropdown
                                                onClick={(e) => e.stopPropagation()}
                                                className="position-absolute"
                                                style={{ right: "16px" }}
                                            >
                                                <Dropdown.Toggle
                                                    variant="light"
                                                    size="sm"
                                                    className="btn-icon hide-dropdown-icon"
                                                >
                                                    <Ellipsis size={14} />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        className="text-danger fw-semibold"
                                                        onClick={() => deleteOption(index)}
                                                    >
                                                        {t("Delete")}
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                                <Button
                                    variant="light"
                                    className="d-block w-100 d-flex align-items-center justify-content-center"
                                    onClick={addOption}
                                >
                                    <Plus size={18} />
                                    {t("Add Option")}
                                </Button>
                            </FormGroup>
                        </FieldTypeHas>

                        <ListGroup className="mb-3">
                            <FieldTypeHas type={type} name="multiple_selection">
                                <ListGroupItem
                                    as="label"
                                    className="d-flex align-items-center justify-content-between"
                                >
                                    <span className="fw-semibold">
                                        {t("Multiple Selection")}
                                    </span>
                                    <div
                                        className="form-check form-switch form-switch-lg mb-0"
                                        dir="ltr"
                                    >
                                        <FormCheckInput
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={data.multi_selection}
                                            onChange={(e) =>
                                                setData("multi_selection", e.target.checked)
                                            }
                                        />
                                    </div>
                                </ListGroupItem>
                            </FieldTypeHas>

                            <FieldTypeHas type={type} name="required_field">
                                <ListGroupItem
                                    as="label"
                                    className="d-flex align-items-center justify-content-between"
                                >
                                    <span className="fw-semibold">
                                        {t("Required Field")}
                                    </span>
                                    <div
                                        className="form-check form-switch form-switch-lg mb-0"
                                        dir="ltr"
                                    >
                                        <FormCheckInput
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={data.is_required}
                                            onChange={(e) =>
                                                setData("is_required", e.target.checked)
                                            }
                                        />
                                    </div>
                                </ListGroupItem>
                            </FieldTypeHas>
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
                            {t("Close")}
                        </button>
                        <Button type="submit" disabled={processing}>
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
                        </Button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}
