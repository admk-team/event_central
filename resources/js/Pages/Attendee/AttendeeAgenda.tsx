import React from 'react';
import { Col, Container, Row, Card, CardBody, ListGroup } from 'react-bootstrap';

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Head } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';
import attendeeEventBg from '../../../images/attendee-bg.jpg';
import defaultEventImage from '../../../images/default-event-image.png';
import moment from 'moment';


const AttendeeAgenda = ({ eventApp }: any) => {
    return (
        <React.Fragment>
            <Head title="Event Program" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Program" pageTitle="Program" />
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
                                </Col>
                                <Col md={6} xl={6}>
                                    <Card >
                                        <Card.Img variant="top" src={attendeeEventBg} style={{ height: '10rem' }} />
                                        <CardBody>
                                            <div className="p-4">
                                                <div className="d-flex align-items-center">
                                                    <img width="50" height="50" className="img-thumbnail rounded-circle" src={defaultEventImage} style={{ marginRight: '4px' }} />
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
            </div>
        </React.Fragment>
    );
};
AttendeeAgenda.layout = (page: any) => <Layout children={page} />
export default AttendeeAgenda;
