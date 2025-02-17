import React, { useState } from 'react'
import Layout from '../../../Layouts/Organizer';
import { Button, Col, Form, FormGroup, Modal, Row } from 'react-bootstrap';
import { Input } from '@headlessui/react';
import { Link } from '@inertiajs/react';

function Preview() {

    const [addEventModal, setAddEventModal] = useState(false);
    function showModal() {
        setAddEventModal(!addEventModal);
    }
    return (
        <div className="page-content">
            <Row className='p-3 p-lg-5 gap-2 gap-lg-5'>
                <Col className='card rounded-4 d-flex flex-column align-items-center g-3 text-white px-0'>
                    <Button className='w-100 p-4 rounded-4' variant='primary' onClick={() => showModal()}>
                        <i className='bx bx-plus fs-2'></i>
                        <p className='text-white fs-5 fw-semibold mt-3'>Add Event</p>
                    </Button>
                </Col>
                <Col className='card rounded-4 d-flex flex-column justify-content-between align-items-center g-3 p-3 cursor-pointer'>
                    <div className="d-flex w-100 align-items-center">
                        <img src="https://media.istockphoto.com/id/1408255024/photo/developers-discussing-programming-code.jpg?s=2048x2048&w=is&k=20&c=FX-R-szUMTh0dbG5yUVKgnijyNxa2KFFpbjUj-PaK4g=" alt="event" className="img-fluid rounded-circle avatar-sm" />
                        <div className="fs-6 fw-semibold ms-3">
                            Testing event
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="fs-6 text-muted">
                            Mar 17, 2025
                        </div>
                        <div className="fs-6 text-muted">
                            Draft
                        </div>
                    </div>
                </Col>
                <Col className='card rounded-4 d-flex flex-column justify-content-between align-items-center g-3 p-3 cursor-pointer'>
                    <div className="d-flex w-100 align-items-center">
                        <img src="https://media.istockphoto.com/id/1408255024/photo/developers-discussing-programming-code.jpg?s=2048x2048&w=is&k=20&c=FX-R-szUMTh0dbG5yUVKgnijyNxa2KFFpbjUj-PaK4g=" alt="event" className="img-fluid rounded-circle avatar-sm" />
                        <div className="fs-6 fw-semibold ms-3">
                            Testing event
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="fs-6 text-muted">
                            Mar 17, 2025
                        </div>
                        <div className="fs-6 text-muted">
                            Draft
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal className='modal-dialog-centered' centered show={addEventModal} onHide={() => showModal()} backdrop={'static'}>
                <Modal.Header>
                    <h5 className="modal-title" id="staticBackdropLabel">Create Event</h5>
                    <Button type="button" className="btn-close"
                        onClick={() => {
                            showModal();
                        }} aria-label="Close"></Button>
                </Modal.Header>
                <Modal.Body className="text-center p-5">
                    <div className="mt-4">
                        {/* <h4 className="mb-3">You've made it!</h4>
                        <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p> */}
                        <FormGroup>
                            <Input id='eventName' className="form-control form-control-sm" type='text' placeholder='My Awesome Event' />
                            <Form.Label htmlFor='eventName'>Event Name</Form.Label>
                        </FormGroup>
                        <div className="hstack gap-2 justify-content-center">
                            <Link href="#" className="btn btn-link link-success fw-medium" onClick={() => showModal()}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                            <Link href="#" className="btn btn-success">Create</Link>
                            .
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div >
    )
}
Preview.layout = (page: any) => <Layout children={page} />

export default Preview