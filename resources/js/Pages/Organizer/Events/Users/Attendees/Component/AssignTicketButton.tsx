import { useForm } from '@inertiajs/react'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function AssignTicketButton({ attendee }: { attendee: any }) {
    const { post, processing } = useForm();
    const { t } = useLaravelReactI18n();

    const submit = () => {
        post(route('organizer.events.attendee.return.ticket', attendee.id), {
            preserveScroll: true,
        });
    }

    return (
        <Button size="sm" variant="secondary" onClick={submit} disabled={attendee.event_checkin || processing}>{t("Return Ticket")} </Button>
    )
}
