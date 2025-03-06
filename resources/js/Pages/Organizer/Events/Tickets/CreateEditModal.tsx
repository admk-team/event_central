import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';
import Collections from '../../../Theme/NFTMarketplace/Collections';
import { elements } from 'chart.js';
import { identity } from '@fullcalendar/core/internal';


export default function CreateEditModal({ show, hide, onHide, ticket, sessions }: { show: boolean, hide: () => void, onHide: () => void, ticket: any, sessions: any | null }) {
    const isEdit = ticket != null ? true : false;
    const [sessionIds, setSessionIds] = useState([]);

    console.log(ticket, sessions);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        event_session_id: ticket?.event_session_id ?? '',
        session_ids: ticket?.session_ids ?? [],
        name: ticket?.name ?? '',
        description: ticket?.description ?? '',
        type: ticket?.type ?? '',
        price: ticket?.price ?? '',
        increament_by: ticket?.increament_by ?? '',
        increament_rate: ticket?.increament_rate ?? '',
        start_increament: ticket?.start_increament ?? '',
        end_increament: ticket?.end_increament ?? '',
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.events.tickets.update', ticket.id), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
        } else {
            post(route('organizer.events.tickets.store', data), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
            console.log('testing ticket', errors);
        }
    }

    const handleCheckBoxChange = (event) => {
        let id = event.target.dataset.sessionId;

        if (event.target.checked) {
            setSessionIds(old => [
                ...old,
                id
            ]);
        } else {
            var array: any = [...sessionIds]; // make a separate copy of the array
            var index = array.indexOf(id)
            if (index !== -1) {
                array.splice(index, 1);
                setSessionIds(...array);
            }
        }
        // setData('session_ids', sessionIds);
        console.log(sessionIds);
    }

    const sessionsList = sessions.map((session: any) =>
        <Col md={4} lg={4} key={session.id}>
            <Form.Check // prettier-ignore
                className="mb-3 sessionIds"
                type='checkbox'
                id={'session-id-' + session.id}
                label={session.name}
                data-session-id={session.id}
                onChange={handleCheckBoxChange}
            />
        </Col>);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit Ticket' : 'New Ticket'}
                </h5>
            </Modal.Header>
            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    {/* <FormGroup className="mb-3">

                        <Form.Label htmlFor="event_app_id" className="form-label">Select Event Session</Form.Label>
                        <select
                            multiple
                            className="form-select "
                            id="event_app_id"
                            aria-label="Select event app"
                            value={field}
                            onChange={handleSelectChange}
                        >
                            <option value="">Select Event Session</option>
                            {sessions.map((session: any) => (
                                <option value={session.id} key={session.id}>{session.name}</option>
                            ))}
                        </select>
                        <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.event_session_id} </Form.Control.Feedback>
                    </FormGroup> */}
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
                    <Row><Col className='mb-3' l>Session</Col></Row>
                    <Row className='d-flex flex-row'>
                        <Col>
                            {sessionsList}
                        </Col>
                    </Row>
                    {/* <Row>
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
                    </Row> */}
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
