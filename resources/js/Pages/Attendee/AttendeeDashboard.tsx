import React, { useState, useEffect } from "react";
import {
    Col,
    Container,
    Row,
    Card,
    CardBody,
    ListGroup,
    Button,
} from "react-bootstrap";

import { Head, Link, router } from "@inertiajs/react";
import Layout from "../../Layouts/Attendee";
import defaultEventImage from "../../../images/defaultEventImage.png";
import defaultEventIcon from "../../../images/default-event-image.png";
import DateDifferenceFromToday from "./common/DateDifferenceFromToday";
import EventSessionsTimeLine from "./common/EventSessionsTimeLine";
import moment from "moment";

const AttendeeDashboard = ({ eventApp }: any) => {
    // console.log(eventApp.event_sessions);

    const selectedSessions = eventApp.event_sessions.filter(
        (session) => session.selected_by_attendee
    );

    // console.log(selectedSessions);

    return (
        <React.Fragment>
            <Head title="Attendee Dashboard" />
            <div className="page-content">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <Col lg={10} xl={10} sm={12}>
                            <Row>
                                <Col md={6} xl={6}>
                                    <Card>
                                        <CardBody>
                                            <div className="p-4 d-flex justify-content-between">
                                                <h5>My Agenda</h5>
                                                <h5>
                                                    {moment(
                                                        eventApp.start_date
                                                    ).format("DD MMM YYYY")}
                                                </h5>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <EventSessionsTimeLine
                                        eventApp={eventApp}
                                        sessions={selectedSessions}
                                    ></EventSessionsTimeLine>

                                    <div className="p-4 d-flex justify-content-center">
                                        <Button
                                            className="w-50"
                                            onClick={() => {
                                                router.visit(
                                                    route(
                                                        "attendee.event.detail.agenda",
                                                        [eventApp.id]
                                                    )
                                                );
                                            }}
                                            variant="success"
                                        >
                                            Program
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={6} xl={6}>
                                    <Card>
                                        <figure className="event-image">
                                            <img
                                                className="card-top-image"
                                                src={eventApp.featured_image}
                                                alt="event default image"
                                            />
                                            <figcaption>
                                                <DateDifferenceFromToday
                                                    date1={eventApp.start_date}
                                                ></DateDifferenceFromToday>
                                            </figcaption>
                                        </figure>
                                        <CardBody>
                                            <div className="p-4">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        className="img-fluid
                                                        rounded-circle
                                                        avatar-sm"
                                                        src={eventApp.logo_img}
                                                        alt="event logo"
                                                        style={{
                                                            marginRight: "4px",
                                                        }}
                                                    />
                                                    <div className="d-flex flex-column">
                                                        <h6 className="mb-0 text-capitalize">
                                                            {eventApp.name}
                                                        </h6>
                                                        <p className="text-dark-gray p-0 m-0">
                                                            {" "}
                                                            {moment(
                                                                eventApp.start_date
                                                            ).format(
                                                                "DD MMM YYYY"
                                                            )}{" "}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className="mt-4 text-dark-gray event-description"
                                                    style={{
                                                        display:
                                                            "-webkit - box",
                                                    }}
                                                >
                                                    {eventApp.description}
                                                </div>
                                            </div>
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
AttendeeDashboard.layout = (page: any) => <Layout children={page} />;
export default AttendeeDashboard;
