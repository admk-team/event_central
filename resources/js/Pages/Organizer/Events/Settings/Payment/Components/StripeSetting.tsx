import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Form, FormGroup, Spinner } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function StripeSetting() {
    const { t } = useLaravelReactI18n();
    const event = usePage().props.event as Record<string, string>;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        stripe_pub: event.stripe_pub,
        stripe_secret: event.stripe_secret,
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('organizer.events.settings.payment.update'));
    };

    return (
        <Form onSubmit={submit} className="tablelist-form">
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <CardTitle>{t("Event Stripe Setting")}</CardTitle>
                        <CardText>{t("Edit the general Stripe Setting about your event.")}</CardText>
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
                                    {t("Saving")}
                                </span>
                            ) : (
                                <span>{t("Save")}</span>
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Stripe Public Key")}</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.stripe_pub}
                            onChange={(e) => setData({ ...data, stripe_pub: e.target.value })}
                            isInvalid={!!errors.stripe_pub}
                        />
                        {errors.stripe_pub && (
                            <Form.Control.Feedback type="invalid">{errors.stripe_pub}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Stripe Secret Key")}</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.stripe_secret}
                            onChange={(e) => setData({ ...data, stripe_secret: e.target.value })}
                            isInvalid={!!errors.stripe_secret}
                        />
                        {errors.stripe_secret && (
                            <Form.Control.Feedback type="invalid">{errors.stripe_secret}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                </CardBody>
            </Card>
        </Form>
    );
}
