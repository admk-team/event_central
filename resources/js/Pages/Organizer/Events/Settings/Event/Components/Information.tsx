import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Form, FormGroup, Spinner } from 'react-bootstrap';

export default function Information() {
    const event = usePage().props.event as Record<string, string>;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: event.name,
        description: event.description,
        location_base: event.location_base,
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('organizer.events.settings.event.info'));
    }

    return (
        <Form onSubmit={submit} className="tablelist-form">
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <CardTitle>Event information</CardTitle>
                        <CardText>Edit the general information about your event.</CardText>
                    </div>
                    <div>
                        <Button type="submit" disabled={processing}>
                            {processing? (
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
                        <Form.Label className="form-label">Event Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-control" 
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && (
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Event Description</Form.Label>
                        <Form.Control 
                            as="textarea"
                            className="form-control" 
                            value={data.description}
                            onChange={(e) => setData({...data, description: e.target.value})}
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
                            onChange={(e) => setData({...data, location_base: e.target.value})}
                            isInvalid={!!errors.location_base}
                        />
                        {errors.location_base && (
                            <Form.Control.Feedback type="invalid">{errors.location_base}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                </CardBody>
            </Card>
        </Form>
    )
}
