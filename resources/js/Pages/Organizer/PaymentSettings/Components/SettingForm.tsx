import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Form, FormGroup, Spinner, Row, Col } from 'react-bootstrap';
import stripe from '../../../../../images/stripe.png';
import paypal from '../../../../../images/paypal.png';


export default function SettingForm({ keys }: any) {

    // console.log(keys);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        paypal_pub: keys?.paypal_pub ?? '',
        paypal_secret: keys?.paypal_secret ?? '',
        stripe_publishable_key: keys?.stripe_publishable_key ?? '',
        stripe_secret_key: keys?.stripe_secret_key ?? '',
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // console.log(data);

        post(route('organizer.settings.payment.update'));
    }

    return (
        <Form onSubmit={submit} className="tablelist-form">
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <CardTitle>{stripe && <img height={35} src={stripe} alt="stripe-image" />}</CardTitle>
                        <CardText>Edit global Stripe Setting for all events.</CardText>
                    </div>
                </CardHeader>
                <CardBody>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Stripe Public Key</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.stripe_publishable_key}
                            onChange={(e) => setData({ ...data, stripe_publishable_key: e.target.value })}
                            isInvalid={!!errors.stripe_publishable_key}
                        />
                        {errors.stripe_publishable_key && (
                            <Form.Control.Feedback type="invalid">{errors.stripe_publishable_key}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Stripe Secret Key</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.stripe_secret_key}
                            onChange={(e) => setData({ ...data, stripe_secret_key: e.target.value })}
                            isInvalid={!!errors.stripe_secret_key}
                        />
                        {errors.stripe_secret_key && (
                            <Form.Control.Feedback type="invalid">{errors.stripe_secret_key}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                </CardBody>
            </Card>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <CardTitle>{paypal && <img height={25} src={paypal} alt="paypal-image" />}</CardTitle>
                        <CardText>Edit global Paypal Setting for all events.</CardText>
                    </div>
                </CardHeader>
                <CardBody>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">Paypal Public Key</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.paypal_pub}
                            onChange={(e) => setData({ ...data, paypal_pub: e.target.value })}
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
                            onChange={(e) => setData({ ...data, paypal_secret: e.target.value })}
                            isInvalid={!!errors.paypal_secret}
                        />
                        {errors.paypal_secret && (
                            <Form.Control.Feedback type="invalid">{errors.paypal_secret}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                </CardBody>
            </Card>
            <Row className="justify-content-center">
                <Col md={6} lg={6}>
                    <Button type="submit" disabled={processing} className='w-100'>
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
                </Col>
            </Row>
        </Form>
    )
}
