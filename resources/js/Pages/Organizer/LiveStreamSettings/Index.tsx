import React from 'react';
import Layout from '../../../Layouts/Organizer';
import { Head, useForm } from '@inertiajs/react';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Form,
    Row,
    Col,
    InputGroup,
    Container,
    Spinner,
} from "react-bootstrap";
import toast from "react-hot-toast";
import gumletLogo from "../../../../images/gumlet-logo.svg";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Index = ({ settings }: any) => {
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        gumlet_api_key: settings?.gumlet_api_key ?? "",
        gumlet_live_source_id: settings?.gumlet_live_source_id ?? "",
    });
    const { t } = useLaravelReactI18n();

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route("organizer.settings.live-stream.update"));
    };

    const CopyLink = (link: string) => {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                toast.success(t("Key Copied!"));
            })
            .catch(() => {
                toast.error(t("Failed to copy key"));
            });
    };

    return (
        <React.Fragment>
            <Head title={t('Payment Settings')} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Payment Settings")}
                        items={[
                            { title: t("Settings"), link: route('organizer.events.settings.payment.index') }
                        ]}
                    />
                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <Form onSubmit={submit} className="tablelist-form">
                                <Card>
                                    <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                                        <div>
                                            <CardTitle>
                                                {gumletLogo && (
                                                    <img
                                                        height={35}
                                                        src={gumletLogo}
                                                        alt="gumlet-logo"
                                                    />
                                                )}
                                            </CardTitle>
                                            <CardText>
                                                {t("Live Stream Info")}
                                            </CardText>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder={t("Enter Gumlet API Key")}
                                                className="form-control"
                                                value={data.gumlet_api_key}
                                                onChange={(e) =>
                                                    setData({
                                                        ...data,
                                                        gumlet_api_key: e.target.value,
                                                    })
                                                }
                                                isInvalid={!!errors.gumlet_api_key}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                id="button-copyLink"
                                                disabled={data.gumlet_api_key.length === 0}
                                                onClick={() =>
                                                    CopyLink(data.gumlet_api_key)
                                                }
                                            >
                                                <i className="bx bx-copy"></i>
                                            </Button>
                                            {errors.gumlet_api_key && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.gumlet_api_key}
                                                </Form.Control.Feedback>
                                            )}
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder={t("Enter Gumlet live video source/collection id")}
                                                className="form-control"
                                                value={data.gumlet_live_source_id}
                                                onChange={(e) =>
                                                    setData({
                                                        ...data,
                                                        gumlet_live_source_id: e.target.value,
                                                    })
                                                }
                                                isInvalid={!!errors.gumlet_live_source_id}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                id="button-copyLink"
                                                disabled={data.gumlet_live_source_id.length === 0}
                                                onClick={() =>
                                                    CopyLink(data.gumlet_live_source_id)
                                                }
                                            >
                                                <i className="bx bx-copy"></i>
                                            </Button>
                                            {errors.gumlet_live_source_id && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.gumlet_live_source_id}
                                                </Form.Control.Feedback>
                                            )}
                                        </InputGroup>
                                    </CardBody>
                                </Card>
                                <Row className="justify-content-center">
                                    <Col md={6} lg={6}>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-100"
                                        >
                                            {processing ? (
                                                <span className="d-flex gap-1 align-items-center">
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    {t("Saving")}
                                                </span>
                                            ) : (
                                                <span>{t("Save")}</span>
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
