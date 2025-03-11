import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';
import Select, { StylesConfig } from 'react-select';

export default function CreateEditModal({ show, hide, onHide, promoCode, tickets }: { show: boolean, hide: () => void, onHide: () => void, promoCode: any, tickets: any | null }) {


    const isEdit = promoCode != null ? true : false;
    const event_app_id = usePage().props.currentEvent?.id ?? null;

    const { data, setData, post, put, processing, errors, reset, transform } = useForm({
        _method: isEdit ? "PUT" : "POST",
        event_app_id: event_app_id,
        code: promoCode?.code ?? '',
        description: promoCode?.description ?? '',
        discount_type: promoCode?.discount_type ?? '',
        discount_value: promoCode?.discount_value ?? '',
        usage_limit: promoCode?.usage_limit ?? '',
        used_count: promoCode?.used_count ?? '',
        start_date: promoCode?.start_date ?? '',
        end_date: promoCode?.end_date ?? '',
        status: promoCode?.status ?? 'active',
        tickets: promoCode?.tickets ?? [],
    });

    const [discountLabel, setDiscountLabel] = useState('Discount Value');
    const [selectMulti, setSelectMulti] = useState<any>(promoCode?.selected_tickets ?? null);
    const [selectAllTickets, setSelectAllTickets] = useState<any>(false);

    const submit = (e: any) => {
        e.preventDefault();

        // console.log(data);
        if (isEdit) {
            post(route('organizer.events.promo-codes.update', promoCode.id), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
        } else {
            post(route('organizer.events.promo-codes.store'), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
        }
        // console.log('testing promo code', errors);
    }

    const handleCheckChange = (event: any) => {
        if (event.target.checked) {
            setSelectMulti(tickets);
            setData('tickets', tickets);
            setSelectAllTickets(true);
        } else {
            setSelectMulti([]);
            setSelectAllTickets(false);
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
                    {isEdit ? 'Edit Promo Code' : 'New Promo Code'}
                </h5>
            </Modal.Header>
            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <Row>
                        <Col md={6} lg={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="Code"
                                    style={{ textTransform: 'uppercase' }}
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    isInvalid={!!errors.code}
                                />
                                {errors.code && <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6}>
                            <FormGroup className="mb-3">
                                <Form.Label htmlFor="code_status" className="form-label text-start w-100">Status</Form.Label>
                                <Form.Select aria-label="Code Status" className="form-control" id="code_status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    isInvalid={!!errors.status}>
                                    <option key={1}>Select Status</option>
                                    <option key={2} value='active'>Active</option>
                                    <option key={3} value='expired'>Expired</option>
                                    <option key={4} value='disabled'>Disabled</option>
                                </Form.Select>
                                {errors.status && <Form.Control.Feedback type="invalid"> {errors.status} </Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup className="mb-3">
                        <Form.Label>Description</Form.Label>

                        <Form.Control
                            as='textarea'
                            type="text"
                            rows={4}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            isInvalid={!!errors.description}
                        />
                        {errors.description && <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
                    </FormGroup>
                    <Row>
                        <Col md={6} lg={6}>
                            <FormGroup className="mb-3">
                                <Form.Label htmlFor="discount_type" className="form-label text-start w-100">Discount Type</Form.Label>
                                <Form.Select aria-label="Default select example" className="form-control" id="discount_type"
                                    value={data.discount_type}
                                    onChange={(e) => {
                                        let v = e.target.value;
                                        console.log(v);
                                        setData('discount_type', e.target.value);
                                        if (e.target.value === 'percentage') {
                                            setDiscountLabel('Discount Percentage');
                                        } else {
                                            setDiscountLabel('Discount Value');
                                        }
                                    }}
                                    isInvalid={!!errors.discount_type}>
                                    <option key={1}>Select Event Type</option>
                                    <option key={2} value='fixed'>Fixed</option>
                                    <option key={3} value='percentage'>Percentage</option>
                                </Form.Select>
                                {errors.discount_type && <Form.Control.Feedback type="invalid"> {errors.discount_type} </Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>{discountLabel}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.discount_value}
                                    onChange={(e) => setData('discount_value', e.target.value)}
                                    isInvalid={!!errors.discount_value}
                                />
                                {errors.discount_value && <Form.Control.Feedback type="invalid">{errors.discount_value}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Usage Limit</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.usage_limit}
                                    onChange={(e) => setData('usage_limit', e.target.value)}
                                    isInvalid={!!errors.usage_limit}
                                />
                                {errors.usage_limit && <Form.Control.Feedback type="invalid">{errors.usage_limit}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Used Count</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={data.used_count}
                                    onChange={(e) => setData('used_count', e.target.value)}
                                    isInvalid={!!errors.used_count}
                                />
                                {errors.used_count && <Form.Control.Feedback type="invalid">{errors.used_count}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Flatpickr
                                    className={errors.start_date ? 'is-invalid' : ''}
                                    id="start_date"
                                    options={{
                                        altInput: true,
                                        altFormat: "d M, Y",
                                        dateFormat: "Y-m-d"
                                    }}
                                    value={data.start_date}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            start_date: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                        }))
                                    }
                                    }
                                />
                                {errors.start_date && <Form.Control.Feedback type="invalid">{errors.start_date}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Flatpickr
                                    className={errors.end_date ? 'is-invalid' : ''}
                                    id="end_date"
                                    options={{
                                        altInput: true,
                                        altFormat: "d M, Y",
                                        dateFormat: "Y-m-d",
                                        minDate: data.end_date
                                    }}
                                    value={data.end_date}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            end_date: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                        }))
                                    }
                                    }
                                />
                                {errors.end_date && <Form.Control.Feedback type="invalid">{errors.end_date}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <FormGroup className="mb-3">
                                <Form.Check
                                    type='checkbox'
                                    label="Select All Tickets"
                                    id="select-all-tickets"
                                    onChange={handleCheckChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup className="mb-3">
                                <Form.Label>Tickets</Form.Label>
                                <Select
                                    isDisabled={selectAllTickets}
                                    className={errors.tickets && 'is-invalid'}
                                    value={selectMulti}
                                    isMulti={true}
                                    onChange={(list: any) => {
                                        setSelectMulti(list);
                                        setData('tickets', list);
                                    }}
                                    options={tickets}
                                    classNamePrefix={errors.tickets && 'multi-select is-invalid '}
                                    styles={customStyles}
                                />
                                {errors.tickets && <Form.Control.Feedback type="invalid">{errors.tickets}</Form.Control.Feedback>}
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
        </Modal >
    )
}
