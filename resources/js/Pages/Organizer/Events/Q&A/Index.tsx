import Layout from "../../../../Layouts/Event";
import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Container, Row, Col } from "react-bootstrap";
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
    user: { name: string };
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
    }; // Added newAnswer prop
}

function Index({ event, questionlist, newAnswer }: Props) {
    const { auth } = usePage().props as { auth: { user: User } };

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
                                <QuestionForm eventId={event?.id} />
                            </div>
                            <QuestionList
                                eventId={event?.id}
                                user={auth?.user || ({} as User)}
                                questions={questionlist || []}
                                newAnswer={newAnswer} // Pass newAnswer
                            />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="text-center">
                            <Link
                                href={route("organizer.events.index")}
                                className="btn btn-outline-primary"
                            >
                                <i className="ri-arrow-left-line"></i> Back to
                                Events
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
