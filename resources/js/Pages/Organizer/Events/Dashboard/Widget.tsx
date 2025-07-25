import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { Link } from '@inertiajs/react';
//Import Icons
import FeatherIcon from "feather-icons-react";

const Widget = ({
    totalSession,
    totalTickets,
    totalPosts,
    totaluser,
    totalPartners,
    totalSpeakers,
    totalRevenue,
}: any) => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <Link title='View ticket report' href={route('organizer.events.report.ticket.index')} className="link-primary cursor-pointer">
                        <Card className="card-animate">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-medium text-muted mb-0">
                                            Total Revenue
                                        </p>
                                        <h2 className="fs-22 mt-4 ff-secondary fw-semibold">
                                            <span
                                                className="counter-value"
                                                data-target="97.66"
                                            >
                                            $<CountUp
                                                    key={totalRevenue.totalRevenue}
                                                    start={0}
                                                    end={Number(totalRevenue.totalRevenue)}
                                                    decimals={
                                                        totalRevenue.totalRevenue >= 1000 ? 1 : 0
                                                    }
                                                    duration={4}
                                                    formattingFn={(value: any) =>
                                                        value >= 1000
                                                            ? (
                                                                value / 1000
                                                            ).toFixed(1) + "K"
                                                            : value
                                                    }
                                                /> 
                                            </span>
                                        </h2>
                                        {/* <p className="mb-0 text-muted text-truncate ">
                                            <span className="badge bg-light text-danger mb-0">
                                                <i className="ri-arrow-down-line align-middle"></i>{" "}
                                                3.96 %
                                            </span>{" "}
                                            vs. previous month
                                        </p> */}
                                    </div>
                                    <div>
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                                <FeatherIcon
                                                    icon="bar-chart-2"
                                                    className="text-success"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={6}>
                    <Link title='View refund ticket report' href={route('organizer.events.report.refund-ticket.index')} className="link-primary cursor-pointer">
                        <Card className="card-animate">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-medium text-muted mb-0">
                                            Total Refunds
                                        </p>
                                        <h2 className="mt-4 ff-secondary fw-semibold">
                                            <span className="counter-value">
                                                {/* <CountUp
                                                    key={totalSpeakers}
                                                    start={0}
                                                    end={Number(totalSpeakers)}
                                                    decimals={
                                                        totalSpeakers >= 1000
                                                            ? 1
                                                            : 0
                                                    }
                                                    duration={4}
                                                    formattingFn={(value: any) =>
                                                        value >= 1000
                                                            ? (
                                                                value / 1000
                                                            ).toFixed(1) + "K"
                                                            : value
                                                    }
                                                /> */}
                                            $0
                                            </span>
                                        </h2>
                                        {/* <p className="mb-0 text-muted text-truncate ">
                                            <span className="badge bg-light text-success mb-0">
                                                <i className="ri-arrow-up-line align-middle"></i>{" "}
                                                16.24 %
                                            </span>{" "}
                                            vs. previous month
                                        </p> */}
                                    </div>
                                    <div>
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                                <FeatherIcon
                                                    icon="rotate-ccw"
                                                    className="text-success"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Link title='View partners detail' href={route('organizer.events.partner.index')} className="link-primary cursor-pointer">
                        <Card className="card-animate">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-medium text-muted mb-0">
                                            Partners
                                        </p>
                                        <h2 className="mt-4 ff-secondary fw-semibold">
                                            <span className="counter-value">
                                                <CountUp
                                                    key={totalPartners}
                                                    start={0}
                                                    end={Number(totalPartners)}
                                                    decimals={
                                                        totalPartners >= 1000
                                                            ? 1
                                                            : 0
                                                    }
                                                    duration={4}
                                                    formattingFn={(value: any) =>
                                                        value >= 1000
                                                            ? (
                                                                value / 1000
                                                            ).toFixed(1) + "K"
                                                            : value
                                                    }
                                                />
                                            </span>
                                        </h2>
                                        {/* <p className="mb-0 text-muted text-truncate ">
                                            <span className="badge bg-light text-success mb-0">
                                                <i className="ri-arrow-up-line align-middle"></i>{" "}
                                                16.24 %
                                            </span>{" "}
                                            vs. previous month
                                        </p> */}
                                    </div>
                                    <div>
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                                <FeatherIcon
                                                    icon="briefcase"
                                                    className="text-success"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={6}>
                <Link title='View session post' href={route('organizer.events.schedule.index')} className="link-primary cursor-pointer">
                    <Card className="card-animate">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fw-medium text-muted mb-0">
                                        All Event Post
                                    </p>
                                    <h2 className="fs-22 mt-4 ff-secondary fw-semibold">
                                        <span
                                            className="counter-value"
                                            data-target="97.66"
                                        >
                                            <CountUp
                                                key={totalPosts}
                                                start={0}
                                                end={Number(totalPosts)}
                                                decimals={
                                                    totalPosts >= 1000 ? 1 : 0
                                                }
                                                duration={4}
                                                formattingFn={(value: any) =>
                                                    value >= 1000
                                                        ? (
                                                              value / 1000
                                                          ).toFixed(1) + "K"
                                                        : value
                                                }
                                            />
                                        </span>
                                    </h2>
                                    {/* <p className="mb-0 text-muted text-truncate ">
                                        <span className="badge bg-light text-danger mb-0">
                                            <i className="ri-arrow-down-line align-middle"></i>{" "}
                                            3.96 %
                                        </span>{" "}
                                        vs. previous month
                                    </p> */}
                                </div>
                                <div>
                                    <div className="avatar-sm flex-shrink-0">
                                        <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                            <FeatherIcon
                                                icon="share"
                                                className="text-success"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Link title='View speaker detail' href={route('organizer.events.speaker.index')} className="link-primary cursor-pointer">
                        <Card className="card-animate">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-medium text-muted mb-0">
                                            Speakers
                                        </p>
                                        <h2 className="mt-4 ff-secondary fw-semibold">
                                            <span className="counter-value">
                                                <CountUp
                                                    key={totalSpeakers}
                                                    start={0}
                                                    end={Number(totalSpeakers)}
                                                    decimals={
                                                        totalSpeakers >= 1000
                                                            ? 1
                                                            : 0
                                                    }
                                                    duration={4}
                                                    formattingFn={(value: any) =>
                                                        value >= 1000
                                                            ? (
                                                                value / 1000
                                                            ).toFixed(1) + "K"
                                                            : value
                                                    }
                                                />
                                            </span>
                                        </h2>
                                        {/* <p className="mb-0 text-muted text-truncate ">
                                            <span className="badge bg-light text-success mb-0">
                                                <i className="ri-arrow-up-line align-middle"></i>{" "}
                                                16.24 %
                                            </span>{" "}
                                            vs. previous month
                                        </p> */}
                                    </div>
                                    <div>
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                                <FeatherIcon
                                                    icon="mic"
                                                    className="text-success"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={6}>
                    <Link title='View attendee details' href={route('organizer.events.report.attendee.index')} className="link-primary cursor-pointer">
                        <Card className="card-animate">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-medium text-muted mb-0">
                                            Attendees
                                        </p>
                                        <h2 className="mt-4 ff-secondary fw-semibold">
                                            <span className="counter-value">
                                                <CountUp
                                                    key={totaluser}
                                                    start={0}
                                                    end={Number(totaluser)}
                                                    decimals={
                                                        totaluser >= 1000 ? 1 : 0
                                                    }
                                                    duration={4}
                                                    formattingFn={(value: any) =>
                                                        value >= 1000
                                                            ? (
                                                                value / 1000
                                                            ).toFixed(1) + "K"
                                                            : value
                                                    }
                                                />
                                            </span>
                                        </h2>
                                        {/* <p className="mb-0 text-muted text-truncate ">
                                            <span className="badge bg-light text-success mb-0">
                                                <i className="ri-arrow-up-line align-middle"></i>{" "}
                                                16.24 %
                                            </span>{" "}
                                            vs. previous month
                                        </p> */}
                                    </div>
                                    <div>
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                                <FeatherIcon
                                                    icon="users"
                                                    className="text-success"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Widget;
