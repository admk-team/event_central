import { Link as Link, usePage } from "@inertiajs/react"; // Use Inertia's Link
import moment from "moment";
import { Button, Col, Row } from "react-bootstrap";
import HasPermission from "../../../../../Components/HasPermission";

interface Session {
    id: number;
    name: string;
    event_date: { date: string };
    start_time: string;
    end_time: string;
    qa_status: boolean;
    posts: boolean;
    tracks: any[];
}

export default function SessionCard({
    session,
    onEdit,
    onDelete,
}: {
    session: Session;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const enableTracks = usePage().props.enableTracks as boolean;

    const startDate = moment(
        `${session.event_date.date} ${session.start_time}`,
        "YYYY-MM-DD HH:mm:ss"
    );
    const endDate = moment(
        `${session.event_date.date} ${session.end_time}`,
        "YYYY-MM-DD HH:mm:ss"
    );
    const now = moment();

    let sessionStatus: "upcoming" | "passed" | "ongoing";
    let badge;

    switch (true) {
        case now.isBefore(startDate):
            sessionStatus = "upcoming";
            badge = (
                <span className="badge rounded-pill bg-primary-subtle text-primary fw-bold fs-12">
                    Upcoming
                </span>
            );
            break;
        case now.isAfter(endDate):
            sessionStatus = "passed";
            badge = (
                <span className="badge rounded-pill bg-dark-subtle text-dark fw-bold fs-12">
                    Passed
                </span>
            );
            break;
        default:
            sessionStatus = "ongoing";
            badge = (
                <span className="badge rounded-pill bg-success-subtle text-success fw-bold fs-12">
                    Ongoing
                </span>
            );
            break;
    }

    return (
        <Row
            className={`timeline-right ${
                sessionStatus !== "passed" ? "scroll-to" : ""
            }`}
        >
            <Col xs={12}>
                <p
                    className={`timeline-date text-${
                        sessionStatus === "upcoming"
                            ? "primary"
                            : sessionStatus === "passed"
                            ? "light"
                            : "success"
                    }`}
                >
                    {startDate.format("hh:mm A")}
                </p>
            </Col>
            <Col xs={12}>
                <div className="timeline-box">
                    <div className="timeline-text w-100">
                        <div className="d-flex">
                            <div className="flex-grow-1">
                                {(enableTracks && session.tracks.length > 0) && (
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        {session.tracks.slice(0, 3).map((track: any) => (
                                            <div key={track.id} className="rounded" style={{ backgroundColor: track.color, width: '30px', height: '8px' }}></div>
                                        ))}
                                    </div>
                                )}
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h4 className="fs-17 mb-0">
                                        {session.name}
                                    </h4>
                                    <div className="d-flex gap-1">
                                        <HasPermission permission="edit_event_sessions">
                                            <Button
                                                onClick={onEdit}
                                                variant="primary"
                                                size="sm"
                                                className="btn-icon"
                                            >
                                                <i className="ri-edit-fill" />
                                            </Button>
                                        </HasPermission>
                                        <HasPermission permission="delete_event_sessions">
                                            <Button
                                                onClick={onDelete}
                                                variant="danger"
                                                size="sm"
                                                className="btn-icon"
                                            >
                                                <i className="ri-delete-bin-5-line" />
                                            </Button>
                                        </HasPermission>
                                    </div>
                                </div>
                                <p className="text-muted mb-2">
                                    {startDate.format("hh:mm A")} -{" "}
                                    {endDate.format("hh:mm A")}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    {badge}
                                    <div>
                                        {session.qa_status == true && (
                                            <Link
                                                href={route(
                                                    "organizer.events.qa.index",
                                                    {
                                                        session_id: session.id,
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
                                        {session.posts == true && (
                                            <Link
                                                href={route(
                                                    "organizer.posts.index",{
                                                        id: session.id,
                                                    }
                                                )}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
