import React from 'react';
import Layout from '../../../Layouts/Organizer';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import SettingForm from './Components/SettingForm';
import StripeSetting from './Components/SettingForm';


const Index = ({ keys }: any) => {
    // console.log(keys);
    return (
        <React.Fragment>
            <Head title='Payment Settings' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Payment Settings"
                        items={[
                            { title: "Settings", link: route('organizer.events.settings.payment.index') }
                        ]}
                    />
                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <SettingForm keys={keys} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
