import React from 'react'
import Layout from '../../../../../Layouts/Event';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';
import FormStatus from './Components/FormStatus';
import FormFields from './Components/FormFields';
import RenderForm from '../../../../../Components/FormBuilder/RenderForm';
import FormUrl from './Components/FormUrl';


function Index({ form }: any) {
  return (
    <React.Fragment>
      <Head title='Questionnaire Form Settings' />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb2
            title="Questionnaire Form"
            items={[
              { title: "Settings", link: route('organizer.events.settings.event.index') }
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
  )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
