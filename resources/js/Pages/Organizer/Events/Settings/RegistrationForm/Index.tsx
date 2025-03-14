import React from 'react'
import Layout from '../../../../../Layouts/Event';
import { Head, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';


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
            <Col md={8}>
              <Row>
                <Col xs={12}>
                  sdfdsafdsfdsf
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <Col xs={12}>
                  dsfadsfdsfdsf
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