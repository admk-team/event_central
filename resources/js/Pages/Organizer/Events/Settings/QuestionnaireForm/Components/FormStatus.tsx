import { useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { useLaravelReactI18n } from 'laravel-react-i18n';
export default function FormStatus() {
    const form = usePage().props.form as any;
    const { t } = useLaravelReactI18n();
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
