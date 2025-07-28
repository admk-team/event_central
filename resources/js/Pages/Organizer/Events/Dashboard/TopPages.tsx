import React, { useState } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { Link, usePage } from '@inertiajs/react';
import { SimpleDonut } from './DashboardAnalyticsCharts';

interface TopSession {
    sessionName: string;
    registeredAttendees: number;
    joinedAttendees: number;
}

interface Props {
    topSession: TopSession[];
}

const TopPages  = ({topSession}: any) => {

    const [isTopPageDropdown, setTopPageDropdown] = useState<boolean>(false);
    const toggleDropdown = () => {
        setTopPageDropdown(!isTopPageDropdown);
    };

    const sessionSeries = topSession.length > 0 ? topSession.map((item:any) => item.joinedAttendees): [];
    const sessionLabels = topSession.length > 0 ? topSession.map((item:any) => item.sessionName): [];

    return (
        <React.Fragment>
            <Col xl={6} md={6}>
                <Link title='View session report' href={route('organizer.events.report.session.index')} className="link-primary cursor-pointer">
                    <Card className="card-height-100">
                        <Card.Header className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Top Sessions</h4>
                            <div className="flex-shrink-0">
                                {/* Uncomment and adjust if you want the dropdown */}
                                {/* <Dropdown show={isTopPageDropdown} onClick={toggleDropdown} className="card-header-dropdown">
                                    <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                        <span className="text-muted fs-16"><i className="mdi mdi-dots-vertical align-middle"></i></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-end">
                                        <Dropdown.Item>Today</Dropdown.Item>
                                        <Dropdown.Item>Last Week</Dropdown.Item>
                                        <Dropdown.Item>Last Month</Dropdown.Item>
                                        <Dropdown.Item>Current Year</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {/* <div className="table-responsive table-card">
                                <table className="table align-middle table-borderless table-centered table-nowrap mb-0">
                                    <thead className="text-muted table-light">
                                        <tr>
                                            <th scope="col" style={{ width: "62" }}>Active Sessions</th>
                                            <th scope="col">Registered Attendees</th>
                                            <th scope="col">Joined Attendees</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(topSession || []).map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Link href="#">{item.sessionName}</Link>
                                                </td>
                                                <td>{item.registeredAttendees}</td>
                                                <td>{item.joinedAttendees}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> */}
                            <SimpleDonut
                                dataColors='["#4e79a7", "#59a14f", "#f28e2b", "#e15759", "#af7aa1", "#76b7b2", "#ff9da7", "#edc948", "#17becf", "#9c755f"]'
                                series={sessionSeries}
                                labels={sessionLabels}
                            />
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        </React.Fragment>
    );
};

export default TopPages;