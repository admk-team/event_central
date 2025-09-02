import React, { useState, useEffect } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { ongetAudiencesSessionsChartsData } from '../../../slices/thunk';
import { AudiencesSessionsCharts } from './DashboardAnalyticsCharts';
import { useLaravelReactI18n } from 'laravel-react-i18n';

const AudiencesSessions = () => {
    const { t } = useLaravelReactI18n();
    const dispatch: any = useDispatch();

    const [chartData, setchartData] = useState<any>([]);
    const [seletedMonth, setSeletedMonth] = useState("today");

    const sessionsData = createSelector(
        (state: any) => state.DashboardAnalytics,
        (audiencesSessionsData: any) => audiencesSessionsData.audiencesSessionsData
    );

    const audiencesSessionsData: any = useSelector(sessionsData);

    useEffect(() => {
        setchartData(audiencesSessionsData);
    }, [audiencesSessionsData]);

    const onChangeChartPeriod = (pType: any) => {
        setSeletedMonth(pType);
        dispatch(ongetAudiencesSessionsChartsData(pType));
    };

    useEffect(() => {
        dispatch(ongetAudiencesSessionsChartsData("today"));
    }, [dispatch]);

    const getPeriodLabel = (period: string) => {
        switch (period) {
            case "today": return t("Today");
            case "lastWeek": return t("Last Week");
            case "lastMonth": return t("Last Month");
            case "currentYear": return t("Current Year");
            default: return period;
        }
    }

    return (
        <React.Fragment>
            <Col xl={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">{t('Audiences Sessions by Country')}</h4>
                        <div className="flex-shrink-0">
                            <Dropdown className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="fw-semibold text-uppercase fs-12">{t('Sort by:')} </span>
                                    <span className="text-muted">
                                        {getPeriodLabel(seletedMonth)}
                                        <i className="mdi mdi-chevron-down ms-1"></i>
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    {["today", "lastWeek", "lastMonth", "currentYear"].map((period) => (
                                        <Dropdown.Item
                                            key={period}
                                            onClick={() => onChangeChartPeriod(period)}
                                            className={seletedMonth === period ? "active" : ""}
                                        >
                                            {getPeriodLabel(period)}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>
                    <div className="card-body p-0">
                        <div>
                            <AudiencesSessionsCharts
                                series={chartData}
                                dataColors='["--vz-success", "--vz-info"]'
                            />
                        </div>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default AudiencesSessions;
