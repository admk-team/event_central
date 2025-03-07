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
        type: ticket?.type ?? '',
        price: ticket?.price ?? '',
        // increament_by: ticket?.increament_by ?? '',
        // increament_rate: ticket?.increament_rate ?? '',
        // start_increament: ticket?.start_increament ?? '',
        // end_increament: ticket?.end_increament ?? '',
    });
    const [selectMulti, setselectMulti] = useState<any>(ticket?.selected_sessions ?? null);

    const submit = (e: any) => {
        e.preventDefault();

        // console.log(data);
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



    const customStyles = {
        multiValue: (styles: any, { data }: any) => {
            return {
                ...styles,
                // backgroundColor: "#3762ea",
            };
        },
        multiValueLabel: (styles: any, { data }: any) => ({
            ...styles,
            // backgroundColor: "#405189",
            color: "white",
        }),
        multiValueRemove: (styles: any, { data }: any) => ({
            ...styles,
            // color: "white",
            // backgroundColor: "#405189",
            // ':hover': {
            //     backgroundColor: "#405189",
            //     color: 'white',
            // },
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
                                <Form.Select
                                    value={data.type}
                                    aria-label="ticket type"
                                    isInvalid={!!errors.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                >
                                    <option>Choose Ticket Type</option>
                                    <option value="VIP">VIP</option>
                                    <option value="NORMAL">NORMAL</option>
                                </Form.Select>
                                {/* <Form.Control
                                    type="text"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    isInvalid={!!errors.type}
                                /> */}
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
                    <Col lg={12}>
                        <FormGroup className="mb-3">
                            <Form.Label>Sessions</Form.Label>
                            <Select
                                className={errors.sessions && 'is-invalid'}
                                value={selectMulti}
                                isMulti={true}
                                onChange={(list: any) => {
                                    setselectMulti(list);
                                    // console.log(list);
                                    setData('sessions', list);
                                }}
                                options={sessions}
                                classNamePrefix={errors.sessions && 'multi-select is-invalid '}
                            // styles={customStyles}
                            />
                            {errors.sessions && <Form.Control.Feedback type="invalid">{errors.sessions}</Form.Control.Feedback>}
                        </FormGroup>
                    </Col>
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
