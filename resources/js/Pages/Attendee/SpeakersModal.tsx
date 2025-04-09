import { Link, router } from '@inertiajs/react';
import Flatpickr from "react-flatpickr";
import { Spinner, Col, Modal, Row, Tab, Button } from 'react-bootstrap';
import speakerAvatar from '../../../images/speaker_avatar.svg';


export default function SpeakerModal({ show, hide, onHide, event, speaker }: { show: boolean, hide: () => void, onHide: () => void, event: any, speaker: any }) {

    // console.log(speaker);

    const gotoEventSpeaker = () => {
        router.visit(route('attendee.event.detail.speakers', [speaker.id]));
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <Row>
                    <Col md={12} lg={12}>
                        <Button className='btn-sm' variant='outline-secondary' onClick={gotoEventSpeaker}>See All Speakers</Button>
                    </Col>
                    <Col className='p-4 flex-column d-flex justify-content-center align-items-center'>
                        <Link href={route('attendee.event.detail.speakers', speaker.id)}>
                            <img src={speaker.avatar || speakerAvatar} alt="speaker Avatar" className='rounded-circle avatar-xl' width="150" />
                            <h5 className='m-3'>{speaker.name}</h5>
                        </Link>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    )
}
