import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import ChangeReminderDays from './Features/ChangeReminderDays'

export default function ReminderDays() {
    return (
        <Card>
            <Card.Header>
                <Card.Title className="mb-0">Reminders</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup className="mb-1">
                    <ChangeReminderDays />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
