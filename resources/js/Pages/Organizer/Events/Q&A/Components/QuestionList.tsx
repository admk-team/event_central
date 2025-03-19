import { useState, useEffect } from "react";
import { Button, Col, Row, Card, Badge, Modal } from "react-bootstrap";
import { router } from '@inertiajs/react';
import AnswerForm from "./AnswerForm";

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
    answers: { id: number; content: string; created_at: string; user: { name: string } }[];
}

interface Props {
    eventId: number;
    user: User;
    questions: Question[];
    newAnswer?: { id: number; content: string; created_at: string; user: { name: string } }; // Added for new answer
}

const QuestionList: React.FC<Props> = ({ eventId, user, questions: initialQuestions, newAnswer }) => {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

    useEffect(() => {
        setQuestions(initialQuestions);
        if (newAnswer && selectedQuestionId) {
            appendNewAnswer(newAnswer, selectedQuestionId);
            setShowAnswerModal(false); // Close modal when new answer is received
            setSelectedQuestionId(null);
        }
    }, [initialQuestions, newAnswer, selectedQuestionId]);

    const handleVote = (questionId: number, vote: 1 | -1) => {
        router.post(
            route("organizer.events.qa.vote", { questionId }),
            { vote },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    // router.reload({ only: ["questionlist"] });
                },
                onError: (errors) => console.error("Vote error:", errors),
            }
        );
    };

    const appendNewAnswer = (newAnswer: any, questionId: number) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
            )
        );
    };

    const handleOpenAnswerModal = (questionId: number) => {
        setSelectedQuestionId(questionId);
        setShowAnswerModal(true);
    };

    const handleCloseAnswerModal = () => {
        setShowAnswerModal(false);
        setSelectedQuestionId(null);
    };

    const sortedQuestions = [...questions].sort(
        (a, b) => b.likes_count - b.dislikes_count - (a.likes_count - a.dislikes_count)
    );

    return (
        <div className="space-y-4">
            {sortedQuestions.length === 0 ? (
                <Card className="text-center p-4">
                    <p className="text-muted mb-0">No questions yet. Be the first to ask!</p>
                </Card>
            ) : (
                sortedQuestions.map((question) => (
                    <Card key={question.id} className="shadow-sm mb-4" id={`question-${question.id}`}>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col>
                                    <h3 className="fs-16 fw-semibold text-dark mb-1">{question.content}</h3>
                                    <p className="text-muted fs-12 mb-0">
                                        Asked by{" "}
                                        <Badge bg="light" text="dark">
                                            {question.user?.name || "Anonymous"}
                                        </Badge>{" "}
                                        • {new Date(question.created_at).toLocaleString()}
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mt-2 align-items-center">
                                <Col xs="auto">
                                    <Button
                                        variant="outline-success"
                                        className="me-2"
                                        onClick={() => handleVote(question.id, 1)}
                                    >
                                        <i className="ri-thumb-up-line"></i> {question.likes_count}
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => handleVote(question.id, -1)}
                                    >
                                        <i className="ri-thumb-down-line"></i> {question.dislikes_count}
                                    </Button>
                                </Col>
                                {user?.role === "organizer" && (
                                    <Col xs="auto" className="ms-auto">
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleOpenAnswerModal(question.id)}
                                        >
                                            <i className="ri-reply-line me-1"></i> Answer
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                            {question.answers?.length > 0 && (
                                <div className="mt-3">
                                    {question.answers.map((answer) => (
                                        <Card key={answer.id} className="mt-3 border-start border-primary">
                                            <Card.Body>
                                                <p className="text-dark">{answer.content}</p>
                                                <p className="text-muted fs-12 mt-1">
                                                    Answered by{" "}
                                                    <Badge bg="light" text="dark">
                                                        {answer.user?.name || "Anonymous"}
                                                    </Badge>{" "}
                                                    • {new Date(answer.created_at).toLocaleString()}
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                ))
            )}

            {/* Answer Modal */}
            <Modal show={showAnswerModal} onHide={handleCloseAnswerModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Answer Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedQuestionId && (
                        <AnswerForm questionId={selectedQuestionId} onClose={handleCloseAnswerModal} />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default QuestionList;