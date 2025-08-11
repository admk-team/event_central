import { useForm, usePage } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import Flatpickr from "react-flatpickr";

export default function CreateEditModal({ show, onHide, liveStream }: { show: boolean; onHide: () => void; liveStream: any | null }) {
    const isEdit = liveStream != null ? true : false;

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        title: liveStream?.title ?? '',
        resolution: liveStream?.resolution ?? '1080p',
        start_time: liveStream?.start_time ?? '',
        // thumbnail: '',
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.events.live-streams.update', liveStream.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onHide();
                }
            });
        } else {
            post(route('organizer.events.live-streams.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onHide();
                }
            });
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    Create Live Stream
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Title</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            isInvalid={!!errors.title}
                        />
                        {errors.title && (
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    {isEdit || (
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Resolution</Form.Label>
                            <Form.Select 
                                className="form-control"
                                value={data.resolution}
                                onChange={(e) => setData('resolution', e.target.value)}
                            >
                                <option value="240p">240p</option>
                                <option value="360p">360p</option>
                                <option value="480p">480p</option>
                                <option value="540p">540p</option>
                                <option value="720p">720p</option>
                                <option value="1080p">1080p</option>
                                <option value="1440p">1440p</option>
                            </Form.Select>
                            {errors.resolution && (
                                <Form.Control.Feedback type="invalid">{errors.resolution}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                    )}
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Start Time</Form.Label>
                        <Flatpickr
                            options={{
                                altInput: true,
                                enableTime: true,
                                altFormat: "d M Y, H:i",
                                dateFormat: "Y-m-d H:i:s",
                            }}
                            value={data.start_time}
                            onChange={([
                                selectedDate,
                            ]: Date[]) => {
                                setData('start_time', selectedDate.toLocaleDateString("en-CA").split("T")[0]);
                            }}
                        />
                    </FormGroup>
                </Modal.Body>
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={onHide}
                        >
                            Close
                        </button>

                        <button type="submit" className="btn btn-success" disabled={processing}>
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {isEdit ? 'Updating' : 'Creating'}
                                </span>
                            ) : (
                                <span>{isEdit ? 'Update' : 'Create'}</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}
