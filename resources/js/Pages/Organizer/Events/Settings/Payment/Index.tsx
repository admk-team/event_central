import React from 'react';
import Layout from '../../../../../Layouts/Event';
import { Head } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';
import PaypalSetting from './Components/PaypalSetting';
import StripeSetting from './Components/StripeSetting';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index() {
    const { t } = useLaravelReactI18n();

    return (
        <React.Fragment>
            <Head title={t("Payment Settings")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Payment Settings")}
                        items={[
                            {
                                title: t("Settings"),
                                link: route("organizer.events.settings.payment.index")
                            }
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
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
