import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PollModal = ({ show, handleClose, postTitle }: any) => {
    const [question, setQuestion] = useState(postTitle);
    const [options, setOptions] = useState([{ text: "", like: 0 }]);

    useEffect(() => {
        setQuestion(postTitle);
    }, [postTitle]);

    // Add a new option (max 4)
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
        const pollData = {
            question,
            options,
        };
        console.log("Poll Created:", pollData);
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
                                onChange={(e) => handleOptionChange(index, e.target.value)}
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
                    Create Poll
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PollModal;
