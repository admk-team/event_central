import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";

const Footer = () => {
    const { t } = useLaravelReactI18n();
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            {new Date().getFullYear()} © {t("Event Central")}.
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                Design & Develop by Onlinechannel.tv
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
