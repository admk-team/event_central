import Layout from "../../../Layouts/Admin";
import { Head, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';
import { useLaravelReactI18n } from 'laravel-react-i18n';

function CreateOrEdit({ colorTheme }: any) {
    const { t } = useLaravelReactI18n();

    // Determine if the form is in edit mode
    const isEdit = !!colorTheme;
    const { data, put, setData, post, processing, errors, reset } = useForm({
        event_id: colorTheme?.event_id || 1,
        title: colorTheme?.title || "",
        bg_color: colorTheme?.bg_color || "#364574",
        header_bg_color: colorTheme?.header_bg_color || "#364574",
        nav_bg_color: colorTheme?.nav_bg_color || "#364574",
        card_bg_color: colorTheme?.card_bg_color || "#364574",
        primary_color: colorTheme?.primary_color || "#364574",
        secondary_color: colorTheme?.secondary_color || "#364574",
        footer_color: colorTheme?.footer_color || "#364574",
        _method: colorTheme?.id ? "PUT" : "POST", // Spoof method
    });

    const submit = (e: any) => {
        e.preventDefault();
        console.log(data);
        if (isEdit) {
            post(route('admin.color-themes.update', colorTheme.id))
        } else {
            post(route('admin.color-themes.store'));
        }
    };

    return (
        <React.Fragment>
            <Head title={isEdit ? t('Edit Color Theme') : t('Create Color Theme')} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title={isEdit ? t('Edit Color Theme') : t('Create Color Theme')}
                        pageTitle={t("Dashboard")}
                    />
                    <Row>
                        <Card className="mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-title">{isEdit ? t('Edit Theme') : t('Create Theme')}</div>
                            </div>
                            <Card.Body>
                                <form onSubmit={submit}>
                                    <Row className="gy-4">
                                        <Col xxl={3} md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="title">{t("Title")}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="title"
                                                    placeholder={t("Enter title")}
                                                    value={data.title}
                                                    onChange={(e) => setData('title', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Form.Group>
                                                <Form.Label htmlFor="bg_color">{t("Background Color")}</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id="bg_color"
                                                    value={data.bg_color}
                                                    onChange={(e) => setData('bg_color', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Form.Group>
                                                <Form.Label htmlFor="header_bg_color">{t("Header Background Color")}</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id="header_bg_color"
                                                    value={data.header_bg_color}
                                                    onChange={(e) => setData('header_bg_color', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Form.Group>
                                                <Form.Label htmlFor="nav_bg_color">{t("Navigation Background Color")}</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id="nav_bg_color"
                                                    value={data.nav_bg_color}
                                                    onChange={(e) => setData('nav_bg_color', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Form.Group>
                                                <Form.Label htmlFor="card_bg_color">{t("Card Background Color")}</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id="card_bg_color"
                                                    value={data.card_bg_color}
                                                    onChange={(e) => setData('card_bg_color', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Form.Group>
                                                <Form.Label htmlFor="primary_color">{t("Primary Color")}</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id="primary_color"
                                                    value={data.primary_color}
                                                    onChange={(e) => setData('primary_color', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Form.Group>
                                                <Form.Label htmlFor="secondary_color">{t("Secondary Color")}</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id="secondary_color"
                                                    value={data.secondary_color}
                                                    onChange={(e) => setData('secondary_color', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Form.Group>
                                                <Form.Label htmlFor="footer_color">{t("Footer Color")}</Form.Label>
                                                <Form.Control
                                                    type="color"
                                                    id="footer_color"
                                                    value={data.footer_color}
                                                    onChange={(e) => setData('footer_color', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Form.Label htmlFor="event_select">{t("Select Event")}</Form.Label>
                                            <select
                                                className="form-select mb-3"
                                                id="event_select"
                                                value={data.event_id}
                                                onChange={(e) => setData('event_id', e.target.value)}
                                            >
                                                <option>{t("Select your Event")}</option>
                                                <option value="1">{t("Declined Payment")}</option>
                                                <option value="2">{t("Delivery Error")}</option>
                                                <option value="3">{t("Wrong Amount")}</option>
                                            </select>
                                        </Col>
                                    </Row>

                                    <div className="mt-4 text-center">
                                        <Button type="submit" className="btn btn-success px-3" disabled={processing}>
                                            {isEdit ? t("Update") : t("Create")}
                                        </Button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

CreateOrEdit.layout = (page: any) => <Layout children={page} />;

export default CreateOrEdit;
