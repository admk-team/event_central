import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Button, Form, FloatingLabel, Card } from 'react-bootstrap'; // Added Card

interface Props {
    eventId: number;
}

const QuestionForm: React.FC<Props> = ({ eventId }) => {
    const [content, setContent] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            route('organizer.events.qa.store', { event: eventId }),
            { content },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setContent('');
                    // router.reload({ only: ['questionlist'] });
                },
                onError: (errors) => console.error('Question submission error:', errors),
            }
        );
    };

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="questionContent" label="What’s your question?" className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                            placeholder="What’s your question?"
                            className="focus-ring-primary"
                        />
                    </FloatingLabel>
                    <Button type="submit" variant="primary" className="w-100">
                        Ask Question
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default QuestionForm;