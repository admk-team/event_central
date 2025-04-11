import { router } from "@inertiajs/react";
import React from "react";
import { Modal } from "react-bootstrap";
interface RefundActionModalProps {
    show?: boolean;
    onDeleteClick?: () => void;
    onCloseClick?: () => void;
    refund: any;
}

const RefundActionModal: React.FC<RefundActionModalProps> = ({ show, onCloseClick, refund }) => {
    const [processing, setProcessing] = React.useState(false);

    const handleRefundAction = (status: string) => {
        setProcessing(true);
        router.post(route('organizer.events.attendee.refund'), {
            'status': status,
            'refundId': refund.id,
        }, {
            preserveScroll: true,
            onSuccess: () => onCloseClick && onCloseClick(),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <Modal show={show} onHide={onCloseClick} centered={true}>
            <Modal.Body className="py-3 px-5">
                <div className="mt-2 text-center">
                    <i className="ri-delete-bin-line display-5 text-danger"></i>
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>Are you sure ?</h4>
                        <div style={{
                            padding: '1rem',
                            borderLeft: '4px solid #f59e0b',
                            backgroundColor: '#fff7ed',
                            color: '#78350f',
                            fontFamily: 'Arial, sans-serif',
                            borderRadius: '8px',
                            marginBottom: '1rem'
                        }}>
                            <strong>Important Note:</strong><br />
                            If this <strong>attendee</strong> have transfered any <strong>tickets</strong> based on this payment they will also be refunded
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
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
                        onClick={() => handleRefundAction('approve')}
                        disabled={processing}
                    >
                        Approve
                    </button>
                    <button
                        type="button"
                        className="btn w-sm btn-danger "
                        id="delete-record"
                        onClick={() => handleRefundAction('reject')}
                        disabled={processing}
                    >
                        Reject
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    ) as unknown as JSX.Element;
};

export default RefundActionModal;
