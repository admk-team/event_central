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
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

ZohoSettings.layout = (page: any) => <Layout children={page} />;

export default ZohoSettings;
