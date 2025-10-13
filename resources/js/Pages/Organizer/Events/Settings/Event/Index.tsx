import React from 'react';
import Layout from '../../../../../Layouts/Event';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';
import Information from './Components/Information';
import Contact from './Components/Contact';
import Other from './Components/Other';
import HasPermission from '../../../../../Components/HasPermission';
import Features from './Components/Features';
import Images from './Components/Images';
import AddtoGoogleCalendar from './Components/AddtoGoogleCalendar';
import RegisterFeatures from './Components/RegisterFeatures';
import ReminderDays from './Components/ReminderDays';
import AfterEvent from './Components/AfterEvent';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Event() {
    const { t } = useLaravelReactI18n();

    return (
        <React.Fragment>
            <Head title={t('Event Settings')} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Event")}
                        items={[
                            { title: t("Settings"), link: route('organizer.events.settings.event.index') }
                        ]}
                    />
                    <Row>
                        <Col md={8}>
                            <HasPermission permission="edit_events">
                                <Information />
                            </HasPermission>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col xs={12}>
                                    {/* <Contact /> */}
                                </Col>
                                <Col xs={12}>
                                    <HasPermission permission="delete_events">
                                        <Other />
                                    </HasPermission>
                                </Col>
                                <Col xs={12}>
                                    <AddtoGoogleCalendar />
                                </Col>
                                <Col xs={12}>
                                    <HasPermission permission="edit_events">
                                        <Features />
                                    </HasPermission>
                                </Col>
                                <Col xs={12}>
                                    <HasPermission permission="edit_events">
                                        <RegisterFeatures />
                                    </HasPermission>
                                </Col>
                                <Col xs={12}>
                                    <HasPermission permission="edit_events">
                                        <ReminderDays />
                                    </HasPermission>
                                </Col>
                                <Col xs={12}>
                                    <HasPermission permission="edit_events">
                                        <AfterEvent />
                                    </HasPermission>
                                </Col>
                                <Col xs={12}>
                                    <HasPermission permission="edit_events">
                                        <Images />
                                    </HasPermission>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

Event.layout = (page: any) => <Layout children={page} />;

export default Event;
