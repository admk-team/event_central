import { useForm, usePage } from '@inertiajs/react';
import { Eye, EyeClosed, EyeOff } from 'lucide-react';
import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'

export default function WebsiteStatus() {
    const websiteStatus = usePage().props.websiteStatus as boolean;

    const { post, processing } = useForm();

    const toggleStatus = () => {
        post(route('organizer.events.settings.website.toggle-status'), {
            preserveScroll: true,
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-0">Status</CardTitle>
            </CardHeader>
            <CardBody>
                {websiteStatus ? (
                    <Button variant="danger" onClick={toggleStatus} disabled={processing}><EyeOff size={18} /> Deactivate Website</Button>
                ) : (
                    <Button onClick={toggleStatus} disabled={processing}><Eye size={18} /> Activate Website</Button>
                )}
            </CardBody>
        </Card>
    )
}
