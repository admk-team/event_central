import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '../../../Layouts/Organizer';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

type Props = {
    events: { id: number; name: string }[];
};

const SyncForm = ({ events }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        event_id: '',
        module: 'Leads',
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('zoho.sync.attendees'), {
            onSuccess: () => {
                setSuccessMessage('Attendees synced successfully!');
            },
        });
    };

    return (
        <>
            <Head title="Sync Attendees to Zoho CRM" />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2>Sync Attendees to Zoho CRM</h2>

                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {errors.event_id && <Alert variant="danger">{errors.event_id}</Alert>}
                        {errors.module && <Alert variant="danger">{errors.module}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Event</Form.Label>
                                <Form.Select
                                    value={data.event_id}
                                    onChange={(e) => setData('event_id', e.target.value)}
                                    required
                                >
                                    <option value="">-- Select Event --</option>
                                    {events.map((event) => (
                                        <option key={event.id} value={event.id}>
                                            {event.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Sync To Module</Form.Label>
                                <Form.Select
                                    value={data.module}
                                    onChange={(e) => setData('module', e.target.value)}
                                    required
                                >
                                    <option value="Leads">Leads</option>
                                    <option value="Contacts">Contacts</option>
                                </Form.Select>
                            </Form.Group>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Syncing...' : 'Sync to Zoho CRM'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

SyncForm.layout = (page: any) => <Layout children={page} />;
export default SyncForm;
