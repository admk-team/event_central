import React, { useState } from "react";
import {
    Button,
    Col,
    Container,
    Row,
    Card,
    CardBody,
    Badge,
    Accordion,
    Form,
} from "react-bootstrap";
import Rating from "react-rating";

import { Head, useForm, Link, router } from "@inertiajs/react";
import Layout from "../../Layouts/Attendee";
import DateDifferenceFromToday from "./common/DateDifferenceFromToday";

import moment from "moment";
import attendeeEventBg from "../../../images/attendee-bg.jpg";
import defaultEventImage from "../../../images/defaultEventImage.png";
import SpeakerModal from "./SpeakersModal";

const AttendeeSessionDetail = ({
    eventApp,
    eventSession,
    selectedSessionDetails,
    prev_session_id,
    next_session_id,
    checkin,
}: any) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "POST",
        rating: selectedSessionDetails?.rating ?? "",
        rating_description: selectedSessionDetails?.rating_description ?? "",
    });

    const ratingEnabled = moment(eventSession.end_date_time) < moment();

    const now = moment();
    const startTime = moment(eventSession.start_date_time);
    const endTime = moment(eventSession.end_date_time);
    const canCheckIn = now.isBetween(startTime, endTime);

    const submitRatingChange = (e: any) => {
        e.preventDefault();
        post(route("attendee.save.rating", eventSession.id));
        console.log("Rating form submitted");
    };
    const submitCheckIn = (e: any) => {
        e.preventDefault();
        post(route("attendee.checkin", eventSession.id));
    };

    const form = useForm({
        eventId: eventApp.id,
        eventSessionId: eventSession.id,
    });

    const [sessionSelected, SetSessionSelected] = useState<boolean>(
        selectedSessionDetails ? true : false
    );

    const [showModal, SetShowModal] = useState<boolean>(false);

    const selectSession = () => {
        // form.post(route("attendee.save.session", [eventSession.id, "select"]));
        // SetSessionSelected(true);
    };

    const unSelectSession = () => {
        // form.post(
        //     route("attendee.save.session", [eventSession.id, "un-select"])
        // );
        // SetSessionSelected(false);
    };

    const handleRatingChange = (v: any) => {
        setData("rating", v);
    };

    return (
        <React.Fragment>
            <Head title={eventApp.name + "-" + eventSession.name} />
            <div className="page-content">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <Col md={9} lg={9}>
                            <Row>
                                <Col md={8} lg={8}>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="d-flex flex-row align-items-center">
                                            {/* href = { route('attendee.event.detail.agenda', eventApp.id) */}

                                            <Link
                                                href={route(
                                                    "attendee.event.detail.agenda"
                                                )}
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="bx bx-arrow-back fs-3 fw-bolder text-muted"></i>
                                            </Link>
                                            <h5 className="m-0 fw-bolder">
                                                {eventSession.name}
                                            </h5>
                                        </div>

                                        <div className="d-flex flex-row align-items-center">
                                                <div className="d-flex align-items-center gap-2 me-3">
                                                    {" "}
                                                    {/* Gap between Q&A and icons */}
                                                    {eventSession.qa_status == true && (
                                                        <Link
                                                        href={route(
                                                            "attendee.events.qa.index",
                                                            {
                                                                session_id:
                                                                    eventSession.id,
                                                            }
                                                        )}
                                                        className="d-flex align-items-center text-decoration-none"
                                                        >
                                                        <i className="bx bx-message-square-detail fs-4 text-primary"></i>{" "}
                                                        {/* Q&A Icon */}
                                                        <span className="fw-bold text-primary ms-1">
                                                            Q&A
                                                        </span>{" "}
                                                        {/* Attractive text styling */}
                                                        </Link>
                                                    )}
                                                  
                                                    {eventSession.posts == true && (
                                                        <Link
                                                        href={route("attendee.posts.index",{id:eventSession.id,})}
                                                        className="d-flex align-items-center text-decoration-none"
                                                    >
                                                        <i className="ri-image-edit-line fs-4 text-primary"></i>{" "}
                                                        {/* Q&A Icon */}
                                                        <span className="fw-bold text-primary ms-1">
                                                            Posts
                                                        </span>{" "}
                                                        {/* Attractive text styling */}
                                                    </Link>
                                                    )}
                                                </div>

                                            {sessionSelected ? (
                                                <a
                                                    style={{
                                                        marginRight: "15px",
                                                    }}
                                                    href="#"
                                                    className="pe-auto"
                                                    onClick={unSelectSession}
                                                    title="Purchased Session"
                                                >
                                                    <i className="bx bxs-heart fs-3 fw-bolder text-danger"></i>{" "}
                                                    {/* Filled Heart Icon */}
                                                </a>
                                            ) : (
                                                <a
                                                    style={{
                                                        marginRight: "15px",
                                                    }}
                                                    href="#"
                                                    className="pe-auto"
                                                    onClick={selectSession}
                                                    title="Not Purchased Session"
                                                >
                                                    <i className="bx bx-heart fs-3 fw-bolder text-muted"></i>{" "}
                                                    {/* Empty Heart Icon */}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Card>
                                            {/* <Card.Img src={defaultEventImage} style={{ height: '30rem' }} /> */}
                                            <figure className="event-image">
                                                <img
                                                    className="card-full-image"
                                                    src={
                                                        eventApp.featured_image
                                                    }
                                                    alt="event default image"
                                                />
                                                <figcaption>
                                                    <DateDifferenceFromToday
                                                        date1={
                                                            eventApp.start_date
                                                        }
                                                    ></DateDifferenceFromToday>
                                                </figcaption>
                                            </figure>
                                        </Card>
                                        <div
                                            style={{
                                                position: "relative",
                                                top: "-18rem",
                                            }}
                                        >
                                            <DateDifferenceFromToday
                                                date1={eventSession.start_date}
                                                top={"-18rem"}
                                            ></DateDifferenceFromToday>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <div className="d-flex flex-row align-items-center">
                                            <h5 style={{ margin: "0" }}>
                                                <Badge
                                                    bg="secondary"
                                                    style={{
                                                        marginRight: "5px",
                                                    }}
                                                >
                                                    MAIN STAGE
                                                </Badge>
                                                <Badge bg="secondary">
                                                    {moment(
                                                        eventSession.event_date
                                                            .date
                                                    ).format("DD MMM ") +
                                                        " - " +
                                                        moment(
                                                            eventSession.start_date_time
                                                        ).format("hh:mm") +
                                                        " - " +
                                                        moment(
                                                            eventSession.end_date_time
                                                        ).format("hh:mm")}
                                                </Badge>
                                            </h5>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            {prev_session_id && (
                                                <Link
                                                    href={route(
                                                        "attendee.event.detail.session",
                                                        [prev_session_id]
                                                    )}
                                                    title="Previous Session"
                                                >
                                                    <i className="bx bx-left-arrow-alt fs-3 fw-bolder text-muted"></i>
                                                </Link>
                                            )}
                                            {next_session_id && (
                                                <Link
                                                    href={route(
                                                        "attendee.event.detail.session",
                                                        [next_session_id]
                                                    )}
                                                    title="Next Session"
                                                >
                                                    <i className="bx bx-right-arrow-alt fs-3 fw-bolder text-muted"></i>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <h4 className="mt-2">Speakers</h4>
                                    {eventSession.event_speaker && (
                                        <>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() =>
                                                    SetShowModal(true)
                                                }
                                            >
                                                {
                                                    eventSession.event_speaker
                                                        .name
                                                }
                                            </Button>

                                            <SpeakerModal
                                                show={showModal}
                                                hide={() => SetShowModal(false)}
                                                onHide={() =>
                                                    SetShowModal(false)
                                                }
                                                event={eventApp}
                                                speaker={
                                                    eventSession.event_speaker
                                                }
                                            ></SpeakerModal>
                                        </>
                                    )}
                                    <h4 className="mb-1 mt-4">Description</h4>
                                    <p>{eventSession.description}</p>
                                </Col>

                                <Col md={4} lg={4}>
                                    <Card>
                                        <CardBody>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <i
                                                    className="fs-3 bx bx-star"
                                                    style={{
                                                        marginRight: "10px",
                                                    }}
                                                ></i>
                                                <span className="fs-3">
                                                    Ratings
                                                </span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <h6>Add Ratings</h6>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {!sessionSelected && (
                                                    <p className="fs-5">
                                                        Rating can be left for
                                                        purchased session(s)
                                                        only.
                                                    </p>
                                                )}
                                                {sessionSelected && (
                                                    <form
                                                        onSubmit={
                                                            submitRatingChange
                                                        }
                                                    >
                                                        <div className="mt-4">
                                                            <div className="rating-wraper d-flex justify-content-center w-100">
                                                                <Rating
                                                                    initialRating={
                                                                        data.rating
                                                                    }
                                                                    onChange={
                                                                        handleRatingChange
                                                                    }
                                                                    emptySymbol="bx bx-star"
                                                                    fullSymbol={[
                                                                        "bx bxs-star",
                                                                    ]}
                                                                />
                                                            </div>
                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                className="mt-2 d-block"
                                                            >
                                                                {errors.rating}
                                                            </Form.Control.Feedback>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Form.Control
                                                                as="textarea"
                                                                id="rating_description"
                                                                type="text"
                                                                rows={4}
                                                                name="rating_description"
                                                                placeholder="Enter Rating Comments"
                                                                value={
                                                                    data.rating_description
                                                                }
                                                                className={
                                                                    "mt-1 form-control" +
                                                                    (errors.rating_description
                                                                        ? "is-invalid"
                                                                        : "")
                                                                }
                                                                autoComplete="ratinrating_descriptiong_comments"
                                                                onChange={(
                                                                    e: any
                                                                ) =>
                                                                    setData(
                                                                        "rating_description",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />

                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                className="mt-2 d-block"
                                                            >
                                                                {
                                                                    errors.rating_description
                                                                }
                                                            </Form.Control.Feedback>
                                                        </div>
                                                        {!ratingEnabled && (
                                                            <p>
                                                                * Ratings can be
                                                                added only after
                                                                the session has
                                                                started i.e{" "}
                                                                {moment(
                                                                    eventSession.start_date_time
                                                                ).format(
                                                                    "DD MMM, YYYY hh:mm"
                                                                )}
                                                            </p>
                                                        )}

                                                        {ratingEnabled && (
                                                            <div className="d-flex justify-content-between">
                                                                <Button
                                                                    type="submit"
                                                                    className="btn btn-success w-100 mt-4"
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                >
                                                                    Save Rating
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </form>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>
                                                <h6>Check In</h6>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {!sessionSelected && (
                                                    <p className="fs-5">
                                                        checkin can be left for
                                                        purchased session(s)
                                                        only.
                                                        <br />* Your check-in
                                                        time:{" "}
                                                        {moment().format(
                                                            "DD MMM, YYYY hh:mm A"
                                                        )}
                                                    </p>
                                                )}

                                                {
                                                    sessionSelected && (
                                                        <form
                                                            onSubmit={
                                                                submitCheckIn
                                                            }
                                                        >
                                                            <div className="d-flex justify-content-between">
                                                                <Button
                                                                    type="submit"
                                                                    className={`btn btn-success w-100 mt-4 ${
                                                                        checkin
                                                                            ? "disabled"
                                                                            : ""
                                                                    }`}
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                >
                                                                    Check In
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    )
                                                    // : (
                                                    //     <p>
                                                    //         * Check-in is only allowed between{" "}
                                                    //         {moment(eventSession.start_date_time).format("DD MMM, YYYY hh:mm A")}
                                                    //         {" and "}
                                                    //         {moment(eventSession.end_date_time).format("DD MMM, YYYY hh:mm A")}
                                                    //         <br />
                                                    //         * Your check-in time: {moment().format("DD MMM, YYYY hh:mm A")}
                                                    //     </p>
                                                    // )
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
AttendeeSessionDetail.layout = (page: any) => <Layout children={page} />;
export default AttendeeSessionDetail;
