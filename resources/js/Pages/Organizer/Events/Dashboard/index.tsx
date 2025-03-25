import React from "react";
import { Col, Container, Row } from "react-bootstrap";

//import Components
import UpgradeAccountNotise from "./UpgradeAccountNotise";
import UsersByDevice from "./UsersByDevice";
import Widget from "./Widget";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import AudiencesMetrics from "./AudiencesMetrics";
import AudiencesSessions from "./AudiencesSessions";
import LiveUsers from "./LiveUsers";
import TopReferrals from "./TopReferrals";
import TopPages from "./TopPages";
import { Head } from "@inertiajs/react";
import Layout from "../../../../Layouts/Event";
import Widgets1 from "../../../Theme/DashboardCrypto/Widgets1";
import Widget1 from "./Widget1";

const DashboardAnalytics = ({ totalAttendee,totalSession,totalSpeakers,totalPartners,totalTickets,totalPosts }: any) => {
    return (
        <React.Fragment>
            <Head title="Analytics | Velzon - React Admin & Dashboard Template" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Analytics" pageTitle="Dashboards" />
                    <Row>
                        <Col xxl={12}>
                            {/* <UpgradeAccountNotise /> */}
                            <Widget1
                                totaluser = {totalAttendee}
                                totalSession = {totalSession}
                                totalPosts = {totalPosts}
                                totalTickets = {totalTickets}
                                totalSpeakers = {totalSpeakers}
                                totalPartners = {totalPartners}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={5}>
                            {/* <UpgradeAccountNotise /> */}
                            <Widget 
                                totaluser = {totalAttendee}
                                totalSession = {totalSession}
                                totalPosts = {totalPosts}
                                totalTickets = {totalTickets}
                                totalSpeakers = {totalSpeakers}
                                totalPartners = {totalPartners}
                            />
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
