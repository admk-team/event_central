import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Table, Image } from "react-bootstrap";
import { Head, Link, useForm } from "@inertiajs/react";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import Layout from "../../../../../Layouts/Event";
import AddPost from "./Component/AddPost";
import { usePage } from "@inertiajs/react";

function Index({ newsfeeds }: any) {
    const [deleteNewsfeed, setDeleteNewsfeed] = React.useState<any>(null);
    const [editPost, setEditPost] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] =
        useState(false);

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
                    <BreadCrumb title="Newsfeed" pageTitle="Dashboard" />
                    <Row>
                        <Col lg={7} className="mx-auto">
                            <AddPost />
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col lg={7} className="mt-3">
                            {newsfeeds.length > 0 ? (
                                newsfeeds.map((post: any) => (
                                    <Card
                                        key={post.id}
                                        className="mb-4 shadow-sm"
                                    >
                                        <Card.Body>
                                            {/* Post Header */}
                                            <div className="d-flex align-items-center mb-2">
                                                <Image
                                                    src="/default-avatar.png"
                                                    roundedCircle
                                                    width="40"
                                                    height="40"
                                                    className="me-2"
                                                />
                                                <div>
                                                    <strong>Organizer</strong>
                                                    <div
                                                        className="text-muted"
                                                        style={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        {post.sending_date} at{" "}
                                                        {post.sending_time}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Post Title */}
                                            {post.title && (
                                                <h5 className="fw-bold">
                                                    {post.title}
                                                </h5>
                                            )}

                                            {/* Post Image */}
                                            {post.image && (
                                                <div className="mb-2">
                                                    <Image
                                                        src={`${window.location.origin}/storage/${post.image}`}
                                                        alt="Post Image"
                                                        className="w-100 rounded"
                                                    />
                                                </div>
                                            )}

                                            {/* Post Content */}
                                            {post.content && (
                                                <p>{post.content}</p>
                                            )}

                                            {/* Post Poll (if available) */}
                                            {post.post_poll && (
                                                <div className="border rounded p-3 bg-light">
                                                    <strong>
                                                        {
                                                            JSON.parse(
                                                                post.post_poll
                                                            ).question
                                                        }
                                                    </strong>
                                                    {JSON.parse(
                                                        post.post_poll
                                                    ).options.map(
                                                        (
                                                            option: any,
                                                            index: number
                                                        ) => (
                                                            <div
                                                                key={index}
                                                                className="d-flex align-items-center my-2"
                                                            >
                                                                <Button
                                                                    variant="outline-primary"
                                                                    className="me-2"
                                                                >
                                                                    {
                                                                        option.text
                                                                    }
                                                                </Button>
                                                                <span>
                                                                    {
                                                                        option.like
                                                                    }{" "}
                                                                    votes
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                            {/* Like & Dislike Buttons */}
                                            <div className="d-flex justify-content-between mt-3">
                                                <Button variant="outline-success">
                                                    👍 Like{" "}
                                                    {post.likes > 0 &&
                                                        `(${post.likes})`}
                                                </Button>
                                                <Button variant="outline-danger">
                                                    👎 Dislike{" "}
                                                    {post.dis_likes > 0 &&
                                                        `(${post.dis_likes})`}
                                                </Button>
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
            </div>
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
