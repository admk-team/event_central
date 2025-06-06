import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ApplicationLogo from '../../Components/ApplicationLogo';
import Header from './Header';
export default function PreviewLayout({ children }: any) {

    return (
        <React.Fragment>
            <div className="auth-page-wrapper">
                <div className="auth-one-bg-position auth-one-bg" id="auth-particles22"
                >
                    <Header />
                    <div className="bg-overlay"
                    >
                    </div>
                    <div className='shape'>
                        <ApplicationLogo />
                    </div>
                </div>

                {children}

                <footer className="footer">
                    <div className="container">
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} Event Central. Crafted with <i className="mdi mdi-heart text-danger"></i> by Onlinechannel.tv</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
}
