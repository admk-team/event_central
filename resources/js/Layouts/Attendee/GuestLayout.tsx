import React from "react";
import ApplicationLogo from "../../Components/ApplicationLogo";
import AttendeeEventInfoBox from "../../Components/Common/AttendeeEventInfoBox";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import AuthSlider from "../../Pages/Theme/AuthInner/authCarousel";
import useToastMessages from "../../hooks/useToastMessages";
import { Toaster } from "react-hot-toast";


export default function GuestLayout({ children }: any) {
    const appName = import.meta.env.VITE_APP_NAME || "Event Central";
    useToastMessages();
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden m-0">
                                    <Row className="justify-content-center g-0">
                                        {/* <AuthSlider /> */}
                                        <AttendeeEventInfoBox />
                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                {children}
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
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0">
                                        {new Date().getFullYear()} {appName} -
                                        All Rights Reserved
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </footer>
                <Toaster />
            </div>
        </React.Fragment>
    );
}
