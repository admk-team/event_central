import React from 'react';
import Layout from '../../../Layouts/Organizer';
import { Head } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import ZohoSettingForm from './Components/ZohoSettingForm';
import { Button } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";
const ZohoSettings = ({ keys }: any) => {
    const { t } = useLaravelReactI18n();
    return (
        <React.Fragment>
            <Head title={t("Zoho CRM Settings")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Zoho CRM Settings")}
                        items={[
                            { title: t("Settings"), link: route('organizer.zoho.index') }
                        ]}
                    />
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <ZohoSettingForm keys={keys} />

                            {/* Instructions Card */}
                            <div className="card shadow-sm mt-4" id="zoho-instructions">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">{t('How to Connect and Sync with Zoho CRM')}</h5>

                                    <ol className="ps-3">
                                        <li className="mb-2">
                                            <strong>{t('Enter Zoho CRM Credentials')}</strong><br />
                                            {t("Enter Credentials Instruction")}
                                        </li>
                                        <li className="mb-2">
                                            <strong>{t('Redirect URI')}</strong><br />
                                            <span> {t('Redirect URI Instruction')} </span>
                                        </li>

                                        <li className="mb-2">
                                            <strong>{t('Connect to Zoho')}</strong><br />
                                            <span dangerouslySetInnerHTML={{ __html: t('Connect to Zoho Instruction') }} />
                                        </li>

                                        <li className="mb-2">
                                            <strong>{t('Sync Event Data')}</strong><br />
                                            <span dangerouslySetInnerHTML={{ __html: t('Sync Event Data Instruction') }} />
                                         </li>
                                    </ol>

                                    <p className="small text-muted mb-0">

                                        {t('Redirect Note')}
                                    </p>

                                    <div className="mt-3">
                                        <small className="text-muted">
                                            {t('Quick Steps')}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

ZohoSettings.layout = (page: any) => <Layout children={page} />;

export default ZohoSettings;
