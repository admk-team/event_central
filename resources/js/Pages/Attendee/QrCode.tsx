import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Row, Card, CardHeader, CardBody, ListGroup } from 'react-bootstrap';

import { Head, useForm, Link, router } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';

// import speakerAvatar from '../../../images/speaker_avatar.svg';

// import defaultEventIcon from '../../../images/default-event-image.png';
// import defaultEventImage from '../../../images/defaultEventImage.png';


// import moment from 'moment';


const QrCode = ({ eventApp, qr_code }: any) => {


    console.log('data:image/png;base64,' + qr_code);
    return (
        <React.Fragment>
            <Head title={eventApp.name} />
            <div className="page-content">
                <Container fluid>
                    <Row className='d-flex justify-content-center'>
                        <Col md={9} lg={9}>
                            {/* <img src={'data:image/png;base64,' + qr_code} alt="" /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
QrCode.layout = (page: any) => <Layout children={page} />
export default QrCode;
