import React from 'react';
import Layout from '../../../Layouts/Organizer';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import SettingForm from './Components/SettingForm';
import StripeSetting from './Components/SettingForm';
import { useLaravelReactI18n } from "laravel-react-i18n";


const Index = ({ keys }: any) => {
    // console.log(keys);
       const { t } = useLaravelReactI18n();
    return (
        <React.Fragment>
            <Head title={t('Payment Settings')} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Payment Settings")}
                        items={[
                            { title: t("Settings"), link: route('organizer.events.settings.payment.index') }
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
