import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card, CardBody, ListGroup, Button } from 'react-bootstrap';

//import Components
// import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';
import defaultEventImage from '../../../images/defaultEventImage.png';
import defaultEventIcon from '../../../images/default-event-image.png';
import DateDifferenceFromToday from './common/DateDifferenceFromToday';
import moment from 'moment';

const AttendeeDashboard = ({ eventApp }: any) => {
    return (
        <React.Fragment>
            <Head title="Attendee Dashboard" />
            <div className="page-content">
                <Container fluid>
                    {/* <BreadCrumb title="Attendee Dashboard" pageTitle="Dashboards" /> */}
                    <Row className="d-flex justify-content-center">
                        <Col lg={8} xl={8} sm={12}>
                            <Row>
                                <Col md={6} xl={6}>
                                    <Card >
                                        <CardBody>
                                            <div className="p-4 d-flex justify-content-between">
                                                <h5>My Agenda</h5>
                                                <h5>{moment(eventApp.start_date).format('DD MMM YYYY')}</h5>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Button onClick={() => {
                                        router.visit(route('attendee.event.detail.agenda', [eventApp.id]))
                                    }} variant="success">Program</Button>
                                </Col>
                                <Col md={6} xl={6}>
                                    <Card >
                                        <figure className="event-image">
                                            <img className='card-top-image' src={defaultEventImage} alt="event default image" />
                                            <figcaption><DateDifferenceFromToday date1={eventApp.start_date} ></DateDifferenceFromToday></figcaption>
                                        </figure>
                                        <CardBody>
                                            <div className="p-4">
                                                <div className="d-flex align-items-center">
                                                    <img width="50" height="50" className="img-thumbnail rounded-circle" src={defaultEventIcon} style={{ marginRight: '4px' }} />
                                                    <div className="d-flex flex-column">
                                                        <h6 className="mb-0">{eventApp.name}</h6>
                                                        <p className="text-dark-gray"> {moment(eventApp.start_date).format('DD MMM YYYY')} </p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 text-dark-gray event-description" style={{ display: '-webkit - box' }}>
                                                    {eventApp.description}
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div >
        </React.Fragment >
    );
};
AttendeeDashboard.layout = (page: any) => <Layout children={page} />
export default AttendeeDashboard;
