import React, { useEffect, useRef, useState } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';
import { router, usePage } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useLaravelReactI18n } from "laravel-react-i18n";
const Edit = ({ EmailTemplate, eventId }: any) => {
    const emailEditorRef = useRef<EditorRef>(null);
    const page = usePage();
    const [name, setName] = useState(EmailTemplate?.name || '');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(EmailTemplate?.thumbnail || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useLaravelReactI18n();
    const [selectedShortcodes, setSelectedShortcodes] = useState<string[]>([]);

    const shortcodes = [
        { name: "Attendee Name", code: "{{ $attendeename }}" },
        { name: "Ticket Name", code: "{{ $ticketname }}" },
        { name: "Ticket Type", code: "{{ $tickettype }}" },
        { name: "Attendee Position", code: "{{ $attendeeposition }}" },
        { name: "Event Location", code: "{{ $eventlocation }}" },
        { name: "Event Logo", code: "{{ $eventlogo }}" },
        { name: "Ticket QR Code", code: "{{ $ticketqrcode }}" }
    ];

    const toggleShortcode = (code: string) => {
        setSelectedShortcodes((prev) =>
            prev.includes(code)
                ? prev.filter((c) => c !== code)
                : [...prev, code]
        );
        navigator.clipboard.writeText(code);
    };

    useEffect(() => {
        const editorLoad = () => {
            if (EmailTemplate?.editor_content && emailEditorRef.current?.editor) {
                const design = JSON.parse(EmailTemplate.editor_content);
                emailEditorRef.current.editor.loadDesign(design);
                clearTimeout(i);
            }
        }
        const i = setTimeout(editorLoad, 1000);
    }, [EmailTemplate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setThumbnail(file);
            setThumbnailUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!name) {
            setErrorMessage(t('Name is required'));
            return;
        }

        setErrorMessage('');
        setIsSubmitting(true);

        try {
            const design = await new Promise((resolve) =>
                emailEditorRef.current?.editor?.saveDesign((d: any) => resolve(d))
            );

            const html = await new Promise<string>((resolve) =>
                emailEditorRef.current?.editor?.exportHtml((data: { html: string }) => resolve(data.html))
            );

            const encodedHtml = btoa(unescape(encodeURIComponent(html)));
            const encodedMailContent = btoa(unescape(encodeURIComponent(JSON.stringify(design))));
            const formData = new FormData();
            formData.append('id', EmailTemplate.id);
            formData.append('name', name);
            formData.append('editor_content', encodedMailContent);
            formData.append('mail_content', encodedHtml);
            formData.append('event_id', eventId);
            formData.append('user_id', page.props.auth.user.id);
            formData.append('role', 'user');

            // Add selected shortcodes array as JSON
            formData.append('selected_shortcodes', JSON.stringify(selectedShortcodes));

            if (thumbnail) formData.append('thumbnail', thumbnail);

            await axios.post(route('badge.template.update', EmailTemplate.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });

            router.visit(route('organizer.events.badge-template.index'));
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrorMessage(error.response.data.errors.name || t('Something went wrong'));
            } else {
                setErrorMessage(t('Failed to submit form.'));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container fluid style={{ marginTop: '100px' }}>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5>{t('Update Email Template')}</h5>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? <Spinner size="sm" animation="border" /> : t('Update')}
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Row className="mb-4">
                        <Form.Group as={Col} md={6} className="mb-3">
                            <Form.Label>{t('Template Name')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                isInvalid={!!errorMessage}
                            />
                            <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} className="mb-3">
                            <Form.Label>{t('Change Image')}</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>
                    </Row>

                    {/* Shortcode Selector */}
                    <Row className='mb-4 text-center'>
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
                                        className={`border rounded p-2 shadow-sm w-100 ${selectedShortcodes.includes(item.code) ? "bg-success text-white" : "bg-light"
                                            }`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => toggleShortcode(item.code)}
                                    >
                                        <span className="fw-bold d-block mb-2">{item.name}</span>
                                        <Button
                                            variant={selectedShortcodes.includes(item.code) ? "light" : "outline-primary"}
                                            size="sm"
                                            className="w-100"
                                        >
                                            {selectedShortcodes.includes(item.code) ? "Selected" : "Copy"}
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Row>

                    <EmailEditor ref={emailEditorRef} minHeight="800px" />
                </Card.Body>
            </Card>
        </Container>
    );
};

Edit.layout = (page: any) => <Layout children={page} />;

export default Edit;
