import { useState, useEffect } from "react";
import { Button, Col, Row, Card, Badge, Modal, Form } from "react-bootstrap";
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
    user: { id?: number; first_name: string };
    answers: { id: number; content: string; created_at: string; user: { name: string } }[];
}

interface Props {
    eventId: number;
    user: User;
    questions: Question[];
    newAnswer?: { id: number; content: string; created_at: string; user: { name: string } };
}

const QuestionList: React.FC<Props> = ({ eventId, user, questions: initialQuestions, newAnswer }) => {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false); // Added state for edit modal
    const [editContent, setEditContent] = useState<string>(""); // Added state for edit content

    useEffect(() => {
        setQuestions(initialQuestions);
        if (newAnswer && selectedQuestionId) {
            appendNewAnswer(newAnswer, selectedQuestionId);
            setShowAnswerModal(false);
            setSelectedQuestionId(null);
        }
    }, [initialQuestions, newAnswer, selectedQuestionId]);

    const handleVote = (questionId: number, vote: 1 | -1) => {
        router.post(
            route("attendee.events.qa.vote", { questionId }),
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

    const handleEditQuestion = (questionId: number, currentContent: string) => {
        setSelectedQuestionId(questionId);
        setEditContent(currentContent);
        setShowEditQuestionModal(true);
    };

    const handleUpdateQuestion = () => {
        if (selectedQuestionId) {
            router.put(
                route("attendee.events.qa.updateQuestion", { questionId: selectedQuestionId }),
                { content: editContent },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setQuestions((prev) =>
                            prev.map((q) =>
                                q.id === selectedQuestionId ? { ...q, content: editContent } : q
                            )
                        );
                        setShowEditQuestionModal(false);
                        setSelectedQuestionId(null);
                        setEditContent("");
                    },
                    onError: (errors) => console.error("Update question error:", errors),
                }
            );
        }
    };

    const handleDeleteQuestion = (questionId: number) => {
        router.delete(route("attendee.events.qa.destroyQuestion", { questionId }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                setQuestions((prev) => prev.filter((q) => q.id !== questionId));
            },
            onError: (errors) => {
                console.error("Delete question error:", errors);
            },
        });
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
                                            {question.user?.first_name || "Anonymous"}
                                        </Badge>{" "}
                                        • {new Date(question.created_at).toLocaleString()}
                                    </p>
                                </Col>
                                {/* Only show edit/delete buttons if the user is the question owner */}
                                {user?.id === question.user?.id && (
                                    <Col xs="auto" className="ms-auto">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEditQuestion(question.id, question.content)}
                                        >
                                            <i className="ri-edit-line"></i>
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteQuestion(question.id)}
                                        >
                                            <i className="ri-delete-bin-line"></i>
                                        </Button>
                                    </Col>
                                )}
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
                        <AnswerForm
                            questionId={selectedQuestionId}
                            onClose={handleCloseAnswerModal}
                        />
                    )}
                </Modal.Body>
            </Modal>

            {/* Edit Question Modal */}
            <Modal show={showEditQuestionModal} onHide={() => setShowEditQuestionModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Question Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" className="mt-3" onClick={handleUpdateQuestion}>
                            Update Question
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default QuestionList;