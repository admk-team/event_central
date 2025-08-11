import React, { useEffect } from "react";
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
import { Head, usePage } from "@inertiajs/react";
import Layout from "../../../../Layouts/Event";
import Widgets1 from "../../../Theme/DashboardCrypto/Widgets1";
import Widget1 from "./Widget1";
import HasPermission from "../../../../Components/HasPermission";
import { router } from "@inertiajs/react";
import { useEchoPublic } from "@laravel/echo-react";
import toast, { Toaster } from 'react-hot-toast';

const DashboardAnalytics = ({
    totalAttendee,
    totalSession,
    totalSpeakers,
    totalPartners,
    totalTickets,
    totalPosts,
    totalRevenue,
    sessionAttendance,
    topSession,
    ticketsMetrics,
    top10Attendee,
    event_id
}: any) => {

    // Real-time subscription to public channel
    const eventChannelName = `event-dashboard-${event_id}`;
    useEchoPublic(eventChannelName, "UpdateEventDashboard", (e: any) => {
        if (e && e.event_id == event_id) {
            toast.success(e.message);
            router.get(
                route("organizer.events.dashboard"),
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                }
            );
        }
    });
    return (
        <React.Fragment>
            <Head title="Analytics " />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Analytics" pageTitle="Dashboards" />
                    <Row>
                        <Col xxl={12}>
                            {/* <UpgradeAccountNotise /> */}
                            <Widget1
                                totaluser={totalAttendee}
                                totalSession={totalSession}
                                totalPosts={totalPosts}
                                totalTickets={totalTickets}
                                totalSpeakers={totalSpeakers}
                                totalPartners={totalPartners}
                                ticketsMetrics={ticketsMetrics}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={5}>
                            {/* <UpgradeAccountNotise /> */}
                            <Widget
                                totaluser={totalAttendee}
                                totalSession={totalSession}
                                totalPosts={totalPosts}
                                totalTickets={totalTickets}
                                totalSpeakers={totalSpeakers}
                                totalPartners={totalPartners}
                                totalRevenue={totalRevenue}
                            />
                        </Col>
                        <LiveUsers
                            sessionAttendance={sessionAttendance}
                            top10Attendee={top10Attendee}
                        />
                    </Row>
                    <Row>
                        <TopPages topSession={topSession} />
                        <AudiencesMetrics ticketsMetrics={ticketsMetrics} />

                        {/* <AudiencesSessions /> */}
                    </Row>
                    <Row>
                        {/* <UsersByDevice /> */}
                        {/* <TopReferrals /> */}
                        {/* <TopPages /> */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
DashboardAnalytics.layout = (page: any) => <Layout children={page} />;
export default DashboardAnalytics;
