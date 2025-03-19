import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Row,
    Table,
    Image,
    ProgressBar,
    Form,
} from "react-bootstrap";
import { Head, Link, useForm } from "@inertiajs/react";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import Layout from "../../../../../Layouts/Event";
import AddPost from "./Component/AddPost";
import { usePage } from "@inertiajs/react";
import DeleteModal from "../../../../../Components/Common/DeleteModal";
import EditModal from "./Component/EditModal";

function Index({ newsfeeds, events }: any) {
    const [deletePost, setDeletePost] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditPost, setshowEditPost] = React.useState<any>(null);
    const [showEditModal, setshowEditModal] = React.useState<any>(false);

    const deleteForm = useForm({
        _method: "DELETE",
    });

    const deleteAction = (event: any) => {
        setDeletePost(event);
        setShowDeleteConfirmation(true);
    };

    const editAction = (data: any) => {
        setshowEditPost(data);
        setshowEditModal(true);
    };

    const handleDelete = () => {
        deleteForm.post(
            route("organizer.events.engagement.newsfeed.destroy", deletePost)
        );
        setShowDeleteConfirmation(false);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Newsfeed | Organizer Dashboard</title>
                <meta
                    name="description"
                    content="Manage event Newsfeeds, edit details, and delete records from the organizer's dashboard."
                />
                <meta
                    name="keywords"
                    content="event Newsfeeds, Newsfeed management, conference Newsfeeds, admin dashboard"
                />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta
                    property="og:title"
                    content="Newsfeed | Organizer Dashboard"
                />
                <meta
                    property="og:description"
                    content="Manage event Newsfeeds, edit details, and delete records from the organizer's dashboard."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={route(
                        "organizer.events.engagement.newsfeed.index"
                    )}
                />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Posts" pageTitle="Dashboard" />
                    <Row>
                        <Col lg={6} className="mx-auto">
                            <AddPost
                                events={events[0]}
                                editPostData={showEditPost}
                            />
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col lg={6} className="mt-3">
                            {newsfeeds.length > 0 ? (
                                newsfeeds.map((post: any) => (
                                    <Card
                                        key={post.id}
                                        className="mb-4 shadow-sm"
                                    >
                                        <Card.Header>
                                            <div className="d-flex gap-2 justify-content-end">
                                                <span
                                                    className="link-primary cursor-pointer"
                                                    onClick={() =>
                                                        editAction(post)
                                                    }
                                                >
                                                    <i className="ri-edit-fill"></i>
                                                </span>
                                                <EditModal
                                                    show={showEditModal}
                                                    onHide={() =>
                                                        setshowEditModal(false)
                                                    }
                                                    editPost={showEditPost}
                                                />

                                                <span
                                                    className="link-danger cursor-pointer"
                                                    onClick={() =>
                                                        deleteAction(post.id)
                                                    }
                                                >
                                                    <i className="ri-delete-bin-5-line"></i>
                                                </span>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            {/* Post Header */}
                                            <div className="d-flex align-items-center mb-2">
                                                <Image
                                                    src={`/storage/${events[0].logo}`}
                                                    roundedCircle
                                                    width="40"
                                                    height="40"
                                                    className="me-2 thumbnail"
                                                />
                                                <div>
                                                    <strong>
                                                        {events[0].name}
                                                    </strong>
                                                    <div
                                                        className="text-muted"
                                                        style={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        {newsfeeds[0]
                                                            ?.sending_date &&
                                                        newsfeeds[0]
                                                            ?.sending_time
                                                            ? `${newsfeeds[0].sending_date} at ${newsfeeds[0].sending_time}`
                                                            : ""}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Post Title */}
                                            {post.title && (
                                                <h5 className="h5">
                                                    {post.title}
                                                </h5>
                                            )}

                                            {/* Post Content */}
                                            {post.content && (
                                                <p>{post.content}</p>
                                            )}

                                            {/* Post Image */}
                                            {post.image && (
                                                <div className="mb-2">
                                                    <Image
                                                        src={`/storage/${post.image}`}
                                                        alt="Post Image"
                                                        height="300"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {/* Post Poll (if available) */}
                                            {post.post_poll && (
                                                <div className="border rounded p-3 bg-light">
                                                    {(() => {
                                                        try {
                                                            const pollData =
                                                                post.post_poll?.trim() !==
                                                                ""
                                                                    ? JSON.parse(
                                                                          post.post_poll
                                                                      )
                                                                    : {
                                                                          options:
                                                                              [],
                                                                      };
                                                            const totalVotes = pollData.reduce((sum:number, poll:any) => sum + (poll.like.length || 0), 0);
                                                            return pollData.map(
                                                                (
                                                                    pollData: any,
                                                                    index: number
                                                                ) => {
                                                                    const likePercentage = totalVotes ? (pollData.like.length / totalVotes) * 100: 0;
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="my-3"
                                                                        >
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                {pollData.text ??
                                                                                    "N/A"}
                                                                                <span>
                                                                                    {pollData.like.length ||
                                                                                        0}{" "}Likes{" "}
                                                                                </span>
                                                                            </div>
                                                                            <ProgressBar>
                                                                                <ProgressBar
                                                                                    className="text-dark fw-bold"
                                                                                    now={
                                                                                        likePercentage
                                                                                    }
                                                                                    label={`${likePercentage.toFixed(
                                                                                        1
                                                                                    )}%`}
                                                                                    variant="success"
                                                                                    key={
                                                                                        1
                                                                                    }
                                                                                />
                                                                            </ProgressBar>
                                                                        </div>
                                                                    );
                                                                }
                                                            );
                                                        } catch (error) {
                                                            console.error(
                                                                "Error parsing poll data:",
                                                                error
                                                            );
                                                            return (
                                                                <p>
                                                                    Error
                                                                    loading poll
                                                                    data
                                                                </p>
                                                            );
                                                        }
                                                    })()}
                                                </div>
                                            )}

                                            {/* Like & Dislike Buttons */}
                                            <div className="d-flex justify-content-between mt-3">
                                                <label>
                                                    👍 {" "}
                                                    {post.likes && JSON.parse(post.likes).length > 0
                                                        ? `(${JSON.parse(post.likes).length})`
                                                        : `(0)`}
                                                </label>
                                                <label>
                                                    👎 {" "}
                                                    {post.dis_likes && JSON.parse(post.dis_likes).length > 0
                                                        ? `(${JSON.parse(post.dis_likes).length})`
                                                        : `(0)`}
                                                </label>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-center">
                                    No posts available.
                                </p>
                            )}
                        </Col>
                    </Row>
                </Container>

                <DeleteModal
                    show={showDeleteConfirmation}
                    onDeleteClick={handleDelete}
                    onCloseClick={() => {
                        setShowDeleteConfirmation(false);
                    }}
                />
            </div>
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
