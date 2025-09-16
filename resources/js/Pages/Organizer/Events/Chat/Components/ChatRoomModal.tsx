import React, { useState } from "react";
import {
    Modal,
    Button,
    Card,
    Row,
    Col,
    Form,
    FormGroup,
} from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";
import Select from "react-select";
import { customStyles } from "../../../../../common/data/customSelectStyles";
import { useForm } from "@inertiajs/react";

const ChatRoomModal = ({ showModal, hideModal, staff, attendees }: any) => {
    const { t } = useLaravelReactI18n();

    const [hideBothSection, setHideBothSection] = useState(false);
    const [hideAttendeeSection, setHideAttendeeSection] = useState(false);
    const [hideStaffSection, setHideStaffSection] = useState(false);

    const selectStaffOptions = [
        {
            options: (staff || [])
                .filter((s: any) => s)
                .map((event: any) => ({
                    label: event?.name ?? "",
                    value: event?.id ?? "",
                })),
        },
    ];
    const selectAttendeeOptions = [
        {
            options: (attendees || [])
                .filter((a: any) => a && a.id && a.name)
                .map((attendee: any) => ({
                    label: attendee.name,
                    value: attendee.id,
                })),
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "POST",
        type: "",
        name: "",
        members: [],
        image: null,
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route("organizer.events.chat.room"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                hideModal(false);
            },
        });
    };

    return (
        <Form onSubmit={submit} className="tablelist-form">
            <Modal
                show={showModal}
                onHide={() => hideModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("Create Room")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <Row>
                            <Col lg={6}>
                                <Card
                                    className="card-animate"
                                    onClick={() => {
                                        setHideBothSection(true);
                                        setData({
                                            ...data,
                                            type: "Staff",
                                            members: [],
                                        });
                                        setHideAttendeeSection(false);
                                        setHideStaffSection(true);
                                    }}
                                >
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h3 className="fw-medium text-muted mb-0">
                                                    {t("Staff Room")}
                                                </h3>
                                            </div>
                                            <div>
                                                <div className="avatar-sm flex-shrink-0">
                                                    <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                                        <i className="las la-users text-dark"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card
                                    className="card-animate"
                                    onClick={() => {
                                        setHideBothSection(true);
                                        setData({
                                            ...data,
                                            type: "Attendee",
                                            members: [],
                                        });
                                        setHideAttendeeSection(true);
                                        setHideStaffSection(false);
                                    }}
                                >
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h3 className="fw-medium text-muted mb-0">
                                                    {t("Attendee Room")}
                                                </h3>
                                            </div>
                                            <div>
                                                <div className="avatar-sm flex-shrink-0">
                                                    <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                                        <i className="las la-users text-dark"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        {errors.members && (
                            <Form.Control.Feedback type="invalid">
                                {errors.members}
                            </Form.Control.Feedback>
                        )}
                        {hideBothSection && (
                            <>
                                <FormGroup className="mb-3">
                                    <Form.Label className="form-label">
                                        {t("Room Name")}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
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

                                <FormGroup className="mb-3">
                                    <Form.Label className="form-label">
                                        {t("Room Image")}
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        className="form-control"
                                        onChange={(e: any) =>
                                            setData("image", e.target.files[0])
                                        }
                                        isInvalid={!!errors.image}
                                    />
                                    {errors.image && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.image}
                                        </Form.Control.Feedback>
                                    )}
                                </FormGroup>

                                {hideAttendeeSection && (
                                    <FormGroup className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Form.Label className="form-label">
                                                {t("Select Attendees")}
                                            </Form.Label>

                                            <Form.Check
                                                type="switch"
                                                id="select-all-attendees"
                                                label={t("Select All")}
                                                checked={
                                                    data.members?.length ===
                                                        attendees.length &&
                                                    attendees.length > 0
                                                }
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        // Select all staff
                                                        const allIds =
                                                            attendees.map(
                                                                (s: any) => s.id
                                                            );
                                                        setData(
                                                            "members",
                                                            allIds
                                                        );
                                                    } else {
                                                        // Clear selection
                                                        setData("members", []);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <Select
                                            value={attendees
                                                .filter((item: any) =>
                                                    data.members?.includes(
                                                        item.id
                                                    )
                                                )
                                                .map((event: any) => ({
                                                    label: event.name,
                                                    value: event.id,
                                                }))}
                                            options={selectAttendeeOptions}
                                            isMulti
                                            styles={customStyles}
                                            onChange={(selected: any) => {
                                                const memberIds = selected
                                                    ? selected.map(
                                                          (s: any) => s.value
                                                      )
                                                    : [];
                                                setData("members", memberIds);
                                            }}
                                        />
                                    </FormGroup>
                                )}

                                {hideStaffSection && (
                                    <FormGroup className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Form.Label className="form-label mb-0">
                                                {t("Select Staff")}
                                            </Form.Label>

                                            <Form.Check
                                                type="switch"
                                                id="select-all-staff"
                                                label={t("Select All")}
                                                checked={
                                                    data.members?.length ===
                                                        staff.length &&
                                                    staff.length > 0
                                                }
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        // Select all staff
                                                        const allIds =
                                                            staff.map(
                                                                (s: any) => s.id
                                                            );
                                                        setData(
                                                            "members",
                                                            allIds
                                                        );
                                                    } else {
                                                        // Clear selection
                                                        setData("members", []);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <Select
                                            value={staff
                                                .filter((item: any) =>
                                                    data.members?.includes(
                                                        item.id
                                                    )
                                                )
                                                .map((event: any) => ({
                                                    label: event.name,
                                                    value: event.id,
                                                }))}
                                            options={selectStaffOptions}
                                            isMulti
                                            styles={customStyles}
                                            onChange={(selected: any) => {
                                                const memberIds = selected
                                                    ? selected.map(
                                                          (s: any) => s.value
                                                      )
                                                    : [];
                                                setData("members", memberIds);
                                            }}
                                        />
                                    </FormGroup>
                                )}
                            </>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            reset();
                            setHideBothSection(false);
                            setHideAttendeeSection(false);
                            setHideStaffSection(false);
                            hideModal(false);
                        }}
                    >
                        {t("Cancel")}
                    </Button>

                    <Button
                        variant="primary"
                        disabled={!hideBothSection || processing}
                        onClick={submit}
                    >
                        {t("Create")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};

export default ChatRoomModal;
