import moment from 'moment';
import { Button, Col, Row } from 'react-bootstrap';

export default function SessionCard({ session, onEdit, onDelete }: { session: any, onEdit: () => void; onDelete: () => void }) {
    const startDate = moment(`${session.event_date.date} ${session.start_time}`, "YYYY-MM-DD HH:mm:ss");
    const endDate = moment(`${session.event_date.date} ${session.end_time}`, "YYYY-MM-DD HH:mm:ss");
    const now = moment(new Date());

    let sessionStatus = null;
    let badge = null;

    switch (true) {
        case now < startDate:
            sessionStatus = 'upcomming';
            badge =  <span className="badge rounded-pill bg-primary-subtle text-primary fw-bold fs-12">Upcomming</span>;
            break;
        case now > endDate:
            sessionStatus = 'passed';
            badge =  <span className="badge rounded-pill bg-dark-subtle text-dark fw-bold fs-12">Passed</span>;
            break;
        default:
            sessionStatus = 'ongoing';
            badge =  <span className="badge rounded-pill bg-success-subtle text-success fw-bold fs-12">Ongoing</span>;
            break;
    }

    return (
        <Row className={`timeline-right ${sessionStatus !== 'passed' ? 'scroll-to' : ''}`}>
            <Col xs={12}>
                <p className={`timeline-date ${({upcomming: 'primary', passed: 'light'})[sessionStatus]}`}>
                    {startDate.format('hh:mm A')}
                </p>
            </Col>
            <Col xs={12}>
                <div className="timeline-box w-100">
                    <div className="timeline-text w-100">
                        <div className="d-flex">
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h4 className="fs-17 mb-0">{session.name}</h4>
                                    <div className="d-flex gap-1">
                                        <Button onClick={onEdit} variant="primary" size="sm" className="btn-icon"><i className="ri-edit-fill" /></Button>
                                        <Button onClick={onDelete} variant="danger" size="sm" className="btn-icon"><i className="ri-delete-bin-5-line" /></Button>
                                    </div>
                                </div>
                                <p className="text-muted mb-2">{startDate.format('hh:mm A')} - {endDate.format('hh:mm A')}</p>
                                {badge}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}