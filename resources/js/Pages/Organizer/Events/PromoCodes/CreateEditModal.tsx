import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Form, FormGroup, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditModal({
  show,
  hide,
  onHide,
  promoCode,
  tickets,
}: {
  show: boolean;
  hide: () => void;
  onHide: () => void;
  promoCode: any;
  tickets: any | null;
}) {
  const { t } = useLaravelReactI18n();

  const isEdit = promoCode != null;
  const event_app_id = usePage().props.currentEvent?.id ?? null;

  const { data, setData, post, processing, errors, reset } = useForm({
    _method: isEdit ? "PUT" : "POST",
    event_app_id,
    code: promoCode?.code ?? "",
    description: promoCode?.description ?? "",
    discount_type: promoCode?.discount_type ?? "",
    discount_value: promoCode?.discount_value ?? "",
    usage_limit: promoCode?.usage_limit ?? "",
    used_count: promoCode?.used_count ?? "",
    start_date: promoCode?.start_date ?? "",
    end_date: promoCode?.end_date ?? "",
    status: promoCode?.status ?? "active",
    tickets: promoCode?.tickets.map((ticket: any) => ticket.id) ?? [],
  });

  const [discountLabel, setDiscountLabel] = useState<string>(
    t("Discount Value")
  );

  const submit = (e: any) => {
    e.preventDefault();

    if (isEdit) {
      post(route("organizer.events.promo-codes.update", promoCode.id), {
        onSuccess: () => {
          reset();
          hide();
        },
      });
    } else {
      post(route("organizer.events.promo-codes.store"), {
        onSuccess: () => {
          reset();
          hide();
        },
      });
    }
  };

  const handleCheckChange = (event: any) => {
    if (event.target.checked) {
      setData(
        "tickets",
        tickets.map((ticket: any) => ticket.value)
      );
    } else {
      setData("tickets", []);
    }
  };

  const customStyles = {
    multiValueLabel: (styles: any) => ({
      ...styles,
      backgroundColor: "var(--vz-secondary-bg-subtle)",
      color: "black",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "black",
      backgroundColor: "var(--vz-secondary-bg-subtle)",
      ":hover": {
        backgroundColor: "var(--vz-secondary-bg-subtle)",
        color: "dark",
      },
    }),
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="bg-light p-3" closeButton>
        <h5 className="modal-title">
          {isEdit ? t("Edit Promo Code") : t("New Promo Code")}
        </h5>
      </Modal.Header>

      <Form onSubmit={submit} className="tablelist-form">
        <Modal.Body>
          <Row>
            <Col md={6} lg={6}>
              <FormGroup className="mb-3">
                <Form.Label>{t("Code")}</Form.Label>
                <Form.Control
                  type="text"
                  inputMode="text"
                  style={{ textTransform: "uppercase" }}
                  value={data.code}
                  onChange={(e) => setData("code", e.target.value)}
                  isInvalid={!!errors.code}
                  placeholder={t("Enter code")}
                />
                {errors.code && (
                  <Form.Control.Feedback type="invalid">
                    {errors.code}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>

            <Col md={6} lg={6}>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="code_status" className="form-label text-start w-100">
                  {t("Status")}
                </Form.Label>
                <Form.Select
                  aria-label={t("Code Status")}
                  className="form-control"
                  id="code_status"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  isInvalid={!!errors.status}
                >
                  <option value="">{t("Select Status")}</option>
                  <option value="active">{t("Active")}</option>
                  <option value="expired">{t("Expired")}</option>
                  <option value="disabled">{t("Disabled")}</option>
                </Form.Select>
                {errors.status && (
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          <FormGroup className="mb-3">
            <Form.Label>{t("Description")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              isInvalid={!!errors.description}
              placeholder={t("Describe the promo (optional)")}
            />
            {errors.description && (
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            )}
          </FormGroup>

          <Row>
            <Col md={6} lg={6}>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="discount_type" className="form-label text-start w-100">
                  {t("Discount Type")}
                </Form.Label>
                <Form.Select
                  aria-label={t("Discount Type")}
                  className="form-control"
                  id="discount_type"
                  value={data.discount_type}
                  onChange={(e) => {
                    const v = e.target.value;
                    setData("discount_type", v);
                    setDiscountLabel(
                      v === "percentage" ? t("Discount Percentage") : t("Discount Value")
                    );
                  }}
                  isInvalid={!!errors.discount_type}
                >
                  <option value="">{t("Select Discount Type")}</option>
                  <option value="fixed">{t("Fixed")}</option>
                  <option value="percentage">{t("Percentage")}</option>
                </Form.Select>
                {errors.discount_type && (
                  <Form.Control.Feedback type="invalid">
                    {errors.discount_type}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>

            <Col md={6} lg={6}>
              <FormGroup className="mb-3">
                <Form.Label>{discountLabel}</Form.Label>
                <Form.Control
                  type="number"
                  value={data.discount_value}
                  onChange={(e) => setData("discount_value", e.target.value)}
                  isInvalid={!!errors.discount_value}
                  placeholder={
                    data.discount_type === "percentage"
                      ? t("Enter % (e.g., 10)")
                      : t("Enter amount (e.g., 500)")
                  }
                />
                {errors.discount_value && (
                  <Form.Control.Feedback type="invalid">
                    {errors.discount_value}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6} lg={6}>
              <FormGroup className="mb-3">
                <Form.Label>{t("Usage Limit")}</Form.Label>
                <Form.Control
                  type="number"
                  value={data.usage_limit}
                  onChange={(e) => setData("usage_limit", e.target.value)}
                  isInvalid={!!errors.usage_limit}
                  placeholder={t("Max uses per code")}
                />
                {errors.usage_limit && (
                  <Form.Control.Feedback type="invalid">
                    {errors.usage_limit}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>

            <Col md={6} lg={6}>
              <FormGroup className="mb-3">
                <Form.Label>{t("Used Count")}</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  value={data.used_count}
                  onChange={(e) => setData("used_count", e.target.value)}
                  isInvalid={!!errors.used_count}
                />
                {errors.used_count && (
                  <Form.Control.Feedback type="invalid">
                    {errors.used_count}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup className="mb-3">
                <Form.Label>{t("Start Date")}</Form.Label>
                <Flatpickr
                  className={errors.start_date ? "is-invalid" : ""}
                  id="start_date"
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "Y-m-d",
                  }}
                  value={data.start_date}
                  onChange={([selectedDate]: Date[]) => {
                    setData((prev) => ({
                      ...prev,
                      start_date: selectedDate.toLocaleDateString("en-CA"),
                    }));
                  }}
                />
                {errors.start_date && (
                  <Form.Control.Feedback type="invalid">
                    {errors.start_date}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup className="mb-3">
                <Form.Label>{t("End Date")}</Form.Label>
                <Flatpickr
                  className={errors.end_date ? "is-invalid" : ""}
                  id="end_date"
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "Y-m-d",
                    minDate: data.start_date || undefined, // ensures end ≥ start
                  }}
                  value={data.end_date}
                  onChange={([selectedDate]: Date[]) => {
                    setData((prev) => ({
                      ...prev,
                      end_date: selectedDate.toLocaleDateString("en-CA"),
                    }));
                  }}
                />
                {errors.end_date && (
                  <Form.Control.Feedback type="invalid">
                    {errors.end_date}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <FormGroup className="mb-3">
                <Form.Check
                  type="checkbox"
                  label={t("Select All Tickets")}
                  id="select-all-tickets"
                  onChange={handleCheckChange}
                />
              </FormGroup>
            </Col>

            <Col lg={12}>
              <FormGroup className="mb-3">
                <Form.Label>{t("Tickets")}</Form.Label>
                <Select
                  className={errors.tickets ? "is-invalid" : ""}
                  value={tickets.filter((ticket: any) => data.tickets.includes(ticket.value))}
                  isMulti
                  onChange={(list: any) => {
                    setData(
                      "tickets",
                      list.map((item: any) => item.value)
                    );
                  }}
                  options={tickets}
                  classNamePrefix={errors.tickets ? "multi-select is-invalid" : "multi-select"}
                  styles={customStyles}
                  placeholder={t("Select tickets")}
                />
                {errors.tickets && (
                  <Form.Control.Feedback type="invalid">
                    {errors.tickets}
                  </Form.Control.Feedback>
                )}
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>

        <div className="modal-footer">
          <button type="button" className="btn btn-light" onClick={hide}>
            {t("Close")}
          </button>
          <button type="submit" className="btn btn-success" disabled={processing}>
            {processing ? (
              <span className="d-flex gap-1 align-items-center">
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                {isEdit ? t("Updating") : t("Creating")}
              </span>
            ) : (
              <span>{isEdit ? t("Update") : t("Create")}</span>
            )}
          </button>
        </div>
      </Form>
    </Modal>
  );
}
