import { useForm } from '@inertiajs/react'
import React from 'react'
import { Button } from 'react-bootstrap'

export default function EventCheckinButton({ attendee }: { attendee: any }) {
    const { post, processing } = useForm();

    const submit = () => {
        post(route('organizer.events.attendee.event-checkin', attendee.id), {
            preserveScroll: true,
        });
    }

    return (
        <Button size="sm" variant="secondary" onClick={submit} disabled={attendee.event_checkin || processing}>Event Checkin</Button>
    )
}
