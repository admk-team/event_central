import { Link as Link, usePage } from "@inertiajs/react";
import moment from "moment";
import { Button, Col, Row } from "react-bootstrap";
import HasPermission from "../../../../../Components/HasPermission";
import { useLaravelReactI18n } from "laravel-react-i18n";

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
  const { t } = useLaravelReactI18n();
  const enableTracks = usePage().props.enableTracks as boolean;

  const startDate = moment(`${session.event_date.date} ${session.start_time}`, "YYYY-MM-DD HH:mm:ss");
  const endDate = moment(`${session.event_date.date} ${session.end_time}`, "YYYY-MM-DD HH:mm:ss");
  const now = moment();

  let sessionStatus: "upcoming" | "passed" | "ongoing";
  let badge;

  switch (true) {
    case now.isBefore(startDate):
      sessionStatus = "upcoming";
      badge = (
        <span className="badge rounded-pill bg-primary-subtle text-primary fw-bold fs-12">
          {t("Upcoming")}
        </span>
      );
      break;
    case now.isAfter(endDate):
      sessionStatus = "passed";
      badge = (
        <span className="badge rounded-pill bg-dark-subtle text-dark fw-bold fs-12">
          {t("Passed")}
        </span>
      );
      break;
    default:
      sessionStatus = "ongoing";
      badge = (
        <span className="badge rounded-pill bg-success-subtle text-success fw-bold fs-12">
          {t("Ongoing")}
        </span>
      );
      break;
  }

  return (
    <Row className={`timeline-right ${sessionStatus !== "passed" ? "scroll-to" : ""}`}>
      <Col xs={12}>
        <p
          className={`timeline-date text-${
            sessionStatus === "upcoming" ? "primary" : sessionStatus === "passed" ? "light" : "success"
          }`}
          title={t("Start time")}
          aria-label={t("Start time")}
        >
          {startDate.format("hh:mm A")}
        </p>
      </Col>
      <Col xs={12}>
        <div className="timeline-box">
          <div className="timeline-text w-100">
            <div className="d-flex">
              <div className="flex-grow-1">
                {enableTracks && session.tracks.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {session.tracks.slice(0, 3).map((track: any) => (
                      <div
                        key={track.id}
                        className="rounded"
                        style={{ backgroundColor: track.color, width: "30px", height: "8px" }}
                        title={track.name}
                        aria-label={track.name}
                      ></div>
                    ))}
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="fs-17 mb-0">{session.name}</h4>
                  <div className="d-flex gap-1">
                    <HasPermission permission="edit_event_sessions">
                      <Button
                        onClick={onEdit}
                        variant="primary"
                        size="sm"
                        className="btn-icon"
                        title={t("Edit Session")}
                        aria-label={t("Edit Session")}
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
                        title={t("Delete Session")}
                        aria-label={t("Delete Session")}
                      >
                        <i className="ri-delete-bin-5-line" />
                      </Button>
                    </HasPermission>
                  </div>
                </div>

                <p className="text-muted mb-2">
                  {startDate.format("h:mm A")} - {endDate.format("h:mm A")}
                </p>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  {badge}
                  <div className="d-flex gap-3">
                    {session.qa_status === true && (
                      <Link
                        href={route("organizer.events.qa.index", { session_id: session.id })}
                        className="d-flex align-items-center text-decoration-none"
                        title={t("Q&A")}
                        aria-label={t("Q&A")}
                      >
                        <i className="bx bx-message-square-detail fs-4 text-primary"></i>
                        <span className="fw-bold text-primary ms-1">{t("Q&A")}</span>
                      </Link>
                    )}

                    {session.posts === true && (
                      <Link
                        href={route("organizer.posts.index", { id: session.id })}
                        className="d-flex align-items-center text-decoration-none"
                        title={t("Posts")}
                        aria-label={t("Posts")}
                      >
                        <i className="ri-image-edit-line fs-4 text-primary"></i>
                        <span className="fw-bold text-primary ms-1">{t("Posts")}</span>
                      </Link>
                    )}

                    <Link
                      href={route("organizer.sessions.ratings.index", { eventSession: session.id })}
                      className="d-flex align-items-center text-decoration-none"
                      title={t("Ratings")}
                      aria-label={t("Ratings")}
                    >
                      <i className="bx bx-star fs-4 text-primary"></i>
                      <span className="fw-bold text-primary ms-1">{t("Ratings")}</span>
                    </Link>
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
