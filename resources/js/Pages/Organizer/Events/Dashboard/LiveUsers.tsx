import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { CountriesCharts } from './DashboardAnalyticsCharts';
import { Link } from '@inertiajs/react';
import { VectorMap } from '@south-paw/react-vector-maps'
import world from '../../../../common/world.svg.json';
import { createSelector } from 'reselect';
import { ongetAllData } from '../../../../slices/thunk';
import TopPages from './TopPages';
import TopReferrals from './TopReferrals';

const LiveUsers  = ({sessionAttendance,top10Attendee}: any) => {
    const dispatch: any = useDispatch();

    const [countryData, setcountryData] = useState<any>([]);
    const [periodType, setPeriodType] = useState<string>("halfyearly");

    const liveuserData = createSelector(
        (state: any) => state.DashboardAnalytics,
        (chartData: any) => chartData.chartData
    );
    // Inside your component
    const chartData: any = useSelector(liveuserData);

    useEffect(() => {
        setcountryData(chartData);
    }, [chartData]);

    const onChangeChartPeriod = (pType: any) => {
        setPeriodType(pType);
        dispatch(ongetAllData(pType));
    };

    useEffect(() => {
        dispatch(ongetAllData("halfyearly"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Col xxl={7}>
                <Row className="h-100">
                <TopReferrals top10Attendee = {top10Attendee}/>
                    {/* <Col xl={6}>
                        <Card className="card-height-100">
                            <div className="card-header align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Live Users By Country</h4>
                                <div className="flex-shrink-0">
                                    <button type="button" className="btn btn-soft-primary btn-sm">
                                        Export Report
                                    </button>
                                </div>
                            </div>


                            <Card.Body>
                                <div
                                    className="text-center"
                                    style={{ height: "252px" }}
                                >

                                    <div id="world_map_line_markers" className="custom-vector-map">
                                        <VectorMap {...world} />
                                    </div>
                                </div>

                                <div className="table-responsive table-card mt-3">
                                    <table className="table table-borderless table-sm table-centered align-middle table-nowrap mb-1">
                                        <thead className="text-muted border-dashed border border-start-0 border-end-0 bg-light-subtle">
                                            <tr>
                                                <th>Duration (Secs)</th>
                                                <th style={{ width: "30%" }}>Sessions</th>
                                                <th style={{ width: "30%" }}>Views</th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-0">
                                            <tr>
                                                <td>0-30</td>
                                                <td>2,250</td>
                                                <td>4,250</td>
                                            </tr>
                                            <tr>
                                                <td>31-60</td>
                                                <td>1,501</td>
                                                <td>2,050</td>
                                            </tr>
                                            <tr>
                                                <td>61-120</td>
                                                <td>750</td>
                                                <td>1,600</td>
                                            </tr>
                                            <tr>
                                                <td>121-240</td>
                                                <td>540</td>
                                                <td>1,040</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>

                        </Card>
                    </Col> */}

                    <Col xl={6}>
                        <Link title='View session report' href={route('organizer.events.report.session.index')} className="link-primary cursor-pointer">
                            <Card className="card-height-100">
                                <div className="card-header align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Sessions Attendance</h4>
                                    {/* <div className="d-flex gap-1">
                                        <button type="button" className={classNames({ active: periodType === "all" }, "btn btn-soft-secondary btn-sm")} onClick={() => { onChangeChartPeriod("all"); }}>
                                            ALL
                                        </button>
                                        <button type="button" className={classNames({ active: periodType === "monthly" }, "btn btn-soft-primary btn-sm")} onClick={() => { onChangeChartPeriod("monthly"); }}>
                                            1M
                                        </button>
                                        <button type="button" className={classNames({ active: periodType === "halfyearly" }, "btn btn-soft-secondary btn-sm")} onClick={() => { onChangeChartPeriod("halfyearly"); }}>
                                            6M
                                        </button>
                                    </div> */}
                                </div>
                                <div className="card-body p-0">
                                    <div>
                                        <CountriesCharts series={sessionAttendance.series} sessionNames={sessionAttendance.sessionNames}
                                        dataColors='["#4e79a7", "#59a14f", "#f28e2b", "#e15759", "#af7aa1", "#76b7b2", "#ff9da7", "#edc948", "#17becf", "#9c755f"]'/>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </Col>

                </Row>
            </Col>
        </React.Fragment>
    );
};

export default LiveUsers;