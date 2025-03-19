import { Head } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import React, { useState, useEffect } from "react";
import {Button,Card,Col,Container,Row, Form,Image,ProgressBar} from "react-bootstrap";
import { router } from '@inertiajs/react'
import "./css/index.css";
import { Label } from "@headlessui/react";

const Index = ({ eventApp, newsfeeds }: any) => {
console.log(eventApp);
    // send request to toggle the poll data 
    const getPollData = (e: any, postId: any) => {
        const optionNumber = e.target.value;
        console.log(`Post ID: ${postId}, ${optionNumber}`);
        router.post(route('attendee.poll.rating'), {
            post_id: postId,
            option: optionNumber
        });
    };

    // send request likes and dislike 
    const LikePost = (postId: any) => {
        router.post(route('attendee.like.rating'), 
        { post_id: postId},
        {
            preserveScroll: true,
            only: ['newsfeeds']
        }
    );
    };
    // send request likes and dislike 
    const DislikePost = (postId: any) => {
        router.post(route('attendee.dislike.rating'), 
        { post_id: postId},
        {
            preserveScroll: true,
            only: ['newsfeeds']
        }
    );
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
                                                <div className="poll-container bg-light">
                                                    <div className="poll-options">
                                                    {(() => {
                                                        try {
                                                            const pollData = post.post_poll?.trim() !==""? JSON.parse(post.post_poll): {options:[],};
                                                            const totalVotes = pollData.reduce((sum: number,poll: any) => sum +( poll.like.length || 0 ), 0);
                                                            return pollData.map((pollData: any,index: number) => {
                                                                    const likePercentage = totalVotes ? (pollData.like.length / totalVotes) * 100 : 0;
                                                                    return (
                                                                        <div key={index} className="poll-option">
                                                                            <div className="d-flex align-items-center">
                                                                                <Form.Check checked={pollData.like.includes(eventApp.id)} type="radio" name="pollOptions"  value={`${index}`}  onChange={(e) => getPollData(e, post.id)} className="me-2" />
                                                                                <label htmlFor={`poll-option-${index}`} className="flex-grow-1">
                                                                                    {pollData.text ?? "N/A"} <span className="float-end">{pollData.like.length || 0}</span>
                                                                                </label>
                                                                            </div>
                                                                            
                                                                            <div className="progress">
                                                                                <div className="progress-bar"
                                                                                    role="progressbar"
                                                                                    style={{ width: `${likePercentage}%` }}
                                                                                    aria-valuenow={likePercentage}
                                                                                    aria-valuemin="0"
                                                                                    aria-valuemax="100"
                                                                                ></div>
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
                                                </div>
                                            )}

                                            {/* Like & Dislike Buttons */}
                                            <div className="d-flex justify-content-between mt-3">
                                                <label 
                                                    onClick={() => LikePost(post.id)} 
                                                    style={{ cursor: "pointer" }} 
                                                    className="d-flex align-items-center"
                                                >
                                                    <i className="bx bxs-like" style={{ fontSize: "18px", marginRight: "5px" , color: post.likes && JSON.parse(post.likes).includes(eventApp.id) ? "blue" : "black"}}></i>
                                                    <span style={{ fontSize: "15px" }}>
                                                        {post.likes && JSON.parse(post.likes).length > 0
                                                            ? `(${JSON.parse(post.likes).length})`
                                                            : `(0)`}
                                                    </span>
                                                </label>

                                                <label 
                                                    onClick={() => DislikePost(post.id)} 
                                                    style={{ cursor: "pointer" }} 
                                                    className="d-flex align-items-center"
                                                >
                                                    <i className="bx bxs-dislike" style={{ fontSize: "18px", marginRight: "5px" , color: post.dis_likes && JSON.parse(post.dis_likes).includes(eventApp.id) ? "blue" : "black"}}></i>
                                                    <span style={{ fontSize: "15px" }}>
                                                        {post.dis_likes && JSON.parse(post.dis_likes).length > 0
                                                            ? `(${JSON.parse(post.dis_likes).length})`
                                                            : `(0)`}
                                                    </span>
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
            </div>
        </React.Fragment>
    );
};
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
