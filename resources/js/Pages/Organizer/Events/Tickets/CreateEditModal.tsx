import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Flatpickr from "react-flatpickr";
import ManageTypes from "./Components/ManageTypes";
import {
    Spinner,
    Col,
    Form,
    FormGroup,
    Modal,
    Nav,
    Row,
    Tab,
    Table,
    Button,
} from "react-bootstrap";
import Select, { StylesConfig } from "react-select";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditModal({
    show,
    hide,
    onHide,
    ticket,
    sessions,
    addons,
    fees,
    event_ticket_type,
}: {
    show: boolean;
    hide: () => void;
    onHide: () => void;
    ticket: any;
    sessions: any | null;
    addons: any;
    fees: any;
    event_ticket_type: any;
}) {
    const isEdit = ticket != null ? true : false;

    const { data, setData, post, put, processing, errors, reset, transform } =
        useForm({
            _method: isEdit ? "PUT" : "POST",
            event_app_id: ticket?.event_app_id ?? "",
            sessions: ticket?.selected_sessions ?? [],
            addons: ticket?.selected_addons?.map((item: any) => item.value) ?? [],
            fees: ticket?.fees ?? [],
            name: ticket?.name ?? "",
            description: ticket?.description ?? "",
            type: ticket?.ticket_type?.id ?? "",
            base_price: ticket?.base_price ?? "",
            increment_rate: ticket?.increment_rate ?? "",
            increment_type: ticket?.increment_type ?? "Fixed",
            start_increment: ticket?.start_increment ?? "",
            end_increment: ticket?.end_increment ?? "",
            show_on_attendee_side: ticket?.show_on_attendee_side ?? true,
            qty_total: ticket?.qty_total ?? null,

            bulk_purchase_status: ticket?.bulk_purchase_status ?? false,
            bulk_purchase_discount_type: ticket?.bulk_purchase_discount_type ?? [],
            bulk_purchase_discount_value: ticket?.bulk_purchase_discount_value ?? [],
            bulk_purchase_qty: ticket?.bulk_purchase_qty ?? [],

            // NEW FIELDS
            extra_service_name: ticket?.extra_service_name ?? "",
            // expects array of { name, quantity }
            extra_services: ticket?.extra_services ?? [],
        });
    console.log('error',errors)

    const [selectMulti, setselectMulti] = useState<any>(
        ticket?.selected_sessions ?? null
    );
    const [selectAllSession, setSelectAllSession] = useState<any>(false);

    const [selectAllAddons, setSelectAllAddons] = useState<any>(false);
    const [selectedFees, setSelectedFees] = useState<any>(ticket?.fees ?? []);

    // ---- Extra Services (dynamic rows) ----
    type ExtraService = { name: string; quantity: string };

    const [extraServices, setExtraServices] = useState<ExtraService[]>(
        Array.isArray(ticket?.extra_services) && ticket?.extra_services.length > 0
            ? ticket.extra_services
            : [{ name: "", quantity: "" }]
    );
    const [bulkDiscounts, setBulkDiscounts] = useState<BulkDiscount[]>(
        Array.isArray(ticket?.bulk_purchase_discount_type) &&
            Array.isArray(ticket?.bulk_purchase_discount_value) &&
            Array.isArray(ticket?.bulk_purchase_qty) &&
            ticket.bulk_purchase_discount_type.length > 0
            ? ticket.bulk_purchase_discount_type.map((t: string, i: number) => ({
                type: t,
                value: ticket.bulk_purchase_discount_value[i] ?? "",
                qty: ticket.bulk_purchase_qty[i] ?? "",
            }))
            : [{ type: "", value: "", qty: "" }]
    );
    // keep useForm's data in sync with local rows
    useEffect(() => {
        setData("extra_services", extraServices);
        setData("bulk_purchase_discount_type", bulkDiscounts.map((r) => r.type));
        setData("bulk_purchase_discount_value", bulkDiscounts.map((r) => r.value));
        setData("bulk_purchase_qty", bulkDiscounts.map((r) => r.qty));
    }, [extraServices, bulkDiscounts]);
    const addExtraServiceRow = () => {
        setExtraServices((prev) => [...prev, { name: "", quantity: "" }]);
    };

    const removeExtraServiceRow = (idx: number) => {
        setExtraServices((prev) => prev.filter((_, i) => i !== idx));
    };

    const updateExtraServiceField = (
        idx: number,
        field: keyof ExtraService,
        value: string
    ) => {
        setExtraServices((prev) =>
            prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
        );
    };

    const submit = (e: any) => {
        e.preventDefault();

        // ensure fees + extra services are cleanly shaped
        transform((formData) => {
            const cleanedServices = (extraServices || [])
                .map((r) => ({
                    name: (r.name ?? "").trim(),
                    quantity: (r.quantity ?? "").toString().trim(),
                }))
                .filter((r) => r.name !== "" || r.quantity !== "");
            const cleanedBulkDiscounts = (bulkDiscounts || [])
                .map((r) => ({
                    type: (r.type ?? "").trim(),
                    value: (r.value ?? "").toString().trim(),
                    qty: (r.qty ?? "").toString().trim(),
                }))
                .filter((r) => r.type !== "" && r.value !== "" && r.qty !== "");
            return {
                ...formData,
                fees: [...selectedFees],
                extra_service_name: formData.extra_service_name ?? "",
                extra_services: cleanedServices,
                bulk_purchase_discount_type: cleanedBulkDiscounts.map((r) => r.type),
                bulk_purchase_discount_value: cleanedBulkDiscounts.map((r) => r.value),
                bulk_purchase_qty: cleanedBulkDiscounts.map((r) => r.qty),
            };
        });

        if (isEdit) {
            post(route("organizer.events.tickets.update", ticket.id), {
                onSuccess: () => {
                    reset();
                    hide();
                },
            });
        } else {
            post(route("organizer.events.tickets.store"), {
                onSuccess: () => {
                    reset();
                    hide();
                },
            });
        }
    };

    const handleCheckChangeSession = (event: any) => {
        if (event.target.checked) {
            setselectMulti(sessions);
            setData("sessions", sessions);
            setSelectAllSession(true);
        } else {
            setselectMulti([]);
            setSelectAllSession(false);
        }
    };

    const handleCheckChangeAddon = (event: any) => {
        if (event.target.checked) {
            setData(
                "addons",
                addons.map((item: any) => item.value)
            );
            setSelectAllAddons(true);
        } else {
            setData("addons", []);
            setSelectAllAddons(false);
        }
    };

    const handleShowToAttendeeSwitchChange = (event: any) => {
        if (event.target.checked) {
            setData("show_on_attendee_side", true);
        } else {
            setData("show_on_attendee_side", false);
        }
    };

    const handleFeeCheckChanged = (e: any, fee: any) => {
        let list = [...selectedFees];
        if (e.target.checked) {
            if (!list.some((f) => f.id === fee.id)) {
                list.push(fee);
            }
        } else {
            list.splice(
                list.findIndex((f) => f.id === fee.id),
                1
            );
        }
        setSelectedFees([...list]);
        setData("fees", [...list]);
    };

    const handleSelectAllFeesChecked = (e: any) => {
        let list: any[] = [];
        if (e.target.checked) {
            fees.forEach((fee: any) => list.push(fee));
        }
        setSelectedFees([...list]);
        setData("fees", [...list]);
    };

    const checkFeeIsSelected = (fee: any) => {
        let list = [...selectedFees];
        return list.some((f) => f.id === fee.id);
    };

    // Style for Select 2
    const customStyles = {
        multiValue: (styles: any) => ({ ...styles }),
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
    } as StylesConfig;

    const [manageTypesModal, setmanageTypesModal] = useState(false);
    function showModal() {
        setmanageTypesModal(!manageTypesModal);
    }

    const [discountLabel, setDiscountLabel] = useState("Discount Value");

    const handleBluckPurchaseStatus = (event: any) => {
        if (event.target.checked) {
            setData("bulk_purchase_status", true);
            console.log(data.bulk_purchase_status)
        } else {
            setData("bulk_purchase_status", false);
            console.log(data.bulk_purchase_status)
        }
    };
          const { t } = useLaravelReactI18n();

    type BulkDiscount = {
        type: string;
        value: string | number;
        qty: string | number;
    };


    const addBulkDiscountRow = () => {
        setBulkDiscounts((prev) => [...prev, { type: "", value: "", qty: "" }]);
    };

    const removeBulkDiscountRow = (idx: number) => {
        setBulkDiscounts((prev) => prev.filter((_, i) => i !== idx));
    };

    const updateBulkDiscountField = (
        idx: number,
        field: keyof BulkDiscount,
        value: string | number
    ) => {
        setBulkDiscounts((prev) =>
            prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
        );
    };
    return (
        <>
            <Modal show={show} onHide={onHide} centered size="lg">
                <Modal.Header className="bg-light p-3" closeButton>
                    <h5 className="modal-title">
                        {isEdit ? t("Edit Ticket") : t("New Ticket")}
                    </h5>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={submit} className="tablelist-form">
                        <Row>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <Form.Label>{t("Name")}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        isInvalid={!!errors.name}
                                    />
                                    {errors.name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <Form.Label>{t("Base Price")}</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={data.base_price}
                                        onChange={(e) => setData("base_price", e.target.value)}
                                        isInvalid={!!errors.base_price}
                                    />
                                    {errors.base_price && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.base_price}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} lg={12}>
                                <FormGroup className="mb-3">
                                    <Form.Label>{t("Description")}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        isInvalid={!!errors.description}
                                    />
                                    {errors.description && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8}>
                                <FormGroup className="mb-3">
                                    <Form.Label>{t("Ticket Type")}</Form.Label>
                                    <Form.Select
                                        value={data.type}
                                        onChange={(e) => setData("type", e.target.value)}
                                        isInvalid={!!errors.type}
                                    >
                                        <option value={"0"}>{t("No Type")}</option>
                                        {event_ticket_type &&
                                            event_ticket_type.map((type: any) => (
                                                <option key={type.id || type} value={type.id || type}>
                                                    {type.name || type}
                                                </option>
                                            ))}
                                    </Form.Select>
                                    {errors.type && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.type}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={4} className="d-flex align-items-end">
                                <Button
                                    variant="secondary"
                                    className="mb-3"
                                    onClick={() => showModal()}
                                >
                                    {t("Manage Type")}
                                </Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} lg={6}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <Form.Label>{t("Increment Type")}</Form.Label>
                                            <Form.Select
                                                value={data.increment_type}
                                                onChange={(e) =>
                                                    setData("increment_type", e.target.value)
                                                }
                                                isInvalid={!!errors.increment_type}
                                            >
                                                <option value="Fixed">{t("Fixed")}</option>
                                                <option value="Percentage">{t("Percentage")}</option>
                                            </Form.Select>
                                            {errors.increment_type && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.increment_type}
                                                </Form.Control.Feedback>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <Form.Label>{t("Increment Rate")}</Form.Label>
                                            <Form.Control
                                                id="increment_rate"
                                                type="number"
                                                value={data.increment_rate}
                                                onChange={(e) =>
                                                    setData("increment_rate", e.target.value)
                                                }
                                                isInvalid={!!errors.increment_rate}
                                            />
                                            {errors.increment_rate && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.increment_rate}
                                                </Form.Control.Feedback>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={6} lg={6}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <Form.Label>{t("Start Date")}</Form.Label>
                                            <Flatpickr
                                                id="start_increment"
                                                options={{
                                                    altInput: true,
                                                    enableTime: true,
                                                    altFormat: "M d, Y",
                                                    dateFormat: "Y-m-d",
                                                }}
                                                value={data.start_increment}
                                                onChange={([selectedDate]: any) => {
                                                    if (!selectedDate) return;
                                                    const d = new Date(selectedDate);
                                                    const iso = d.toISOString().slice(0, 10);
                                                    setData((prev: any) => ({
                                                        ...prev,
                                                        start_increment: iso,
                                                    }));
                                                }}
                                            />
                                            {errors.start_increment && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.start_increment}
                                                </Form.Control.Feedback>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <Form.Label>{t("End Date")}</Form.Label>
                                            <Flatpickr
                                                id="end_increment"
                                                options={{
                                                    altInput: true,
                                                    altFormat: "M d, Y",
                                                    dateFormat: "Y-m-d",
                                                    enableTime: true,
                                                    minDate: data.start_increment,
                                                }}
                                                value={data.end_increment}
                                                onChange={([selectedDate]: any) => {
                                                    if (!selectedDate) return;
                                                    const d = new Date(selectedDate);
                                                    const iso = d.toISOString().slice(0, 10);
                                                    setData((prev: any) => ({
                                                        ...prev,
                                                        end_increment: iso,
                                                    }));
                                                }}
                                            />
                                            {errors.end_increment && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.end_increment}
                                                </Form.Control.Feedback>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <Form.Label>
                                        {t("Total Quantity (leave empty for unlimited)")}
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        step={1}
                                        min={0}
                                        value={data.qty_total}
                                        onChange={(e) => setData("qty_total", e.target.value)}
                                        isInvalid={!!errors.qty_total}
                                    />
                                    {errors.qty_total && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.qty_total}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <Form.Label>{t("Sold Quantity")}</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step={1}
                                        min={0}
                                        value={ticket?.qty_sold ?? 0}
                                        disabled={true}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col md={3} lg={3} className="d-flex align-items-center">
                                <FormGroup className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label={t("Select All Sessions")}
                                        id="select-all-sessions"
                                        onChange={handleCheckChangeSession}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={9} lg={9}>
                                <FormGroup className="mb-3">
                                    <Select
                                        placeholder={t("Select Event Sessions")}
                                        className={errors.sessions && "is-invalid"}
                                        value={selectMulti}
                                        isMulti={true}
                                        onChange={(list: any) => {
                                            setselectMulti(list);
                                            setData("sessions", list);
                                        }}
                                        options={sessions}
                                        classNamePrefix={
                                            errors.sessions && "multi-select is-invalid "
                                        }
                                        styles={customStyles}
                                    />
                                    {errors.sessions && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.sessions}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col md={3} lg={3} className="d-flex align-items-start">
                                <FormGroup className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label={t("Select All Add-ons")}
                                        id="select-all-addons"
                                        onChange={handleCheckChangeAddon}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={9} lg={9}>
                                <FormGroup className="mb-3">
                                    <Select
                                        placeholder={t("Select Add-ons")}
                                        className={errors.addons && "is-invalid"}
                                        value={addons.filter((item: any) =>
                                            data.addons.includes(item.value)
                                        )}
                                        isMulti={true}
                                        onChange={(list: any) => {
                                            setData(
                                                "addons",
                                                list.map((item: any) => item.value)
                                            );
                                        }}
                                        options={addons}
                                        classNamePrefix={
                                            errors.addons && "multi-select is-invalid "
                                        }
                                        styles={customStyles}
                                    />
                                    {errors.addons && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.addons}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* --- NEW: Extra Service Name (simple text field) --- */}
                        <Row className="mt-4">
                            <Col md={12}>
                                <FormGroup className="mb-3">
                                    <Form.Label>{t("Extra Service Name")}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={data.extra_service_name}
                                        onChange={(e) =>
                                            setData("extra_service_name", e.target.value)
                                        }
                                        placeholder={t("e.g. Hospitality Package")}
                                        isInvalid={!!errors.extra_service_name}
                                    />
                                    {errors.extra_service_name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.extra_service_name}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* --- NEW: Extra Services dynamic rows (Name + Quantity) --- */}
                        <Row className="mt-2">
                            <Col md={12}>
                                <FormGroup className="mb-2">
                                    <Form.Label className="mb-2">{t("Extra Services")}</Form.Label>

                                    {/* Header (desktop only) */}
                                    <div className="d-none d-md-flex fw-semibold mb-2">
                                        <div className="me-2" style={{ width: "55%" }}>
                                            {t("Name")}
                                        </div>
                                        <div className="me-2" style={{ width: "25%" }}>
                                            {t("Quantity")}
                                        </div>
                                        <div style={{ width: "20%" }}>&nbsp;</div>
                                    </div>

                                    {extraServices.map((row, idx) => (
                                        <div
                                            key={idx}
                                            className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 mb-2"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                value={row.name}
                                                onChange={(e) =>
                                                    updateExtraServiceField(idx, "name", e.target.value)
                                                }
                                                className="me-md-2"
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "none",
                                                    flex: "0 0 55%",
                                                }}
                                            />

                                            <Form.Control
                                                type="text"
                                                inputMode="numeric"
                                                placeholder={t("Quantity")}
                                                value={row.quantity}
                                                onChange={(e) =>
                                                    updateExtraServiceField(
                                                        idx,
                                                        "quantity",
                                                        e.target.value
                                                    )
                                                }
                                                className="me-md-2"
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "none",
                                                    flex: "0 0 25%",
                                                }}
                                            />

                                            <div style={{ flex: "0 0 10%" }}>
                                                <Button
                                                    variant="outline-danger"
                                                    className="w-100"
                                                    onClick={() => removeExtraServiceRow(idx)}
                                                    disabled={extraServices.length === 1}
                                                >
                                                    {t("Remove")}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <Button variant="outline-primary" onClick={addExtraServiceRow}>
                                        + {t("Add more")}
                                    </Button>

                                    {errors.extra_services && (
                                        <div className="invalid-feedback d-block">
                                            {errors.extra_services}
                                        </div>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col md={3} lg={3} className="d-flex align-items-start">
                                <FormGroup className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label={t("Select All Ticket Fee(s)")}
                                        id="select-all-fee"
                                        onChange={handleSelectAllFeesChecked}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={9} lg={9}>
                                <table className="table table-sm table-bordered">
                                    <thead className="table-primary ">
                                        <tr>
                                            <th className="d-flex justify-content-center">{t("Select")}</th>
                                            <th>{t("Fee Name")}</th>
                                            <th>{t("Value")}</th>
                                            <th>{t("Type")}</th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        style={{
                                            maxHeight: "100px",
                                            overflowY: "auto",
                                        }}
                                    >
                                        {fees &&
                                            fees.map((fee: any) => (
                                                <tr key={fee.id}>
                                                    <td className="d-flex justify-content-center">
                                                        <Form.Check
                                                            type="checkbox"
                                                            id={"select-all-fee-" + fee.id}
                                                            checked={checkFeeIsSelected(fee)}
                                                            onChange={(e) => handleFeeCheckChanged(e, fee)}
                                                        />
                                                    </td>
                                                    <td>{fee.name}</td>
                                                    <td>{fee.fee_amount}</td>
                                                    <td>
                                                        <span className="text-capitalize">
                                                            {fee.fee_type}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} lg={12}>
                                <FormGroup className="mb-3">
                                    <Form.Check
                                        checked={data.show_on_attendee_side}
                                        label={t("Show to Attendees for Purchase")}
                                        id="check-show-to-attendee"
                                        onChange={handleShowToAttendeeSwitchChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} lg={12}>
                                <FormGroup className="mb-3">
                                    <Form.Check
                                        checked={data.bulk_purchase_status}
                                        label={t("Bulk Purchase Discount")}
                                        id="bulk-purchase-=discount"
                                        onChange={handleBluckPurchaseStatus}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        {data.bulk_purchase_status == true && (
                            <>
                                {bulkDiscounts.map((row, index) => (
                                    <Row key={index}>
                                        <Col md={3}>
                                            <FormGroup className="mb-3">
                                                <Form.Label>{t("Discount Type")}</Form.Label>
                                                <Form.Select
                                                    value={row.type}
                                                    onChange={(e) =>
                                                        updateBulkDiscountField(index, "type", e.target.value)
                                                    }
                                                    isInvalid={!!errors.bulk_purchase_discount_type}
                                                >
                                                    <option value="">{t("Select Discount Type")}</option>
                                                    <option value="fixed">{t("Fixed")}</option>
                                                    <option value="percentage">{t("Percentage")}</option>
                                                </Form.Select>
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup className="mb-3">
                                                <Form.Label>
                                                    {row.type === "fixed"
                                                        ? t("Discount Value (Fixed)")
                                                        : row.type === "percentage"
                                                            ? t("Discount Value (%)")
                                                            : t("Discount Value")}
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={row.value}
                                                    onChange={(e) =>
                                                        updateBulkDiscountField(index, "value", e.target.value)
                                                    }
                                                    placeholder="e.g. 10"
                                                    isInvalid={!!errors.bulk_purchase_discount_value}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup className="mb-3">
                                                <Form.Label>{t("Quantity")}</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={row.qty}
                                                    onChange={(e) =>
                                                        updateBulkDiscountField(index, "qty", e.target.value)
                                                    }
                                                    placeholder={t("e.g. 5")}
                                                    isInvalid={!!errors.bulk_purchase_qty}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup className="mt-4">
                                                {index === 0 ? (
                                                    <Button variant="success" onClick={addBulkDiscountRow}>+</Button>
                                                ) : (
                                                    <Button variant="danger" onClick={() => removeBulkDiscountRow(index)}>-</Button>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        )}
                    </Form>
                </Modal.Body>

                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={hide}>
                        {t("Close")}
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                        disabled={processing}
                        onClick={submit}
                    >
                        {processing ? (
                            <span className="d-flex gap-1 align-items-center">
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {isEdit ? t("Updating") : t("Creating")}
                            </span>
                        ) : (
                            <span>{isEdit ? t("Update") : t("Create")}</span>
                        )}
                    </button>
                </div>
            </Modal>

            <ManageTypes
                manageTypesModal={manageTypesModal}
                showModal={showModal}
                partnerCategories={event_ticket_type}
            />
        </>
    );
}
