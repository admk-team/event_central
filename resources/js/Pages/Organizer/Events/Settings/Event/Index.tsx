import React from 'react';
import Layout from '../../../../../Layouts/Organizer/Event';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';
import Information from './Components/Information';
import Contact from './Components/Contact';
import Other from './Components/Other';

function Event() {
    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2 
                        title="Event" 
                        items={[
                            { title: "Settings", link: route('organizer.events.settings.event.index') }
                        ]}
                    />
                    <Row>
                        <Col md={8}>
                            <Information />
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col xs={12}>
                                    {/* <Contact /> */}
                                </Col>
                                <Col xs={12}>
                                    <Other />
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