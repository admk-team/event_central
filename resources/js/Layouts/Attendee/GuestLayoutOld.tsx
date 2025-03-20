import React from 'react';
import ApplicationLogo from '../../Components/ApplicationLogo';
import AttendeeEventInfoBox from '../../Components/Common/AttendeeEventInfoBox';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function Guest({ children }: any) {
    return (
        // auth - bg - cover
        <React.Fragment>
            <div className="auth-page-wrapper  py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
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
            </div>
        </React.Fragment>
    );
}
