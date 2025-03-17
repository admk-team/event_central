import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export default function FieldsModal({ show, onHide }: { show: boolean, onHide: () => void }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    Choose Field
                </h5>
            </Modal.Header>
                <Modal.Body className="field-catalog">
                    <Form.Select>
                        <option value="">Select</option>
                        <option value="text">Short Text</option>
                        <option value="short_text">Long Text</option>
                    </Form.Select>
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
