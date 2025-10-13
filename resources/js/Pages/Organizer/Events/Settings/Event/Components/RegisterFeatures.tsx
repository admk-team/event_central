import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PrivateToggleRegister from './Features/PrivateToggleRegister';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function RegisterFeatures() {
    const { t } = useLaravelReactI18n();

    return (
        <Card>
            <Card.Header>
                <Card.Title className="mb-0">{t("Private Registration")}</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup className="mb-1">
                    <PrivateToggleRegister />
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
