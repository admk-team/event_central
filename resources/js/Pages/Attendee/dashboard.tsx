import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Head } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';

const AttendeeDashboard = () => {
    return (
        <React.Fragment>
            <Head title="Attendee Dashboard" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Attendee Dashboard" pageTitle="Dashboards" />
                    <Row>
                        <Col xxl={5}>
                            {/* <UpgradeAccountNotise />
                            <Widget /> */}
                        </Col>
                        {/* <LiveUsers /> */}
                    </Row>
                    <Row>
                        {/* <AudiencesMetrics />
                        <AudiencesSessions /> */}
                    </Row>
                    <Row>
                        {/* <UsersByDevice />
                        <TopReferrals />
                        <TopPages /> */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
AttendeeDashboard.layout = (page: any) => <Layout children={page} />
export default AttendeeDashboard;
