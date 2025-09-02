import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FieldType, fieldTypes } from "../../../../../../common/data/formBuilderFieldTypes";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function FieldTypesModal({
    show,
    onHide,
    onSelect,
}: {
    show: boolean;
    onHide: () => void;
    onSelect: (type: FieldType) => void;
}) {
    const { t } = useLaravelReactI18n();

    const _onSelect = (fieldType: FieldType) => {
        onSelect(fieldType);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {t("Choose Field")}
                </h5>
            </Modal.Header>
            <Modal.Body className="field-catalog">
                {Object.entries(fieldTypes).map(([key, fieldType]) => (
                    <Button
                        key={key}
                        variant="light"
                        className="field fw-semibold"
                        onClick={() => _onSelect(fieldType)}
                    >
                        <fieldType.icon /> {t(fieldType.label)}
                    </Button>
                ))}
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
                </div>
            </div>
        </Modal>
    );
}
