import { useForm, usePage } from '@inertiajs/react';
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';

export default function CreateEditSessionModal({ show, hide, onHide, eventSession, selectedDate, selectedPlatform }: { show: boolean, hide: () => void, onHide: () => void, eventSession: any, selectedDate: any, selectedPlatform: any }) {
    const isEdit = eventSession != null ? true : false;

    const speakers = usePage().props.speakers as any;

    // Initialize the form data with the existing date and time
    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: eventSession?.name ?? '',
        event_speaker_id: eventSession?.event_speaker_id ?? '',
        event_platform_id: selectedPlatform.id,
        event_date_id: selectedDate?.id,
        type: eventSession?.type ?? 'Lecture',
        description: eventSession?.description ?? '',
        capacity: eventSession?.capacity ?? '',
        start_time: eventSession?.start_time ?? '00:00' , // Default time with time
        end_time: eventSession?.end_time ?? '00:00', // Default date with time
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.events.schedule.update', eventSession.id), {
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
        }
    };



    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit Session' : 'Add Session'}
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
                                <Form.Label className="form-label mb-0">Start Time</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                    }}
                                    value={data.start_time}
                                    onChange={([selectedDate]: Date[]) => {
                                        if (selectedDate) {
                                            setData('start_time', selectedDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
                                        }
                                    }}


                                />
                                {errors.start_time && <Form.Control.Feedback type="invalid">{errors.start_time}</Form.Control.Feedback>}
                            </Col>
                            <Col md={6}>
                                <Form.Label className="form-label mb-0">End Time</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                    }}
                                    value={data.end_time}
                                    // onChange={(e: any) => setData('end_time', e.target.value)}
                                    onChange={([selectedDate]: Date[]) => {
                                        if (selectedDate) {
                                            setData('end_time', selectedDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
                                        }
                                    }}

                                />
                                {errors.end_time && <Form.Control.Feedback type="invalid">{errors.end_time}</Form.Control.Feedback>}
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
