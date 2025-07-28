import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Col,
    Container,
    Row,
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    Form,
    Accordion,
} from "react-bootstrap";
import axios from "axios";
import { Head, useForm, Link, router } from "@inertiajs/react";
import Layout from "../../Layouts/Attendee";

import speakerAvatar from "../../../images/speaker_avatar.svg";

import defaultEventIcon from "../../../images/default-event-image.png";
import defaultEventImage from "../../../images/defaultEventImage.png";

import moment from "moment";

const AttendeeMore = ({ eventApp }: any) => {
    // console.log(eventApp);

    const emailLink = useRef();
    const { data, setData, post, processing, errors, reset } = useForm({
        subject: "",
        content: "",
        event_app_id: eventApp.id,
    });
    const handleContact = (e: any) => {
        e.preventDefault();
        console.log(data);
        post(route("attendee.event.detail.contact"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <React.Fragment>
            <Head title={eventApp.name} />
            <div className="page-content">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <Col md={12} lg={12}>
                            <Row className="d-flex justify-content-center">
                                {/* <Col md={4} lg={4}>
                                    <Card>
                                        <CardHeader>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="fs-3">
                                                    More
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <ListGroup>
                                                <ListGroup.Item
                                                    className={
                                                        "fs-3 mb-1 active-list-item"
                                                    }
                                                >
                                                    <i
                                                        className="bx bxs-contact"
                                                        style={{
                                                            marginRight: "5px",
                                                        }}
                                                    ></i>
                                                    Contact Organizer
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </CardBody>
                                    </Card>
                                </Col> */}

                                <Col md={8} lg={8}>
                                    <Card>
                                        <CardHeader>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className="fs-3">
                                                    Contact Organizer
                                                </span>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <img
                                                src={eventApp.featured_image}
                                                alt="event default bg"
                                                width={"100%"}
                                            />
                                            <div className="d-flex align-items-center mt-3">
                                                <img
                                                    width="50"
                                                    height="50"
                                                    className="img-fluid rounded-circle avatar-sm"
                                                    src={eventApp.logo_img}
                                                    style={{
                                                        marginRight: "10px",
                                                    }}
                                                />
                                                <div className="d-flex flex-column">
                                                    <h6 className="mb-0">
                                                        {eventApp.name}
                                                    </h6>
                                                </div>
                                            </div>

                                            <Row className="mt-4">
                                                <Col md={4} lg={4}>
                                                    <h5>Event Date</h5>
                                                </Col>
                                                <Col md={8} lg={8}>
                                                    <h5>
                                                        {moment(
                                                            eventApp.start_date
                                                        ).format("DD MMM YYYY")}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4} lg={4}>
                                                    <h5>Contact Email</h5>
                                                </Col>
                                                <Col md={8} lg={8}>
                                                    <a
                                                        ref={emailLink}
                                                        style={{
                                                            color: "var(--vz-success)",
                                                        }}
                                                        href={
                                                            "mailto:" +
                                                            eventApp.organiser
                                                                .email
                                                        }
                                                    >
                                                        {
                                                            eventApp.organiser
                                                                .email
                                                        }
                                                    </a>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Item eventKey="1">
                                                        <Accordion.Header>
                                                            Contact Form
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <Form
                                                                onSubmit={
                                                                    handleContact
                                                                }
                                                            >
                                                                <Form.Label htmlFor="inputPassword5">
                                                                    Subject
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={data.subject}
                                                                    onChange={(
                                                                        e: any
                                                                    ) =>
                                                                        setData(
                                                                            "subject",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <Form.Control.Feedback
                                                                    type="invalid"
                                                                    className="d-block mt-2"
                                                                >
                                                                    {" "}
                                                                    {
                                                                        errors.subject
                                                                    }{" "}
                                                                </Form.Control.Feedback>
                                                                <Form.Group className="mb-3">
                                                                    <Form.Label>
                                                                        Content
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        value={data.content} 
                                                                        rows={3}
                                                                        onChange={(
                                                                            e: any
                                                                        ) =>
                                                                            setData(
                                                                                "content",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Form.Control.Feedback
                                                                        type="invalid"
                                                                        className="d-block mt-2"
                                                                    >
                                                                        {" "}
                                                                        {
                                                                            errors.content
                                                                        }{" "}
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                                <Button
                                                                    type="submit"
                                                                    className="btn-sm btn-success w-100"
                                                                    style={{
                                                                        backgroundColor:
                                                                            "var(--vz-success)",
                                                                    }}
                                                                >
                                                                    Submit
                                                                </Button>
                                                            </Form>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
AttendeeMore.layout = (page: any) => <Layout children={page} />;
export default AttendeeMore;
