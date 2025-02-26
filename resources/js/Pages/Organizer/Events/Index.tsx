import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Modal, Row } from 'react-bootstrap';
import { Input } from '@headlessui/react';
import { Link, router, useForm } from '@inertiajs/react';
import CreateModal from './Components/CreateModal';
import Layout from '../../../Layouts/Organizer';
import axios from 'axios';

function Index(events: any) {
    const [addEventModal, setAddEventModal] = useState(false);
    function showModal() {
        setAddEventModal(!addEventModal);
    }

    return (
       <>
            <Container>
                <Row className='p-3 gap-2 gap-lg-5'>
                    <Col md={4} xl={3} className='card rounded-4 d-flex flex-column align-items-center g-3 text-white px-0'>

                        <Button className='w-100 p-4 rounded-4' variant='primary' onClick={() => showModal()}>
                            <i className='bx bx-plus fs-2'></i>
                            <p className='text-white fs-5 fw-semibold mt-3'>Add Event</p>
                        </Button>
                    </Col>
                    {events.events.map((event: any) => (
                        <Col md={4} xl={3}
                            key={event.id}
                            className='card rounded-4 d-flex flex-column justify-content-between align-items-center g-3 p-3 cursor-pointer'
                            onClick={() => router.visit(route('organizer.events.select', event.id))}
                        >
                            <div className="d-flex w-100 align-items-center">
                                <img src="https://media.istockphoto.com/id/1408255024/photo/developers-discussing-programming-code.jpg?s=2048x2048&w=is&k=20&c=FX-R-szUMTh0dbG5yUVKgnijyNxa2KFFpbjUj-PaK4g=" alt="event" className="img-fluid rounded-circle avatar-sm" />
                                <div className="fs-6 fw-semibold ms-3">
                                    {event.name}
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <div className="fs-6 text-muted">
                                    {event.created_at_date}
                                </div>
                                <div className="fs-6 text-muted">
                                    Draft
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <CreateModal addEventModal={addEventModal} showModal={showModal} />
        </>
    )
}
Index.layout = (page: any) => <Layout children={page} />

export default Index
