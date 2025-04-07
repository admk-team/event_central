import React from 'react';
import { Col, Row, Card, CardBody } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import moment from 'moment';


const EventSessionsTimeLine = ({ eventApp, sessions }: any) => {

    const sessionLists = sessions.map(session =>
        <li key={session.id}>
            <Link href={route('attendee.event.detail.session', { eventSession: session.id })}>
                <div className='d-flex justify-content-between'>
                    <span style={{ color: 'var(--vz-success)' }}>{moment(session.start_date_time).format('DD MMM YYYY')}   ({moment(session.start_date_time).format('hh:mm')}-{moment(session.end_date_time).format('hh:mm')})</span>
                    <span style={{ color: 'var(--vz-success)' }}>
                        <i className="mr-2 bx bx-time" ></i>
                        {moment(session.end_date_time).diff(moment(session.start_date_time), 'minutes')} minutes</span>
                </div>
                <Card >
                    <CardBody >
                        <Row>
                            <Col md={10} lg={10}>
                                <div className="d-flex flex-column">
                                    <h5>{session.name}</h5>
                                    <span style={{ fontSize: '0.8rem', color: 'smokewhite' }}>{session.event_platform?.name ?? 'MAIN STAGE'}</span>
                                    <h5>speaker</h5>
                                </div>
                            </Col>
                            <Col md={2} lg={2}>
                                {session.selected_by_attendee &&
                                    <div className="d-flex flex-column justify-content-end align-items-end">
                                        {session.selected_by_attendee && <i className='bx bxs-heart fs-4 text-danger fw-bolder'></i>}
                                    </div>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Link>
        </li >
    );

    return (
        <React.Fragment>
            <ul className="timeline">{sessionLists}</ul>
        </React.Fragment>
    );
}

export default EventSessionsTimeLine;
