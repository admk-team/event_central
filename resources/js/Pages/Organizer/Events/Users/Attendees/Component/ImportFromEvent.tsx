import React, { useState } from "react";
import { Modal, Button, Form, Alert, ModalBody, Row, Col } from "react-bootstrap";
import { useForm } from "@inertiajs/react";
import Select from "react-select";

const ImportFromEvent = ({ show, handleClose, eventList }: any) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        event_id: ""
    });

    const eventOptions = eventList.map((eventsingle: any) => ({
        value: eventsingle.id, // "AF"
        label: eventsingle.name  // "Afghanistan"
    }));

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route('organizer.events.attendee.importevent'), {
            onSuccess: () => {
                handleClose();
                reset();
            }
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Import Attendees From Other Events</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12} lg={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Event</Form.Label>
                                <Select
                                    id="event_id"
                                    options={eventOptions}
                                    onChange={(selected: any) => setData("event_id", selected?.value || "")}
                                    isSearchable={true}
                                    placeholder="Select a Event..."
                                />
                                <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                    {" "} {errors.event_id}{" "}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Button className="btn btn-light" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Add Attendee"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default ImportFromEvent;
