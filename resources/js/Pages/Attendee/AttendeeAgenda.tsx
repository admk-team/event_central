import React from 'react';
import { Col, Container, Row, Dropdown, DropdownButton, ButtonGroup, Card, CardBody } from 'react-bootstrap';


import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';
import moment from 'moment';
import EventSessionsTimeLine from './common/EventSessionsTimeLine';


const AttendeeAgenda = ({ eventApp }: any) => {

    // console.log(document.referrer);
    return (
        <React.Fragment>
            <Head title="Event Program" />
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>Event Agenda</h5>
                        </div>
                        {/* <div className='d-flex justify-content-between align-items-center'>
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
                        </div> */}
                    </div>
                    <section>
                        <Row className='d-flex justify-content-center'>
                            <Col sm={12} md={6} lg={6}>
                                <EventSessionsTimeLine eventApp={eventApp} sessions={eventApp.event_sessions}></EventSessionsTimeLine>
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
