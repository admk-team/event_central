import React, { useState, useEffect, useRef } from "react";
import { Link, useForm } from "@inertiajs/react";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Image,
    Row,
} from "react-bootstrap";
import Flatpickr from "react-flatpickr";

function AddPost({ events, editPost, session_id }: any) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<any>();
    const [schedulePost, setSchedulePost] = useState<any>(false);
    const [options, setOptions] = useState([{ text: "", like: [] }]);
    const [pollData, setPollData] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
        image: editPost?.image || null,
        send_notification: false,
        sending_date: null,
        sending_time: null,
        post_poll: "",
        session_id: session_id,
    });

    useEffect(() => {
        if (session_id) {
            setData("session_id", session_id);
        }
    }, [session_id]);

    const updateFormData = (key: string, value: string) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const submit = (e: any) => {
        e.preventDefault();
        console.log(data);
        post(route("organizer.posts.store", data), {
            onSuccess: () => {
                Clearfields();
            },
        });
    };

    const Clearfields = () => {
        clearPoll();
        setData({
            title: "",
            content: "",
            image: null,
            send_notification: false,
            sending_date: null,
            sending_time: null,
            session_id: session_id
        });
        setSchedulePost(false)
        setPreview("");
    };

    const handleIconClick = () => {
        fileInputRef.current?.click(); // Opens file picker
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files?.[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearPoll = () => {
        setData("post_poll", "");
        setOptions([{ text: "", like: [] }]);
        setPollData(false);
    };

    const showPoll = () => {
        setPollData(true);
    };

    // Add a new option
    const addOption = () => {
        if (options.length < 4) {
            setOptions([...options, { text: "", like: [] }]);
        }
    };

    // Handle option change
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = options.map((option, i) =>
            i === index ? { ...option, text: value } : option
        );
        setOptions(newOptions);
        setData("post_poll", JSON.stringify(options));
    };

    return (
        <React.Fragment>
            <Container
                className="p-3 border rounded shadow-sm"
                style={{ backgroundColor: "white" }}
            >
                <Row className="align-items-start">
                    <Col xs="auto">
                        <Image
                            src={`/storage/${events.logo}`}
                            roundedCircle
                            width="40"
                            height="40"
                            className="me-2 thumbnail"
                        />
                    </Col>
                    <Col>
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
                                                updateFormData(
                                                    "title",
                                                    e.target.value
                                                )
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
                                                updateFormData(
                                                    "content",
                                                    e.target.value
                                                )
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
                                            onChange={([
                                                selectedDate,
                                            ]: Date[]) => {
                                                updateFormData(
                                                    "sending_date",
                                                    selectedDate
                                                        .toLocaleDateString(
                                                            "en-CA"
                                                        )
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
                                            onChange={([
                                                selectedDate,
                                            ]: Date[]) => {
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
                                                    updateFormData(
                                                        "sending_time",
                                                        time
                                                    );
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
                                                updateFormData(
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
                            <FormGroup className="mb-3">
                                <label
                                    htmlFor="logo-upload"
                                    className="d-flex justify-content-center align-items-center"
                                    style={{ cursor: "pointer" }}
                                >
                                    {preview ? (
                                        <div
                                            className="overflow-hidden w-100 rounded-2"
                                            style={{
                                                height: "170px",
                                                background: `url(${preview}) no-repeat center center / cover`,
                                                border: "2px dashed #dee2e6",
                                            }}
                                        ></div>
                                    ) : null}
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
                                        <Form.Group
                                            key={index}
                                            className="mt-2"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder={`Option ${
                                                    index + 1
                                                }`}
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

                                    {options.length < 4 ? (
                                        <Button
                                            variant="outline-primary"
                                            onClick={addOption}
                                            className="mt-2"
                                        >
                                            + Add Option
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline-primary"
                                            disabled
                                            className="mt-2"
                                        >
                                            + Add Option
                                        </Button>
                                    )}
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
                            <Row className="mt-2 align-items-center">
                                <Col>
                                    <div>
                                        <i
                                            className="bx bxs-image-add"
                                            style={{ fontSize: "27px" }}
                                            onClick={handleIconClick}
                                        ></i>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <i
                                            className="bx bx-poll"
                                            style={{ fontSize: "27px" }}
                                            onClick={showPoll}
                                        ></i>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="rounded-pill"
                                        disabled={processing}
                                    >
                                        <span>Add Post</span>
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default AddPost;
