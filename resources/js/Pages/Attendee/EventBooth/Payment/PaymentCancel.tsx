// resources/js/Pages/Attendee/EventBooth/Payment/PaymentCancel.tsx
import { Head } from "@inertiajs/react";
import React from "react";
import Layout from "../../../../Layouts/Attendee";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";

const PaymentCancel = () => {
  return (
    <>
      <Head title="Payment Canceled" />
      <section className="section bg-light mt-4" id="success">
        <div className="bg-overlay bg-overlay-pattern"></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                    <div>
                      <span className="fs-2">
                        Payment was cancelled. <i className="bx bx-smile text-primary"></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

PaymentCancel.layout = (page: any) => <Layout children={page} />;
export default PaymentCancel;
