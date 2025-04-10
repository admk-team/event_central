import { useForm, usePage } from '@inertiajs/react';
import { Eye, EyeClosed, EyeOff } from 'lucide-react';
import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'

export default function FormStatus() {
    const form = usePage().props.form as any;

    const { post, processing } = useForm();

    const toggleStatus = () => {
        post(route('organizer.events.settings.questionnaire-form.toggle-status'), {
            preserveScroll: true,
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-0">Status</CardTitle>
            </CardHeader>
            <CardBody>
                {form?.status ? (
                    <Button variant="danger" onClick={toggleStatus} disabled={processing}><EyeOff size={18} /> Deactivate Form</Button>
                ) : (
                    <Button onClick={toggleStatus} disabled={processing}><Eye size={18} /> Activate Form</Button>
                )}
            </CardBody>
        </Card>
    )
}
