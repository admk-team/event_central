import React, { useState } from "react";
import { Button, Container, Form, Image, Row, Col } from "react-bootstrap";
import useeImage from "../../../../../../../images/users/avatar-1.jpg";
import CreateEditModal from "./CreateEditModal";
import PollModal from "./PollModal";

function AddPost() {
    const [addNewsfeedModal, setAddNewsfeedModal] = useState(false);
    const [editPost, setEditPost] = React.useState<any>(null);
    const [postTitle, setPostTitle] = useState({ title: "" });

    const [pollModalShow, setPollModalShow] = useState(false);

    function showModal() {
        setAddNewsfeedModal(!addNewsfeedModal);
    }

    const handleOpenModal = () => setAddNewsfeedModal(true);

    const handleChange = (e: any) => {
        setPostTitle({
            ...postTitle,
            title: e.target.value,
        });
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
                            src={useeImage}
                            height={50}
                            width={50}
                            roundedCircle
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            value={postTitle.title}
                            onChange={handleChange}
                            placeholder="Write Title ...."
                            height={50}
                            className="border-0 fs-4"
                        />
                    </Col>
                </Row>
                <Row className="mt-2 align-items-center">
                    <Col>
                        <div 
                        style={{ marginLeft: "60px" }}
                        >
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
                                postTitle={postTitle.title}
                            />
                        </div>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="primary"
                            className="rounded-pill"
                            onClick={handleOpenModal}
                        >
                            Add Post
                        </Button>
                    </Col>
                </Row>
            </Container>

            <CreateEditModal
                addNewsfeedModal={addNewsfeedModal}
                showModal={showModal}
                editPost={editPost}
            />
        </React.Fragment>
    );
}

export default AddPost;
