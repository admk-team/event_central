import React, { useState, useEffect } from "react";
import {
    Col,
    Container,
    Row,
    Card, CardBody, CardHeader, CardTitle, Form,
    Button,
} from "react-bootstrap";

import { Head, Link, router, usePage } from "@inertiajs/react";
import Layout from "../../Layouts/Attendee";
import defaultEventImage from "../../../images/defaultEventImage.png";
import defaultEventIcon from "../../../images/default-event-image.png";
import DateDifferenceFromToday from "./common/DateDifferenceFromToday";
import EventSessionsTimeLine from "./common/EventSessionsTimeLine";
import moment from "moment";

const AttendeeDashboard = ({ eventApp }: any) => {

    const selectedSessions = eventApp.event_sessions.filter(
        (session: any) => session.selected_by_attendee
    );
    const isEventAvailable = eventApp && Object.keys(eventApp).length > 0;
    const formatToUTC = (dateString:any) => {
        const date = new Date(dateString); // local time
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };
    const event = {
        title: eventApp.name,
        start: formatToUTC(eventApp.start_date),
        details: eventApp.description,
        location: eventApp.location_base
    };
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;


    return (
        <React.Fragment>
            <Head title="Attendee Dashboard" />
            <div className="page-content">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <Col lg={10} xl={10} sm={12}>
                            <Row>
                                <Col md={6} xl={6} className="order-md-2">
                                    <Card>
                                        <figure className="event-image">
                                            <img
                                                className="card-top-image"
                                                src={eventApp.featured_image}
                                                alt="event default image"
                                            />
                                        </figure>
                                          
                                                <DateDifferenceFromToday
                                                    date1={ eventApp?.dates[0].date}
                                                ></DateDifferenceFromToday>
                                          
                                        <CardBody>
                                            <div className="p-4 pt-0">
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
                                                                eventApp?.dates[0].date
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
                                                    dangerouslySetInnerHTML={{ __html: eventApp.description }}
                                                >
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                        <CardTitle>Add to Google Calendar</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                        <div className="d-grid grid">
                                            <Form.Label>Add this event to your Google Calendar.</Form.Label>
                                            <Button
                                                disabled={!isEventAvailable}
                                                variant="primary"
                                                href={googleCalendarUrl}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <i className='bx bxs-calendar-plus'></i> Click to Add
                                            </Button>
                                        </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={6} xl={6} className="order-md-1">
                                    <Card>
                                        <CardBody>
                                            <div className="p-4 d-flex justify-content-between">
                                                <h5>My Agenda</h5>
                                                <h5>
                                                {" "}{moment(eventApp?.dates[0].date).format("DD MMM YYYY")}{" "}
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
                                                        "attendee.event.detail.agenda"
                                                    )
                                                );
                                            }}
                                            variant="success"
                                        >
                                            Event Agenda
                                        </Button>
                                    </div>
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
