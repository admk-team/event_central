import { Head } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import React, { useState, useEffect } from "react";
import {Button,Card,Col,Container,Row, Form,Image,ProgressBar} from "react-bootstrap";
import { router } from '@inertiajs/react'

const Index = ({ eventApp, newsfeeds }: any) => {
console.log(eventApp);
    const getPollData = (e: any, postId: any) => {
        const optionNumber = e.target.value;
        console.log(`Post ID: ${postId}, ${optionNumber}`);

        router.post(route('attendee.poll.rating'), {
            post_id: postId,
            option: optionNumber
        });
    };
    return (
        <React.Fragment>
            <Head title="Event Posts" />
            <div className="page-content">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col lg={6} className="mt-3">
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
                                                    src={`/storage/${eventApp.logo}`}
                                                    roundedCircle
                                                    width="40"
                                                    height="40"
                                                    className="me-2 thumbnail"
                                                />
                                                <div>
                                                    <strong>
                                                        {eventApp.name}
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
                                                            const totalVotes =
                                                                pollData.reduce(
                                                                    (
                                                                        sum: number,
                                                                        poll: any
                                                                    ) =>
                                                                        sum +
                                                                        (poll
                                                                            .like
                                                                            .length ||
                                                                            0),
                                                                    0
                                                                );
                                                            return pollData.map(
                                                                (
                                                                    pollData: any,
                                                                    index: number
                                                                ) => {
                                                                    const likePercentage =
                                                                        totalVotes
                                                                            ? (pollData
                                                                                  .like
                                                                                  .length /
                                                                                  totalVotes) *
                                                                              100
                                                                            : 0;
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
                                                                                    {pollData
                                                                                        .like
                                                                                        .length ||
                                                                                        0}{" "}
                                                                                    Likes{" "}
                                                                                </span>
                                                                            </div>
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <ProgressBar className="flex-grow-1">
                                                                                    <ProgressBar
                                                                                        className="text-dark fw-bold"
                                                                                        now={likePercentage}
                                                                                        label={`${likePercentage.toFixed(1)}%`}
                                                                                        variant="success"
                                                                                        key={1}
                                                                                    />
                                                                                </ProgressBar>
                                                                                <Form.Check type="radio" name="pollOptions"  value={`${index}`}  onChange={(e) => getPollData(e, post.id)} className="me-2" />
                                                                            </div>
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
};
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
