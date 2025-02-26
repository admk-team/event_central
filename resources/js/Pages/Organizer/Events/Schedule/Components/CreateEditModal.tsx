import { useForm, usePage } from '@inertiajs/react';
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';
import { useEffect } from 'react'; // Import useEffect

export default function CreateEditModal({ show, hide, onHide, event_sessions, speakers, startTime, endTime }: { show: boolean, hide: () => void, onHide: () => void, event_sessions: any, speakers: any, startTime: string, endTime: string }) {
    const isEdit = event_sessions != null ? true : false;

    // Initialize the form data with the existing date and time
    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: event_sessions?.name ?? '',
        event_speaker_id: event_sessions?.event_speaker_id ?? '',
        type: event_sessions?.type ?? 'Lecture',
        description: event_sessions?.description ?? '',
        capacity: event_sessions?.capacity ?? '',
        start_date: event_sessions?.start_date ?? `2025-02-24 ${startTime}`, // Default date with time
        end_date: event_sessions?.end_date ?? `2025-02-24 ${endTime}`, // Default date with time
        event_app_id: event_sessions?.event_app_id ?? '',
    });

    // Update the form data when startTime or endTime changes


    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.events.schedule.update', event_sessions.id), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            });
        } else {
            post(route('organizer.events.schedule.store', data), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            });
            console.log('testing schedule', errors);
        }
    };

    // Function to update only the time part of the date-time string
    const updateTime = (dateTime: string, newTime: string) => {
        const [datePart] = dateTime.split(' '); // Extract the date part (e.g., "2025-02-24")
        return `${datePart} ${newTime}`; // Combine the date with the new time
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit Schedule' : 'Add Schedule'}
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                    </FormGroup>

                    <Tab.Container defaultActiveKey={data.type}>
                        <Nav variant="tabs" className="nav-tabs nav-justified mb-3">
                            <Nav.Item>
                                <Nav.Link eventKey="Lecture" onClick={() => setData('type', 'Lecture')}>
                                    Lecture
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Workshop" onClick={() => setData('type', 'Workshop')}>
                                    Workshop
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Break" onClick={() => setData('type', 'Break')}>
                                    Break
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Tab.Container>

                    <FormGroup className="mb-3">
                        <Row>
                            <Col md={6}>
                                <Form.Label>Start Time</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        enableTime: true,
                                        noCalendar: true, // Disable calendar (only time picker)
                                        dateFormat: "H:i", // Format as "HH:mm"
                                        time_24hr: true, // Use 24-hour format
                                    }}
                                    placeholder="Select Start Time"
                                    value={data.start_date.split(' ')[1]} // Extract the time part (e.g., "01:04:50")
                                    onChange={([selectedDate]: Date[]) => {
                                        const newTime = selectedDate.toTimeString().split(' ')[0]; // Extract "HH:mm:ss"
                                        setData('start_date', updateTime(data.start_date, newTime)); // Update only the time
                                    }}
                                />
                                {errors.start_date && <Form.Control.Feedback type="invalid">{errors.start_date}</Form.Control.Feedback>}
                            </Col>
                            <Col md={6}>
                                <Form.Label>End Time</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        enableTime: true,
                                        noCalendar: true, // Disable calendar (only time picker)
                                        dateFormat: "H:i", // Format as "HH:mm"
                                        time_24hr: true, // Use 24-hour format
                                    }}
                                    placeholder="Select End Time"
                                    value={data.end_date.split(' ')[1]} // Extract the time part (e.g., "01:04:50")
                                    onChange={([selectedDate]: Date[]) => {
                                        const newTime = selectedDate.toTimeString().split(' ')[0]; // Extract "HH:mm:ss"
                                        setData('end_date', updateTime(data.end_date, newTime)); // Update only the time
                                    }}
                                />
                                {errors.end_date && <Form.Control.Feedback type="invalid">{errors.end_date}</Form.Control.Feedback>}
                            </Col>
                        </Row>
                    </FormGroup>

                    {(data.type === 'Lecture' || data.type === 'Workshop') && (
                        <>
                            <FormGroup className="mb-3">
                                <Form.Label htmlFor="event_app_id" className="form-label">Select Event Speaker</Form.Label>
                                <select
                                    className="form-select"
                                    id="event_app_id"
                                    aria-label="Select event app"
                                    value={data.event_speaker_id}
                                    onChange={(e) => setData('event_speaker_id', e.target.value)}
                                >
                                    <option value="">Select Event Speaker</option>
                                    {speakers.map((speaker: any) => (
                                        <option value={speaker.id} key={speaker.id}>{speaker.name}</option>
                                    ))}
                                </select>
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.event_speaker_id} </Form.Control.Feedback>
                            </FormGroup>
                        </>
                    )}

                    {data.type === 'Workshop' && (
                        <FormGroup className="mb-3">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control
                                type="number"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                isInvalid={!!errors.capacity}
                            />
                            {errors.capacity && <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>}
                        </FormGroup>
                    )}

                    {(data.type === 'Break' || data.type === 'Lecture' || data.type === 'Workshop') && (
                        <FormGroup className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                isInvalid={!!errors.description}
                            />
                            {errors.description && <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
                        </FormGroup>
                    )}
                </Modal.Body>

                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={hide}>Close</button>
                    <button type="submit" className="btn btn-success" disabled={processing}>
                        {processing ? (
                            <span className="d-flex gap-1 align-items-center">
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {isEdit ? 'Updating' : 'Creating'}
                            </span>
                        ) : (
                            <span>{isEdit ? 'Update' : 'Create'}</span>
                        )}
                    </button>
                </div>
            </Form>
        </Modal>
    );
}