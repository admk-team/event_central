import { Ellipsis } from "lucide-react";
import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import CreateEditEventPlatformModal from "./CreateEditEventPlatformModal";
import { useForm, usePage } from "@inertiajs/react";
import DeleteModal from "../../../../../Components/Common/DeleteModal";
import HasPermission from "../../../../../Components/HasPermission";
import HasAnyPermission from "../../../../../Components/HasAnyPermission";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function Platforms({ onPlatformChange }: { onPlatformChange: (platform: any) => void }) {
    const eventPlatforms = usePage().props.eventPlatforms as any;

    const [selectedPlatform, _setSelectedPlatform] = React.useState<any>(null);
    const [showCreateEditPlatformModal, _setShowCreateEditPlatformModal] = React.useState(false);
    const [editPlatform, setEditPlatform] = React.useState<any>(null);
    const [deletePlatform, setDeletePlatform] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
    const [platformCreated, setPlatformCreated] = React.useState(false);

    const { t } = useLaravelReactI18n();

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
            setSelectedPlatform(eventPlatforms[0]);
        } else {
            setSelectedPlatform(null);
        }
    }, []);

    React.useEffect(() => {
        if (platformCreated) {
            setSelectedPlatform(eventPlatforms[eventPlatforms.length - 1]);
            setPlatformCreated(false);
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
                            <HasAnyPermission permission={['edit_locations', 'delete_locations']}>
                                <Dropdown onClick={e => e.stopPropagation()}>
                                    <Dropdown.Toggle
                                        variant="light"
                                        size="sm"
                                        className="btn-icon"
                                    >
                                        <Ellipsis size={14} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <HasPermission permission="edit_locations">
                                            <Dropdown.Item onClick={() => editAction(platform)}>{t("Edit")}</Dropdown.Item>
                                        </HasPermission>
                                        <HasPermission permission="delete_locations">
                                            <Dropdown.Item
                                                className="text-danger fw-semibold"
                                                onClick={() => deleteAction(platform)}
                                            >
                                                {t("Delete")}
                                            </Dropdown.Item>
                                        </HasPermission>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </HasAnyPermission>
                        </div>
                    ))}
                </div>
                <div className="text-center py-3">
                    <HasPermission permission="create_locations">
                        <Button onClick={() => setShowCreateEditPlatformModal(true)}>
                            <i className="ri-add-fill"></i>
                            {t("New Location")}
                        </Button>
                    </HasPermission>
                </div>
            </div>

            {showCreateEditPlatformModal && (
                <CreateEditEventPlatformModal
                    show={showCreateEditPlatformModal}
                    hide={() => setShowCreateEditPlatformModal(false)}
                    onHide={() => setShowCreateEditPlatformModal(false)}
                    eventPlatform={editPlatform}
                    onCreate={() => {
                        setPlatformCreated(true);
                    }}
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
