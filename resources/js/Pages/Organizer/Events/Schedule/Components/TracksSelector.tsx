import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import TracksManager from '../../../../../Components/TracksManager/TracksManager';
import { Check, Plus } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function TracksSelector({ value, onChange }: { value: number[]; onChange: (value: number[]) => void }) {
    const tracks = usePage().props.tracks as any;

    const [selectedTracks, _setSelectedTracks] = React.useState<any[]>([]);
    const [openTracksManager, setOpenTracksManager] = React.useState(false);
    const [openTracksModal, setOpenTracksModal] = React.useState(false);

    const setSelectedTracks = (state: any[]) => {
        _setSelectedTracks(state);
        onChange(state.map(item => item.id));
    }

    const trackSelected = (track: any) => {
        return !!selectedTracks.find((selectedTrack: any) => selectedTrack.id === track.id);
    }

    const toggleTrackSelection = (track: any) => {
        const trackExists = trackSelected(track);

        if (trackExists) {
            setSelectedTracks(selectedTracks.filter((selectedTrack: any) => selectedTrack.id !== track.id))
        } else {
            setSelectedTracks([...selectedTracks, track]);
        }
    }

    React.useEffect(() => {
        _setSelectedTracks(tracks.filter((track: any) => value.includes(track.id)));
    }, [value]);

    return (
        <div>
            <div className="d-flex flex-wrap gap-2">
                {selectedTracks.map((track: any) => (
                    <Button
                        key={track.id}
                        type="button"
                        className="d-flex justify-content-between align-items-center fw-semibold"
                        style={{ backgroundColor: track.color, borderColor: track.color }}
                    >
                        {track.name}
                    </Button>
                ))}
                <Button variant="light" onClick={() => setOpenTracksModal(true)}><Plus size={16} /> Add Track</Button>
            </div>

            <Modal show={openTracksModal} onHide={() => setOpenTracksModal(false)} size="sm" centered className="backdrop-modal">
                <Modal.Header className="bg-light p-3" closeButton>
                    <h5 className="modal-title">
                        Select Tracks
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column gap-2">
                        {tracks.map((track: any) => (
                            <Button
                                key={track.id}
                                type="button"
                                className="d-flex justify-content-between align-items-center fw-semibold"
                                style={{ backgroundColor: track.color, borderColor: track.color }}
                                onClick={() => toggleTrackSelection(track)}
                            >
                                <span>{track.name}</span>
                                {trackSelected(track) && <Check size={16} />}
                            </Button>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="light" onClick={() => {
                        setOpenTracksModal(false);
                        setOpenTracksManager(true);
                    }}>Manage</Button>
                    <Button onClick={() => setOpenTracksModal(false)}>Select</Button>
                </Modal.Footer>
            </Modal>

            <TracksManager 
                open={openTracksManager} 
                onOpen={() => setOpenTracksManager(true)}
                onClose={() => {
                    setOpenTracksManager(false);
                    setOpenTracksModal(true);
                }}
            />
        </div>
    )
}
