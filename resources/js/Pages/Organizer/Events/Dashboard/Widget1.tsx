import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { Link } from '@inertiajs/react';
//Import Icons
import FeatherIcon from "feather-icons-react";
import { useLaravelReactI18n } from "laravel-react-i18n";
const Widget1 = ({
    totalSession,
    totalTickets,
    totalPosts,
    totaluser,
    totalPartners,
    totalSpeakers,
    ticketsMetrics,
}: any) => {
    const { t } = useLaravelReactI18n();
    return (
        <React.Fragment>
            <Row>
                <Col md={4}>
                    <Link title='View attendee details' href={route('organizer.events.report.session.index')} className="link-primary cursor-pointer">
                        <Card className="card-animate">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-medium text-muted mb-0">
                                            {t("Sessions")}
                                        </p>
                                        <h2 className="fs-22 mt-4 ff-secondary fw-semibold">
                                            <span
                                                className="counter-value"
                                                data-target="97.66"
                                            >
                                                <CountUp
                                                    key={totalSession}
                                                    start={0}
                                                    end={Number(totalSession)}
                                                    decimals={
                                                        totalSession >= 1000 ? 1 : 0
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
                                                    icon="tv"
                                                    className="text-primary"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link title='View ticket report' href={route('organizer.events.report.ticket.index')} className="link-primary cursor-pointer">
                        <Card className="card-animate">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-medium text-muted mb-0">
                                            {t("Total Ticket")}
                                        </p>
                                        <h2 className="fs-22 mt-4 ff-secondary fw-semibold">
                                            <span
                                                className="counter-value"
                                                data-target="3"
                                            >
                                                <CountUp
                                                    key={totalTickets}
                                                    start={0}
                                                    end={Number(totalTickets)}
                                                    decimals={
                                                        totalTickets >= 1000 ? 1 : 0
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
                                                0.24 %
                                            </span>{" "}
                                            vs. previous month
                                        </p> */}
                                    </div>
                                    <div>
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-info-subtle rounded-circle fs-2">
                                                <FeatherIcon
                                                    icon="credit-card"
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
                <Col md={4}>
                    <Link title='View ticket report' href={route('organizer.events.report.ticket.index')} className="link-primary cursor-pointer">
                        <Card className="card-animate">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="fw-medium text-muted mb-0">
                                            {t("Sold Ticket")}
                                        </p>
                                        <h2 className="mt-4 ff-secondary fw-semibold">
                                            <span className="counter-value">
                                            <CountUp
                                                    key={ticketsMetrics.totalTicketsSold}
                                                    start={0}
                                                    end={Number(ticketsMetrics.totalTicketsSold)}
                                                    decimals={
                                                        ticketsMetrics.totalTicketsSold >= 1000 ? 1 : 0
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
                                                    icon="credit-card"
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

export default Widget1;
