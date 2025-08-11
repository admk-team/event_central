import React from 'react';
import Layout from '../../../Layouts/Organizer';
import { Head } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import ZohoSettingForm from './Components/ZohoSettingForm';
import { Button } from 'react-bootstrap';
const ZohoSettings = ({ keys }: any) => {
    return (
        <React.Fragment>
            <Head title="Zoho CRM Settings" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Zoho CRM Settings"
                        items={[
                            { title: "Settings", link: route('organizer.zoho.index') }
                        ]}
                    />
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <ZohoSettingForm keys={keys} />

                            {/* Instructions Card */}
                            <div className="card shadow-sm mt-4" id="zoho-instructions">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">How to Connect and Sync with Zoho CRM</h5>

                                    <ol className="ps-3">
                                        <li className="mb-2">
                                            <strong>Enter Zoho CRM Credentials</strong><br />
                                            Fill in <em>Client ID</em>, <em>Client Secret</em>, and <em>Redirect URI</em> exactly as shown in your Zoho API console. Click <span className="badge bg-danger text-white">Save Keys</span>.
                                        </li>

                                        <li className="mb-2">
                                            <strong>Connect to Zoho</strong><br />
                                            Click the <span className="badge bg-danger text-white">Connect</span> button. Sign in to Zoho and approve access — you will be redirected back when successful.
                                        </li>

                                        <li className="mb-2">
                                            <strong>Sync Event Data</strong><br />
                                            Go to <em>Zoho Sync Data</em>, select an event, choose to sync as <em>Leads</em> or <em>Contacts</em>, then click <span className="badge bg-danger text-white">Sync Now</span>.
                                        </li>
                                    </ol>

                                    <p className="small text-muted mb-0">
                                        Note: The Redirect URI must match exactly what you registered in Zoho (including protocol and trailing slash).
                                    </p>

                                    <div className="mt-3">
                                        <small className="text-muted">
                                            Quick: Save Keys → Connect → Settings → Zoho Sync Data → Select Event → Sync Now.
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
