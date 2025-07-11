import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Form, FormGroup, Spinner, Row, Col, InputGroup } from 'react-bootstrap';
import toast from 'react-hot-toast';
import ImageCroper from "../../../../../../Components/ImageCroper";

export default function Information() {
    const event = usePage().props.event as Record<string, string>;
    // console.log(event);
    //for image croper
    const [showCropper, setShowCropper] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        logo: event.logo_img,
        name: event.name,
        tagline: event.tagline ?? '',
        description: event.description ?? '',
        location_base: event.location_base,
        registration_private: event?.registration_private ?? 0,
        registration_link: event?.registration_link ?? '',
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('organizer.events.settings.event.info'));
    }

    const [preview, setPreview] = useState<any>(event.logo_img); // State to store the preview image URL
    const [registrationPrivate, setRegistrationPrivate] = useState<any>(event.registration_private === 1); // State to store the preview image URL

    // Handle file upload
    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setShowCropper(true);
    };

     const updateImagePreview = (file: any) => {
        setData({ ...data, logo: file });
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result); 
        };
        reader.readAsDataURL(file);
    };

    const handleCheckChangeRegistration = (e: any) => {
        if (e.target.checked) {
            setData('registration_private', 1);
            setRegistrationPrivate(true);
        } else {
            setData('registration_private', 0);
            setRegistrationPrivate(false);
        }
    }

    const generateLink = () => {
        axios.get(route('organizer.events.settings.event.link')).then((response) => {
            console.log(response);
            setData('registration_link', response.data.link);
        }).finally(() => {

        });
    }

    const CopyLink = (link: string) => {
        navigator.clipboard.writeText(link)
            .then(() => {
                toast.success("Link Copied!");
            })
            .catch(() => {
                toast.error("Failed to copy link");
            });
    }

    return (
        <>
            <Form onSubmit={submit} className="tablelist-form">
                <Card>
                    <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                        <div>
                            <CardTitle>Event information</CardTitle>
                            <CardText>Edit the general information about your event.</CardText>
                        </div>
                        <div>
                            <Button type="submit" disabled={processing}>
                                {processing ? (
                                    <span className="d-flex gap-1 align-items-center">
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Saving
                                    </span>
                                ) : (
                                    <span>Save</span>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <FormGroup className="mb-3">
                            <label
                                htmlFor="logo-upload"
                                className="d-flex justify-content-center align-items-center"
                                style={{ cursor: 'pointer' }}
                            >
                                <div
                                    className="rounded-circle overflow-hidden"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        background: preview ? `url(${preview}) no-repeat center center / cover` : '#ccc',
                                        border: '2px dashed #dee2e6' // Optional: Dashed border for better UX
                                    }}
                                >
                                    {!preview && (
                                        <span className="text-muted d-flex justify-content-center align-items-center h-100">
                                            Click to Upload Logo
                                        </span>
                                    )}
                                </div>
                                <Form.Control
                                    type="file"
                                    id="logo-upload"
                                    className="d-none" // Hide the input but keep it functional
                                    onChange={handleImageChange}
                                    isInvalid={!!errors.name}
                                    accept="image/*" // Only accept image files
                                />
                            </label>
                            {errors.name && (
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Event Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                isInvalid={!!errors.name}
                            />
                            {errors.name && (
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Event Tagline</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={data.tagline}
                                onChange={(e) => setData({ ...data, tagline: e.target.value })}
                                isInvalid={!!errors.tagline}
                            />
                            {errors.tagline && (
                                <Form.Control.Feedback type="invalid">{errors.tagline}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Event Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                className="form-control"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                isInvalid={!!errors.description}
                                style={{ height: '100px' }}
                            />
                            {errors.description && (
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label">Location</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={data.location_base}
                                onChange={(e) => setData({ ...data, location_base: e.target.value })}
                                isInvalid={!!errors.location_base}
                            />
                            {errors.location_base && (
                                <Form.Control.Feedback type="invalid">{errors.location_base}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <Row >
                            <Col md={3} lg={3} className='d-flex align-items-center'>
                                <FormGroup>
                                    {/* <Form.Label className="form-label">Registration Private</Form.Label> */}
                                    <Form.Check
                                        type='checkbox'
                                        checked={data.registration_private == 1}
                                        label="Attendee will Register privately"
                                        id="select-all-features"
                                        onChange={handleCheckChangeRegistration}
                                    />
                                </FormGroup>
                            </Col>
                            {registrationPrivate && <>
                                <Col md={7} lg={7}>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="text"
                                            disabled
                                            className="form-control"
                                            value={data.registration_link}
                                            onChange={(e) => setData('registration_link', e.target.value)}
                                            isInvalid={!!errors.registration_link}
                                        />
                                        <Button variant="outline-secondary" id="button-copyLink" disabled={data.registration_link.length === 0} onClick={() => CopyLink(data.registration_link)}>
                                            <i className='bx bx-copy'></i>
                                        </Button>
                                        <Form.Control.Feedback type="invalid">{errors.registration_link}</Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col md={2} lg={2}>
                                    <Button type="button" onClick={generateLink}>
                                        Generate Link
                                    </Button>
                                </Col>
                            </>}
                        </Row>
                    </CardBody>
                </Card>
            </Form>

            <ImageCroper
                visible={showCropper}
                imageSrc={selectedImage}
                onClose={() => setShowCropper(false)}
                onCrop={updateImagePreview}
            />
        </>
    )
}
