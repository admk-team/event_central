import { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Index = ({ events }: any) => {
    const [zoomLevel, setZoomLevel] = useState(1); // 1 = default
    const { t } = useLaravelReactI18n();

    const handleZoomIn = () => {
        setZoomLevel((prev) => Math.min(prev + 1, 3));
    };

    const handleZoomOut = () => {
        setZoomLevel((prev) => Math.max(prev - 1, 1));
    };

    const getSlotDuration = () => {
        switch (zoomLevel) {
            case 1:
                return "01:00:00"; // default (zoomed out)
            case 2:
                return "00:30:00";
            case 3:
                return "00:15:00"; // zoomed in
            default:
                return "01:00:00";
        }
    };

    // Memoize event mapping to prevent unnecessary re-renders
    const calendarEvents = useMemo(() => {
        const generateRandomHex = () => {
            const randomNum = Math.floor(Math.random() * 0xffffff);
            return `#${randomNum.toString(16).padStart(6, "0").toUpperCase()}`;
        };

        return events.event_sessions.map((session: any) => {
            const color = generateRandomHex();
            return {
                id: session.id.toString(),
                title: session.name,
                start: session.start_date_time,
                end: session.end_date_time,
                backgroundColor: color,
                borderColor: color,
                color: "#fff", // text color
            };
        });
    }, [events.event_sessions]);

    return (
        <>
            <Head title={t("Event Calendar")} />
            <div className="page-content">
                <Container fluid>
                    <h2 className="text-center mb-4 fw-bold">
                        {events.name} – {t("Schedule")}
                    </h2>

                    {/* <Row className="mb-3 justify-content-center">
                        <Col xs="auto">
                            <Button
                                variant="primary"
                                onClick={handleZoomOut}
                                disabled={zoomLevel === 1}
                            >
                                {t("Zoom Out")}
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="primary"
                                onClick={handleZoomIn}
                                disabled={zoomLevel === 3}
                            >
                                {t("Zoom In")}
                            </Button>
                        </Col>
                    </Row> */}

                    <Card className="shadow-sm">
                        <Card.Body>
                            <FullCalendar
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                    rrulePlugin,
                                ]}
                                initialView="dayGridMonth"
                                events={calendarEvents}
                                eventDisplay="block"
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                                }}
                                eventClick={(info) => {
                                    const sessionId = info.event.id;
                                    router.visit(route('attendee.event.detail.session', { eventSession: sessionId }));
                                }}
                                height="auto"
                                dayMaxEventRows={true} // 👈 this enables "Show More"
                                /* Optional: use dayMaxEvents instead
                                dayMaxEvents={3} // show up to 3, then +X more
                                */
                                views={{
                                    dayGridMonth: {
                                        dayMaxEventRows: 4, // specific to month view
                                    },
                                }}
                            />

                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
};

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
