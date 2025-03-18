import { Link, useForm } from "@inertiajs/react";
import React, { useCallback, useRef, useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import { Button, Col, Form, FormGroup, Modal, Row } from "react-bootstrap";

function EditModal({ show, onHide, editPost }: any) {
    const [preview, setPreview] = useState<any>(null);
    const [schedulePost, setSchedulePost] = useState<any>(false);
    const [options, setOptions] = useState([{ text: "", like: 0, dislike: 0 }]);
    const [pollData, setPollData] = useState(true);

    const { data, setData, put, processing, errors, reset } = useForm({
        title: editPost?.title || "",
        content: editPost?.content || "",
        image: editPost?.img || null,
        send_notification: editPost?.send_notitication || false,
        sending_date: editPost?.sending_date || null,
        sending_time: editPost?.sending_time || null,
        post_poll: editPost?.post_poll || "",
    });

    useEffect(() => {
        if (editPost) {
            setData({
                title: editPost.title || "",
                content: editPost.content || "",
                image: editPost.img || null,
                send_notification: editPost.send_notitication || false,
                sending_date: editPost.sending_date || null,
                sending_time: editPost.sending_time || null,
                post_poll: editPost?.post_poll || "",
            });
            setPreview(editPost.img);
            setOptions(JSON.parse(editPost.post_poll) ?? []);
        }
    }, [editPost]);

    if (!editPost) return null;

    const submit = (e: any) => {
        e.preventDefault();
        console.log(data)
        put(route("organizer.events.engagement.newsfeed.update", editPost.id), {
            onSuccess: () => {
                reset();
                onHide();
            },
            onError: (error) => {
                console.error("Error:", error);
            },
        });
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addOption = () => {
        setOptions([...options, { text: "", like: 0, dislike: 0 }]);
    };

    // Handle option change
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = options.map((option, i) =>
            i === index ? { ...option, text: value } : option
        );
        setOptions(newOptions);
        setData("post_poll", JSON.stringify(options));
    };

    const clearPoll = () => {
        setData("post_poll", "");
        setOptions([{ text: "", like: 0, dislike: 0 }]);
        setPollData(false);
    };

    return (
        <Modal
            className="modal-dialog-centered"
            centered
            show={show}
            onHide={onHide}
            backdrop={"static"}
        >
            <Modal.Header>
                <h5 className="modal-title" id="staticBackdropLabel">
                    Update Post
                </h5>
                <Button
                    type="button"
                    className="btn-close"
                    onClick={onHide}
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
                                    value={data.title}
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
                                    value={
                                        data.sending_date
                                            ? new Date(data.sending_date)
                                            : ""
                                    }
                                    onChange={([selectedDate]: Date[]) => {
                                        setData(
                                            "sending_date",
                                            selectedDate
                                                .toLocaleDateString("en-CA")
                                                .split("T")[0]
                                        );
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
                                    value={data.sending_time || ""}
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
                                            setData("sending_time", time);
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
                    <Row>
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
                        {pollData && (
                            <FormGroup className="mb-3">
                                {options.map((option, index) => (
                                    <Form.Group key={index} className="mt-2">
                                        <Form.Control
                                            type="text"
                                            placeholder={`Option ${index + 1}`}
                                            value={option.text}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                ))}

                                <Button
                                    variant="outline-primary"
                                    onClick={addOption}
                                    className="mt-2"
                                >
                                    + Add Option
                                </Button>
                                {options.length > 0 ? (
                                    <Button
                                        variant="outline-primary"
                                        onClick={clearPoll}
                                        className="mt-2 ms-2"
                                    >
                                        Remove
                                    </Button>
                                ) : null}
                            </FormGroup>
                        )}
                    </Row>

                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Button className="btn btn-light" onClick={onHide}>
                            Close
                        </Button>
                        <Button type="submit">
                            <span>Update</span>
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditModal;
