import { usePage } from '@inertiajs/react';
import React from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function AddtoGoogleCalendar() {
    const { t } = useLaravelReactI18n();
    const events = usePage().props.event as Record<string, string>;
    const isEventAvailable = events && Object.keys(events).length > 0;

    const formatToUTC = (dateString: any) => {
        const date = new Date(dateString);
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const end_date = usePage().props.lasteventDate as any;

    const event = {
        title: events.name,
        start: formatToUTC(events.start_date),
        end: formatToUTC(end_date[0].date),
        details: events.description,
        location: events.location_base
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{t("Add to Google Calendar")}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="d-grid grid">
                        <Form.Label>{t("Add this event to your Google Calendar.")}</Form.Label>
                        <Button
                            disabled={!isEventAvailable}
                            variant="primary"
                            href={googleCalendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bx bxs-calendar-plus"></i> {t("Click to Add")}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
