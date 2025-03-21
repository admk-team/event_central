import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab, Table, Button } from 'react-bootstrap';
import Select, { StylesConfig } from 'react-select';
import axios from 'axios';
import DeleteModal from '../../../../Components/Common/DeleteModal';

export default function CreateEditModal({ show, hide, onHide, ticket, sessions }:
    { show: boolean, hide: () => void, onHide: () => void, ticket: any, sessions: any | null }) {

    const isEdit = ticket != null ? true : false;
    // const userId = usePage().props.auth.user.id;
    // const eventId = usePage().props.currentEvent.id;

    // console.log(ticket);

    const { data, setData, post, put, processing, errors, reset, transform } = useForm({
        _method: isEdit ? "PUT" : "POST",
        event_app_id: ticket?.event_app_id ?? '',
        sessions: ticket?.selected_sessions ?? [],
        name: ticket?.name ?? '',
        description: ticket?.description ?? '',
        type: 'NORMAL',

        base_price: ticket?.base_price ?? 0,
        addons_price: ticket?.addons_price ?? 0,
        total_price: ticket?.total_price ?? 0,

        increment_by: ticket?.increment_by ?? '',
        increment_rate: ticket?.increment_rate ?? '',
        increment_type: ticket?.increment_type ?? 'Percentage',
        start_increment: ticket?.start_increment ?? '',
        end_increment: ticket?.end_increment ?? '',
        features: [],
    });

    const [selectMulti, setselectMulti] = useState<any>(ticket?.selected_sessions ?? null);
    const [selectAllSession, setSelectAllSession] = useState<any>(false);

    const [ticketFeatures, setTicketFeatures] = useState<any>([]);
    const [eventLoading, setEventLoading] = useState<any>(false);

    const [basePrice, setBasePrice] = useState(ticket?.base_price ?? 0);
    const [addonsPrice, setAddonsPrice] = useState(ticket?.addons_price ?? 0);
    const [totalPrice, setTotalPrice] = useState(ticket?.total_price ?? 0);

    useEffect(() => {
        fetchFeatures();
    }, []);

    useEffect(() => {
        updatePricing();
        updateTicketSelectedFeatures();
    }, [ticketFeatures, addonsPrice, totalPrice, basePrice]);

    const fetchFeatures = () => {
        setEventLoading(true);
        let url = route('organizer.events.fetch', [ticket?.id ?? null]);
        axios.get(url).then((response) => {
            setTicketFeatures(response.data.features);
        }).finally(() => {
            setEventLoading(false);
        });
    }

    const submit = (e: any) => {
        e.preventDefault();

        transform((prevData) => ({
            ...prevData,
            base_price: basePrice,
            addons_price: addonsPrice,
            total_price: totalPrice
        }));

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
    }

    const toggleFeatureSelection = (feature: any) => {
        const newList = ticketFeatures.map((item: any) => {
            if (item.id === feature.id) {
                const updatedFeature = {
                    ...item,
                    selected: (feature.selected > 0 ? null : 1)
                }
                return updatedFeature;
            }
            return item;
        });
        setTicketFeatures(newList);
        updateTicketSelectedFeatures();
        updatePricing();
    }

    const updateTicketSelectedFeatures = () => {

        const selected_features: any = [];
        ticketFeatures.forEach((item: any) => {
            if (item.selected > 0) {
                selected_features.push(item.id);
            }
        });
        setData('features', selected_features);
    }

    const updatePricing = (base_price = data.base_price) => {

        let addons_price = 0;
        ticketFeatures.forEach((item: any) => {
            if (item.selected > 0) {
                addons_price += parseFloat(item.price);
            }
        });

        let total_price = parseFloat(basePrice) + addons_price;

        addons_price = (Math.round(addons_price * 100) / 100).toFixed(2);
        total_price = (Math.round(total_price * 100) / 100).toFixed(2);
        setAddonsPrice(addons_price);
        setTotalPrice(total_price);
    }



    const handleCheckChangeSession = (event: any) => {
        if (event.target.checked) {
            setselectMulti(sessions);
            setData('sessions', sessions);
            setSelectAllSession(true);
        } else {
            setselectMulti([]);
            setSelectAllSession(false);
        }
    }

    const handleCheckChangeFeature = (event: any) => {
        if (event.target.checked) {
            const newList = ticketFeatures.map((item: any) => {
                const updatedFeature = {
                    ...item,
                    selected: 1
                }
                return updatedFeature;
            });
            setTicketFeatures(newList);
            setData('features', newList);
        } else {
            const newList = ticketFeatures.map((item: any) => {
                const updatedFeature = {
                    ...item,
                    selected: null
                }
                return updatedFeature;
            });
            setTicketFeatures(newList);
            setData('features', newList);
        }
    }

    // Style for Select 2
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
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit Ticket' : 'New Ticket'}
                </h5>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={submit} className="tablelist-form">
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
                            <FormGroup className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    rows={5}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    isInvalid={!!errors.description}
                                />
                                {errors.description && <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
                            </FormGroup>

                        </Col>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Base Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={basePrice}
                                    onChange={(e) => {
                                        setBasePrice(e.target.value.length > 0 ? e.target.value : 0)
                                    }}
                                    isInvalid={!!errors.base_price}
                                />
                                {errors.base_price && <Form.Control.Feedback type="invalid">{errors.base_price}</Form.Control.Feedback>}
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Form.Label>Addons Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    disabled
                                    value={addonsPrice}
                                />
                                {errors.addons_price && <Form.Control.Feedback type="invalid">{errors.addons_price}</Form.Control.Feedback>}
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Form.Label>Total Ticket Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    disabled
                                    value={totalPrice}
                                />
                                {errors.total_price && <Form.Control.Feedback type="invalid">{errors.total_price}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6}>
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


                        </Col>
                        <Col md={6} lg={6}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Start Date</Form.Label>
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
                                                }))
                                            }
                                            }
                                        />
                                        {errors.start_increment && <Form.Control.Feedback type="invalid">{errors.start_increment}</Form.Control.Feedback>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="mb-3">
                                        <Form.Label>End Date</Form.Label>
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
                                                }))
                                            }
                                            }
                                        />
                                        {errors.end_increment && <Form.Control.Feedback type="invalid">{errors.end_increment}</Form.Control.Feedback>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={3} lg={3} className='d-flex align-items-center'>
                            <FormGroup className="mb-3">
                                {/* <Form.Label>Sessions</Form.Label> */}
                                <Form.Check
                                    type='checkbox'
                                    label="Select All Sessions"
                                    id="select-all-sessions"
                                    onChange={handleCheckChangeSession}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={9} lg={9}>
                            <FormGroup className="mb-3">
                                {/* <Form.Label>Sessions</Form.Label> */}
                                <Select
                                    placeholder="Select Event Sessions"
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
                    </Row>
                </Form>
                <hr />
                <Row>
                    <Col md={3} lg={3} className='d-flex '>
                        <FormGroup className="mb-3">
                            <Form.Check
                                type='checkbox'
                                label="Select All Features"
                                id="select-all-features"
                                onChange={handleCheckChangeFeature}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={12}>
                        {eventLoading && <Spinner animation="border" role="status" size='sm'>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                        {!eventLoading && <Table striped hover className='table-sm' style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Feature Description</th>
                                    <th style={{ textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {ticketFeatures && ticketFeatures.map((feature: any) =>
                                    <tr key={feature.id}>
                                        <td>{feature.id}</td>
                                        <td style={{ width: '80%' }}>
                                            <div dangerouslySetInnerHTML={{ __html: feature.name }} />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Button title='Click to add in Ticket' variant='link' className='btn-sm' onClick={() => toggleFeatureSelection(feature)}>
                                                <i className={'bx bx-check-square fs-5 ' + (feature.selected > 0 ? 'text-success' : 'text-muted')}></i>
                                            </Button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>}
                    </Col>
                </Row>
                </Modal.Body>

                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={hide}>Close</button>
                <button type="button" className="btn btn-success" disabled={processing} onClick={submit}>
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

        </Modal>
    )
}
