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
    user: { id?: number; first_name: string };
    answers: { id: number; content: string; created_at: string; user: { name: string } }[];
}

interface Event {
    id: number;
    name: string;
}

interface Props {
    eventApp: Event;
    questionlist: Question[];
    newAnswer?: { id: number; content: string; created_at: string; user: { name: string } };
}

function Index({ eventApp, questionlist: initialQuestions, newAnswer }: Props) {
    const { auth } = usePage().props as { auth: { user: User } };
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);

    // Sync initial questions from props
    useEffect(() => {
        setQuestions(initialQuestions);
    }, [initialQuestions]);

    // AJAX polling for new questions every 5 seconds
    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const interval = setInterval(async () => {
            try {
                const url = route("attendee.events.qa.index", { session_id: eventApp?.id }); // Pass event.id as session_id
                // const url = route("attendee.events.qa.index");
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
                const newQuestions = (data.questionlist || []) as Question[]; // Fallback to empty array if undefined
                // Replace the entire questions state with the new data from the response
                setQuestions(() => {
              
                    return newQuestions;
                });
            } catch (error) {
                console.error("AJAX polling error:", error);
            }
        }, 5000); // Every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <Head title={`Q&A | ${eventApp?.name || "Event Central"}`} />
            <div className="page-content">
                <Container fluid>
                    {/* <BreadCrumb title={`Q&A for ${eventApp?.name || "Unnamed Event"}`} pageTitle="Events" /> */}
                    <Row className="justify-content-center">

                        <Col xs={12} md={8} lg={6}>
                         <div className="d-flex justify-content-between align-items-center mb-4">
                                                                <div className="d-flex flex-row align-items-center">
                                                                    {/* href = { route('attendee.event.detail.agenda', eventApp.id) */}
                        
                                                                    <Link
                                                                        href={route(
                                                                            "attendee.event.detail.agenda",
                                                                            eventApp.id
                                                                        )}
                                                                        style={{ marginRight: "3px" }}
                                                                    >
                                                                        <i className="bx bx-arrow-back fs-3 fw-bolder text-muted"></i>
                                                                    </Link>
                                                                    <h5 className="m-0 fw-bolder">
                                                                    Back
                                                                    </h5>
                                                                </div>
                                                            </div>
                            <div className="text-center">
                                <h1>Q&A</h1>
                            </div>
                            <div className="mt-4">
                                <QuestionForm eventId={eventApp?.id} />
                            </div>
                            <QuestionList
                                eventId={eventApp?.id}
                                user={auth?.user || ({} as User)}
                                questions={questions}
                                newAnswer={newAnswer}
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