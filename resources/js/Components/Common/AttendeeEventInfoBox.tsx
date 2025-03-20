import { usePage } from '@inertiajs/react';
import React from 'react';
import { Col, Spinner } from 'react-bootstrap';
import defaultEventImage from '../../../images/defaultEventImage.png';
import defaultEventIcon from '../../../images/default-event-image.png';

// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Logo from '../Logo';

const AttendeeEventInfoBox = () => {
    const eventInfo: any = usePage().props.eventApp;
    return (
        <React.Fragment>
            <Col lg={6}>
            <div className="p-lg-5 p-4 auth-one-bg h-100">
                <div className="bg-overlay"></div>
                <div className="position-relative d-flex flex-column justify-content-center align-items-center mx-2 m-2" >
                    <div className="bg-white rounded px-4 mb-3">
                        <Logo />
                    </div>
                    <img src={defaultEventImage} alt="attendee event bg" style={{ width: '100%', height: '50%', borderTopRightRadius: '7px', borderTopLeftRadius: '7px' }} />
                    <div style={{ height: '80%', width: '100%', backgroundColor: 'white', borderBottomRightRadius: '7px', borderBottomLeftRadius: '7px', paddingTop: '15px', padding: '10px' }} className="d-flex flex-column align-items-center justify-content-center">
                        {/* <img src={defaultEventIcon} alt="default event image" style={{ height: '50px', borderRadius: '50%' }} /> */}
                        <h2 className='text-center'>{eventInfo.name}</h2>
                        <h5 className='text-muted'>{moment(eventInfo.start_date).format('D MMM, YYYY')}</h5>
                        <span className='text-justify h-75'>{eventInfo.description}</span>
                    </div>
                </div>
                </div>
                </Col>
        </React.Fragment >
    );
};

export default AttendeeEventInfoBox;
