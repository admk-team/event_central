import Layout from "../../../../Layouts/Event";
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Container, Row, Col, Card } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import QuestionList from "../../Events/Q&A/Components/QuestionList";
import QuestionForm from "../../Events/Q&A/Components/QuestionForm";

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
    answers: {
        id: number;
        content: string;
        created_at: string;
        user: { name: string };
    }[];
}

interface Event {
    id: number;
    name: string;
}

interface Props {
    event: Event;
    questionlist: Question[];
    newAnswer?: {
        id: number;
        content: string;
        created_at: string;
        user: { name: string };
    };
}

function Index({ event, questionlist: initialQuestions, newAnswer }: Props) {
    const { auth } = usePage().props as { auth: { user: User } };
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);

    // Sync initial questions from props
    useEffect(() => {
        setQuestions(initialQuestions);
    }, [initialQuestions]);

    // AJAX polling for new questions every 5 seconds
    useEffect(() => {
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");
        const interval = setInterval(async () => {
            try {
                const url = route("organizer.events.qa.index", { session_id: event?.id }); // Pass event.id as session_id
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
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
            <Head title={`Q&A | ${event?.name || "Event Central"}`} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title={`Q&A for ${event?.name || "Unnamed Event"}`}
                        pageTitle="Events"
                    />
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6}>
                            <div className="text-center">
                                <h1>Q&A</h1>
                            </div>
                            <div className="mt-4">
                                <Card className="text-center p-4">
                                    <h5 className="text-muted mb-0">
                                        Your attendees are eager to learn! Check
                                        out their questions and join the
                                        discussion.
                                    </h5>
                                </Card>
                            </div>
                            <QuestionList
                                eventId={event?.id}
                                user={auth?.user || ({} as User)}
                                questions={questions}
                                newAnswer={newAnswer}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="text-center">
                            <Link
                                href={route("organizer.events.schedule.index")}
                                className="btn btn-outline-primary"
                            >
                                <i className="ri-arrow-left-line"></i> Back to
                                Schedule
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
