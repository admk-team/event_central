import React, { useState } from 'react';
import Layout from '../../../Layouts/Organizer';
import { Head, router } from '@inertiajs/react';
import { Col, Container, Row, Form, Button, Alert, Spinner } from 'react-bootstrap';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';

const ZohoSyncPage = ({ events }: any) => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [module, setModule] = useState('Leads');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSync = () => {
        if (!selectedEvent) {
            alert('Please select an event first.');
            return;
        }

        setLoading(true);
        setResult(null);

        router.post(
            route('organizer.zoho.sync', selectedEvent),
            { module },
            {
                onSuccess: (page) => {
                    // setResult(page.props.flash?.success || 'Sync completed successfully!');
                },
                onError: (errors) => {
                    setResult(errors);
                },
                onFinish: () => setLoading(false),
                preserveScroll: true
            }
        );
    };

    return (
        <React.Fragment>
            <Head title="Zoho CRM Sync" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Zoho CRM Sync"
                        items={[
                            { title: 'Settings', link: route('organizer.zoho.index') },

                        ]}
                    />
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div className="bg-white p-4 rounded shadow-sm">
                                <Form.Group className="mb-3">
                                    <Form.Label>Select Event</Form.Label>
                                    <Form.Select
                                        value={selectedEvent}
                                        onChange={(e) => setSelectedEvent(e.target.value)}
                                    >
                                        <option value="">-- Select Event --</option>
                                        {events.map((event: any) => (
                                            <option key={event.id} value={event.id}>
                                                {event.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Sync as</Form.Label>
                                    <Form.Select
                                        value={module}
                                        onChange={(e) => setModule(e.target.value)}
                                    >
                                        <option value="Leads">Leads</option>
                                        <option value="Contacts">Contacts</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    onClick={handleSync}
                                    disabled={loading || !selectedEvent}
                                >
                                    {loading ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        'Sync Now'
                                    )}
                                </Button>

                                {result && (
                                    <Alert variant="info" className="mt-4">
                                        <pre className="mb-0">
                                            {typeof result === 'string'
                                                ? result
                                                : JSON.stringify(result, null, 2)}
                                        </pre>
                                    </Alert>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

ZohoSyncPage.layout = (page: any) => <Layout children={page} />;

export default ZohoSyncPage;
