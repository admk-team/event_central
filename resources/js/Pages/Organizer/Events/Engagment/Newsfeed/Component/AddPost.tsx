import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button, Container, Form, Image, Row, Col } from "react-bootstrap";
import useeImage from "../../../../../../../images/users/avatar-1.jpg";
import CreateEditModal from "./CreateEditModal";
import PollModal from "./PollModal";

function AddPost({ events, editPostData }: any) {
    const [addNewsfeedModal, setAddNewsfeedModal] = useState(false);
    const [editPost, setEditPost] = React.useState<any>(null);
    const [restPoll, setRestPoll] = useState(false);
    let isEdit = false;
    const [pollModalShow, setPollModalShow] = useState(false);
    function showModal() {
        setAddNewsfeedModal(!addNewsfeedModal);
    }

    if (editPostData) {
        isEdit = true;
    }

    const handleOpenModal = () => setAddNewsfeedModal(true);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: editPostData?.title || "",
        content: editPostData?.content || "",
        image: editPostData?.img || null,
        send_notification: editPostData?.send_notitication || false,
        sending_date: editPostData?.sending_date || null,
        sending_time: editPostData?.sending_time || null,
        post_poll: "",
    });
    const updateFormData = (key: string, value: string) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const submit = (e: any) => {
        e.preventDefault();
        if (isEdit) {
            put(
                route(
                    "organizer.events.engagement.newsfeed.update",
                    editPostData.id
                ),
                {
                    onSuccess: () => {
                        reset();
                        showModal();
                    },
                }
            );
        } else {
            post(route("organizer.events.engagement.newsfeed.store", data), {
                onSuccess: () => {
                    setRestPoll(true);
                    reset();
                },
            });
        }
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
                        <Form.Control
                            type="text"
                            value={data.title}
                            onChange={(e) =>
                                updateFormData("title", e.target.value)
                            }
                            placeholder="Write Title ...."
                            height={50}
                            className="border-0 fs-4"
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className="d-block mt-2"
                        >
                            {" "}
                            {errors.title}{" "}
                        </Form.Control.Feedback>
                    </Col>
                </Row>
                <Row className="mt-2 align-items-center">
                    <Col>
                        <div style={{ marginLeft: "60px" }}>
                            <i
                                className="bx bxs-image-add"
                                style={{ fontSize: "27px" }}
                                onClick={handleOpenModal}
                            ></i>
                            <i
                                className="bx bx-poll"
                                style={{ fontSize: "27px" }}
                                onClick={() => setPollModalShow(true)}
                            ></i>
                            <PollModal
                                show={pollModalShow}
                                handleClose={() => setPollModalShow(false)}
                                formData={data}
                                updateFormData={updateFormData}
                                restPoll={restPoll}
                                setRestPoll={setRestPoll}
                            />
                        </div>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="primary"
                            className="rounded-pill"
                            onClick={submit}
                        >
                            <span>{isEdit ? "Update Post" : "Add Post"}</span>
                        </Button>
                    </Col>
                </Row>
            </Container>

            <CreateEditModal
                addNewsfeedModal={addNewsfeedModal}
                showModal={showModal}
                formData={data}
                updateFormData={updateFormData}
                errors={errors}
            />
        </React.Fragment>
    );
}

export default AddPost;
