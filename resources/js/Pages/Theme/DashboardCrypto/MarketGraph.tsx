import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { MarkerCharts } from './DashboardCryptoCharts';
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { ongetMarketChartsData } from '../../../slices/dashboardCrypto/thunk';

const MarketGraph = () => {
    const dispatch : any= useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const marketgraphData = createSelector(
        (state : any) => state.DashboardCrypto,
        (marketData: any) => marketData.marketData
      );
    // Inside your component
    const marketData : any= useSelector(marketgraphData);

    useEffect(() => {
        setchartData(marketData);
    }, [marketData]);

    const onChangeChartPeriod = (pType : any) => {
        dispatch(ongetMarketChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetMarketChartsData("all"));
    }, [dispatch]);

    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card>
                        <Card.Header className="border-0 align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Market Graph</h4>
                            <div className="d-flex gap-1">
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("hour"); }}>
                                    1H
                                </button>
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("week"); }}>
                                    7D
                                </button>
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("month"); }}>
                                    1M
                                </button>
                                <button type="button" className="btn btn-soft-secondary btn-sm" onClick={() => { onChangeChartPeriod("year"); }}>
                                    1Y
                                </button>
                                <button type="button" className="btn btn-soft-primary btn-sm" onClick={() => { onChangeChartPeriod("all"); }}>
                                    ALL
                                </button>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="bg-light-subtle border-top-dashed border border-start-0 border-end-0 border-bottom-dashed py-3 px-4">
                                <Row className="align-items-center">
                                    <Col xs={6}>
                                        <div className="d-flex flex-wrap gap-4 align-items-center">
                                            <h5 className="fs-19 mb-0">0.014756</h5>
                                            <p className="fw-medium text-muted mb-0">$75.69 <span className="text-success fs-11 ms-1">+1.99%</span></p>
                                            <p className="fw-medium text-muted mb-0">High <span className="text-body fs-11 ms-1">0.014578</span></p>
                                            <p className="fw-medium text-muted mb-0">Low <span className="text-body fs-11 ms-1">0.0175489</span></p>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="d-flex">
                                            <div className="d-flex justify-content-end text-end flex-wrap gap-4 ms-auto">
                                                <div className="pe-3">
                                                    <h6 className="mb-2 text-truncate text-muted">Total Balance</h6>
                                                    <h5 className="mb-0">$72.8k</h5>

                                                </div>
                                                <div className="pe-3">
                                                    <h6 className="mb-2 text-muted">Profit</h6>
                                                    <h5 className="text-success mb-0">+$49.7k</h5>
                                                </div>
                                                <div className="pe-3">
                                                    <h6 className="mb-2 text-muted">Loss</h6>
                                                    <h5 className="text-danger mb-0">-$23.1k</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                        <div className="card-body p-0 pb-3">
                            <div id="Market_chart" className="apex-charts" dir="ltr">
                                <MarkerCharts series={chartData} dataColors='["--vz-success", "--vz-danger"]'/>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default MarketGraph;