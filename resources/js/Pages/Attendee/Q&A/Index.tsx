import Layout from '../../../Layouts/Attendee';
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Container, Row, Col } from "react-bootstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import QuestionList from "./Components/QuestionList";
import QuestionForm from "./Components/QuestionForm";

interface User {
    id?: number;
    name?: string;
    role?: string;
    is_organizer?: boolean;
}

interface Question {
    id: number;
    content: string;
    likes_count: number;
    dislikes_count: number;
    created_at: string;
    user: { id?: number; name?: string; first_name?: string };
    answers: { id: number; content: string; created_at: string; user: { name?: string } }[];
}

interface Event {
    id: number;
    name: string;
}

interface Props {
    eventApp: Event;
    organizer_questions: Question[];
    attendee_questions: Question[];
    newAnswer?: { id: number; content: string; created_at: string; user: { name: string } };
}

function Index({ eventApp, organizer_questions: initialOrganizerQuestions, attendee_questions: initialAttendeeQuestions, newAnswer }: Props) {
    const { auth } = usePage().props as { auth: { user: User } };
    const [organizerQuestions, setOrganizerQuestions] = useState<Question[]>(initialOrganizerQuestions);
    const [attendeeQuestions, setAttendeeQuestions] = useState<Question[]>(initialAttendeeQuestions);

    useEffect(() => {
        setOrganizerQuestions(initialOrganizerQuestions);
    }, [initialOrganizerQuestions]);

    useEffect(() => {
        setAttendeeQuestions(initialAttendeeQuestions);
    }, [initialAttendeeQuestions]);

    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const interval = setInterval(async () => {
            try {
                const url = route("attendee.events.qa.index", { session_id: eventApp?.id });
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": csrfToken || "",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOrganizerQuestions(data.organizer_questions || []);
                setAttendeeQuestions(data.attendee_questions || []);
            } catch (error) {
                console.error("AJAX polling error:", error);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [eventApp?.id]);

    return (
        <React.Fragment>
            <Head title={`Q&A | ${eventApp?.name || "Event Central"}`} />
            <div className="page-content">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex flex-row align-items-center">
                                    <Link
                                        href={route("attendee.event.detail.agenda", eventApp.id)}
                                        style={{ marginRight: "3px" }}
                                    >
                                        <i className="bx bx-arrow-back fs-3 fw-bolder text-muted"></i>
                                    </Link>
                                    <h5 className="m-0 fw-bolder">Back</h5>
                                    
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <h1>Q&A</h1>
                            </div>
                             {/* Event Title Section */}
                             <div className="text-center">
                                        <h6 className="text-2xl font-bold text-gray-500 text-center">
                                            Q&A for{" "}
                                            <span className="text-black">
                                                {eventApp.name}
                                            </span>
                                        </h6>
                                    </div>
                            <div className="mt-4">
                                <QuestionForm eventId={eventApp?.id} />
                            </div>
                            <h3 className="mt-4">Organizer Questions</h3>
                            <QuestionList
                                eventId={eventApp?.id}
                                user={auth?.user || ({} as User)}
                                questions={organizerQuestions}
                                newAnswer={newAnswer}
                                canAnswer={true} // Attendees can answer organizer questions
                            />
                            <h3 className="mt-4">Attendee Questions</h3>
                            <QuestionList
                                eventId={eventApp?.id}
                                user={auth?.user || ({} as User)}
                                questions={attendeeQuestions}
                                newAnswer={newAnswer}
                                canAnswer={false} // Attendees cannot answer attendee questions
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;
export default Index;