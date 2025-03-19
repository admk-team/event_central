import GuestLayout from '../../../Layouts/Attendee/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import logoLight from '../../../../images/logo-white.png';

export default function VerifyEmail() {
    const getInputElement = (index: number): HTMLInputElement => {
        return document.getElementById('digit' + index + '-input') as HTMLInputElement;
    };
    const moveToNext = (index: any) => {
        if (getInputElement(index).value.length === 1) {
            if (index !== 4) {
                getInputElement(index + 1).focus();
            } else {
                getInputElement(index).blur();
            }
        }
    }

    return (
        <div className="auth-page-wrapper">
            <GuestLayout>
                <Head title="Two Step Verification | Velzon - React Admin & Dashboard Template" />

                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link href="/dashboard" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Registration Link is not valid</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </GuestLayout>
        </div>
    );
}
