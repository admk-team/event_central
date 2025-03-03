import Layout from "../../../../Layouts/Organizer/Event";
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';

function CreateOrEdit({ speaker, events }: any) {
    // Determine if the form is in edit mode
    const isEdit = !!speaker;    
    const { data, setData, post, processing, errors, reset } = useForm({
        event_app_id: speaker?.event_app_id || "",
        name: speaker?.name || "",
        avatar: null,
        company: speaker?.company || "",
        position: speaker?.position || "",
        bio: speaker?.bio || "",
        email: speaker?.email || "",
        phone: speaker?.phone || "",
        web: speaker?.web || "",
        linkedin: speaker?.linkedin || "",
        facebook: speaker?.facebook || "",
        twitter: speaker?.twitter || "",
        instagram: speaker?.instagram || "",
        country: speaker?.country || "",
        language: speaker?.language || "",
        _method: speaker?.id ? "PUT" : "POST", // Spoof method
    });

    function handleAvatar(e: any) {
        const file = e.target.files[0]
        setData('avatar', file);

    }

    const submit = (e: any) => {
        e.preventDefault();
        if (isEdit) {
            post(route('organizer.events.speaker.update', speaker.id))
        } else {
            post(route('organizer.events.speaker.store'));
            console.log('testing ', errors);

        }
    };

    return (
        <React.Fragment>
            <Head title={isEdit ? 'Edit Speaker' : 'Create Speaker'} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={isEdit ? 'Edit Speaker' : 'Create Speaker'} pageTitle="Dashboard" />
                    <Row>
                        <Card className="mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-title">{isEdit ? 'Edit Speaker' : 'Create Speaker'}</div>
                            </div>
                            <Card.Body>
                                <div className="card-body">
                                    <form onSubmit={submit} >
                                        <Row className="gy-2">

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        placeholder="Enter name"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.name} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="avatar" className="form-label">Avatar </Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        className="form-control"
                                                        id="avatar"
                                                        placeholder="Enter avatar URL"

                                                        onChange={handleAvatar}
                                                    // onChange={(e) => setData('avatar', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.avatar} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="company" className="form-label">Company</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="company"
                                                        placeholder="Enter company"
                                                        value={data.company}
                                                        onChange={(e) => setData('company', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.company} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="position" className="form-label">Position</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="position"
                                                        placeholder="Enter position"
                                                        value={data.position}
                                                        onChange={(e) => setData('position', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.position} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={12} md={12}>
                                                <div className="">
                                                    <Form.Label htmlFor="bio" className="form-label">Bio</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        className="form-control"
                                                        id="bio"
                                                        placeholder="Enter bio"
                                                        value={data.bio}
                                                        onChange={(e) => setData('bio', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.bio} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="email" className="form-label">Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Enter email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.email} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="phone" className="form-label">Phone</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        placeholder="Enter phone"
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.phone} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="web" className="form-label">Website</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="web"
                                                        placeholder="Enter website"
                                                        value={data.web}
                                                        onChange={(e) => setData('web', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.web} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="linkedin" className="form-label">LinkedIn</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="linkedin"
                                                        placeholder="Enter LinkedIn URL"
                                                        value={data.linkedin}
                                                        onChange={(e) => setData('linkedin', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.linkedin} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="facebook" className="form-label">Facebook</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="facebook"
                                                        placeholder="Enter Facebook URL"
                                                        value={data.facebook}
                                                        onChange={(e) => setData('facebook', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.facebook} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="twitter" className="form-label">Twitter</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="twitter"
                                                        placeholder="Enter Twitter URL"
                                                        value={data.twitter}
                                                        onChange={(e) => setData('twitter', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.twitter} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="instagram" className="form-label">Instagram</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="instagram"
                                                        placeholder="Enter Instagram URL"
                                                        value={data.instagram}
                                                        onChange={(e) => setData('instagram', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.instagram} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="country" className="form-label">Country</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="country"
                                                        placeholder="Enter country"
                                                        value={data.country}
                                                        onChange={(e) => setData('country', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.country} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="language" className="form-label">Language</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="language"
                                                        placeholder="Enter language"
                                                        value={data.language}
                                                        onChange={(e) => setData('language', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.language} </Form.Control.Feedback>

                                                </div>
                                            </Col>

                                            <Col xxl={6} md={6}>
                                                <Form.Label htmlFor="event_app_id" className="form-label">Select Event App</Form.Label>
                                                <select
                                                    className="form-select "
                                                    id="event_app_id"
                                                    aria-label="Select event app"
                                                    value={data.event_app_id}
                                                    onChange={(e) => setData('event_app_id', e.target.value)}
                                                >
                                                    <option value="">Select Event</option>
                                                    {events?.map((event: any) => (
                                                        <option key={event.id} value={event.id}>{event.name}</option>
                                                    ))}
                                                </select>
                                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.event_app_id} </Form.Control.Feedback>

                                            </Col>
                                        </Row>

                                        <div className="mt-4 text-center ">
                                            <Button type="submit" className="btn btn-success px-3" disabled={processing}>
                                                {isEdit ? 'Update' : 'Create'}
                                            </Button>
                                        </div>

                                    </form>

                                </div>

                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

CreateOrEdit.layout = (page: any) => <Layout children={page} />;

export default CreateOrEdit;