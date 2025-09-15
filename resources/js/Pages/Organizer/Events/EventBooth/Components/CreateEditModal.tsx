import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";
import Select from "react-select";

type Attendee = { id: number; name: string; email: string };
type Option = { value: number; label: string };

export default function CreateEditModal({
  show,
  hide,
  onHide,
  booth,
  attendees,
}: {
  show: boolean;
  hide: () => void;
  onHide: () => void;
  booth: any | null;
  attendees: Attendee[];
}) {
  const isEdit = booth != null;
  const { t } = useLaravelReactI18n();

  // Preselect attendee IDs for edit
  const preselectedIds: number[] =
    (booth?.selected_attendee_ids as number[] | undefined) ??
    (Array.isArray(booth?.attendees_badges) ? booth.attendees_badges.map((a: any) => a.id) : []) ??
    [];

  const { data, setData, post, processing, errors, reset } = useForm({
    _method: isEdit ? "PUT" : "POST",
    name: booth?.name ?? "",
    type: booth?.type ?? "booth",
    description: booth?.description ?? "",
    number: booth?.number ?? "",
    total_qty: booth?.total_qty ?? "",
    price: booth?.price ?? "",
    attendee_ids: preselectedIds, // multi-assign
    logo: null as File | null,
  });

  // Conditional visibility
  const isBooth = (data.type || "").toLowerCase() === "booth";
  const showLogoField = !isBooth;   // Poster shown for sponsor/banner
  const showNumberField = isBooth;  // Number shown only for booth

  // Clear hidden fields so we don't submit stale values
  const [logoKey, setLogoKey] = useState(0);
  useEffect(() => {
    if (isBooth) {
      if (data.logo) {
        setData("logo", null);
        setLogoKey((k) => k + 1);
      }
    } else {
      if (data.number !== "") {
        setData("number", "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBooth]);

  // Options for react-select
  const attendeeOptions = useMemo<Option[]>(
    () => (attendees || []).map((a) => ({ value: a.id, label: `${a.name} — ${a.email}` })),
    [attendees]
  );

  const selectedOptions = useMemo<Option[]>(
    () => attendeeOptions.filter((o) => (data.attendee_ids || []).includes(o.value)),
    [attendeeOptions, data.attendee_ids]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData("logo", file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", data._method);
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("description", data.description ?? "");
    formData.append("price", data.price?.toString() ?? "");
    formData.append("total_qty", data.total_qty?.toString() ?? "");
    // Only send number if visible for booth
    formData.append("number", showNumberField ? data.number?.toString() ?? "" : "");

    // Multi-assign attendees
    (data.attendee_ids || []).forEach((id: number) => {
      formData.append("attendee_ids[]", String(id));
    });

    if (showLogoField && data.logo) {
      formData.append("logo", data.logo);
    }

    if (isEdit) {
      post(route("organizer.booths.update", booth.id), {
        data: formData,
        preserveScroll: true,
        onSuccess: () => hide(),
      });
    } else {
      post(route("organizer.booths.store"), {
        data: formData,
        preserveScroll: true,
        onSuccess: () => {
          reset();
          hide();
        },
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="bg-light p-3" closeButton>
        <h5 className="modal-title">
          {isEdit ? t("Edit Booth / Sponsor Ad / Banner") : t("Add Booth / Sponsor Ad/ Banner")}
        </h5>
      </Modal.Header>

      <Form onSubmit={submit} className="tablelist-form">
        <Modal.Body>
          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Type")}</Form.Label>
            <Form.Select
              value={data.type}
              onChange={(e) => setData("type", e.target.value)}
              isInvalid={!!errors.type}
            >
              <option value="booth">{t("Booth")}</option>
              <option value="sponsor ad">{t("Sponsor Ad")}</option>
              <option value="banner">{t("Banner")}</option>
            </Form.Select>
            {errors.type && <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>}
          </FormGroup>

          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Name")}</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              isInvalid={!!errors.name}
            />
            {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
          </FormGroup>

          {/* Poster (logo) — only for sponsor/banner */}
          {showLogoField && (
            <FormGroup className="mb-3">
              <Form.Label className="form-label">{t("Poster")}</Form.Label>
              <Form.Control
                key={logoKey}
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                isInvalid={!!errors.logo}
              />
              {isEdit && booth?.logo && !data.logo && (
                <div className="mt-2">
                  <img src={`/storage/${booth.logo}`} alt="Current Logo" style={{ height: 40 }} />
                  <span className="ms-2">{t("Current Logo")}</span>
                </div>
              )}
              {errors.logo && <Form.Control.Feedback type="invalid">{errors.logo}</Form.Control.Feedback>}
            </FormGroup>
          )}

          {/* Number — only for booth */}
          {showNumberField && (
            <FormGroup className="mb-3">
              <Form.Label className="form-label">{t("Number")}</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                value={data.number}
                onChange={(e) => setData("number", parseInt(e.target.value) || "")}
                isInvalid={!!errors.number}
              />
              {errors.number && <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>}
            </FormGroup>
          )}

          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Total quantity")}</Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              value={data.total_qty}
              onChange={(e) => setData("total_qty", parseInt(e.target.value) || "")}
              isInvalid={!!errors.total_qty}
            />
            {errors.total_qty && <Form.Control.Feedback type="invalid">{errors.total_qty}</Form.Control.Feedback>}
          </FormGroup>

          {/* Multi-select attendees */}
          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Assign to Attendees")}</Form.Label>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={attendeeOptions}
              value={selectedOptions}
              onChange={(opts) => setData("attendee_ids", (opts || []).map((o: any) => o.value))}
              isClearable
              isSearchable
              isMulti
              placeholder={t("Search by name or email...")}
            />
            {errors.attendee_ids && (
              <div className="invalid-feedback d-block">{(errors as any).attendee_ids}</div>
            )}
            <div className="form-text">
              {t("Newly selected attendees will be assigned, emailed, and counted toward sold quantity.")}
            </div>
          </FormGroup>

          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Price")}</Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              value={data.price}
              onChange={(e) => setData("price", parseInt(e.target.value) || "")}
              isInvalid={!!errors.price}
            />
            {errors.price && <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>}
          </FormGroup>

          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Description")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="form-control"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              isInvalid={!!errors.description}
            />
            {errors.description && <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
          </FormGroup>
        </Modal.Body>

        <div className="modal-footer">
          <div className="hstack gap-2 justify-content-end">
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
        </div>
      </Form>
    </Modal>
  );
}
