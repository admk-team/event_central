import React, { useEffect } from "react";
import { useForm, usePage } from '@inertiajs/react';
import { Spinner, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';

interface RefundModalProps {
    show?: boolean;
    onRefundProcessed: () => void;
    onCloseClick?: () => void;
    paymentId?: string | number | null;
    refundRequestedAmount?: number
}

const RefundTicketModal: React.FC<RefundModalProps> = ({ show, onRefundProcessed, onCloseClick, paymentId, refundRequestedAmount }) => {

    console.log(paymentId);

    const { data, setData, post, processing, errors, reset, transform, clearErrors } = useForm({
        _method: "POST",
        payment_id: paymentId,
        refund_type: '',
        refund_reason: '',
        refund_requested_amount: refundRequestedAmount
    });

    const submit = (e: any) => {
        e.preventDefault();
        clearErrors();
        console.log(data);
        post(route('attendee.tickets.refund.save'), {
            onSuccess: () => {
                onRefundProcessed();
            },
            onError: (error) => {
                console.log(error);
                console.log(errors);
            }
        });
    }

    return (
        <Modal show={show} onHide={onCloseClick} centered={true}>
            <Modal.Body className="py-3 px-5">
                <div className="mt-2 mb-4">
                    <h4>Ticket Refund</h4>
                </div>
                <FormGroup className="mb-3">
                    <Form.Label htmlFor="fee_type" className="form-label text-start w-100">Ticket Option</Form.Label>
                    <Form.Select aria-label="Default select example" className="form-control" id="transfer_type"
                        defaultValue={data.refund_type} onChange={(e) => setData('refund_type', e.target.value)}
                        isInvalid={!!errors.refund_type}
                    >
                        <option key={1}>Select Ticket Option</option>
                        <option key={2} value='all_tickets'>All Tickets (Including Transfered)</option>
                        <option key={3} value='held_with_me'>Held with me</option>
                        <option key={4} value='transfered'>Only Transfered</option>
                    </Form.Select>
                    {errors.refund_type && <Form.Control.Feedback type="invalid"> {errors.refund_type} </Form.Control.Feedback>}
                </FormGroup>

                <FormGroup className="mb-3">
                    <Form.Label>Brief Reason</Form.Label>
                    <Form.Control
                        as='textarea'
                        type="text"
                        rows={4}
                        value={data.refund_reason}
                        onChange={(e) => setData('refund_reason', e.target.value)}
                        isInvalid={!!errors.refund_reason}
                    />
                    {errors.refund_reason && <Form.Control.Feedback type="invalid">{errors.refund_reason}</Form.Control.Feedback>}
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Refund Amount</Form.Label>
                    <Form.Control
                        type="text"
                        value={data.refund_requested_amount}
                        onChange={(e) => setData('refund_requested_amount', e.target.value.length > 0 ? parseFloat(e.target.value) : 0)}
                        isInvalid={!!errors.refund_requested_amount}
                    />
                    {errors.refund_requested_amount && <Form.Control.Feedback type="invalid">{errors.refund_requested_amount}</Form.Control.Feedback>}
                </FormGroup>
                <div className="d-flex gap-2 justify-content-between mt-4 mb-2">
                    <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                        onClick={onCloseClick}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn w-sm btn-danger "
                        id="delete-record"
                        onClick={submit}
                    >
                        Save
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    ) as unknown as JSX.Element;
};

export default RefundTicketModal;
