import React from 'react';
import Layout from '../../../Layouts/Organizer';
import { Head } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import MailchimpSettingForm from './Components/MailchimpSettingForm';
import { Button } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";
const MailChimpSetting = ({ keys }: any) => {
    const { t } = useLaravelReactI18n();
    return (
        <React.Fragment>
            <Head title={t("MailChimp Settings")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("MailChimp Settings")}
                        items={[
                            { title: t("Settings"), link: route('organizer.mailchimp.index') }
                        ]}
                    />
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <MailchimpSettingForm keys={keys} />

                            {/* Instructions Card */}
                           <div className="card shadow-sm mt-4" id="mailchimp-instructions">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">{t('How to Connect and Sync with Mailchimp')}</h5>

                                    <ol className="ps-3">
                                    <li className="mb-2">
                                        <strong>{t('Enter Mailchimp API Key')}</strong><br />
                                        {t("Go to your Mailchimp account → Profile → Extras → API keys, and generate a new key. Copy the key and paste it into our system settings.")}
                                    </li>

                                    <li className="mb-2">
                                        <strong>{t('Find Your Audience (List) ID')}</strong><br />
                                        {t("In Mailchimp, go to Audience → Manage Audience → Settings → Audience name and defaults. Copy the Audience ID and paste it into our system settings.")}
                                    </li>

                                    <li className="mb-2">
                                        <strong>{t('Enter Mailchimp Server Prefix')}</strong><br />
                                        {t("Your API key ends with a dash and region code (e.g., -us3, -us19). Enter this as the Server Prefix in our system.")}
                                    </li>

                                    <li className="mb-2">
                                        <strong>{t('Connect to Mailchimp')}</strong><br />
                                        <span dangerouslySetInnerHTML={{ __html: t("Save your Mailchimp credentials in the settings and test the connection. If successful, your EventCentral system will be linked to Mailchimp.") }} />
                                    </li>
                                    
                                    </ol>

                                    <p className="small text-muted mb-0">
                                    {t('Note: Mailchimp requires at least one Audience. Make sure you have created an Audience in Mailchimp before connecting.')}
                                    </p>

                                    <div className="mt-3">
                                        <small className="text-muted">
                                            {t('Quick Steps: Generate API key → Copy Audience ID → Add Server Prefix → Save & Connect → Sync Attendees')}
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

MailChimpSetting.layout = (page: any) => <Layout children={page} />;

export default MailChimpSetting;
