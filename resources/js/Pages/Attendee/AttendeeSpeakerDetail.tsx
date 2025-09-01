import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody, ListGroup } from 'react-bootstrap';
import Rating from "react-rating";

//https://codesandbox.io/p/sandbox/react-drag-and-drop-sortablelist-g205n
//import Components

import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';

import speakerAvatar from '../../../images/speaker_avatar.svg';
import moment from 'moment';
import { useLaravelReactI18n } from "laravel-react-i18n";

const AttendeeSpeakerDetail = ({ eventApp, eventSpeaker }: any) => {
const { t } = useLaravelReactI18n();

    const [sessions, setSessions] = useState([]);
    const [currentSpeaker, setCurrentSpeaker] = useState(eventSpeaker);
    const { data, setData, get, processing, errors, reset, transform, clearErrors } = useForm({});
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

    const sessionFav = (sessionId: any) => {
        console.log(sessionId);
        get(route('fav.sessions', sessionId), {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.log(error);
                console.log(errors);
            }
        });
    };

    useEffect(() => {
        if (!eventSpeaker.id) {
            setCurrentSpeaker(eventApp.event_speakers[0]);
        } else {
            setCurrentSpeaker(eventSpeaker);
        }
    }, []);

    useEffect(() => {
        setSessions(currentSpeaker?.event_sessions);
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
                                                <span className='fs-3'>{t("Event Speakers")}</span>
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
                                        <span className='fs-4'>{t("Speaker Sessions")}</span>
                                    </Card>
                                    {sessions && sessions.sort((a:any, b:any) => new Date(a.start_date_time).getTime() - new Date(b.start_date_time).getTime()).map((session: any) =>
                                        <Link href={route('attendee.event.detail.session', [session.id])} key={session.id}>
                                            <Card >
                                                <CardBody>
                                                    <Row>
                                                        <Col className='d-flex flex-column'>
                                                            <span className='fs-4'>{session.name}</span>
                                                            <span className='text-secondary'>{session.event_platform?.name ?? ''}</span>

                                                        </Col>
                                                        <Col className='d-flex flex-column align-items-end'>
                                                            {!session.is_favourite && < i className='bx bx-heart fs-3 float-right' onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                sessionFav(session.id)
                                                            }}></i>}
                                                            {session.is_favourite && < i className='bx bxs-heart fs-3 text-danger' style={{ float: 'right' }} onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                sessionFav(session.id)
                                                            }}></i>}
                                                            <span>{moment(session.start_date_time).format('MMM DD, YYYY')}</span>
                                                            <span style={{ color: 'var(--vz-success)' }}>{moment(session.start_date_time).format('h:mm A') + ' - ' + moment(session.end_date_time).format('h:mm A')}</span>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col><p>{session.description}</p></Col>
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
