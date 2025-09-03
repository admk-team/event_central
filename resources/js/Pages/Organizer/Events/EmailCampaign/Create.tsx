import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';
import Layout from '../../../../Layouts/Event';
import { useLaravelReactI18n } from "laravel-react-i18n";

const Create = ({ baseTemplate, templateId }: { baseTemplate: any, templateId: any }) => {
    const { t } = useLaravelReactI18n();

    console.log('s', templateId);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        subject: '',
        sent_to: '',
        event_email_template_id: templateId || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('organizer.events.email-campaign.store')); // Replace with your actual route
    };

    return (
        <Container fluid style={{ marginTop: '80px' }} >
            <Row>
                <Col lg={12}>
                    <Card className="mt-4">
                        <Card.Header>
                            <h5 className="card-title mb-0">{t("Create Campaign")}</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="gy-3">
                                    <Col md={6}>
                                        <Form.Label htmlFor="name" className="form-label">{t("Name")}e</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="name"
                                            placeholder={t("Enter name")}
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
                                    </Col>

                                    <Col md={6}>
                                        <Form.Label htmlFor="subject" className="form-label">{t("Subject")}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="subject"
                                            placeholder={t("Enter subject")}
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                        />
                                        {errors.subject && <div className="text-danger mt-1">{errors.subject}</div>}
                                    </Col>

                                    <Col md={6}>
                                        <Form.Label htmlFor="sent_to" className="form-label">{t("Send To")}</Form.Label>
                                        <Form.Select
                                            id="sent_to"
                                            value={data.sent_to}
                                            onChange={(e) => setData('sent_to', e.target.value)}
                                        >
                                            <option value="">{t("Select")}</option>
                                            <option value="organizers">{t("Organizers")}</option>
                                            <option value="attendees">{t("Attendees")}</option>
                                            <option value="staff">{t("Staff")}</option>
                                        </Form.Select>
                                        {errors.sent_to && <div className="text-danger mt-1">{errors.sent_to}</div>}
                                    </Col>

                                    <Col md={6}>
                                        <Form.Label htmlFor="event_email_template_id" className="form-label">{t("Template")}</Form.Label>
                                        <Form.Select
                                            id="event_email_template_id"
                                            value={data.event_email_template_id}
                                            onChange={(e) => setData('event_email_template_id', e.target.value)}
                                        >
                                            <option value="">{t("Select Template")}</option>
                                            {baseTemplate.map((template: any) => (
                                                <option key={template.id} value={template.id}>
                                                    {template.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errors.event_email_template_id && <div className="text-danger mt-1">{errors.event_email_template_id}</div>}
                                    </Col>
                                </Row>

                                <div className="mt-4 text-center">
                                    <Button type="submit" variant="success" disabled={processing}>
                                        {processing ? t('Sending...') : t('Send Message')}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

Create.layout = (page: any) => <Layout children={page} />;

export default Create;
