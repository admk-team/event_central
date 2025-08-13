import { useForm } from '@inertiajs/react'
import React from 'react'
import { Button } from 'react-bootstrap'

export default function AssignTicketButton({ attendee }: { attendee: any }) {
    const { post, processing } = useForm();

    const submit = () => {
        post(route('organizer.events.attendee.return.ticket', attendee.id), {
            preserveScroll: true,
        });
    }

    return (
        <Button size="sm" variant="secondary" onClick={submit} disabled={attendee.event_checkin || processing}>Return Ticket </Button>
    )
}
