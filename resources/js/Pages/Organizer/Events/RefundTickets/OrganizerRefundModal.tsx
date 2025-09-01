import { router, useForm } from "@inertiajs/react";
import React from "react";
import { Modal, Form, FormGroup, Row, Col } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface RefundActionModalProps {
  show?: boolean;
  onDeleteClick?: () => void;
  onCloseClick?: () => void;
  refund: any;
}

const OrganizerRefundModal: React.FC<RefundActionModalProps> = ({
  show,
  onCloseClick,
  refund,
}) => {
  const { t } = useLaravelReactI18n();

  const { data, setData, post, processing, errors, clearErrors } = useForm({
    _method: "POST",
    refund_id: refund.id,
    requested_amount: refund.refund_requested_amount,
    organizer_remarks: refund.organizer_remarks,
    refund_approved_amount: refund.refund_approved_amount > 0 ? refund.refund_approved_amount : "",
    action: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();
    clearErrors();

    post(route("organizer.events.attendee.refund"), {
      onSuccess: () => {
        onCloseClick && onCloseClick();
      },
      onError: () => {
        // errors are shown via Form.Control.Feedback
      },
    });
  };

  return (
    <Modal show={show} onHide={onCloseClick} centered size="lg">
      <Modal.Body className="py-3 px-5">
        <div className="mt-2 mb-4">
          <h4>{t("Ticket Refund")}</h4>
        </div>

        <Row>
          <Col>
            <FormGroup className="mb-3">
              <Form.Label>{t("Attendee Remarks")}</Form.Label>
              <Form.Control as="textarea" type="text" rows={8} value={refund.refund_reason} readOnly />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup className="mb-3">
              <Form.Label htmlFor="action" className="form-label text-start w-100">
                {t("Action")}
              </Form.Label>
              <Form.Select
                aria-label={t("Select Action")}
                className="form-control"
                id="action"
                defaultValue={data.action}
                onChange={(e) => setData("action", e.target.value)}
                isInvalid={!!errors.action}
              >
                <option value="">{t("Select Action")}</option>
                <option value="approved">{t("Approved")}</option>
                <option value="rejected">{t("Rejected")}</option>
              </Form.Select>
              {errors.action && <Form.Control.Feedback type="invalid">{errors.action}</Form.Control.Feedback>}
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>{t("Organizer Remarks")}</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                rows={4}
                value={data.organizer_remarks}
                onChange={(e) => setData("organizer_remarks", e.target.value)}
                isInvalid={!!errors.organizer_remarks}
              />
              {errors.organizer_remarks && (
                <Form.Control.Feedback type="invalid">{errors.organizer_remarks}</Form.Control.Feedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup className="mb-3">
              <Form.Label>{t("Refund Requested Amount")}</Form.Label>
              <Form.Control type="number" readOnly value={refund.refund_requested_amount} />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup className="mb-3">
              <Form.Label>{t("Refund Approved Amount")}</Form.Label>
              <Form.Control
                type="number"
                value={data.refund_approved_amount}
                onChange={(e) => setData("refund_approved_amount", e.target.value)}
                isInvalid={!!errors.refund_approved_amount}
              />
              {errors.refund_approved_amount && (
                <Form.Control.Feedback type="invalid">{errors.refund_approved_amount}</Form.Control.Feedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <div className="d-flex gap-2 justify-content-between mt-4 mb-2 w-100">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
            disabled={processing}
          >
            {t("Close")}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger"
            id="update-status"
            onClick={submit}
            disabled={processing}
          >
            {t("Update Status")}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  ) as unknown as JSX.Element;
};

export default OrganizerRefundModal;
