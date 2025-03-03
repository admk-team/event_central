import React from 'react';
import Layout from '../../../../../Layouts/Event';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';
import PaypalSetting from './Components/PaypalSetting';
import StripeSetting from './Components/StripeSetting';


function Index() {
    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2 
                        title="Payment Settings" 
                        items={[
                            { title: "Settings", link: route('organizer.events.settings.payment.index') }
                        ]}
                    />
                    <Row>
                        <Col md={6}>
                            <PaypalSetting />
                        </Col>
                        <Col md={6}>
                            <StripeSetting />
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;