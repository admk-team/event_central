import { Pen, PenIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import CreateEditTrack from './CreateEditTrack';
import { usePage } from '@inertiajs/react';

export default function TracksManager({ open, onOpen, onClose }: { open: boolean, onOpen: () => void, onClose: () => void }) {
    const tracks = usePage().props.tracks as any;

    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editTrack, setEditTrack] = React.useState<any>(null);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditTrack(null);
        }
    }

    const editAction = (track: any) => {
        setEditTrack(track);
        setShowCreateEditModal(true);
    }

    return (
        <>
            <Modal show={open} onHide={onClose} size="sm" centered className="backdrop-modal">
                <Modal.Header className="bg-light p-3" closeButton>
                    <h5 className="modal-title">
                        Manage Tracks
                    </h5>
                </Modal.Header>
                <Form className="tablelist-form">
                    <Modal.Body>
                        <Button
                            variant="light"
                            className="w-100 fw-semibold mb-3"
                            onClick={() => {
                                onClose();
                                setShowCreateEditModal(true);
                            }}
                        >
                            <PlusIcon size={16} /> Create
                        </Button>

                        <div className="d-flex flex-column gap-2">
                            {tracks.map((track: any) => (
                                <Button
                                    key={track.id}
                                    type="button"
                                    className="d-flex justify-content-between align-items-center fw-semibold"
                                    style={{ backgroundColor: track.color, borderColor: track.color }}
                                    onClick={() => editAction(track)}
                                >
                                    <span>{track.name}</span>
                                    <PenIcon size={16} />
                                </Button>
                            ))}
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
            {showCreateEditModal && (
                <CreateEditTrack
                    open={showCreateEditModal}
                    onClose={() => {
                        setShowCreateEditModal(false);
                        onOpen();
                    }}
                    track={editTrack}
                />
            )}
        </>
    )
}
