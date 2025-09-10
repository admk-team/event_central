// resources/js/Pages/Organizer/Events/EventBooth/Components/CreateEditModal.tsx
import React, { useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";
import Select from "react-select";

type Attendee = { id: number; name: string; email: string };

type Option = {
  value: number;
  label: string;     // used for default searching
  name: string;      // lowercased name (for custom filter if you want)
  email: string;     // lowercased email
};

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

  const { data, setData, post, processing, errors, reset } = useForm({
    _method: isEdit ? "PUT" : "POST",
    name: booth?.name ?? "",
    type: booth?.type ?? "booth",
    description: booth?.description ?? "",
    number: booth?.number ?? "",
    price: booth?.price ?? "",
    attendee_id: booth?.attendee_id ?? "", // "" means unassigned
    logo: null as File | null,
  });

  // Build react-select options once
  const attendeeOptions = useMemo<Option[]>(
    () =>
      (attendees || []).map((a) => ({
        value: a.id,
        label: `${a.name} — ${a.email}`, // default search matches both
        name: (a.name || "").toLowerCase(),
        email: (a.email || "").toLowerCase(),
      })),
    [attendees]
  );

  // Compute selected option from current attendee_id
  const selectedOption = useMemo<Option | null>(() => {
    if (data.attendee_id === "" || data.attendee_id === null || data.attendee_id === undefined) return null;
    const id = Number(data.attendee_id);
    if (Number.isNaN(id)) return null;
    return attendeeOptions.find((o) => o.value === id) ?? null;
  }, [data.attendee_id, attendeeOptions]);

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
    formData.append("number", data.number?.toString() ?? "");
    formData.append("price", data.price?.toString() ?? "");

    // Always send attendee_id ("" => unassign => null server-side)
    formData.append("attendee_id", data.attendee_id === "" ? "" : String(data.attendee_id));

    if (data.logo) formData.append("logo", data.logo);

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
          <h5 className="modal-title">{isEdit ? t("Edit Booth / Sponsor Ad / Banner") : t("Add Booth / Sponsor Ad/ Banner")}</h5>
      </Modal.Header>

      <Form onSubmit={submit} className="tablelist-form">
        <Modal.Body>
          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Type")}</Form.Label>
            <Form.Select value={data.type} onChange={(e) => setData("type", e.target.value)} isInvalid={!!errors.type}>
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

          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Logo")}</Form.Label>
            <Form.Control
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              isInvalid={!!errors.logo}
            />
            {isEdit && booth?.logo && !data.logo && (
              <div className="mt-2">
                <img src={`/storage/${booth.logo}`} alt="Current Logo" style={{ width: 32, height: 32 }} />
                <span className="ms-2">{t("Current Logo")}</span>
              </div>
            )}
            {errors.logo && <Form.Control.Feedback type="invalid">{errors.logo}</Form.Control.Feedback>}
          </FormGroup>

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

          {/* Searchable single-select for attendee */}
          <FormGroup className="mb-3">
            <Form.Label className="form-label">{t("Assign to Attendee")}</Form.Label>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={attendeeOptions}
              value={selectedOption}
              onChange={(opt) => setData("attendee_id", opt ? (opt as Option).value : "")}
              isClearable
              isSearchable
              // single-select (user can select only one)
              // isMulti={false} // default is false, so this is optional
              placeholder={t("Search by name or email...")}
              // Default search already matches `label` (we included name + email),
              // but you can further customize:
              // filterOption={(option, raw) => {
              //   const q = raw.toLowerCase();
              //   const o = option.data as Option;
              //   return (
              //     option.label.toLowerCase().includes(q) ||
              //     o.name.includes(q) ||
              //     o.email.includes(q)
              //   );
              // }}
            />
            {errors.attendee_id && (
              <div className="invalid-feedback d-block">{errors.attendee_id}</div>
            )}
            <div className="form-text">
              {t("If you select an attendee, the booth will be marked Soldout automatically.")}
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
