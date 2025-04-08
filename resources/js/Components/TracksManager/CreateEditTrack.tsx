import { router, useForm } from '@inertiajs/react'
import { Check, CheckCircle, Trash2 } from 'lucide-react';
import React from 'react'
import { Button, Form, FormGroup, Modal, Spinner } from 'react-bootstrap'

export default function CreateEditTrack({ open, onClose, track }: { open: boolean; onClose: () => void; track?: any }) {
    const isEdit = track != null ? true : false;

    const { data, setData, post,  processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: track?.name ?? '',
        color: track?.color ?? '#c42c08',
    });

    const colors = [
        "#c42c08", "#30BDA1", "#3AC06B", "#52D179", "#4BA3DA", "#3F87C0", "#306999",
        "#9B59B6", "#8E44AD", "#F1C40F", "#F39C12", "#E67E22", "#D35400", "#E74C3C",
        "#C0392B", "#95A5A6", "#7F8C8D", "#34495E", "#2C3E50", "#000000"
    ];

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.events.tracks.update', track.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                }
            });
        } else {
            post(route('organizer.events.tracks.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                }
            });
        }
    }

    const [deleteProcessing, setDeleteProcessing] = React.useState(false);

    const destroy = () => {
        setDeleteProcessing(true);
        router.delete(route('organizer.events.tracks.destroy', track.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
            onFinish: () => {
                setDeleteProcessing(false);
            }
        })
    }

    return (
        <Modal show={open} onHide={onClose} size="sm" centered className="backdrop-modal">
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? 'Edit Track' : 'Add Track'}
                </h5>
            </Modal.Header>
            <Modal.Body>
                <FormGroup className="mb-3">
                    <Form.Label className="form-label">Name</Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    {errors.name && (
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    )}
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className="form-label">Color</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                        {colors.map(color => (
                            <button
                                key={color}
                                type="button"
                                className="d-flex align-items-center justify-content-center border-0 text-white rounded" 
                                style={{ backgroundColor: color, width: '30px', height: '30px' }} 
                                onClick={() => setData('color', color)}
                            >
                                {color === data.color && <Check size={16} />}
                            </button>
                        ))}
                    </div>
                    {errors.name && (
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    )}
                </FormGroup>
            </Modal.Body>
            <div className="modal-footer justify-content-between">
                {isEdit && (
                    <Button 
                        type="button" 
                        variant="danger"
                        onClick={destroy}
                        disabled={deleteProcessing}
                    >
                        {deleteProcessing ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ): (
                            <Trash2 size={16} />
                        )}
                    </Button>
                )}
                <button type="button" className="btn btn-success" onClick={submit} disabled={processing}>
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
        </Modal >
    )
}
