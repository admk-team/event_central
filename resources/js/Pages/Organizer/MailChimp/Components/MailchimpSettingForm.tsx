import React from "react";
import { useForm } from "@inertiajs/react";
import { Button, Card, Form} from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { Link } from "@inertiajs/react";

const MailchimpSettingForm = ({ keys }: any) => {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors } = useForm({
        api_key: keys?.api_key || "",
        server_prefix: keys?.server_prefix || "",
        audience_id: keys?.audience_id || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("organizer.mailchimp.store"));
    };

    return (
        <Card>
            <Card.Body>
                <h5 className="mb-4">{t("Mailchimp Credentials")}</h5>
                <Form onSubmit={handleSubmit}>
                    {/* API Key */}
                    <Form.Group className="mb-3" controlId="api_key">
                        <Form.Label>{t("API Key")}</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.api_key}
                            onChange={(e) => setData("api_key", e.target.value)}
                            isInvalid={!!errors.api_key}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.api_key}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Server Prefix */}
                    <Form.Group className="mb-3" controlId="server_prefix">
                        <Form.Label>{t("Server Prefix")}</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.server_prefix}
                            onChange={(e) =>
                                setData("server_prefix", e.target.value)
                            }
                            placeholder={t("Example: us21")}
                            isInvalid={!!errors.server_prefix}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.server_prefix}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Audience ID */}
                    <Form.Group className="mb-3" controlId="audience_id">
                        <Form.Label>{t("Audience ID")}</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.audience_id}
                            onChange={(e) =>
                                setData("audience_id", e.target.value)
                            }
                            isInvalid={!!errors.audience_id}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.audience_id}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={processing}
                        >
                            {t("Save Keys")}
                        </Button>
                        <Link
                            href={route("organizer.mailchimp.sync.page")}
                            className="btn btn-primary ms-4"
                        >
                            {t("Sync Data")}
                        </Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default MailchimpSettingForm;
