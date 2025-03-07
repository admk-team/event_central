import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CreateEditPlatformModal from "./CreateOrEditPlatformModal";
import CreateEditModal from "./CreateEditModal";

const hours = Array.from({ length: 16 }, (_, i) => 8 + i); // Generates [8, 9, 10, ..., 23]
const slots = Array.from({ length: 6 }); // Creates 6 slots per hour (10-minute gaps)

function Platform({ platforms, event_platforms, speakers }: any) {
    const [hoveredSlots, setHoveredSlots] = useState<{ [key: string]: { hour: number; slot: number } | null }>({});
    const [showCreateEditPlatformModal, _setShowCreateEditPlatformModal] = React.useState(false);
    const [editPlatform, setEditPlatform] = React.useState<any>(null);
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [event_session, setEditEvent_session] = React.useState<any>(null);
    const [event_platformId, setEditEvent_platformId] = React.useState<any>(null);
    const [selectedTime, setSelectedTime] = useState<{ startTime: string; endTime: string } | null>(null);

    const setShowCreateEditPlatformModal = (state: boolean) => {
        _setShowCreateEditPlatformModal(state);
        if (!state) setEditPlatform(null);
    };

    const editAction = (platform: any) => {
        setEditPlatform(platform);
        setShowCreateEditPlatformModal(true);
    };

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (!state) {
            setEditEvent_session(null);
            setSelectedTime(null);
        }
    };

    // Function to calculate session time based on hour and slot index
    const getSessionTime = (hour: number, slotIndex: number) => {
        const startMinutes = slotIndex * 10;
        const endMinutes = startMinutes + 10;
        const startTime = `${hour}:${String(startMinutes).padStart(2, "0")}:00`;
        const endTime = `${hour}:${String(endMinutes).padStart(2, "0")}:00`;
        return { startTime, endTime };
    };

    // Handle slot click
    const handleSlotClick = (hour: number, slotIndex: number) => {
        const { startTime, endTime } = getSessionTime(hour, slotIndex);
        setSelectedTime({ startTime, endTime });
        setShowCreateEditModal(true);
    };

    const handlePlatformId = (id: any) => {
        setEditEvent_platformId(id);
    };

    // Function to calculate the number of slots a session spans
    const getSlotSpanCount = (startTime: string, endTime: string) => {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;
        const durationMinutes = endTotalMinutes - startTotalMinutes;
        return Math.ceil(durationMinutes / 10); // Number of 10-minute slots
    };

    // Function to check if a session exists in a specific time slot and return session details
    const getSessionForSlot = (platformId: string, hour: number, slotIndex: number) => {
        const { startTime } = getSessionTime(hour, slotIndex);
        const platform = event_platforms.find((platform: any) => platform.id === platformId);
        if (!platform || !platform.eventsessions) return null;

        const session = platform.eventsessions.find((session: any) =>
            session.start_date.includes(startTime)
        );
        if (session) {
            const spanCount = getSlotSpanCount(
                session.start_date.split(' ')[1],
                session.end_date.split(' ')[1]
            );
            return { ...session, spanCount };
        }
        return null;
    };

    // Check if a slot is part of an existing session's span
    const isSlotOccupiedBySession = (platformId: string, hour: number, slotIndex: number) => {
        const { startTime } = getSessionTime(hour, slotIndex);
        const platform = event_platforms.find((platform: any) => platform.id === platformId);
        if (!platform || !platform.eventsessions) return false;

        return platform.eventsessions.some((session: any) => {
            const sessionStart = session.start_date.split(' ')[1];
            const sessionEnd = session.end_date.split(' ')[1];
            const spanCount = getSlotSpanCount(sessionStart, sessionEnd);
            const [startHour, startMinute] = sessionStart.split(':').map(Number);
            const startSlotIndex = Math.floor(startMinute / 10);
            const sessionStartHour = startHour;

            return (
                hour === sessionStartHour &&
                slotIndex >= startSlotIndex &&
                slotIndex < startSlotIndex + spanCount
            );
        });
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

                                    <div>
                                        <div className="border-top">
                                            {hours.map((hour, hourIndex) => (
                                                <div key={hourIndex} className="border-bottom position-relative">
                                                    <strong className="text-muted">{hour}:00</strong>
                                                    <div className="d-flex flex-wrap flex-column">
                                                        {slots.map((_, slotIndex) => {
                                                            const session = getSessionForSlot(eventPlatform.id, hour, slotIndex);
                                                            const isOccupied = isSlotOccupiedBySession(eventPlatform.id, hour, slotIndex);

                                                            // Skip rendering this slot if it's part of a multi-slot session but not the starting slot
                                                            if (isOccupied && !session) return null;

                                                            return (
                                                                <div
                                                                    key={slotIndex}
                                                                    className="position-relative"
                                                                    style={session ? { height: `${session.spanCount * 38}px` } : {}}
                                                                >
                                                                    <Button
                                                                        className="w-100 position-relative"
                                                                        variant=""
                                                                        size="md"
                                                                        onMouseEnter={() =>
                                                                            setHoveredSlots(prev => ({
                                                                                ...prev,
                                                                                [index]: { hour, slot: slotIndex },
                                                                            }))
                                                                        }
                                                                        onMouseLeave={() =>
                                                                            setHoveredSlots(prev => ({
                                                                                ...prev,
                                                                                [index]: null,
                                                                            }))
                                                                        }
                                                                        onClick={() => {
                                                                            handleSlotClick(hour, slotIndex);
                                                                            handlePlatformId(eventPlatform.id);
                                                                        }}
                                                                        style={session ? { height: '100%' } : {}}
                                                                    >
                                                                        {session ? (
                                                                            <div
                                                                                className="card text-muted border-1 rounded position-absolute w-75 z-75"
                                                                                style={{ borderRadius: '9px', top: '-20px', left: '30px',height:'100%' }}
                                                                            >
                                                                                {session.name} <br />
                                                                                {session.start_date.split(' ')[1]} - {session.end_date.split(' ')[1]}
                                                                            </div>
                                                                        ) : (
                                                                            hoveredSlots[index]?.hour === hour &&
                                                                            hoveredSlots[index]?.slot === slotIndex && (
                                                                                <div
                                                                                    className="card text-muted border-1 rounded position-absolute w-100 z-100"
                                                                                    style={{ borderRadius: '9px', top: '-25px' }}
                                                                                >
                                                                                    New Session <br />
                                                                                    {getSessionTime(hour, slotIndex).startTime} - {getSessionTime(hour, slotIndex).endTime}
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
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
                    event_platformId={event_platformId}
                    startTime={selectedTime?.startTime || ''}
                    endTime={selectedTime?.endTime || ''}
                />
            )}
        </React.Fragment>
    );
}

export default Platform;
