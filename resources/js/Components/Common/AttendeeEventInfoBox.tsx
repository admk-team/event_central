import { usePage } from '@inertiajs/react';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import attendeeImageDefault from '../../../images/attendee-bg.jpg';
import defaultEventImage from '../../../images/default-event-image.png';

// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const AttendeeEventInfoBox = () => {
    const eventInfo = usePage().props.eventApp;
    return (
        <React.Fragment>
            <div className="d-flex flex-column justify-content-center align-items-center mx-2 mt-2" >
                <img src={attendeeImageDefault} alt="attendee event bg" style={{ width: '100%', height: '50%', borderTopRightRadius: '7px', borderTopLeftRadius: '7px' }} />
                <div style={{ height: '50%', width: '100%', backgroundColor: 'white', borderBottomRightRadius: '7px', borderBottomLeftRadius: '7px', paddingTop: '15px' }} className="d-flex flex-column align-items-center">
                    <img src={defaultEventImage} alt="default event image" style={{ height: '50px', borderRadius: '50%' }} />
                    <h2>{eventInfo.name}</h2>
                    <h5>{moment(eventInfo.start_date).format('D MMM, YYYY')}</h5>
                    <span>{eventInfo.description}</span>
                </div>
            </div>
        </React.Fragment >
    );
};

export default AttendeeEventInfoBox;
