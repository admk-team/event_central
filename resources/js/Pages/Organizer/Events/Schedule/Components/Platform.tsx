import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CreateEditPlatformModal from "./CreateOrEditPlatformModal";
import Schedule from "./Schedul";

function Platform({ platforms, event_platforms }: any) {
    const [hoveredSlot, setHoveredSlot] = useState<{ hour: number; slot: number } | null>(null);
    const [showCreateEditPlatformModal, _setShowCreateEditPlatformModal] = React.useState(false);
    const [editPlatform, setEditPlatform] = React.useState<any>(null);

    const setShowCreateEditPlatformModal = (state: boolean) => {
        _setShowCreateEditPlatformModal(state);
        if (state === false) {
            setEditPlatform(null);
        }
    };

    const editAction = (platform: any) => {
        setEditPlatform(platform);
        setShowCreateEditPlatformModal(true);
    }
    // Function to calculate session time based on hour and slot index
    const getSessionTime = (hour: number, slotIndex: number) => {
        const startMinutes = slotIndex * 10; // Start from 8:10, 8:20, 8:30, etc.
        const endMinutes = startMinutes + 10;
        return `${hour}:${String(startMinutes).padStart(2, "0")} - ${hour}:${String(endMinutes).padStart(2, "0")}`;
    };
    return (
        <React.Fragment>
            <div className="overflow-auto">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center gap-4 rounded">
                            {event_platforms.map((eventPlatform: any, index: any) => (

                                <div key={index} className="bg-white p-3 d-inline-block" style={{ maxWidth: '450px', width: '100%', borderRadius: '10px' }}>
                                    <div className="d-flex justify-content-between align-items-center py-4 cursor-pointer">
                                        <h5>{eventPlatform.name}</h5>
                                        <div onClick={() => editAction(eventPlatform)}>
                                            <i className="ri-pencil-fill fs-3"></i>
                                        </div>
                                    </div>
                                    <Schedule />
                                </div>

                            ))}

                        </div>
                    </Row>
                </Container>
            </div>

            {showCreateEditPlatformModal && (
                <CreateEditPlatformModal
                    show={showCreateEditPlatformModal}
                    hide={() => setShowCreateEditPlatformModal(false)}
                    onHide={() => setShowCreateEditPlatformModal(false)}
                    platforms={platforms}
                    event_platforms={editPlatform}
                />
            )}
        </React.Fragment>
    )

}
export default Platform;