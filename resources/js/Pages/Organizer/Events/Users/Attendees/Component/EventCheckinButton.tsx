import React from 'react'
import { Button } from 'react-bootstrap'

export default function EventCheckinButton({ attendee }: { attendee: any }) {
    return (
        <Button size="sm" variant="secondary" disabled={attendee.event_checkin}>Event Checkin</Button>
    )
}
