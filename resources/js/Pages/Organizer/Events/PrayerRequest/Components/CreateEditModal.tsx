import { useForm } from "@inertiajs/react";
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";

export default function CreateEditModal({
    show,
    hide,
    onHide,
    prayer,
}: {
    show: boolean;
    hide: () => void;
    onHide: () => void;
    prayer: any | null;
}) {
    const isEdit = prayer != null;

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? "PUT" : "POST",
        message: prayer?.message ?? "",
        status: prayer?.status ?? "pending",
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route("organizer.prayer-requests.update", prayer.id), {
            preserveScroll: true,
            onSuccess: hide,
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-light p-3">
                <h5 className="modal-title">Edit Prayer Request</h5>
            </Modal.Header>

            <Form onSubmit={submit}>
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label>Request</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            isInvalid={!!errors.message}
                        />
                        {errors.message && (
                            <Form.Control.Feedback type="invalid">
                                {errors.message}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            isInvalid={!!errors.status}
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </Form.Select>
                        {errors.status && (
                            <Form.Control.Feedback type="invalid">
                                {errors.status}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>
                </Modal.Body>

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={hide}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={processing}
                    >
                        {processing ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            "Update"
                        )}
                    </button>
                </div>
            </Form>
        </Modal>
    );
}
