import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CreateEditPlatformModal from "./CreateOrEditPlatformModal";
import CreateEditModal from "./CreateEditModal";

const hours = Array.from({ length: 16 }, (_, i) => 8 + i); // Generates [8, 9, 10, ..., 23]
const slots = Array.from({ length: 6 }); // Creates 6 buttons per hour (each slot = 10 min gap)

function Platform({ platforms, event_platforms, speakers, event_sessions }: any) {
    const [hoveredSlots, setHoveredSlots] = useState<{ [key: string]: { hour: number; slot: number } | null }>({});
    const [showCreateEditPlatformModal, _setShowCreateEditPlatformModal] = React.useState(false);
    const [editPlatform, setEditPlatform] = React.useState<any>(null);
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [event_session, setEditEvent_session] = React.useState<any>(null);
    const [selectedTime, setSelectedTime] = useState<{ startTime: string; endTime: string } | null>(null);

    const setShowCreateEditPlatformModal = (state: boolean) => {
        _setShowCreateEditPlatformModal(state);
        if (state === false) {
            setEditPlatform(null);
        }
    };

    const editAction = (platform: any) => {
        setEditPlatform(platform);
        setShowCreateEditPlatformModal(true);
    };

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditEvent_session(null);
            setSelectedTime(null); // Reset selected time when modal is closed
        }
    };

    // Function to calculate session time based on hour and slot index
    const getSessionTime = (hour: number, slotIndex: number) => {
        const startMinutes = slotIndex * 10; // Start from 8:10, 8:20, 8:30, etc.
        const endMinutes = startMinutes + 10;
        const startTime = `${hour}:${String(startMinutes).padStart(2, "0")}:00`;
        const endTime = `${hour}:${String(endMinutes).padStart(2, "0")}:00`;
        return { startTime, endTime };
    };

    // Handle slot click
    const handleSlotClick = (hour: number, slotIndex: number) => {
        const { startTime, endTime } = getSessionTime(hour, slotIndex);
        setSelectedTime({ startTime, endTime }); // Set the selected time
        setShowCreateEditModal(true); // Open the modal
    };

    return (
        <React.Fragment>
            <div className="overflow-auto">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center gap-4 rounded">
                            {event_platforms.map((eventPlatform: any, index: any) => (
                                <div key={index} className="bg-white p-3 d-inline-block" style={{ maxWidth: '450px', width: '400px', borderRadius: '10px' }}>
                                    <div className="d-flex justify-content-between align-items-center py-4 cursor-pointer">
                                        <h5>{eventPlatform.name}</h5>
                                        <div onClick={() => editAction(eventPlatform)}>
                                            <i className="ri-pencil-fill fs-3"></i>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="">
                                            <div className="border-top">
                                                {hours.map((hour, hourIndex) => (
                                                    <div key={hourIndex} className=" border-bottom position-relative">
                                                        <strong className="text-muted">{hour}:00</strong>

                                                        {/* Slots (Buttons) */}
                                                        <div className="d-flex flex-wrap flex-column">
                                                            {slots.map((_, slotIndex) => (
                                                                <div key={slotIndex} className="position-relative">
                                                                    <Button
                                                                        className=" w-100 position-relative"
                                                                        variant=""
                                                                        size="md"
                                                                        onMouseEnter={() => setHoveredSlots(prev => ({ ...prev, [index]: { hour, slot: slotIndex } }))}
                                                                        onMouseLeave={() => setHoveredSlots(prev => ({ ...prev, [index]: null }))}
                                                                        onClick={() => handleSlotClick(hour, slotIndex)} // Handle slot click
                                                                    >
                                                                        {hoveredSlots[index]?.hour === hour && hoveredSlots[index]?.slot === slotIndex && (
                                                                            <div className="card text-muted border-1 rouned position-absolute w-100" style={{ borderRadius: '9px',top:'-8px' }}>
                                                                                New Session <br />
                                                                                {getSessionTime(hour, slotIndex).startTime} - {getSessionTime(hour, slotIndex).endTime}
                                                                            </div>
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
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

            {showCreateEditModal && (
                <CreateEditModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    event_sessions={event_session}
                    speakers={speakers}
                    startTime={selectedTime?.startTime || ''} // Pass start time to modal
                    endTime={selectedTime?.endTime || ''} // Pass end time to modal
                />
            )}
        </React.Fragment>
    );
}

export default Platform;