import { Head, Link } from '@inertiajs/react';
import error400cover from '../../../images/404-error.png'
import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';

export default function Cover404({ previousroute }: { previousroute: any }) {
    return (
        <React.Fragment >
            <Head title='Access Denied' />
            <div className="auth-page-content">
                <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
                    <div className="auth-page-content overflow-hidden p-0">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={7} lg={8}>
                                    <div className="text-center">
                                        <img src={error400cover} alt="error img" className="img-fluid" />
                                        <div className="mt-3">
                                            <h3 className="text-uppercase">Sorry, You do not have access 😭</h3>
                                            {/* <p className="text-muted mb-4">The page you are looking for not available!</p> */}
                                            <Link href={previousroute} className="btn btn-success"><i className="mdi mdi-home me-1"></i>Back to home</Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}
