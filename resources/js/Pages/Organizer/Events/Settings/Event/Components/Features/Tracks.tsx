import { useForm, usePage } from '@inertiajs/react';
import React from 'react'
import { Button, ListGroupItem } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import TracksManager from '../../../../../../../Components/TracksManager/TracksManager';

export default function Tracks() {
    const enableTracks = usePage().props.enableTracks as boolean;

    const switchRef = React.useRef<HTMLInputElement | null>(null);

    const [openTracksManager, setOpenTracksManager] = React.useState(false);
        
    React.useEffect(() => {
        if (switchRef.current) {
            switchRef.current.checked = enableTracks;
        }
    }, [enableTracks]);

    const { post } = useForm();

    const toggleFeature = () => {
        post(route('organizer.events.settings.event.toggle-tracks'), {
            preserveScroll: true,
        });
    }

    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            <div>Tracks</div>
            <div className="d-flex align-items-center gap-3">
                {enableTracks && <Button onClick={() => setOpenTracksManager(true)}>Manage</Button>}
                <div className="form-check form-switch form-switch-lg" dir='ltr'>
                    <FormCheckInput
                        ref={switchRef}
                        type="checkbox" 
                        className="form-check-input"
                        onChange={toggleFeature}
                    />
                </div>
            </div>
            {enableTracks && (
                <TracksManager
                    open={openTracksManager} 
                    onOpen={() => setOpenTracksManager(true)}
                    onClose={() => {
                        setOpenTracksManager(false);
                    }}
                />
            )}
        </ListGroupItem>
    )
}
