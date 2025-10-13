import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import ChangeReminderDays from './Features/ChangeReminderDays';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function ReminderDays() {
    const { t } = useLaravelReactI18n();

    return (
        <Card>
            <Card.Header>
                <Card.Title className="mb-0">{t("Reminders")}</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup className="mb-1">
                    <ChangeReminderDays />
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
