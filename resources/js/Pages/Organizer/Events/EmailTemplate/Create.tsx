import React, { useRef, useState } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';
import { Head, router, useForm } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { useLaravelReactI18n } from "laravel-react-i18n";

const Create = () => {
    const { t } = useLaravelReactI18n();

    const emailEditorRef = useRef<EditorRef>(null);

    const { data, setData, errors, processing, setError, reset } = useForm({
        name: '',
        role: 'user',
        thumbnail: null as File | null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

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
                emailEditorRef.current?.editor?.exportHtml((data: { html: string }) => resolve(data.html));
            });

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('role', data.role);
            formData.append('editor_content', JSON.stringify(design));
            formData.append('mail_content', html);
            if (data.thumbnail) {
                formData.append('thumbnail', data.thumbnail);
            }

            router.post(route('organizer.events.email-template.store'), formData, {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    router.visit(route('organizer.events.email-template.index'));
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
                    <BreadCrumb title="Create Email Template" pageTitle="Dashboard" />
                    <Row>
                        <Card className="mt-4">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <div className="card-title">{t("Create Email Template")}</div>
                                <Button
                                    type="button"
                                    className="btn btn-success px-3"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || processing}
                                >
                                    {isSubmitting ? 'Saving...' : 'Create'}
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <Row className="mb-4">
                                    <Col xxl={6} md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="name">{t("Template Name")}</Form.Label>
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
                                            <Form.Label htmlFor="image">{t("Preview Image")}</Form.Label>
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
