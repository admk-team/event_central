import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditModal({ show, hide, onHide, fee }: { show: boolean, hide: () => void, onHide: () => void, fee: any }) {

      const { t } = useLaravelReactI18n();

    const isEdit = fee != null ? true : false;
    const event_app_id = usePage().props.currentEvent?.id ?? null;
    const user_id = usePage().props.auth.user?.id ?? null;

    const { data, setData, post, put, processing, errors, reset, transform } = useForm({
        _method: isEdit ? "PUT" : "POST",
        user_id: user_id,
        event_app_id: event_app_id,
        name: fee?.name ?? '',
        status: fee?.status ?? 'active',
        description: fee?.description ?? '',
        fee_type: fee?.fee_type ?? 'flat',
        fee_amount: fee?.fee_amount ?? '',
    });

    // console.log(fee, fee.fee_type);
    const [amountLabel, setAmountLabel] = useState('');

    useEffect(() => {
        if (!fee || fee.fee_type === 'flat') {
            setAmountLabel('Flat Value');
        } else {
            setAmountLabel('Percentage Value');
        }
    }, [fee]);

    const submit = (e: any) => {
        e.preventDefault();

        // console.log(data);
        if (isEdit) {
            post(route('organizer.events.ticket-fees.update', fee.id), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
        } else {
            post(route('organizer.events.ticket-fees.store'), {
                onSuccess: () => {
                    reset();
                    hide();
                }
            })
        }
        // console.log('testing promo code', errors);
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? t('Edit Ticket Fee') : t('Add New Ticket Fee')}
                </h5>
            </Modal.Header>
            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label>{t("Name")}</Form.Label>
                        <Form.Control
                            type="Code"
                            // style={{ textTransform: 'uppercase' }}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                    </FormGroup>

                    <Row>
                        <Col md={6} lg={6}>
                            <FormGroup className="mb-3">
                                <Form.Label htmlFor="fee_type" className="form-label text-start w-100">{t("Fee Type")}</Form.Label>
                                <Form.Select aria-label="Default select example" className="form-control" id="fee_type"
                                    value={data.fee_type}
                                    onChange={(e) => {
                                        let v = e.target.value;

                                        setData('fee_type', e.target.value);
                                        if (e.target.value === 'percentage') {
                                            setAmountLabel('Percentage Value');
                                        } else {
                                            setAmountLabel('Flat Value');
                                        }
                                    }}
                                    isInvalid={!!errors.fee_type}>
                                    {/* <option key={1}>Select Fee Type</option> */}
                                    <option key={3} value='flat'>{t("Flat")}</option>
                                    <option key={4} value='percentage'>{t("Percentage")}</option>
                                </Form.Select>
                                {errors.fee_type && <Form.Control.Feedback type="invalid"> {errors.fee_type} </Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={6}>
                            <FormGroup className="mb-3">
                                <Form.Label>{amountLabel}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.fee_amount}
                                    onChange={(e) => setData('fee_amount', e.target.value)}
                                    isInvalid={!!errors.fee_amount}
                                />
                                {errors.fee_amount && <Form.Control.Feedback type="invalid">{errors.fee_amount}</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup className="mb-3">
                        <Form.Label>{t("Description")}</Form.Label>

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


                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="fee_status" className="form-label text-start w-100">{t("Status")}</Form.Label>
                        <Form.Select aria-label="Code Status" className="form-control" id="fee_status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            isInvalid={!!errors.status}>
                            <option key={1} value='active'>{t("Active")}</option>
                            <option key={2} value='in-active'>{t("In Active")}</option>
                        </Form.Select>
                        {errors.status && <Form.Control.Feedback type="invalid"> {errors.status} </Form.Control.Feedback>}
                    </FormGroup>

                </Modal.Body>

                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={hide}>{t("Close")}</button>
                    <button type="submit" className="btn btn-success" disabled={processing}>
                        {processing ? (
                            <span className="d-flex gap-1 align-items-center">
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {isEdit ? t('Updating') : t('Creating')}
                            </span>
                        ) : (
                            <span>{isEdit ? t('Update') : t('Create')}</span>
                        )}
                    </button>
                </div>
            </Form>
        </Modal >
    )
}
