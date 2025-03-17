import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FieldType, fieldTypes } from "../../../../../../common/data/formBuilderFieldTypes";

export default function FieldTypesModal({ show, onHide, onSelect }: { show: boolean, onHide: () => void, onSelect: (type: FieldType) => void }) {
    const _onSelect = (fieldType: FieldType) => {
        onSelect(fieldType);
        onHide();
    }
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    Choose Field
                </h5>
            </Modal.Header>
                <Modal.Body className="field-catalog">
                    {fieldTypes.map(fieldType => (
                        <Button
                            key={fieldType.name}
                            variant="light" 
                            className="field fw-semibold"
                            onClick={() => _onSelect(fieldType)}
                        >{fieldType.label}</Button>
                    ))}
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
                    </div>
                </div>
        </Modal>
    )
}
