import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Form, FormGroup, Spinner } from 'react-bootstrap';

export default function PaypalSetting() {
    const event = usePage().props.event as Record<string, string>;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        paypal_pub: event.paypal_pub,
        paypal_secret: event.paypal_secret,
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('organizer.events.settings.payment.update'));
    }

    return (
        <Form onSubmit={submit} className="tablelist-form">
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <CardTitle>Event Paypal Setting</CardTitle>
                        <CardText>Edit the general Paypal Setting about your event.</CardText>
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
                        <Form.Label className="form-label">Paypal Public Key</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-control" 
                            value={data.paypal_pub}
                            onChange={(e) => setData({...data, paypal_pub: e.target.value})}
                            isInvalid={!!errors.paypal_pub}
                        />
                        {errors.paypal_pub && (
                            <Form.Control.Feedback type="invalid">{errors.paypal_pub}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Paypal Secret Key</Form.Label>
                        <Form.Control 
                            type="text"
                            className="form-control" 
                            value={data.paypal_secret}
                            onChange={(e) => setData({...data, paypal_secret: e.target.value})}
                            isInvalid={!!errors.paypal_secret}
                        />
                        {errors.paypal_secret && (
                            <Form.Control.Feedback type="invalid">{errors.paypal_secret}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                </CardBody>
            </Card>
        </Form>
    )
}
