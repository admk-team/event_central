import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import AuthSlider from '../authCarousel';
import { Link } from '@inertiajs/react';

const CoverLogout = () => {
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4 text-center">
                                                <i className="ri-cup-line display-5 text-success"></i>

                                                <div className="mt-4 pt-2">
                                                    <h5>You are Logged Out</h5>
                                                    <p className="text-muted">Thank you for using <span className="fw-semibold">velzon</span> admin template</p>
                                                    <div className="mt-4">
                                                        <Link href="/auth-signin-basic" className="btn btn-success w-100">Sign In</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Event Central. Crafted with <i className="mdi mdi-heart text-danger"></i> by Onlinechannel.tv</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>

                {/* <!-- end Footer --> */}
            </div>
        </React.Fragment>
    );
};

export default CoverLogout;
