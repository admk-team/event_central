import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Poll {
    question: string;
    options: { text: string; like: number }[];
}

const PollModal = ({
    show,
    handleClose,
    postTitle,
    updateFormData,
}: any) => {
    const [question, setQuestion] = useState(postTitle);
    const [options, setOptions] = useState([{ text: "", like: 0 }]);
    const [pollData, setPollData] = useState<Poll[]>([]);

    // Add a new option
    const addOption = () => {
        setOptions([...options, { text: "", like: 0 }]);
    };

    // Handle option change
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = options.map((option, i) =>
            i === index ? { ...option, text: value } : option
        );
        setOptions(newOptions);
    };

    // Handle form submission
    const handleSubmit = () => {
        const Data = {
            question,
            options,
        };
        updateFormData("post_poll", JSON.stringify(Data));
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create a Poll</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Poll Question</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="What's your question?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </Form.Group>

                    {options.map((option, index) => (
                        <Form.Group key={index} className="mt-2">
                            <Form.Control
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option.text}
                                onChange={(e) =>
                                    handleOptionChange(index, e.target.value)
                                }
                            />
                        </Form.Group>
                    ))}

                    <Button
                        variant="outline-primary"
                        onClick={addOption}
                        className="mt-2"
                    >
                        + Add Option
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-light" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Poll
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PollModal;
