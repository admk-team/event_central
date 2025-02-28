import React from 'react';
import ApplicationLogo from '../../Components/ApplicationLogo';
import AttendeeEventInfoBox from '../../Components/Common/AttendeeEventInfoBox';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function Guest({ children }: any) {
    return (
        <React.Fragment>
            <div className="auth-page-wrapper">
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    {/* <div>
                                                        <Link href='/' className="d-inline-block auth-logo">
                                                            <img src={logoLight} alt="" height="20" />
                                                        </Link>
                                                    </div>
                                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p> */}
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={8} lg={8} xl={8}>
                                <Card>
                                    <Card.Body style={{ padding: 'unset' }}>
                                        <Row>
                                            <Col md={8} lg={6} xl={6} className='d-flex flex-column justify-content-center' style={{ backgroundColor: 'var(--vz-success)' }}>
                                                <AttendeeEventInfoBox />
                                            </Col>
                                            <Col md={8} lg={6} xl={6} className='p-4'>
                                                {children}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card></Col>
                        </Row>
                    </Container>
                </div>

                {/* <footer className="footer">
                    <div className="container">
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </footer> */}
            </div>
        </React.Fragment>
    );
}
