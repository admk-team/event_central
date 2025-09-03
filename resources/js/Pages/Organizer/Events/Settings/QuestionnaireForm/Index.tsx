import React from "react";
import Layout from "../../../../../Layouts/Event";
import { Head } from "@inertiajs/react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb2 from "../../../../../Components/Common/BreadCrumb2";
import FormStatus from "./Components/FormStatus";
import FormFields from "./Components/FormFields";
import RenderForm from "../../../../../Components/FormBuilder/RenderForm";
import FormUrl from "./Components/FormUrl";
import { useTranslation } from "react-i18next";

function Index({ form }: any) {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Head title={t("Questionnaire Form Settings")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Questionnaire Form")}
                        items={[
                            {
                                title: t("Settings"),
                                link: route("organizer.events.settings.event.index"),
                            },
                        ]}
                    />
                    <Row>
                        <Col xl={3}>
                            <Row>
                                <Col xs={12}>
                                    <FormStatus />
                                </Col>
                                <Col xs={12}>
                                    <FormFields />
                                </Col>
                                {/* <Col xs={12}>
                  <FormUrl />
                </Col> */}
                            </Row>
                        </Col>
                        <Col xl={9}>
                            <Row>
                                <Col xs={12}>
                                    <Container>
                                        <RenderForm form={form} preview={true} />
                                    </Container>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
