import React from 'react';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from "laravel-react-i18n";

//import images
import illustarator from "../../../../images/user-illustarator-2.png";

const UpgradeAccountNotise = () => {
    const { t } = useLaravelReactI18n();

    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body className="p-0">
                            <Alert className="alert alert-warning border-0 rounded-0 m-0 d-flex align-items-center" role="alert">
                                <FeatherIcon
                                    icon="alert-triangle"
                                    className="text-warning me-2 icon-sm"
                                />
                                <div className="flex-grow-1 text-truncate">
                                    {t("free_trial_expired")} <b>17</b> {t("days")}
                                </div>
                                <div className="flex-shrink-0">
                                    <Link href="/pages-pricing" className="text-reset text-decoration-underline"><b>{t("upgrade")}</b></Link>
                                </div>
                            </Alert>

                            <Row className="align-items-end">
                                <Col sm={8}>
                                    <div className="p-3">
                                        <p className="fs-17 lh-base">
                                            {t("upgrade_plan_from")} <span className="fw-semibold">{t("free_trial")}</span>, {t("to_premium_plan")} <i className="mdi mdi-arrow-right"></i>
                                        </p>
                                        <div className="mt-3">
                                            <Link href="/pages-pricing" className="btn btn-success">{t("upgrade_account")}</Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div className="px-3">
                                        <img src={illustarator} className="img-fluid" alt="" />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default UpgradeAccountNotise;
