import { usePage } from '@inertiajs/react';
import { Col, Row } from 'react-bootstrap';
import SessionCard from './SessionCard';
import moment from 'moment';
import { useEffect } from 'react';

export default function Sessions({ selectedDate, selectedPlatform, onEdit, onDelete }: { selectedDate: any; selectedPlatform: any; onEdit: (session: any) => void; onDelete: (session: any) => void}) {
    const eventSessions = (usePage().props.eventSessions as any)
        .filter((session: any) => {
            return (session.event_date_id === selectedDate?.id) && (session.event_platform_id === selectedPlatform?.id);
        })
        .sort((a: any, b: any) => {
            const aStartDate = moment(`${a.event_date.date} ${a.start_time}`, "YYYY-MM-DD HH:mm:ss");
            const bStartDate = moment(`${b.event_date.date} ${b.start_time}`, "YYYY-MM-DD HH:mm:ss");
        
            if (aStartDate.isAfter(bStartDate)) {
                return 1;
            } else if (aStartDate.isBefore(bStartDate)) {
                return -1;
            }
            
            return 0;
        });

    useEffect(() => {
        document.querySelector('.scroll-to')?.scrollIntoView();
    }, [selectedPlatform]);

    if (selectedDate === null || selectedPlatform === null) {
        return (
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div className="fw-semibold fs-5">
                    {selectedDate === null ? 'No date selected, please select date' : 'No location selected, please select location'}
                </div>
            </div>
        );
    }

    return (
        <Row>
            <Col lg={12}>
                <div className="sessions-timeline">
                    <div className="timeline-2">
                        <div className="timeline-continue">
                            {eventSessions.map((session: any) => (
                                <SessionCard
                                    key={session.id}
                                    session={session}
                                    onEdit={() => onEdit(session)}
                                    onDelete={() => onDelete(session)}
                                />
                            ))}
                            <div className="scroll-to"></div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}