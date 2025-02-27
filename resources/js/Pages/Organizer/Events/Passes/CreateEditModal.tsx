import { useForm, usePage } from '@inertiajs/react';
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';


export default function CreateEditModal({ show, hide, onHide, pass, event_sessions }: { show: boolean, hide: () => void, onHide: () => void, pass: any, event_sessions: any | null }) {
    const isEdit = pass != null ? true : false;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        event_session_id: pass?.event_session_id ?? '',
        name: pass?.name ?? '',
        description: pass?.description ?? '',
        type: pass?.type ?? '',
        price: pass?.price ?? '',
        increament_by: pass?.increament_by ?? '',
        increament_rate: pass?.increament_rate ?? '',
        start_increament: pass?.start_increament ?? '',
        end_increament: pass?.end_increament ?? '',
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.events.passes.update', pass.id), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
        } else {
            post(route('organizer.events.passes.store', data), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
            console.log('testing pass', errors);
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit Session Pass' : 'New Session Pass'}
                </h5>
            </Modal.Header>
            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">

                        <Form.Label htmlFor="event_app_id" className="form-label">Select Event Session</Form.Label>
                        <select
                            className="form-select "
                            id="event_app_id"
                            aria-label="Select event app"
                            value={data.event_session_id}
                            onChange={(e) => setData('event_session_id', e.target.value)}
                        >
                            <option value="">Select Event Session</option>
                            {event_sessions.map((session: any) => (
                                <option value={session.id} key={session.id}>{session.name}</option>
                            ))}
                        </select>
                        <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.event_session_id} </Form.Control.Feedback>
                    </FormGroup>
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
                    <FormGroup className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            isInvalid={!!errors.description}
                        />
                        {errors.description && <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    isInvalid={!!errors.type}
                                />
                                {errors.type && <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    isInvalid={!!errors.price}
                                />
                                {errors.price && <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Increment By</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.increament_by}
                                    onChange={(e) => setData('increament_by', e.target.value)}
                                    isInvalid={!!errors.increament_by}
                                />
                                {errors.increament_by && <Form.Control.Feedback type="invalid">{errors.increament_by}</Form.Control.Feedback>}
                            </FormGroup></Col>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Increament Rate</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.increament_rate}
                                    onChange={(e) => setData('increament_rate', e.target.value)}
                                    isInvalid={!!errors.increament_rate}
                                />
                                {errors.increament_rate && <Form.Control.Feedback type="invalid">{errors.increament_rate}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Start Increment</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    // options={{ dateFormat: "Y M, d" }}
                                    placeholder="Enter Start date"
                                    value={data.start_increament}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData('start_increament', selectedDate.toISOString().split("T")[0]);
                                    }}
                                // isInvalid={!!errors.start_increament}
                                />
                                {errors.start_increament && <Form.Control.Feedback type="invalid">{errors.start_increament}</Form.Control.Feedback>}
                            </FormGroup>

                        </Col>

                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>End Increment</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    // options={{ dateFormat: "Y M, d" }}
                                    placeholder="Enter End date"
                                    value={data.end_increament}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData('end_increament', selectedDate.toISOString().split("T")[0]);
                                    }}
                                // isInvalid={!!errors.end_increament}
                                />
                                {errors.end_increament && <Form.Control.Feedback type="invalid">{errors?.end_increament}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>
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
    )
}
