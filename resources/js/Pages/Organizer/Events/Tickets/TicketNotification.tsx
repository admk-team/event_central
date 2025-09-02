import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';
import Layout from '../../../../Layouts/Event';
import { useLaravelReactI18n } from "laravel-react-i18n";

const TicketNotification = ({ emailList }: any) => {
    const { data, setData, post, processing, errors } = useForm({
        notificationlist: emailList || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('organizer.events.ticket.notification.list')); // Replace with your actual route
    };
      const { t } = useLaravelReactI18n();

    return (
        <Container fluid style={{ marginTop: '80px' }} >
            <Row>
                <Col lg={12}>
                    <Card className="mt-4">
                        <Card.Header>
                            <h5 className="card-title mb-0">{t("Ticket Purchase Notification List")}</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="gy-3">
                                    <Col md={6}>
                                        <Form.Label htmlFor="notificationlist" className="form-label">{t("Name")}</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            id="notificationlist"
                                            placeholder="Enter name"
                                            value={data.notificationlist}
                                            onChange={(e) => setData('notificationlist', e.target.value)}
                                        />

                                        {errors.notificationlist && <div className="text-danger mt-1">{errors.notificationlist}</div>}
                                    </Col>
                                </Row>

                                <div className="mt-4 text-center">
                                    <Button type="submit" variant="success" disabled={processing}>
                                        {processing ? t('Saving...') : t('Save List')}
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

TicketNotification.layout = (page: any) => <Layout children={page} />;

export default TicketNotification;
