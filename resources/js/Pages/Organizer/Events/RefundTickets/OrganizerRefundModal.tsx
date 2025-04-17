import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Modal, Form, FormGroup, Row, Col } from "react-bootstrap";
import { number } from "yup";

interface RefundActionModalProps {
    show?: boolean;
    onDeleteClick?: () => void;
    onCloseClick?: () => void;
    refund: any;
}

const OrganizerRefundModal: React.FC<RefundActionModalProps> = ({ show, onCloseClick, refund }) => {

    // console.log(refund);
    const { data, setData, post, processing, errors, reset, transform, clearErrors } = useForm({
        _method: "POST",
        refund_id: refund.id,
        requested_amount: refund.refund_requested_amount,
        organizer_remarks: refund.organizer_remarks,
        refund_approved_amount: refund.refund_approved_amount > 0 ? refund.refund_approved_amount : '',
        action: '',
    });


    const submit = async (e: any) => {
        e.preventDefault();

        clearErrors();

        console.log(data);
        post(route('organizer.events.attendee.refund'), {
            onSuccess: () => {
                onCloseClick();
            },
            onError: (error) => {
                console.log(error);
                console.log(errors);
            }
        });
    }

    return (
        <Modal show={show} onHide={onCloseClick} centered={true} size="lg">
            <Modal.Body className="py-3 px-5">
                <div className="mt-2 mb-4">
                    <h4>Ticket Refund</h4>
                </div>
                <Row>
                    <Col>
                        <FormGroup className="mb-3">
                            <Form.Label>Attendee Remarks</Form.Label>
                            <Form.Control
                                as='textarea'
                                type="text"
                                rows={8}
                                value={refund.refund_reason}
                                readOnly
                            />
                        </FormGroup>

                    </Col>
                    <Col>
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="action" className="form-label text-start w-100">Action</Form.Label>
                            <Form.Select aria-label="Default select example" className="form-control" id="transfer_type"
                                defaultValue={data.action} onChange={(e) => setData('action', e.target.value)}
                                isInvalid={!!errors.action}
                            >
                                <option key={1}>Select Action</option>
                                <option key={2} value='approved'>Approved</option>
                                <option key={3} value='rejected'>Rejected</option>
                            </Form.Select>
                            {errors.action && <Form.Control.Feedback type="invalid"> {errors.action} </Form.Control.Feedback>}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label>Organizer Remarks</Form.Label>
                            <Form.Control
                                as='textarea'
                                type="text"
                                rows={4}
                                value={data.organizer_remarks}
                                onChange={(e) => setData('organizer_remarks', e.target.value)}
                                isInvalid={!!errors.organizer_remarks}
                            />
                            {errors.organizer_remarks && <Form.Control.Feedback type="invalid">{errors.organizer_remarks}</Form.Control.Feedback>}
                        </FormGroup>


                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup className="mb-3">
                            <Form.Label>Refund Requested Amount</Form.Label>
                            <Form.Control
                                type="number"
                                readOnly
                                value={refund.refund_requested_amount}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="mb-3">
                            <Form.Label>Refund Approved Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={data.refund_approved_amount}
                                onChange={(e) => setData('refund_approved_amount', e.target.value)}
                                isInvalid={!!errors.refund_approved_amount}
                            />
                            {errors.refund_approved_amount && <Form.Control.Feedback type="invalid">{errors.refund_approved_amount}</Form.Control.Feedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <div className="d-flex gap-2 justify-content-between mt-4 mb-2 w-100">
                    <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                        onClick={onCloseClick}
                        disabled={processing}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn w-sm btn-danger "
                        id="delete-record"
                        onClick={submit}
                        disabled={processing}
                    >
                        Update Status
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    ) as unknown as JSX.Element;
};

export default OrganizerRefundModal;
