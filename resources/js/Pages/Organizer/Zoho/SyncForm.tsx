import React, { useState } from 'react';
import Layout from '../../../Layouts/Organizer';
import { Head, router } from '@inertiajs/react';
import { Col, Container, Row, Form, Button, Alert, Spinner } from 'react-bootstrap';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import { useLaravelReactI18n } from "laravel-react-i18n";

const ZohoSyncPage = ({ events }: any) => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [module, setModule] = useState('Leads');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const { t } = useLaravelReactI18n();

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
            <Head title={t("Zoho CRM Sync")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Zoho CRM Sync")}
                        items={[
                            { title: t("Settings"), link: route('organizer.zoho.index') },

                        ]}
                    />
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div className="bg-white p-4 rounded shadow-sm">
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("Select Event")}</Form.Label>
                                    <Form.Select
                                        value={selectedEvent}
                                        onChange={(e) => setSelectedEvent(e.target.value)}
                                    >
                                        <option value="">-- {t("Select Event")} --</option>
                                        {events.map((event: any) => (
                                            <option key={event.id} value={event.id}>
                                                {event.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>{t("Sync as")}</Form.Label>
                                    <Form.Select
                                        value={module}
                                        onChange={(e) => setModule(e.target.value)}
                                    >
                                        <option value="Leads">{t('Leads')}</option>
                                        <option value="Contacts">{t('Contacts')}</option>
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
                                        t('Sync Now')
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
