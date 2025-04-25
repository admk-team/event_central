import React, { useState, useMemo } from 'react';
import { Col, Row, Card, CardBody } from 'react-bootstrap';
import { Link, usePage, useForm } from '@inertiajs/react';
import moment from 'moment';


const EventSessionsTimeLine: React.FC<EventSessionsTimeLineProps> = ({ eventApp, sessions }) => {
    // Get props from Inertia's usePage
    const eventdates = usePage().props.eventdates || [];
    const enableTracks = usePage().props.enableTracks || false;
    const tracks = usePage().props.tracks || [];
    const eventPlatforms = usePage().props.eventPlatforms || [];

    // State for active day and filters
    const [activeDay, setActiveDay] = useState<string | null>(eventdates[0]?.date || null);
    const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);

    const { data, setData, get, processing, errors, reset, transform, clearErrors } = useForm({});
    // Toggle track selection
    const toggleTrackSelection = (trackId: number) => {
        setSelectedTracks((prevTracks) =>
            prevTracks.includes(trackId)
                ? prevTracks.filter((id) => id !== trackId)
                : [...prevTracks, trackId]
        );
    };

    // Toggle platform selection
    const togglePlatformSelection = (platformId: number) => {
        setSelectedPlatforms((prevPlatforms) =>
            prevPlatforms.includes(platformId)
                ? prevPlatforms.filter((id) => id !== platformId)
                : [...prevPlatforms, platformId]
        );
    };

    // Clear selections
    const clearTracks = () => setSelectedTracks([]);
    const clearPlatforms = () => setSelectedPlatforms([]);

    // Filter sessions by active day, tracks, and platforms
    const filteredSessions = useMemo(() => {
        const filtered = sessions.filter((session: any) => {
            const sessionDate = moment(session.start_date_time).format('YYYY-MM-DD');
            const isDateMatch = activeDay ? sessionDate === moment(activeDay).format('YYYY-MM-DD') : true;

            const isTrackMatch =
                selectedTracks.length === 0 ||
                session.tracks?.some((track: boolean) => selectedTracks.includes(track.id));

            console.log("match", isTrackMatch, session.tracks);

            const isPlatformMatch =
                selectedPlatforms.length === 0 ||
                selectedPlatforms.includes(session.event_platform?.id);

            return isDateMatch && isTrackMatch && isPlatformMatch;
        });

        // ✅ Sort filtered sessions by start_date_time ASC
        return filtered.sort((a: any, b: any) => {
            return moment(a.start_date_time).diff(moment(b.start_date_time));
        });
    }, [sessions, activeDay, selectedTracks, selectedPlatforms]);

    const sessionFav = (sessionId: any) => {
        console.log(sessionId);
        get(route('fav.sessions', sessionId), {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.log(error);
                console.log(errors);
            }
        });
    };

    // Session list rendering (unchanged from your code)
    const sessionLists = filteredSessions.map((session: any) => (
        <li key={session.id}>
            <Link href={route('attendee.event.detail.session', { eventSession: session.id })}>
                <div className="d-flex justify-content-between">
                    <span style={{ color: 'var(--vz-success)' }}>
                        {moment(session.start_date_time).format('MMM DD YYYY')} (
                        {moment(session.start_date_time).format('hh:mm')}-
                        {moment(session.end_date_time).format('hh:mm')})
                    </span>
                    <span style={{ color: 'var(--vz-success)' }}>
                        <i className="mr-2 bx bx-time"></i>
                        {moment(session.end_date_time).diff(moment(session.start_date_time), 'minutes')} minutes
                    </span>
                </div>
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                <div className="d-flex flex-column">
                                    <h5>{session.name}</h5>
                                    <span style={{ fontSize: '0.8rem', color: 'smokewhite' }}>{session.event_platform?.name ?? 'MAIN STAGE'}</span>
                                    {/* <h5>speaker</h5> */}
                                </div>
                            </Col>
                            <Col>
                                {session.is_favourite ? (
                                    <div className="d-flex flex-column justify-content-end align-items-end" onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        sessionFav(session.id)
                                    }} >
                                        <i className="bx bxs-heart fs-4 text-danger fw-bolder"></i>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column justify-content-end align-items-end" onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        sessionFav(session.id)
                                    }} >
                                        <i className="bx bx-heart fs-4 text-danger fw-bolder"></i>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Link>
        </li>
    ));

    return (
        <React.Fragment>
            {/* Day Tabs */}
            <div className="d-flex justify-content-center gap-2">
                {eventdates?.map((date: object, index: number) => (
                    <button
                        key={index}
                        className={`tab-btn py-1 ${activeDay === date.date ? 'bg-primary text-white' : 'bg-light text-dark'
                            }`}
                        onClick={() => setActiveDay(date.date)}
                        style={{ border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    >
                        <p className="fw-bold mb-0 py-1 px-3">Day {index + 1}</p>
                        <p className="mb-0">{moment(date.date).format('MMM D')}</p>
                    </button>
                ))}
            </div>

            {/* Tracks Filter */}
            {(enableTracks && tracks.length) > 0 && (
                <div className="tracks text-center mt-4">
                    <h4>Tracks:</h4>
                    <div className="tracks-filter d-flex flex-wrap justify-content-center gap-2">
                        {tracks.map((track: Track) => (
                            <button
                                key={track.id}
                                onClick={() => toggleTrackSelection(track.id)}
                                className="px-3 py-2 rounded"
                                style={{
                                    fontWeight: '500',
                                    border: '1px solid' + track.color,
                                    backgroundColor: selectedTracks.includes(track.id) ? track.color : '',
                                    color: selectedTracks.includes(track.id) ? 'white' : 'black',
                                }}
                            >
                                {track.name}
                            </button>
                        ))}
                        {selectedTracks.length > 0 && (
                            <button
                                className="px-3 bg-secondary text-white rounded"
                                onClick={clearTracks}
                            >
                                ✖
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Platforms Filter */}
            <div className="locations text-center mt-4">
                <h4>Locations:</h4>
                <div className="locations-filter d-flex flex-wrap justify-content-center gap-2">
                    {eventPlatforms?.map((platform: object) => (
                        <button
                            key={platform.id}
                            onClick={() => togglePlatformSelection(platform.id)}
                            className={`px-3 py-2 rounded ${selectedPlatforms.includes(platform.id) ? 'bg-primary text-white' : ''
                                }`}
                            style={{ border: '1px solid #d1d5db', fontWeight: '500' }}
                        >
                            {platform.name}
                        </button>
                    ))}
                    {selectedPlatforms.length > 0 && (
                        <button
                            className="px-3 bg-secondary text-white rounded"
                            onClick={clearPlatforms}
                        >
                            ✖
                        </button>
                    )}
                </div>
            </div>

            {/* Session Timeline */}
            <ul className="timeline">{sessionLists}</ul>
        </React.Fragment>
    );
};

export default EventSessionsTimeLine;
