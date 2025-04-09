import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody, ListGroup } from 'react-bootstrap';
import Rating from "react-rating";

//https://codesandbox.io/p/sandbox/react-drag-and-drop-sortablelist-g205n
//import Components

import { Head, Link, } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';

import speakerAvatar from '../../../images/speaker_avatar.svg';
import moment from 'moment';


const AttendeeSpeakerDetail = ({ eventApp, eventSpeaker }: any) => {

    const [sessions, setSessions] = useState([]);
    const [currentSpeaker, setCurrentSpeaker] = useState(eventSpeaker);

    const handleSpeakerChange = ((event: any, speaker: any) => {
        let elements: any = document.getElementsByClassName('active-list-item');

        for (let item of elements) {
            item.classList.remove('active-list-item');
        }
        event.target.classList.add('active-list-item');
        setCurrentSpeaker(speaker);

    });

    const speakerslist = eventApp.event_speakers.map((speaker: any, index: any) =>
        <a href="#" key={speaker.id} onClick={(event) => handleSpeakerChange(event, speaker)}>
            <ListGroup.Item className={"mb-1 " + ((!eventSpeaker.id && index === 0) || (eventSpeaker.id === speaker.id) ? 'active-list-item' : '')} >{speaker.name}</ListGroup.Item>
        </a>
    );

    useEffect(() => {
        if (!eventSpeaker.id) {
            setCurrentSpeaker(eventApp.event_speakers[0]);
        } else {
            setCurrentSpeaker(eventSpeaker);
        }
    }, []);

    useEffect(() => {
        setSessions(currentSpeaker.event_sessions);
    }, [currentSpeaker]);

    return (
        <React.Fragment>
            <Head title={eventApp.name} />
            <div className="page-content">
                <Container fluid>
                    <Row className='d-flex justify-content-center'>
                        <Col md={9} lg={9}>
                            <Row>
                                <Col md={4} lg={4}>
                                    <Card >
                                        <CardHeader>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <span className='fs-3'>Event Speakers</span>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <ListGroup>
                                                {speakerslist}
                                            </ListGroup>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md={8} lg={8}>
                                    <Card >
                                        <CardBody>
                                            {currentSpeaker && <div className='p-4 flex-column d-flex justify-content-center align-items-center'>
                                                <img src={currentSpeaker.avatar || speakerAvatar} alt="speaker Avatar" className='rounded-circle avatar-xl' width="150" />
                                                <h5 className='m-3'>{currentSpeaker.name}</h5>
                                            </div>}
                                        </CardBody>
                                    </Card>
                                    <Card className='p-2'>
                                        <span className='fs-4'>Speaker Sessions</span>
                                    </Card>
                                    {sessions && sessions.map((session: any) =>
                                        <Link href={route('attendee.event.detail.session', [session.id])} key={session.id}>
                                            <Card >
                                                <CardBody>
                                                    <Row className='d-flex justify-content-between'>
                                                        <Col md={3} lg={3} className='d-flex flex-column'>
                                                            <span className='fs-5'>{session.name}</span>
                                                            <span className='text-secondary'>MAIN STAGE</span>
                                                            <span style={{ color: 'var(--vz-success)' }}>{moment(session.start_date).format('hh:mm') + ' - ' + moment(session.end_date).format('hh:mm')}</span>
                                                            <span className='fs-5'>{currentSpeaker.name}</span>
                                                        </Col>
                                                        <Col md={2} lg={2} className='d-flex flex-column align-items-end'>
                                                            {!session.selected_by_attendee && < i className='bx bx-heart fs-3 float-right'></i>}
                                                            {session.selected_by_attendee && < i className='bx bxs-heart fs-3 text-danger' style={{ float: 'right' }}></i>}
                                                            <span>{moment(session.start_date).format('MMM DD, YYYY')}</span>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
AttendeeSpeakerDetail.layout = (page: any) => <Layout children={page} />
export default AttendeeSpeakerDetail;
