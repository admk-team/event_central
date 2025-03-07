import React from 'react';
import Layout from '../../../../../Layouts/Event';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';
import "@measured/puck/puck.css";
import WebsiteUrl from './Components/WebsiteUrl';
import WebsiteStatus from './Components/WebsiteStatus';
import WebsitePages from './Components/WebsitePages';
import WebsiteHeaders from './Components/WebsiteHeaders';
import WebsiteFooters from './Components/WebsiteFooters';

function Website() {

    return (
        <React.Fragment>
            <Head title='Website Settings' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Website"
                        items={[
                            { title: "Settings", link: route('organizer.events.settings.event.index') }
                        ]}
                    />
                    <Row>
                        <Col md={8}>
                            <Row>
                                <Col xs={12}>
                                    <WebsiteUrl />
                                </Col>
                                <Col xs={12}>
                                    <WebsitePages />
                                </Col>
                                <Col xs={12}>
                                    <WebsiteHeaders />
                                </Col>
                                <Col xs={12}>
                                    <WebsiteFooters />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col xs={12}>
                                    <WebsiteStatus />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        </React.Fragment>
    )
}

Website.layout = (page: any) => <Layout children={page} />;

export default Website;