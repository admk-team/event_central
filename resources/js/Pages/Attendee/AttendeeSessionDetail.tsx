import React, { useState } from 'react';
import { Button, Col, Container, Row, Card, CardBody, Badge, Accordion, Form } from 'react-bootstrap';
import Rating from "react-rating";

//https://codesandbox.io/p/sandbox/react-drag-and-drop-sortablelist-g205n
//import Components

import { Head, useForm } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';
import DateDifferenceFromToday from './common/DateDifferenceFromToday';
// import attendeeEventBg from '../../../images/attendee-bg.jpg';
// import defaultEventImage from '../../../images/default-event-image.png';
import moment from 'moment';
import attendeeEventBg from '../../../images/attendee-bg.jpg';
import defaultEventImage from '../../../images/default-event-image.png';



const AttendeeSessionDetail = ({ eventApp, eventSession }: any) => {

    console.log('sessions', eventSession);
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "POST",
        rating: '',
        rating_description: ''
    });

    const ratingEnabled = moment(eventSession.start_date) > moment();

    const submitRatingChange = (e: any) => {
        e.preventDefault();
        post(route('attendee.change.email'));
        console.log('Rating form submitted');
    };

    const form = useForm({
        eventId: eventApp.id,
        eventSessionId: eventSession.id,
    });
    let sessionSelected = eventSession.session_selected;
    const toggleSessionSelection = (() => {
        sessionSelected = !sessionSelected
        if (sessionSelected) {
            form.transform((data) => ({
                ...data,
                selected: true
            }));
            form.post(route('attendee.save.session', eventSession.id));
        } else {
            form.transform((data) => ({
                ...data,
                selected: false
            }));
            form.post(route('attendee.save.session', eventSession.id));
        }
    });

    const handleratingChanged = (v: any) => {
        console.log(v);
    }

    return (
        <React.Fragment>
            <Head title={eventApp.name + "-" + eventSession.name} />
            <div className="page-content">
                <Container fluid>
                    <Row className='d-flex justify-content-center'>
                        <Col md={9} lg={9}>
                            <Row>
                                <Col md={8} lg={8}>
                                    <div className='d-flex justify-content-between align-items-center mb-4'>
                                        <div className='d-flex flex-row align-items-center'>
                                            <a style={{ marginRight: '15px' }} href="#">
                                                <i className='bx bx-arrow-back fs-3 fw-bolder text-muted'></i>
                                            </a>
                                            <h5 className="m-0 fw-bolder">{eventSession.name}</h5>
                                        </div>
                                        <div className='d-flex flex-row align-items-center'>
                                            <a style={{ marginRight: '15px' }} href="#">
                                                <i className='bx bx-link fs-3 fw-bolder text-muted'></i>
                                            </a>
                                            <a style={{ marginRight: '15px' }} onClick={toggleSessionSelection}>
                                                {sessionSelected && <i className='bx bxs-heart fs-3 fw-bolder text-muted'></i>}
                                                {!sessionSelected && <i className='bx bx-heart fs-3 fw-bolder text-muted'></i>}
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <Card >
                                            <Card.Img src={attendeeEventBg} style={{ height: '30rem' }} />
                                        </Card>
                                        <div style={{ position: 'relative', top: '-18rem' }}>
                                            <DateDifferenceFromToday date1={eventSession.start_date} top={'-18rem'}></DateDifferenceFromToday>
                                        </div>
                                    </div>

                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <div className='d-flex flex-row align-items-center'>
                                            <h5 style={{ margin: '0' }}>
                                                <Badge bg="secondary" style={{ marginRight: '5px' }}>MAIN STAGE</Badge>
                                                <Badge bg="secondary">{moment(eventSession.start_date).format('DD MMM ') + ' - ' + moment(eventSession.start_date).format('hh:mm') + ' - ' + moment(eventSession.end_date).format('hh:mm')}</Badge>
                                            </h5>
                                        </div>
                                        <div className='d-flex flex-row align-items-center'>
                                            <Button variant="primary" className='btn-sm'>NEXT SESSION</Button>
                                        </div>
                                    </div>
                                    <h4 className='mt-2'>
                                        Speakers
                                    </h4>
                                    <Card >
                                        <CardBody>
                                            {eventSession.event_speaker.name}
                                        </CardBody>
                                    </Card>
                                    <h4 className='mb-1'>
                                        Description
                                    </h4>
                                    <p>{eventSession.description}</p>
                                </Col>

                                <Col md={4} lg={4}>
                                    <Card >
                                        <CardBody>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <i className='fs-3 bx bx-star' style={{ marginRight: '10px' }}></i>
                                                <span className='fs-3'>Ratings</span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <h6>Add Ratings</h6>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <form onSubmit={submitRatingChange}>
                                                    <div className='rating-wraper d-flex justify-content-center w-100'>
                                                        <Rating
                                                            onChange={handleratingChanged}
                                                            emptySymbol="bx bx-star"
                                                            fullSymbol={['bx bxs-star']}
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Form.Control
                                                            as="textarea"
                                                            id="bio"
                                                            type="text"
                                                            rows={4}
                                                            name="bio"
                                                            placeholder="Enter Rating Comments"
                                                            value={data.rating_description}
                                                            className={"mt-1 form-control" + (errors.rating_description ? 'is-invalid' : '')}
                                                            autoComplete="rating_comments"
                                                            onChange={(e: any) => setData('rating_description', e.target.value)}
                                                        />

                                                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.rating_description}</Form.Control.Feedback>
                                                    </div>
                                                    {!ratingEnabled && <p>* Ratings can be added only after the session has started</p>}

                                                    {ratingEnabled &&
                                                        <div className='d-flex justify-content-between'>
                                                            <Button type="submit" className="btn btn-success w-100 mt-4" disabled={processing}>
                                                                Save Rating
                                                            </Button>
                                                        </div>
                                                    }
                                                </form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
AttendeeSessionDetail.layout = (page: any) => <Layout children={page} />
export default AttendeeSessionDetail;
