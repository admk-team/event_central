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
    // console.log(fees);

    const isEdit = ticket != null ? true : false;

    const { data, setData, post, put, processing, errors, reset, transform } =
        useForm({
            _method: isEdit ? "PUT" : "POST",
            event_app_id: ticket?.event_app_id ?? "",
            sessions: ticket?.selected_sessions ?? [],
            addons: ticket?.selected_addons.map((item: any) => item.value) ?? [],
            fees: ticket?.fees ?? [],
            name: ticket?.name ?? "",
            description: ticket?.description ?? "",
            type: ticket?.ticket_type?.id ?? "",

            base_price: ticket?.base_price ?? "",

            increment_by: ticket?.increment_by ?? "",
            increment_rate: ticket?.increment_rate ?? "",
            increment_type: ticket?.increment_type ?? "Percentage",
            start_increment: ticket?.start_increment ?? "",
            end_increment: ticket?.end_increment ?? "",
            show_on_attendee_side: ticket?.show_on_attendee_side ?? true,
        });

    const [selectMulti, setselectMulti] = useState<any>(
        ticket?.selected_sessions ?? null
    );
    const [selectAllSession, setSelectAllSession] = useState<any>(false);

    const [selectAllAddons, setSelectAllAddons] = useState<any>(false);
    const [selectedFees, setSelectedFees] = useState<any>(ticket?.fees ?? []);

    const submit = (e: any) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            fees: [...selectedFees],
        }));
        console.log(data);
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
            setData("addons", addons.map((item: any) => item.value));
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
        // e.preventDefault();
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
        console.log(list, fee.id);
    };

    const handleSelectAllFeesChecked = (e: any) => {
        let list = Array<any>();
        if (e.target.checked) {
            fees.forEach((fee: any) => {
                list.push(fee);
            });
        } else {
            list = [];
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
        multiValue: (styles: any, { data }: any) => {
            return {
                ...styles,
                // backgroundColor: "#3762ea",
            };
        },
        multiValueLabel: (styles: any, { data }: any) => ({
            ...styles,
            backgroundColor: "var(--vz-secondary-bg-subtle)",
            color: "black",
        }),
        multiValueRemove: (styles: any, { data }: any) => ({
            ...styles,
            color: "black",
            backgroundColor: "var(--vz-secondary-bg-subtle)",
            ":hover": {
                backgroundColor: "var(--vz-secondary-bg-subtle)",
                color: "dark",
            },
        }),
    };
    const [manageTypesModal, setmanageTypesModal] = useState(false);
    function showModal() {
        setmanageTypesModal(!manageTypesModal);
    }

    return (
        <>
            <Modal show={show} onHide={onHide} centered size="lg">
                <Modal.Header className="bg-light p-3" closeButton>
                    <h5 className="modal-title">
                        {isEdit ? "Edit Ticket" : "New Ticket"}
                    </h5>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={submit} className="tablelist-form">
                        <Row>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
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
                                    <Form.Label>Base Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={data.base_price}
                                        onChange={(e) =>
                                            setData("base_price", e.target.value)
                                        }
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
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        rows={5}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
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
                                    <Form.Label>Ticket Type</Form.Label>
                                    <Form.Select
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        isInvalid={!!errors.type}
                                    >
                                        <option value={"0"}>No Type</option>
                                        {event_ticket_type &&
                                            event_ticket_type.map((type: any) => (
                                                <option
                                                    key={type.id || type}
                                                    value={type.id || type}
                                                >
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
                                <Button variant="secondary" className="mb-3" onClick={() => showModal()}>
                                    Manage Type
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} lg={6}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Increment By</Form.Label>
                                            <Form.Control
                                                id="increment_by"
                                                type="number"
                                                value={data.increment_by}
                                                onChange={(e) =>
                                                    setData(
                                                        "increment_by",
                                                        e.target.value
                                                    )
                                                }
                                                isInvalid={!!errors.increment_by}
                                            />
                                            {errors.increment_by && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.increment_by}
                                                </Form.Control.Feedback>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Increment Rate</Form.Label>
                                            <Form.Control
                                                id="increment_rate"
                                                type="number"
                                                value={data.increment_rate}
                                                onChange={(e) =>
                                                    setData(
                                                        "increment_rate",
                                                        e.target.value
                                                    )
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
                                            <Form.Label>Start Date</Form.Label>
                                            <Flatpickr
                                                id="start_increment"
                                                options={{
                                                    altInput: true,
                                                    enableTime: true,
                                                    // altFormat: "M d, Y h:i K",
                                                    altFormat: "M d, Y",
                                                    dateFormat: "Y-m-d",
                                                }}
                                                value={data.start_increment}
                                                onChange={([
                                                    selectedDate,
                                                ]: Date[]) => {
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        start_increment:
                                                            selectedDate
                                                                .toLocaleDateString(
                                                                    "en-CA"
                                                                )
                                                                .split("T")[0],
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
                                            <Form.Label>End Date</Form.Label>
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
                                                onChange={([
                                                    selectedDate,
                                                ]: Date[]) => {
                                                    setData((prevData) => ({
                                                        ...prevData,
                                                        end_increment: selectedDate
                                                            .toLocaleDateString(
                                                                "en-CA"
                                                            )
                                                            .split("T")[0],
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
                            <Col
                                md={3}
                                lg={3}
                                className="d-flex align-items-center"
                            >
                                <FormGroup className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Select All Sessions"
                                        id="select-all-sessions"
                                        onChange={handleCheckChangeSession}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={9} lg={9}>
                                <FormGroup className="mb-3">
                                    {/* <Form.Label>Sessions</Form.Label> */}
                                    <Select
                                        placeholder="Select Event Sessions"
                                        className={errors.sessions && "is-invalid"}
                                        value={selectMulti}
                                        isMulti={true}
                                        onChange={(list: any) => {
                                            setselectMulti(list);
                                            setData("sessions", list);
                                        }}
                                        options={sessions}
                                        classNamePrefix={
                                            errors.sessions &&
                                            "multi-select is-invalid "
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
                                        label="Select All Add-ons"
                                        id="select-all-addons"
                                        onChange={handleCheckChangeAddon}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={9} lg={9}>
                                <FormGroup className="mb-3">
                                    {/* <Form.Label>Sessions</Form.Label> */}
                                    <Select
                                        placeholder="Select Add-ons"
                                        className={errors.addons && "is-invalid"}
                                        value={addons.filter((item: any) => data.addons.includes(item.value))}
                                        isMulti={true}
                                        onChange={(list: any) => {
                                            setData("addons", list.map((item: any) => item.value));
                                        }}
                                        options={addons}
                                        classNamePrefix={
                                            errors.addons &&
                                            "multi-select is-invalid "
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
                        <Row className="mt-4">
                            <Col md={3} lg={3} className="d-flex align-items-start">
                                <FormGroup className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Select All Ticket Fee(s)"
                                        id="select-all-fee"
                                        onChange={handleSelectAllFeesChecked}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={9} lg={9}>
                                <table className="table table-sm table-bordered">
                                    <thead className="table-primary ">
                                        <tr>
                                            <th className="d-flex justify-content-center">
                                                Select
                                            </th>
                                            <th>Fee Name</th>
                                            <th>Value</th>
                                            <th>Type</th>
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
                                                            id={
                                                                "select-all-fee-" +
                                                                fee.id
                                                            }
                                                            checked={checkFeeIsSelected(
                                                                fee
                                                            )}
                                                            onChange={(e) =>
                                                                handleFeeCheckChanged(
                                                                    e,
                                                                    fee
                                                                )
                                                            }
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
                                        // type='check'
                                        checked={data.show_on_attendee_side}
                                        label="Show to Attendees for Purchase"
                                        id="check-show-to-attendee"
                                        onChange={handleShowToAttendeeSwitchChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={hide}>
                        Close
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
                                {isEdit ? "Updating" : "Creating"}
                            </span>
                        ) : (
                            <span>{isEdit ? "Update" : "Create"}</span>
                        )}
                    </button>
                </div>
            </Modal>
            <ManageTypes manageTypesModal={manageTypesModal}
                        showModal={showModal}
                            partnerCategories={event_ticket_type}/>
        </>
    );
}
