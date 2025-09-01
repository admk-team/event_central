import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Card, Form } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";

const ZohoSettingForm = ({ keys }: any) => {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors } = useForm({
        client_id: keys?.client_id || '',
        client_secret: keys?.client_secret || '',
        redirect_uri: keys?.redirect_uri || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('organizer.zoho.store'));
    };

    return (
        <Card>
            <Card.Body>
                <h5 className="mb-4">{t('Zoho CRM Credentials')}</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="client_id">
                        <Form.Label>{t("Client ID")}</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.client_id}
                            onChange={(e) => setData('client_id', e.target.value)}
                            isInvalid={!!errors.client_id}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.client_id}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="client_secret">
                        <Form.Label>{t('Client Secret')}</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.client_secret}
                            onChange={(e) => setData('client_secret', e.target.value)}
                            isInvalid={!!errors.client_secret}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.client_secret}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="redirect_uri">
                        <Form.Label>{t('Redirect URI')}</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.redirect_uri}
                            onChange={(e) => setData('redirect_uri', e.target.value)}
                            isInvalid={!!errors.redirect_uri}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.redirect_uri}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className='d-flex'>
                        <Button variant="primary" type="submit" disabled={processing}>
                            {t('Save Keys')}
                        </Button>
                        <Button variant="primary" type="submit" className='ms-4' onClick={() => window.location.href = route('organizer.zoho.connect')}>
                            {t('Connect')}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ZohoSettingForm;
