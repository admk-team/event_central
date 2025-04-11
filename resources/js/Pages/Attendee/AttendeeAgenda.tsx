import React, { useState } from 'react';
import { Col, Container, Row, Dropdown, DropdownButton, ButtonGroup, Card, CardBody } from 'react-bootstrap';


import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/Attendee';
import moment from 'moment';
import EventSessionsTimeLine from './common/EventSessionsTimeLine';


const AttendeeAgenda = ({ eventApp, eventdates, enableTracks, tracks, eventPlatforms }: any) => {
    console.log(eventApp.event_sessions);
    
    // Initialize the state variables
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const togglePlatformSelection = (platformId) => {
        setSelectedPlatforms((prevTracks) => {
            if (prevTracks.includes(platformId)) {
                return prevTracks.filter(id => id !== platformId); // Remove the platformId if it's already in the array
            } else {
                return [...prevTracks, platformId]; // Add the trackId to the array if it's not already in
            }
            
        });
    }
    const toggleTrackSelection = (trackId) => {
        setSelectedTracks((prevTracks) => {
            if (prevTracks.includes(trackId)) {
                return prevTracks.filter(id => id !== trackId); 
            } else {
                return [...prevTracks, trackId]; 
            }
            
        });
    }

    const clearTracks=()=>{
        setSelectedTracks([])
    }
    const clearPlatforms=()=>{
        setSelectedPlatforms([])
    }
    return (
        <React.Fragment>
            <Head title="Event Program" />
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>Event Agenda</h5>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-center gap-2 ">
                        {eventdates?.map((date: any, index: number) => (
                            <button
                                key={index}
                                className={'tab-btn bg-primary text-white py-1'}
                                data-day={`day${index + 1}`}
                                style={{ border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                            >
                                <p className='fw-bold mb-0 py-1 px-3'>Day {index + 1}{' '}</p>
                                <p className='mb-0'>{moment(date.date).format('MMM D')}</p>
                            </button>
                        ))}
                    </div>
                    {enableTracks && tracks.length > 0 && (
                        <div className="tracks text-center mt-4">
                            <h4 className=''>Tracks:</h4>
                            <div className="tracks-filter d-flex justify-content-center gap-2">
                                {tracks.map((track: any, index: number) => (
                                    <button onClick={()=>{
                                        toggleTrackSelection(track.id)
                                    }}
                                        className='px-3 py-2 rounded'
                                        key={index}
                                        style={{ border: '1px solid #d1d5db', backgroundColor: selectedTracks.includes(track.id) ? track.color : '', color: selectedTracks.includes(track.id) ? 'white' : 'black' }}
                                    >
                                        {track.name}
                                    </button>
                                ))}
                               {selectedTracks && selectedTracks.length>0 && ( <button className='px-3 bg-secondary text-white rounded' onClick={() => clearTracks()} > &#10006; </button>)}
                            </div>
                        </div>
                    )}

                    <div className="locations text-center mt-4">
                        <h4>Locations:</h4>
                        <div className="locations-filter">
                            {eventPlatforms?.map((platform:any,index:number)=>(
                                <button onClick={() => togglePlatformSelection(platform.id)} className={`p-3 rounded  ${selectedPlatforms.includes(platform.id) ? 'bg-primary text-white' : ''}`} key={index} style={{ border: '1px solid #d1d5db' }}>{platform.name}</button>
                            ))}
                            {selectedPlatforms && selectedPlatforms.length > 0 && (<button className='ms-2 p-3 bg-secondary text-white rounded' onClick={() => clearPlatforms()} > &#10006; </button>)}

                        </div>
                    </div>

                    <section>
                        <Row className='d-flex justify-content-center'>
                            <Col sm={12} md={6} lg={6}>
                                <EventSessionsTimeLine eventApp={eventApp} sessions={eventApp.event_sessions}></EventSessionsTimeLine>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </div >
        </React.Fragment >
    );
};
AttendeeAgenda.layout = (page: any) => <Layout children={page} />
export default AttendeeAgenda;
