import React from 'react';
import { Col, Container, Row, Card, CardBody, ListGroup, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';


import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';

import moment from 'moment';


const AttendeeAgenda = ({ eventApp }: any) => {

    const sessionLists = eventApp.event_sessions.map(session =>
        <li key={session.id}>
            <Link href={route('attendee.event.detail.session', { eventApp: eventApp.id, eventSession: session.id })}>
                <div className='d-flex justify-content-between'>
                    <span style={{ color: 'var(--vz-success)' }}>{moment(session.start_date).format('DD MMM YYYY')}   ({moment(session.start_date).format('hh:mm:ss')}-{moment(session.end_date).format('hh:mm:ss')})</span>
                    <span style={{ color: 'var(--vz-success)' }}>
                        <i className="mr-2 bx bx-time" ></i>
                        {moment(session.end_date).diff(moment(session.start_date), 'minutes')} minutes</span>
                </div>
                <Card >
                    <CardBody>
                        <div className="p-4 d-flex flex-column">
                            <h5>{session.name}</h5>
                            <span style={{ fontSize: '0.8rem', color: 'smokewhite' }}>MAIN STAGE</span>
                            <h5>speaker</h5>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        </li >
    );

    return (
        <React.Fragment>
            <Head title="Event Program" />
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>Program</h5>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown" variant="outline-success" className='mr-2'>
                                <Dropdown.Item eventKey="1" className='dropdown-menu-item-style'>
                                    <i className="mr-2 bx bx-list-ul" ></i>
                                    Grid View
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" className='dropdown-menu-item-style'>
                                    <i className="mr-2 bx bx-grid"></i>
                                    List
                                </Dropdown.Item>
                            </DropdownButton>
                            <span style={{ color: 'var(--vz-success)' }}>{moment(eventApp.start_date).format('DD MMM YYYY')}</span>
                        </div>
                    </div>
                    <section>
                        <Row className='d-flex justify-content-center'>
                            <Col sm={12} md={6} lg={6}>
                                <ul className="timeline">{sessionLists}</ul>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </div>
        </React.Fragment>
    );
};
AttendeeAgenda.layout = (page: any) => <Layout children={page} />
export default AttendeeAgenda;
