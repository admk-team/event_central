import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

//import Components
import UpgradeAccountNotise from './UpgradeAccountNotise';
import UsersByDevice from './UsersByDevice';
import Widget from './Widget';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AudiencesMetrics from './AudiencesMetrics';
import AudiencesSessions from './AudiencesSessions';
import LiveUsers from './LiveUsers';
import TopReferrals from './TopReferrals';
import TopPages from './TopPages';
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts/Admin';
import { useLaravelReactI18n } from 'laravel-react-i18n';

const DashboardAnalytics = () => {
    const { t } = useLaravelReactI18n();

    return (
        <React.Fragment>
            <Head title={t("Dashboard - Admin")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t("Analytics")} pageTitle={t("Dashboards")} />
                    <Row>
                        <Col xxl={5}>
                            <UpgradeAccountNotise />
                            <Widget />
                        </Col>
                        <LiveUsers />
                    </Row>
                    <Row>
                        <AudiencesMetrics />
                        <AudiencesSessions />
                    </Row>
                    <Row>
                        <UsersByDevice />
                        <TopReferrals />
                        <TopPages />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

DashboardAnalytics.layout = (page: any) => <Layout children={page} />;
export default DashboardAnalytics;
