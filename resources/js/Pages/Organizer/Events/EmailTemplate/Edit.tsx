import React, { useEffect, useRef, useState } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';
import { router, usePage } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

const Edit = ({ EmailTemplate }: any) => {
    const emailEditorRef = useRef<EditorRef>(null);

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
            console.log('hasdasd');
            const formData = new FormData();
            formData.append('name', name);
            formData.append('editor_content', JSON.stringify(design));
            formData.append('mail_content', html);
            formData.append('role', 'user');
            formData.append('_method', 'PUT'); // For Laravel's update route

            if (thumbnail) formData.append('thumbnail', thumbnail);

            router.post(route('organizer.events.email-template.update', EmailTemplate.id), formData, {
                forceFormData: true,
                onSuccess: () => {
                    router.visit(route('template.index'));
                },
                onError: (errors: any) => {
                    setErrorMessage(errors.name || errors.message || 'Something went wrong');
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } catch (error) {
            setErrorMessage('Failed to submit form.');
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
