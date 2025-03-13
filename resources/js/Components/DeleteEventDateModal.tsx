import React from "react";
import { Modal} from "react-bootstrap";
interface DeleteEventDateModalProps {
  show ?: boolean;
  onDeleteClick ?: () => void;
  onCloseClick ?: () => void;
}

const DeleteEventDateModal: React.FC<DeleteEventDateModalProps> = ({ show, onDeleteClick, onCloseClick }) => {
  return (
    <>
    <Modal show={show} onHide={onCloseClick} centered={true} className="backdrop-modal">
      <Modal.Body className="py-3 px-5">
        <div className="mt-2 text-center">
          <i className="ri-delete-bin-line display-5 text-danger"></i>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Are you sure ?</h4>
            <p className="text-muted mx-4 mb-0">
              You will lose all scheduled sessions for this day.
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onDeleteClick}
          >
            Yes, Delete It!
          </button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  ) as unknown as JSX.Element;
};

export default DeleteEventDateModal;