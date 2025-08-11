import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import PrivateToggleRegister from './Features/PrivateToggleRegister'

export default function RegisterFeatures() {
    return (
        <Card>
            <Card.Header>
                <Card.Title className="mb-0">Private Registration</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup className="mb-1">
                    <PrivateToggleRegister />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
