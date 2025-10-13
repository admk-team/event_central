import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import ChangeAfterEvent from './Features/ChangeAfterEvent';
import FollowUpToggle from './Features/FollowUpToggle';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function AfterEvent() {
    const { t } = useLaravelReactI18n();

    return (
        <Card>
            <Card.Header>
                <Card.Title className="mb-0">{t("Follow Up")}</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup className="mb-1">
                    <FollowUpToggle />
                    <ChangeAfterEvent />
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
