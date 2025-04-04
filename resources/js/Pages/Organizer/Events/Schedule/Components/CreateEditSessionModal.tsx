import { useForm, usePage } from "@inertiajs/react";
import Flatpickr from "react-flatpickr";
import {
    Spinner,
    Col,
    Form,
    FormGroup,
    Modal,
    Nav,
    Row,
    Tab,
} from "react-bootstrap";
import { useState } from "react";
import Select from "react-select";

export default function CreateEditSessionModal({
    show,
    hide,
    onHide,
    eventSession,
    selectedDate,
    selectedPlatform,
}: {
    show: boolean;
    hide: () => void;
    onHide: () => void;
    eventSession: any;
    selectedDate: any;
    selectedPlatform: any;
}) {
    const isEdit = eventSession != null ? true : false;
    const [enablePost, setEnablePost] = useState<boolean>(false);
    const speakers = usePage().props.speakers as any;

    const customStyles = {
        multiValue: (styles: any, { data }: any) => {
            return {
                ...styles,
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

    // Initialize selected speakers from eventSpeakers relationship when editing
    const [selectedSpeakers, setSelectedSpeakers] = useState<any>(() => {
        if (isEdit && eventSession?.event_speakers?.length > 0) {
            return eventSession.event_speakers.map((speaker: any) => ({
                value: speaker.id,
                label: speaker.name,
            }));
        }
        return [];
    });

    const speakerOptions = speakers.map((speaker: any) => ({
        value: speaker.id,
        label: speaker.name,
    }));

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: eventSession?.name ?? "",
        event_speaker_id: isEdit && eventSession?.event_speakers?.length > 0
            ? eventSession.event_speakers.map((speaker: any) => speaker.id)
            : [],
        event_platform_id: selectedPlatform.id,
        event_date_id: selectedDate?.id,
        type: eventSession?.type ?? "Session",
        description: eventSession?.description ?? "",
        capacity: eventSession?.capacity ?? "",
        start_time: eventSession?.start_time ?? "00:00",
        end_time: eventSession?.end_time ?? "00:00",
        qa_status: eventSession?.qa_status ?? 0,
        posts: eventSession?.posts ?? false,
    });

    const submit = (e: any) => {
        e.preventDefault();
        console.log(data);
        if (isEdit) {
            post(route("organizer.events.schedule.update", eventSession.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    hide();
                },
            });
        } else {
            post(route("organizer.events.schedule.store", data), {
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
                    {isEdit ? "Edit Session" : "Add Session"}
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label>Name</Form.Label>
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

                    <Tab.Container defaultActiveKey={data.type}>
                        <Nav
                            variant="tabs"
                            className="nav-tabs nav-justified mb-3"
                        >
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="Session"
                                    onClick={() => setData("type", "Session")}
                                >
                                    Session
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="Workshop"
                                    onClick={() => setData("type", "Workshop")}
                                >
                                    Workshop
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="Break"
                                    onClick={() => setData("type", "Break")}
                                >
                                    Break
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Tab.Container>

                    <FormGroup className="mb-3">
                        {(data.type === "Session" ||
                            data.type === "Workshop") && (
                            <>
                                <Row className="mt-3 mb-3">
                                    <Col md={6}>
                                        <Form.Check
                                            type="switch"
                                            id="qa-status-switch"
                                            label="Q&A Status"
                                            checked={!!data.qa_status}
                                            onChange={(e) =>
                                                setData(
                                                    "qa_status",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        {errors.qa_status && (
                                            <Form.Text className="text-danger">
                                                {errors.qa_status}
                                            </Form.Text>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-check form-switch">
                                            <Form.Check.Input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="schedulePost"
                                                checked={data.posts}
                                                onChange={(e) =>
                                                    setData(
                                                        "posts",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <Form.Check.Label
                                                className="form-check-label"
                                                htmlFor="schedulePost"
                                            >
                                                {data.posts
                                                    ? "Disable Posts"
                                                    : "Enable Posts"}
                                            </Form.Check.Label>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        )}
                        <Row>
                            <Col md={6}>
                                <Form.Label className="form-label mb-0">
                                    Start Time
                                </Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                    }}
                                    value={data.start_time}
                                    onChange={([selectedDate]: Date[]) => {
                                        if (selectedDate) {
                                            setData(
                                                "start_time",
                                                selectedDate.toLocaleTimeString(
                                                    "en-GB",
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )
                                            );
                                        }
                                    }}
                                />
                                {errors.start_time && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.start_time}
                                    </Form.Control.Feedback>
                                )}
                            </Col>
                            <Col md={6}>
                                <Form.Label className="form-label mb-0">
                                    End Time
                                </Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                    }}
                                    value={data.end_time}
                                    onChange={([selectedDate]: Date[]) => {
                                        if (selectedDate) {
                                            setData(
                                                "end_time",
                                                selectedDate.toLocaleTimeString(
                                                    "en-GB",
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )
                                            );
                                        }
                                    }}
                                />
                                {errors.end_time && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.end_time}
                                    </Form.Control.Feedback>
                                )}
                            </Col>
                        </Row>
                    </FormGroup>

                    {(data.type === "Session" || data.type === "Workshop") && (
                        <>
                            <FormGroup className="mb-3">
                                <Form.Label className="form-label">
                                    Select Event Speakers
                                </Form.Label>
                                <Select
                                    placeholder="Select Event Speakers"
                                    className={
                                        errors.event_speaker_id && "is-invalid"
                                    }
                                    value={selectedSpeakers}
                                    isMulti={true}
                                    onChange={(selectedOptions: any) => {
                                        setSelectedSpeakers(selectedOptions);
                                        const speakerIds = selectedOptions.map(
                                            (option: any) => option.value
                                        );
                                        setData("event_speaker_id", speakerIds);
                                    }}
                                    options={speakerOptions}
                                    classNamePrefix={
                                        errors.event_speaker_id &&
                                        "multi-select is-invalid"
                                    }
                                    styles={customStyles}
                                />
                                {errors.event_speaker_id && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block"
                                    >
                                        {errors.event_speaker_id}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                        </>
                    )}

                    {(data.type === "Session" || data.type === "Workshop") && (
                        <FormGroup className="mb-3">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control
                                type="number"
                                value={data.capacity}
                                onChange={(e) =>
                                    setData("capacity", e.target.value)
                                }
                                isInvalid={!!errors.capacity}
                            />
                            {errors.capacity && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.capacity}
                                </Form.Control.Feedback>
                            )}
                        </FormGroup>
                    )}

                    {(data.type === "Break" ||
                        data.type === "Lecture" ||
                        data.type === "Workshop") && (
                        <FormGroup className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
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
                    )}
                </Modal.Body>

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={hide}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={processing}
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
            </Form>
        </Modal>
    );
}