import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from "@inertiajs/react"; // or '@inertiajs/react' based on your setup

const CheckInModal = ({ show, onHide, attendee, purchasedSession }: any) => {

    const { data, setData, post, reset, errors } = useForm({
        attendee : attendee,
        event_session_id: ''
    });

    const handleCheckIn = () => {

        post(route('organizer.events.attendee.checkin'), {
            onSuccess: () => {
                onHide();
                reset();
            }
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Check In to Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Select a session</Form.Label>
                    <Form.Select
                        value={data.event_session_id}
                        onChange={(e) => setData('event_session_id',e.target.value)}
                    >
                        <option value="">-- Select Session --</option>
                        {Object.entries(purchasedSession).map(([date, sessions]) => (
                            <optgroup key={date} label={date} className="border-b-1">
                                {sessions.map((session: any) => {
                                    const now = new Date();
                                    const startDateTime = new Date(session.start_date_time);
                                    const endDateTime = new Date(session.end_date_time);
                                    const isDisabled = now >= startDateTime && now <= endDateTime;
                                    const formatDateTime = (date: Date) =>
                                        date.toLocaleString(undefined, {
                                            // year: 'numeric',
                                            // month: 'short',
                                            // day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });
                                    const formatEndDateTime = (date: Date) =>
                                        date.toLocaleString(undefined, {
                                            // year: 'numeric',
                                            // month: 'short',
                                            // day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });

                                    return (
                                        <option
                                            key={session.id}
                                            value={session.id}
                                            disabled={!isDisabled}
                                        >
                                            {session.name} — ({formatDateTime(startDateTime)} to {formatEndDateTime(endDateTime)})
                                        </option>
                                    );
                                })}
                            </optgroup>
                        ))}

                    </Form.Select>
                    {/* Display error message if there is an error */}
                    {errors.session && <p className="text-danger mt-2">{errors.session}</p>}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleCheckIn} disabled={!data.event_session_id}>
                    Check In
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CheckInModal;
