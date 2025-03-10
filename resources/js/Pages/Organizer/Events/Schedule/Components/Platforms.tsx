import { Ellipsis } from "lucide-react";
import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import CreateEditEventPlatformModal from "./CreateEditEventPlatformModal";
import { useForm, usePage } from "@inertiajs/react";
import DeleteModal from "../../../../../Components/Common/DeleteModal";

export default function Platforms({ onPlatformChange }: { onPlatformChange: (platform: any) => void }) {
    const eventPlatforms = usePage().props.event_platforms as any;
    const eventPlatformsCount = React.useRef(eventPlatforms.length);

    const [selectedPlatform, _setSelectedPlatform] = React.useState<any>(null);
    const [showCreateEditPlatformModal, _setShowCreateEditPlatformModal] = React.useState(false);
    const [editPlatform, setEditPlatform] = React.useState<any>(null);
    const [deletePlatform, setDeletePlatform] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);

    const setSelectedPlatform = (state: any) => {
        _setSelectedPlatform(state);
        onPlatformChange(state);
    }

    const setShowCreateEditPlatformModal = (state: boolean) => {
        _setShowCreateEditPlatformModal(state);
        if (state === false) {
            setEditPlatform(null);
        }
    }

    const editAction = (platform: any) => {
        setEditPlatform(platform);
        setShowCreateEditPlatformModal(true);
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteAction = (platform: any) => {
        setDeletePlatform(platform);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('organizer.events.event-platforms.destroy', deletePlatform.id));
        setShowDeleteConfirmation(false);
    }

    React.useEffect(() => {
        if (eventPlatforms.length > 0) {
            if (eventPlatforms.length >= eventPlatformsCount.current) {
                setSelectedPlatform(eventPlatforms[eventPlatforms.length - 1]);
                eventPlatformsCount.current = eventPlatforms.length;
            } else {
                setSelectedPlatform(eventPlatforms[0]);
            }
        }
    }, [eventPlatforms]);

    return (
        <>
            <div className="platforms">
                <div className="platforms-inner d-flex flex-column">
                    {eventPlatforms.map((platform: any) => (
                        <div 
                            key={platform.id} 
                            className={`${platform.id === selectedPlatform?.id ? 'active' : ''} platform px-3 py-2 cursor-pointer d-flex justify-content-between align-items-center`}
                            onClick={() => setSelectedPlatform(platform)}
                        >
                            <div className="fw-semibold">{platform.name}</div>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="light"
                                    size="sm"
                                    className="btn-icon"
                                >
                                    <Ellipsis size={14} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => editAction(platform)}> Edit</Dropdown.Item>
                                    <Dropdown.Item
                                        className="text-danger fw-semibold"
                                        onClick={() => deleteAction(platform)}
                                    >
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    ))}
                </div>
                <div className="text-center py-3">
                    <Button size="sm" onClick={() => setShowCreateEditPlatformModal(true)}>
                        <i className="ri-add-fill"></i>
                        New Platform
                    </Button>
                </div>
            </div>

            {showCreateEditPlatformModal && (
                <CreateEditEventPlatformModal
                    show={showCreateEditPlatformModal}
                    hide={() => setShowCreateEditPlatformModal(false)}
                    onHide={() => setShowCreateEditPlatformModal(false)}
                    eventPlatform={editPlatform}
                />
            )}

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => { setShowDeleteConfirmation(false) }}
            />
        </>
    );
}
