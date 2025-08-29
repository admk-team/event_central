import React, { useRef, useState, useEffect } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';
import { Head, router, useForm } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { useLaravelReactI18n } from "laravel-react-i18n";
const Create = () => {
    const emailEditorRef = useRef<EditorRef>(null);
    const { t } = useLaravelReactI18n();
    const { data, setData, errors, processing, setError, reset } = useForm({
        name: '',
        role: 'user',
        thumbnail: null as File | null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Shortcodes (matched to Edit page) ---
    const [selectedShortcodes, setSelectedShortcodes] = useState<string[]>([]);
    const shortcodes = [
        { name: 'Attendee Name', code: "{{ $attendeename }}" },
        { name: 'Ticket Name', code: "{{ $ticketname }}" },
        { name: 'Ticket Type', code: "{{ $tickettype }}" },
        { name: 'Attendee Position', code: "{{ $attendeeposition }}" },
        { name: 'Event Location', code: "{{ $eventlocation }}" },
        { name: 'Event Logo', code: "{{ $eventlogo }}" },
        { name: 'Ticket QR Code', code: "{{ $ticketqrcode }}" },
    ];

    const toggleShortcode = async (code: string) => {
        setSelectedShortcodes((prev) =>
            prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
        );
        try {
            await navigator.clipboard.writeText(code);
        } catch {
            // no-op if clipboard unavailable
        }
    };
    // --- /Shortcodes ---

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('thumbnail', file);
    };

    const handleSubmit = async () => {
        if (!data.name) {
            setError('name', 'Template name is required');
            return;
        }

        try {
            setIsSubmitting(true);

            const design: any = await new Promise((resolve) => {
                emailEditorRef.current?.editor?.saveDesign((d: any) => resolve(d));
            });

            const html: string = await new Promise((resolve) => {
                emailEditorRef.current?.editor?.exportHtml((res: { html: string }) => resolve(res.html));
            });

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('role', data.role);
            formData.append('editor_content', JSON.stringify(design));
            formData.append('mail_content', html);

            // include selected shortcodes (same as Edit page behavior)
            formData.append('selected_shortcodes', JSON.stringify(selectedShortcodes));

            if (data.thumbnail) {
                formData.append('thumbnail', data.thumbnail);
            }

            router.post(route('organizer.events.badge-template.store'), formData, {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    router.visit(route('organizer.events.badge-template.index'));
                },
                onError: () => {
                    setIsSubmitting(false);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } catch (error) {
            setIsSubmitting(false);
            setError('name', 'Something went wrong during submission.');
        }
    };

    return (
        <>
            <Head title="Create Email Template" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t('Create Email Template')} pageTitle={t('Dashboard')}/>
                    <Row>
                        <Card className="mt-4">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <div className="card-title">{t('Create Badge Template')}</div>
                                <Button
                                    type="button"
                                    className="btn btn-success px-3"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || processing}
                                >
                                    {isSubmitting ? t('Saving...') : t('Create')}
                                </Button>
                            </Card.Header>

                            <Card.Body>
                                <Row className="mb-4">
                                    <Col xxl={6} md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="name">{t('Template Name')}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                isInvalid={!!errors.name}
                                            />
                                            {errors.name && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.name}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xxl={6} md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="image">{t('Preview Image')}</Form.Label>
                                            <Form.Control
                                                type="file"
                                                id="image"
                                                onChange={handleImageChange}
                                                isInvalid={!!errors.thumbnail}
                                            />
                                            {errors.thumbnail && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.thumbnail}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Shortcode Selector (same UX as Edit) */}
                                <Row className="mb-4 text-center">
                                    <h4>{t('Use below short codes to insert dynamic data in template')}</h4>
                                    <Row className="mt-3 w-100 m-0">
                                        {shortcodes.map((item, idx) => (
                                            <Col
                                                key={idx}
                                                md={2}
                                                sm={4}
                                                xs={6}
                                                className="mb-3 d-flex flex-column align-items-center"
                                            >
                                                <div
                                                    className={`border rounded p-2 shadow-sm w-100 ${selectedShortcodes.includes(item.code)
                                                        ? 'bg-success text-white'
                                                        : 'bg-light'
                                                        }`}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => toggleShortcode(item.code)}
                                                >
                                                    <span className="fw-bold d-block mb-2">{item.name}</span>
                                                    <Button
                                                        variant={
                                                            selectedShortcodes.includes(item.code)
                                                                ? 'light'
                                                                : 'outline-primary'
                                                        }
                                                        size="sm"
                                                        className="w-100"
                                                    >
                                                        {selectedShortcodes.includes(item.code)
                                                            ? 'Selected'
                                                            : 'Copy'}
                                                    </Button>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Row>

                                <Col xxl={12}>
                                    <EmailEditor ref={emailEditorRef} minHeight="800px" />
                                </Col>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        </>
    );
};

Create.layout = (page: any) => <Layout children={page} />;

export default Create;
