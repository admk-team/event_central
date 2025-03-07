import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateEditPlatformModal from "./CreateOrEditPlatformModal";
import CreateEditModal from "./CreateEditModal";
import { Link } from "lucide-react";

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
    const [activeEventPlatform, setActiveEventPlatform] = React.useState(null)

    const setShowCreateEditPlatformModal = (state: boolean) => {
        _setShowCreateEditPlatformModal(state);
        if (!state) setEditPlatform(null);
    };

    const editAction = (platform: any) => {
        setEditPlatform(platform);
        setShowCreateEditPlatformModal(true);
    };
    const editSessionAction = (eventSession: any) => {
        setEditEvent_session(eventSession);
        console.log('testing session on edit function ', eventSession);

        setShowCreateEditModal(true);
    };

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (!state) {
            setEditEvent_session(null);
            setSelectedTime(null);
        }
    };
    return (
        <React.Fragment>
            <div className="overflow-auto">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <div className="d-flex  gap-4 rounded">
                            <div className="bg-white rounded p-2" style={{ width: '210px' }}>
                                <div className="d-flex justify-content-between align-items-center pt-3">
                                    <p className="mb-0" style={{ fontSize: '0.895rem', fontWeight: '500' }}>Event Platforms</p>
                                    <i className="ri-add-fill  cursor-pointer fs-4 text-white bg-primary rounded" onClick={() => editAction()}></i>

                                </div>
                                <hr />
                                {event_platforms.map((eventPlatform: any, index: any) => (
                                    <div onClick={() =>{
                                         setActiveEventPlatform(eventPlatform)
                                        setEditEvent_platformId(eventPlatform)
                                    }} className="d-flex justify-content-between align-items-center cursor-pointer">
                                        <p style={{ fontSize: '0.875rem', marginBottom: '0' }}>{eventPlatform.name}</p>
                                        <div onClick={() => editAction(eventPlatform)}>
                                            <i className="ri-pencil-fill text-success cursor-pointer"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Render Sessions for the Active Event Platform */}
                            {activeEventPlatform && (
                                <div className="w-100 max-w-100">
                                    <Row className="mt-4">
                                        <Col lg={12}>
                                            <div>
                                                <div className="timeline-2">
                                                    <div className="timeline-year">
                                                        <p>12 Dec 2021</p>
                                                    </div>
                                                    <div className="timeline-continue">
                                                        {activeEventPlatform.eventsessions.map((eventSession: any) => (
                                                            <Row key={eventSession.id} className="timeline-right">
                                                                <Col xs={12}>
                                                                    <p className="timeline-date">
                                                                        {eventSession.start_time}
                                                                    </p>
                                                                </Col>
                                                                <Col xs={12}>
                                                                    <div onClick={() => editSessionAction(eventSession)} className="timeline-box w-100" style={{ maxWidth: '90%' }}>
                                                                        <div className="timeline-text">
                                                                            <div className="d-flex">
                                                                                <div className="flex-grow-1 ms-3 cursor-pointer">
                                                                                    <h5 className="mb-1 fs-15">{eventSession.name}</h5>
                                                                                    <p className="mb-0">{eventSession.start_time} - {eventSession.end_time}</p>
                                                                                    <div className="time my-2">
                                                                                        <span className="badge bg-success rounded">Upcoming</span>
                                                                                    </div>
                                                                                    <p className="text-muted mb-0">{eventSession.description}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}
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
                    event_platformId={3}

                />
                
            )}
        </React.Fragment>
    );
}

export default Platform;