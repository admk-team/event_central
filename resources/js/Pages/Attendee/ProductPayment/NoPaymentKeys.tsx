import React from "react";
import { Button, Card, Col, Container, Row, CardBody } from "react-bootstrap";
import Layout from "../../../Layouts/Attendee";
import { Head } from "@inertiajs/react";

const Index = () => {

    return (
        <React.Fragment>
            <Head title="Payments" />
            <section className="section bg-light mt-4" id="payment">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} lg={6}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-center align-items-center " style={{ height: '300px' }}>
                                        <div><span className="fs-2 text-primary">
                                            Organizer Payment Keys for Stripe not found <i className='bx bxs-error' ></i>
                                        </span></div>
                                    </div>
                                </CardBody>
                            </Card>
                            <h5></h5>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
