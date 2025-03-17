import { Modal } from "react-bootstrap";

export default function CreateEditFieldModal({ show, onHide, fieldType }: { show: boolean, onHide: () => void, fieldType: string | null }) {
    
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    Choose Field
                </h5>
            </Modal.Header>
                <Modal.Body className="field-catalog">
                    {fieldType}
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
