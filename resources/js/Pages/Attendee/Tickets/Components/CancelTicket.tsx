import { useForm } from '@inertiajs/react'
import React from 'react'
import { Button } from 'react-bootstrap'

export default function CancelTicketButton({ purchased_id }: { purchased_id: any }) {
    const { post, processing } = useForm();
    console.log('tsting attend data', purchased_id);

    const submit = () => {
        post(route('attendee.tickets.cancel', purchased_id), {
            preserveScroll: true,
            preserveState: true
        });
    }

    return (
        <Button size="sm" variant="secondary" onClick={submit} disabled={processing}>Cancel Ticket </Button>
    )
}
