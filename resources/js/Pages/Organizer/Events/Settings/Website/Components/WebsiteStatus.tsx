import { useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function WebsiteStatus() {
    const { t } = useLaravelReactI18n();
    const websiteStatus = usePage().props.websiteStatus as boolean;
    const { post, processing } = useForm();

    const toggleStatus = () => {
        post(route('organizer.events.settings.website.toggle-status'), { preserveScroll: true });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-0">{t('Status')}</CardTitle>
            </CardHeader>
            <CardBody>
                {websiteStatus ? (
                    <Button variant="danger" onClick={toggleStatus} disabled={processing}>
                        <EyeOff size={18} /> {t('Deactivate Website')}
                    </Button>
                ) : (
                    <Button onClick={toggleStatus} disabled={processing}>
                        <Eye size={18} /> {t('Activate Website')}
                    </Button>
                )}
            </CardBody>
        </Card>
    )
}
