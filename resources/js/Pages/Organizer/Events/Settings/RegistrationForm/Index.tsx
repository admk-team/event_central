import React from 'react'
import Layout from '../../../../../Layouts/Event';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';
import FormStatus from './Components/FormStatus';
import FormFields from './Components/FormFields';


function Index({ form }: any) {
  return (
    <React.Fragment>
      <Head title='Registration Form Settings' />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb2
            title="Registration Form"
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
              </Row>
            </Col>
            <Col xl={9}>
              <Row>
                <Col xs={12}>
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