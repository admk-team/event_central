import React from "react";
import { Modal} from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";
interface DeleteManyModalProps {
  show ?: boolean;
  onDeleteClick ?: () => void;
  onCloseClick ?: () => void;
  recordId ?: string;
}

const DeleteManyModal: React.FC<DeleteManyModalProps> = ({ show, onDeleteClick, onCloseClick, recordId }) => {
 const { t } = useLaravelReactI18n();
  return (
    <Modal show={show} onHide={onCloseClick} centered={true}>
      <Modal.Body className="py-3 px-5">
        <div className="mt-2 text-center">
          <i className="ri-delete-bin-line display-5 text-danger"></i>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>{t("Are you sure")}</h4>
            <p className="text-muted mx-4 mb-0">
              {t("Remove records confirmation")}
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
           {t("Close")}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onDeleteClick}
          >
           {t("Yes, Delete It!")}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  ) as unknown as JSX.Element;
};

export default DeleteManyModal;
