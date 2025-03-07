import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';
import Select, { StylesConfig } from 'react-select';

export default function CreateEditModal({ show, hide, onHide, ticket, sessions }: { show: boolean, hide: () => void, onHide: () => void, ticket: any, sessions: any | null }) {


    const isEdit = ticket != null ? true : false;

    // console.log(ticket, sessions);

    const { data, setData, post, put, processing, errors, reset, transform } = useForm({
        _method: isEdit ? "PUT" : "POST",
        event_app_id: ticket?.event_app_id ?? '',
        sessions: ticket?.selected_sessions ?? [],
        name: ticket?.name ?? '',
        description: ticket?.description ?? '',
        type: 'NORMAL',         //This fields is enlisted in App documents, there for leaving to be used in future
        price: ticket?.price ?? '',
        increment_by: ticket?.increment_by ?? '',
        increment_rate: ticket?.increment_rate ?? '',
        increment_type: ticket?.increment_type ?? 'Percentage',     //To store increment types e.g. Fixed or Percentage
        start_increment: ticket?.start_increment ?? '',
        end_increment: ticket?.end_increment ?? '',
    });
    const [selectMulti, setselectMulti] = useState<any>(ticket?.selected_sessions ?? null);
    const [selectAllSession, setSelectAllSession] = useState<any>(false);

    const submit = (e: any) => {
        e.preventDefault();

        console.log(data);
        if (isEdit) {
            post(route('organizer.events.tickets.update', ticket.id), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
        } else {
            post(route('organizer.events.tickets.store'), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
        }
        console.log('testing ticket', errors);
    }

    const handleCheckChange = (event: any) => {
        if (event.target.checked) {
            setselectMulti(sessions);
            setData('sessions', sessions);
            setSelectAllSession(true);
        } else {
            setselectMulti([]);
            setSelectAllSession(false);
        }
    }

    const customStyles = {
        multiValue: (styles: any, { data }: any) => {
            return {
                ...styles,
                // backgroundColor: "#3762ea",
            };
        },
        multiValueLabel: (styles: any, { data }: any) => ({
            ...styles,
            backgroundColor: "var(--vz-secondary-bg-subtle)",
            color: "black",
        }),
        multiValueRemove: (styles: any, { data }: any) => ({
            ...styles,
            color: "black",
            backgroundColor: "var(--vz-secondary-bg-subtle)",
            ':hover': {
                backgroundColor: "var(--vz-secondary-bg-subtle)",
                color: 'dark',
            },
        }),
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit Ticket' : 'New Ticket'}
                </h5>
            </Modal.Header>
            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <Row>
                        <Col md={6}>
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

                    <Col lg={12}>
                        <FormGroup className="mb-3">
                            {/* <Form.Label>Sessions</Form.Label> */}
                            <Form.Check
                                type='checkbox'
                                label="Select All Sessions"
                                id="select-all-sessions"
                                onChange={handleCheckChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className="mb-3">
                            <Form.Label>Sessions</Form.Label>
                            <Select
                                isDisabled={selectAllSession}
                                className={errors.sessions && 'is-invalid'}
                                value={selectMulti}
                                isMulti={true}
                                onChange={(list: any) => {
                                    setselectMulti(list);
                                    setData('sessions', list);
                                }}
                                options={sessions}
                                classNamePrefix={errors.sessions && 'multi-select is-invalid '}
                                styles={customStyles}
                            />
                            {errors.sessions && <Form.Control.Feedback type="invalid">{errors.sessions}</Form.Control.Feedback>}
                        </FormGroup>
                    </Col>

                    <Row>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Increment By</Form.Label>
                                <Form.Control
                                    id="increment_by"
                                    type="number"
                                    value={data.increment_by}
                                    onChange={(e) => setData('increment_by', e.target.value)}
                                    isInvalid={!!errors.increment_by}
                                />
                                {errors.increment_by && <Form.Control.Feedback type="invalid">{errors.increment_by}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Increment Rate</Form.Label>
                                <Form.Control
                                    id="increment_rate"
                                    type="number"
                                    value={data.increment_rate}
                                    onChange={(e) => setData('increment_rate', e.target.value)}
                                    isInvalid={!!errors.increment_rate}
                                />
                                {errors.increment_rate && <Form.Control.Feedback type="invalid">{errors.increment_rate}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Increment Start Date</Form.Label>
                                <Flatpickr
                                    id="start_increment"
                                    options={{
                                        altInput: true,
                                        enableTime: true,
                                        altFormat: "d M, Y",
                                        dateFormat: "Y-m-d"
                                    }}
                                    value={data.start_increment}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            start_increment: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                            // start_increment: selectedDate
                                        }))
                                    }
                                    }
                                />
                                {errors.start_increment && <Form.Control.Feedback type="invalid">{errors.start_increment}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Increment End Date</Form.Label>
                                <Flatpickr
                                    id="end_increment"
                                    options={{
                                        altInput: true,
                                        altFormat: "d M, Y",
                                        dateFormat: "Y-m-d",
                                        enableTime: true,
                                        minDate: data.start_increment
                                    }}
                                    value={data.end_increment}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            end_increment: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                            // end_increment: selectedDate
                                        }))
                                    }
                                    }
                                />
                                {errors.end_increment && <Form.Control.Feedback type="invalid">{errors.end_increment}</Form.Control.Feedback>}
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
