import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { router } from '@inertiajs/react';

interface Props {
    questionId: number;
    onClose?: () => void;
}

const AnswerForm: React.FC<Props> = ({ questionId, onClose }) => {
    const [content, setContent] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            route("attendee.events.qa.answer", { questionId }),
            { content },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setContent("");
                    if (onClose) onClose(); // Close modal on success
                },
                onError: (errors) => console.error("Answer submission error:", errors),
            }
        );
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="answerContent" label="Write your answer..." className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={4}
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    placeholder="Write your answer..."
                    className="focus-ring-primary"
                />
            </FloatingLabel>
            <Button type="submit" variant="success" className="w-100">
                Submit Answer
            </Button>
        </Form>
    );
};

export default AnswerForm;