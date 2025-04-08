import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Tracks from './Features/Tracks'

export default function Features() {
    return (
        <Card>
            <Card.Header>
                <Card.Title className="mb-0">Features</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup className="mb-1">
                    <Tracks />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
