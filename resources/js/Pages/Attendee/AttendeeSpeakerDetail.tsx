import React, { useState } from 'react';
import { Button, Col, Container, Row, Card, CardBody, Badge, Accordion, Form } from 'react-bootstrap';
import Rating from "react-rating";

//https://codesandbox.io/p/sandbox/react-drag-and-drop-sortablelist-g205n
//import Components

import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';
import DateDifferenceFromToday from './common/DateDifferenceFromToday';

import moment from 'moment';
import attendeeEventBg from '../../../images/attendee-bg.jpg';
import SpeakerModal from './SpeakersModal';



const AttendeeSessionDetail = ({ eventApp, eventSpeaker }: any) => {


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
                                            <Link href={route('attendee.event.detail.agenda', eventApp.id)} style={{ marginRight: '3px' }}>
                                                <i className='bx bx-arrow-back fs-3 fw-bolder text-muted'></i>
                                            </Link>
                                            <h5 className="m-0 fw-bolder">{eventSession.name}</h5>
                                        </div>

                                        <div className='d-flex flex-row align-items-center'>
                                            <a style={{ marginRight: '15px' }} href="#">
                                                <i className='bx bx-link fs-3 fw-bolder text-muted'></i>
                                            </a>

                                            {sessionSelected && <a style={{ marginRight: '15px' }} href="#" className='pe-auto' onClick={unSelectSession} title={'Click to un-select session'}>
                                                <i className='bx bxs-heart fs-3 fw-bolder text-muted'></i> </a>}

                                            {!sessionSelected && <a style={{ marginRight: '15px' }} href="#" className='pe-auto' onClick={selectSession} title={'Click to select session'}> <i className='bx bx-heart fs-3 fw-bolder text-muted'></i> </a>}

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
                                            {prev_session_id && <Link href={route('attendee.event.detail.session', [eventApp.id, prev_session_id])} title='Previous Session'>
                                                <i className='bx bx-left-arrow-alt fs-3 fw-bolder text-muted'></i>
                                            </Link>}
                                            {next_session_id && <Link href={route('attendee.event.detail.session', [eventApp.id, next_session_id])} title='Next Session'>
                                                <i className='bx bx-right-arrow-alt fs-3 fw-bolder text-muted'></i>
                                            </Link>}
                                        </div>
                                    </div>
                                    <h4 className='mt-2'>
                                        Speakers
                                    </h4>
                                    <Button variant='outline-secondary' onClick={() => SetShowModal(true)}>{eventSession.event_speaker.name}</Button>

                                    <SpeakerModal show={showModal}
                                        hide={() => SetShowModal(false)}
                                        onHide={() => SetShowModal(false)}
                                        speaker={eventSession.event_speaker}
                                    ></SpeakerModal>

                                    <h4 className='mb-1 mt-4'>
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
                                                {!sessionSelected && <p>Rating can be left for selected sessions only</p>}
                                                {
                                                    sessionSelected && <form onSubmit={submitRatingChange}>
                                                        <div className="mt-4">
                                                            <div className='rating-wraper d-flex justify-content-center w-100'>
                                                                <Rating
                                                                    initialRating={data.rating}
                                                                    onChange={handleRatingChange}
                                                                    emptySymbol="bx bx-star"
                                                                    fullSymbol={['bx bxs-star']}
                                                                />
                                                            </div>
                                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.rating}</Form.Control.Feedback>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Form.Control
                                                                as="textarea"
                                                                id="rating_description"
                                                                type="text"
                                                                rows={4}
                                                                name="rating_description"
                                                                placeholder="Enter Rating Comments"
                                                                value={data.rating_description}
                                                                className={"mt-1 form-control" + (errors.rating_description ? 'is-invalid' : '')}
                                                                autoComplete="ratinrating_descriptiong_comments"
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
                                                }
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
