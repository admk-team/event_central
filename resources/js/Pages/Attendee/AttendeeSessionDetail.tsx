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
import { Head, useForm, Link } from "@inertiajs/react";
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
    attendeeRating,
}: any) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "POST",
        rating: attendeeRating?.rating ?? "",
        rating_description: attendeeRating?.rating_description ?? "",
    });


    console.log(data);
    const now = moment();
    const startTime = moment(eventSession.start_date_time);
    const endTime = moment(eventSession.end_date_time).add(15, "minutes");

    const ratingEnabled = now.isBetween(startTime, endTime);
    const [sessionSelected, SetSessionSelected] = useState<boolean>(
        selectedSessionDetails ? true : false
    );

    const canRate = sessionSelected && checkin && ratingEnabled;

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



    const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);

    const selectSession = () => {
        // form.post(route("attendee.save.session", [eventSession.id, "select"]));
        // SetSessionSelected(true);
    };

    const unSelectSession = () => {
        // form.post(route("attendee.save.session", [eventSession.id, "un-select"]));
        // SetSessionSelected(false);
    };

    const handleRatingChange = (v: any) => {
        setData("rating", v);
    };

    const openSpeakerModal = (speaker: any) => {
        setSelectedSpeaker(speaker);
    };

    const closeSpeakerModal = () => {
        setSelectedSpeaker(null);
    };
    // Filter attendees who have provided a rating (non-null rating)
  const ratedAttendees = eventSession.attendees_rating?.filter((attendee: any) => attendee.pivot.rating !== null) || [];
  console.log(eventSession.attendees_rating);
  // Calculate the average rating only for attendees with ratings
  const averageRating =
    ratedAttendees.length > 0
      ? ratedAttendees.reduce((acc: any, attendee: any) => acc + (attendee.pivot.rating || 0), 0) / ratedAttendees.length
      : 0;
    

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
                                                    <i className="bx bxs-star fs-3 fw-bolder text-danger"></i>
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
                                                    <i className="bx bx-star fs-3 fw-bolder text-muted"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Card>
                                            <figure className="event-image">
                                                <img
                                                    className="card-full-image"
                                                    src={
                                                        eventApp.featured_image
                                                    }
                                                    alt="event default image"
                                                />
                                             
                                            </figure>
                                        </Card>
                                        <figcaption>
                                            <DateDifferenceFromToday
                                                date1={
                                                    eventApp.start_date
                                                }
                                            ></DateDifferenceFromToday>
                                        </figcaption>
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

                                    <div className="d-flex flex-row justify-content-between align-items-center mt-2">
                                        <div className="d-flex flex-row align-items-center">
                                            <h5 style={{ margin: "0" }}>
                                                <Badge
                                                    bg="secondary"
                                                    style={{
                                                        marginRight: "5px",
                                                    }}
                                                >
                                                    {eventSession.event_platform.name}
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
                                    {eventSession.event_speakers &&
                                    eventSession.event_speakers.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-2">
                                            {eventSession.event_speakers.map(
                                                (speaker: any) => (
                                                    <Button
                                                        key={speaker.id}
                                                        variant="outline-secondary"
                                                        onClick={() =>
                                                            openSpeakerModal(
                                                                speaker
                                                            )
                                                        }
                                                    >
                                                        {speaker.name}
                                                    </Button>
                                                )
                                            )}
                                            {selectedSpeaker && (
                                                <SpeakerModal
                                                    show={!!selectedSpeaker}
                                                    hide={closeSpeakerModal}
                                                    onHide={closeSpeakerModal}
                                                    event={eventApp}
                                                    speaker={selectedSpeaker}
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <p>No speakers assigned</p>
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
                                                {!canRate && (
                                                    <div className="fs-5 text-danger">
                                                        {!sessionSelected && (
                                                            <p>You can leave a rating only for sessions you've purchased.</p>
                                                        )}
                                                        {sessionSelected && !checkin && (
                                                            <p>Please check in to the session to leave a rating.</p>
                                                        )}
                                                        {sessionSelected && checkin && !ratingEnabled && (
                                                            <p>
                                                                Rating can only be added between the session start and 15 minutes after the session ends (
                                                                {moment(startTime).format("MMM DD, YYYY hh:mm A")} to{" "}
                                                                {moment(endTime).format("MMM DD, YYYY hh:mm A")}).
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {canRate && (
                                                    <form onSubmit={submitRatingChange}>
                                                        <div className="mt-4">
                                                            <div className="rating-wraper d-flex justify-content-center w-100">
                                                                <Rating
                                                                    initialRating={data.rating}
                                                                    onChange={handleRatingChange}
                                                                    emptySymbol="bx bx-star"
                                                                    fullSymbol={["bx bxs-star"]}
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
                                                                value={data.rating_description}
                                                                className={
                                                                    "mt-1 form-control" +
                                                                    (errors.rating_description ? " is-invalid" : "")
                                                                }
                                                                autoComplete="rating_description"
                                                                onChange={(e: any) =>
                                                                    setData("rating_description", e.target.value)
                                                                }
                                                            />
                                                            <Form.Control.Feedback
                                                                type="invalid"
                                                                className="mt-2 d-block"
                                                            >
                                                                {errors.rating_description}
                                                            </Form.Control.Feedback>
                                                        </div>

                                                        <div className="d-flex justify-content-between">
                                                            <Button
                                                                type="submit"
                                                                className="btn btn-success w-100 mt-4"
                                                                disabled={processing}
                                                            >
                                                                Save Rating
                                                            </Button>
                                                        </div>
                                                    </form>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        {/* <Accordion.Item eventKey="1">
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
                                        </Accordion.Item> */}
                                    </Accordion>
                                    {eventSession?.rating_status == 1 && (
                                    <Card className="mt-4">
                                        <CardBody>
                                            {/* Attendee Ratings with Average */}
                                            {ratedAttendees.length > 0 && (
                                            <div className="d-flex align-items-center mb-4">
                                                <span className="fs-3 me-3 mb-0">Attendee Ratings</span>
                                                {[...Array(5)].map((_, i) => (
                                                <i
                                                    key={i}
                                                    className={`bx ${i < averageRating ? 'bxs-star text-primary' : 'bx-star text-muted'}`}
                                                ></i>
                                                ))}
                                                <span className="ms-3 text-muted">({averageRating.toFixed(1)})</span>
                                            </div>
                                            )}

                                            {/* Individual Ratings with Scroll */}
                                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            {ratedAttendees.length > 0 ? (
                                                [...ratedAttendees].reverse().map((attendee, index) => (
                                                <div key={index} className="d-flex align-items-start mb-3">
                                                    <img
                                                    src={attendee.avatar || '/default-avatar.png'}
                                                    alt={attendee.first_name}
                                                    className="rounded-circle me-3"
                                                    width={50}
                                                    height={50}
                                                    />
                                                    <div>
                                                    <h6 className="mb-1">{attendee.first_name}</h6>
                                                    <div className="d-flex align-items-center mb-1">
                                                        {[...Array(5)].map((_, i) => (
                                                        <i
                                                            key={i}
                                                            className={`bx ${
                                                            i < (attendee.pivot.rating || 0) ? 'bxs-star text-primary' : 'bx-star text-muted'
                                                            }`}
                                                        ></i>
                                                        ))}
                                                    </div>
                                                    <p className="mb-0 text-muted">{attendee.pivot.rating_description || 'No description provided'}</p>
                                                    </div>
                                                </div>
                                                ))
                                            ) : (
                                                <p>No ratings available for this session yet.</p>
                                            )}
                                            </div>
                                        </CardBody>
                                    </Card>
                                    )}
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
