import React, { useState } from 'react';
import { Col, Container, Row, Dropdown, DropdownButton, ButtonGroup, Card, CardBody } from 'react-bootstrap';


import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';
import moment from 'moment';
import EventSessionsTimeLine from './common/EventSessionsTimeLine';
import { useLaravelReactI18n } from "laravel-react-i18n";

const AttendeeAgenda = ({ eventApp, enableTracks, tracks, eventPlatforms }: any) => {
  const { t } = useLaravelReactI18n();
    return (
        <React.Fragment>
            <Head title="Event Program" />
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{t("Event Agenda")}</h5>
                        </div>
                    </div>


                    <section>
                        <Row className='d-flex justify-content-center'>
                            <Col sm={12} md={6} lg={6}>
                                <EventSessionsTimeLine eventApp={eventApp} sessions={eventApp.event_sessions}></EventSessionsTimeLine>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </div >
        </React.Fragment >
    );
};
AttendeeAgenda.layout = (page: any) => <Layout children={page} />
export default AttendeeAgenda;
