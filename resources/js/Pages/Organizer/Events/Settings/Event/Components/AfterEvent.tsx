import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
// import ChangeReminderDays from './Features/ChangeReminderDays'
import ChangeAfterEvent from './Features/ChangeAfterEvent'
import FollowUpToggle from './Features/FollowUpToggle'

export default function AfterEvent() {
    return (
        <Card>
            <Card.Header>
                <Card.Title className="mb-0">Follow Up</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup className="mb-1">
                    <FollowUpToggle />
                    <ChangeAfterEvent />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
