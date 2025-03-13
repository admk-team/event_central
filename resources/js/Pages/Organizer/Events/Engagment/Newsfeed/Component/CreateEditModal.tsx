import { Link, useForm } from "@inertiajs/react";
import React, { useCallback, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Modal,
    Nav,
    Row,
    Spinner,
    Tab,
} from "react-bootstrap";

interface CreateModalProps {
    addNewsfeedModal: boolean;
    editPost: any;
    showModal: () => void;
}

function CreateModal({
    addNewsfeedModal,
    showModal,
    editPost,
}: CreateModalProps) {

    const isEdit = editPost != null ? true : false;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: editPost?.title || "",
        content: editPost?.content || "",
        image: editPost?.img || null,
        send_notification: editPost?.send_notitication || false,
        sending_date: editPost?.sending_date || null,
        sending_time: editPost?.sending_time || null,
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            put(
                route(
                    "organizer.events.engagement.newsfeed.update",
                    editPost.id
                ),
                {
                    onSuccess: () => {
                        reset();
                        showModal();
                        setPreview(null);
                    },
                }
            );
        } else {
            post(route("organizer.events.engagement.newsfeed.store", data), {
                onSuccess: () => {
                    reset();
                    showModal();
                },
            });
        }
    };

    const [preview, setPreview] = useState<any>(editPost?.img || null);
    const [schedulePost, setSchedulePost] = useState<any>(false);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setData({ ...data, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal
            className="modal-dialog-centered"
            centered
            show={addNewsfeedModal}
            onHide={() => showModal()}
            backdrop={"static"}
        >
            <Modal.Header>
                <h5 className="modal-title" id="staticBackdropLabel">
                    {isEdit ? "Update" : "Create"} Post
                </h5>
                <Button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                        showModal();
                    }}
                    aria-label="Close"
                ></Button>
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <form onSubmit={submit}>
                    <Row className="gy-3">
                        <Col md={12}>
                            <div className="">
                                <Form.Label
                                    htmlFor="title"
                                    className="form-label text-start w-100"
                                >
                                    Title
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter Title"
                                    value={data.title }
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block mt-2"
                                >
                                    {" "}
                                    {errors.title}{" "}
                                </Form.Control.Feedback>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="">
                                <Form.Label
                                    htmlFor="content"
                                    className="form-label text-start w-100"
                                >
                                    Content
                                </Form.Label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    placeholder="Enter content"
                                    value={data.content}
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block mt-2"
                                >
                                    {" "}
                                    {errors.content}{" "}
                                </Form.Control.Feedback>
                            </div>
                        </Col>

                        <FormGroup className="mb-3">
                            <label
                                htmlFor="logo-upload"
                                className="d-flex justify-content-center align-items-center"
                                style={{ cursor: "pointer" }}
                            >
                                <div
                                    className="overflow-hidden w-100 rounded-2"
                                    style={{
                                        // width: '170px',
                                        height: "170px",
                                        background: preview
                                            ? `url(${preview}) no-repeat center center / cover`
                                            : "#fff",
                                        border: "2px dashed #dee2e6", // Optional: Dashed border for better UX
                                    }}
                                >
                                    {!preview && (
                                        <span className="text-muted d-flex justify-content-center align-items-center h-100">
                                            Click to Upload Image
                                        </span>
                                    )}
                                </div>
                                <Form.Control
                                    type="file"
                                    id="logo-upload"
                                    className="d-none" // Hide the input but keep it functional
                                    onChange={handleImageChange}
                                    isInvalid={!!errors.image}
                                    accept="image/*" // Only accept image files
                                />
                            </label>
                            {errors.image && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.image}
                                </Form.Control.Feedback>
                            )}
                        </FormGroup>
                    </Row>
                    <Row className="g-3 align-items-center">
                        <Col md={5}>
                            <div className="">
                                <Form.Label
                                    htmlFor="name"
                                    className="form-label text-start w-100"
                                >
                                    Sending Date
                                </Form.Label>
                                <Flatpickr
                                    disabled={!schedulePost}
                                    className="form-control"
                                    options={{
                                        dateFormat: "d M, Y",
                                    }}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData: any) => ({
                                            ...prevData,
                                            sending_date: selectedDate
                                                .toLocaleDateString("en-CA")
                                                .split("T")[0],
                                        }));
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="">
                                <Form.Label
                                    htmlFor="name"
                                    className="form-label text-start w-100"
                                >
                                    Sending Time
                                </Form.Label>
                                <Flatpickr
                                    disabled={!schedulePost}
                                    className="form-control"
                                    options={{
                                        dateFormat: "H:i",
                                        enableTime: true,
                                        noCalendar: true,
                                    }}
                                    onChange={([selectedDate]: Date[]) => {
                                        if (selectedDate) {
                                            const hours = selectedDate
                                                .getHours()
                                                .toString()
                                                .padStart(2, "0");
                                            const minutes = selectedDate
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, "0");
                                            const time = `${hours}:${minutes}`;

                                            setData((prevData: any) => ({
                                                ...prevData,
                                                sending_time: time,
                                            }));
                                        }
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="form-check form-switch mt-3">
                                <Form.Check.Input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="schedulePost"
                                    value={schedulePost}
                                    onChange={(e) =>
                                        setSchedulePost(e.target.value)
                                    }
                                />
                                <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="schedulePost"
                                >
                                    Schedule Post
                                </Form.Check.Label>
                            </div>
                            <div className="form-check form-switch">
                                <Form.Check.Input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="sendNotification"
                                />
                                <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="sendNotification"
                                    onChange={(e: any) =>
                                        setData(
                                            "send_notification",
                                            e.target.value
                                        )
                                    }
                                >
                                    Send Notification
                                </Form.Check.Label>
                            </div>
                        </Col>
                        <Form.Control.Feedback
                            type="invalid"
                            className="d-block mt-2"
                        >
                            {" "}
                            {errors.sending_date}{" "}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback
                            type="invalid"
                            className="d-block mt-2"
                        >
                            {" "}
                            {errors.sending_time}{" "}
                        </Form.Control.Feedback>
                    </Row>

                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Button
                            disabled={processing}
                            className="btn btn-light"
                            onClick={() => showModal()}
                        >
                            Close
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {isEdit ? "Updateing" : "Posting"}
                                </span>
                            ) : (
                                <span>{isEdit ? "Update" : "Post Now"}</span>
                            )}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default CreateModal;
