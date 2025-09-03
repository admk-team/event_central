import { useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function FormStatus() {
    const form = usePage().props.form as any;
    const { t } = useTranslation();
    const { post, processing } = useForm();

    const toggleStatus = () => {
        post(route('organizer.events.settings.questionnaire-form.toggle-status'), {
            preserveScroll: true,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-0">{t("Status")}</CardTitle>
            </CardHeader>
            <CardBody>
                {form?.status ? (
                    <Button variant="danger" onClick={toggleStatus} disabled={processing}>
                        <EyeOff size={18} /> {t("Deactivate Form")}
                    </Button>
                ) : (
                    <Button onClick={toggleStatus} disabled={processing}>
                        <Eye size={18} /> {t("Activate Form")}
                    </Button>
                )}
            </CardBody>
        </Card>
    );
}
