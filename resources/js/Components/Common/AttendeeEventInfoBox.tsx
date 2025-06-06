import { usePage } from "@inertiajs/react";
import React from "react";
import { Col, Spinner } from "react-bootstrap";
import defaultEventImage from "../../../images/defaultEventImage.png";
import defaultEventIcon from "../../../images/default-event-image.png";

// import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Logo from "../Logo";

const AttendeeEventInfoBox = () => {
    const eventInfo: any = usePage().props.eventApp;
    const isInvalidLogo =
        !eventInfo.logo_img ||
        eventInfo.logo_img.includes("encrypted-tbn0.gstatic.com");

    return (
        <React.Fragment>
            <Col lg={6}>
                <div className="p-lg-5 p-4 auth-one-bg h-100">
                    <div className="bg-overlay"></div>
                    <div className="position-relative d-flex flex-column justify-content-center align-items-center mx-2 m-2">
                        {isInvalidLogo ? (
                            <div className="bg-white rounded px-4 mb-3">
                                <Logo />
                            </div>
                        ) : (
                            <div className="rounded px-4 mb-3">
                                <img
                                    src={eventInfo.logo_img}
                                    alt="attendee event bg"
                                    width={"350px"}
                                />
                            </div>
                        )}
                        <img
                            src={eventInfo.featured_image}
                            alt="attendee event bg"
                            style={{
                                width: "100%",
                                height: "50%",
                                borderTopRightRadius: "7px",
                                borderTopLeftRadius: "7px",
                            }}
                        />
                        <div
                            style={{
                                height: "80%",
                                width: "100%",
                                backgroundColor: "white",
                                borderBottomRightRadius: "7px",
                                borderBottomLeftRadius: "7px",
                                paddingTop: "15px",
                                padding: "10px",
                            }}
                            className="d-flex flex-column align-items-center justify-content-center"
                        >
                            <h2 className="text-center">{eventInfo.name}</h2>
                            <h5 className="text-muted">
                                {" "}
                                {moment(eventInfo?.dates[0].date).format(
                                    "DD MMM YYYY"
                                )}{" "}
                            </h5>
                            <span className="text-justify h-75">
                                {eventInfo.description}
                            </span>
                        </div>
                    </div>
                </div>
            </Col>
        </React.Fragment>
    );
};

export default AttendeeEventInfoBox;
