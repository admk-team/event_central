import React, { useEffect, useRef, useState } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';
import { router, usePage } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Edit = ({ EmailTemplate, eventId }: any) => {
    const emailEditorRef = useRef<EditorRef>(null);
    const page = usePage();
    const [name, setName] = useState(EmailTemplate?.name || '');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(EmailTemplate?.thumbnail || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            setErrorMessage('Name is required');
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

            const formData = new FormData();
            formData.append('id', EmailTemplate.id); // <-- Send ID if needed to update
            formData.append('name', name);
            formData.append('editor_content', JSON.stringify(design));
            formData.append('mail_content', html);
            formData.append('event_id', eventId);
            formData.append('user_id', page.props.auth.user.id);
            formData.append('role', 'user');

            if (thumbnail) formData.append('thumbnail', thumbnail);

            await axios.post('http://localhost/api/user/email-template-update/' + EmailTemplate.id, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            router.visit(route('organizer.events.email-template.index')); // redirect after success
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrorMessage(error.response.data.errors.name || 'Something went wrong');
            } else {
                setErrorMessage('Failed to submit form.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container fluid style={{ marginTop: '100px' }}>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5>Update Email Template</h5>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? <Spinner size="sm" animation="border" /> : 'Update'}
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Form.Group as={Col} md={6} className="mb-3">
                        <Form.Label>Template Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isInvalid={!!errorMessage}
                        />
                        <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6} className="mb-3">
                        <Form.Label>Change Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                    <EmailEditor ref={emailEditorRef} minHeight="800px" />
                </Card.Body>
            </Card>
        </Container>
    );
};

Edit.layout = (page: any) => <Layout children={page} />;

export default Edit;
