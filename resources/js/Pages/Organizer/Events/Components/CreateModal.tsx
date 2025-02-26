import { Link, useForm } from '@inertiajs/react';
import React, { useCallback, useRef, useState } from 'react'
import Flatpickr from "react-flatpickr";
import { Button, Col, Form, FormGroup, Modal, Nav, Row, Tab } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '200px',
};

const center = { lat: 37.778519, lng: -122.40564 };
const second = { lat: 54.5260, lng: 15.2551 }
const third = { lat: 8.7832, lng: 34.5085 }
const fourth = { lat: 19.0760, lng: 72.8777 }

interface CreateModalProps {
    addEventModal: boolean;
    showModal: () => void;
}
function CreateModal({ addEventModal, showModal }: CreateModalProps) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        start_date: "",
        end_date: "",
        description: "",
        location_type: "",
        location_base: "",
        type: 'in-person',
        schedual_type: '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route('organizer.events.store'));

        console.log('data ', data);
        console.log('testing ', errors);
    }

    const selectedPlace: any = {}
    const [selected, setSelected] = useState<any>(null);

    const onSelect = (marker: any) => {
        setSelected(marker);
    };
    // Your form errors
    const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default center (San Francisco)
    const [selectedLocation, setSelectedLocation] = useState(null);

    const googleMapsApiKey = 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE';//
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const onMapClick = useCallback((event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const newLocation = { lat, lng };
        setSelectedLocation(newLocation);
        setMapCenter(newLocation);
        setData({ ...data, location_base: `${lat}, ${lng}` }); // Update location with lat,lng
    }, [data]);

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const newLocation = { lat, lng };
                setSelectedLocation(newLocation);
                setMapCenter(newLocation);
                setData({ ...data, location_base: place.formatted_address || `${lat}, ${lng}` }); // Use formatted address or coordinates
            }
        }
    };

    // Handle manual location input
    const handleLocationChange = (e: any) => {
        setData({ ...data, location_base: e.target.value });
    };

    return (
        <Modal className='modal-dialog-centered' centered show={addEventModal} onHide={() => showModal()} backdrop={'static'}>
            <Modal.Header>
                <h5 className="modal-title" id="staticBackdropLabel">Create Event</h5>
                <Button type="button" className="btn-close"
                    onClick={() => {
                        showModal();
                    }} aria-label="Close"></Button>
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <form onSubmit={submit}>
                    <Row className="gy-3">
                        <Col md={12}>
                            <div className="">
                                <Form.Label htmlFor="name" className="form-label text-start w-100">Event Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.name} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="">
                                <Form.Label htmlFor="name" className="form-label text-start w-100">Start Date</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d M, Y"
                                    }}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            start_date: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                        }))
                                    }
                                    }
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.start_date} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="">
                                <Form.Label htmlFor="name" className="form-label text-start w-100">End Date</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d M, Y"
                                    }}
                                    onChange={([selectedDate]: Date[]) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            end_date: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                        }))
                                    }
                                    }
                                />
                                < Form.Control.Feedback type="invalid" className='d-block mt-2' > {errors.end_date} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <Col>
                            <Tab.Container defaultActiveKey="2">
                                <Nav className="nav-tabs nav-justified mb-3">
                                    <Nav.Item
                                        onClick={() => setData('type', 'virtual')}>
                                        <Nav.Link eventKey="1">
                                            Virtual Event
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item
                                        onClick={() => setData('type', 'hybrid')}>
                                        <Nav.Link eventKey="2">
                                            Hybrid Event
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item
                                        onClick={() => setData('type', 'in-person')}>
                                        <Nav.Link eventKey="3">
                                            In-Person Event
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content className="text-muted">
                                    <Tab.Pane eventKey="1" id="base-justified-home">
                                        <div className="">
                                            <Form.Label htmlFor="virtual-location" className="form-label text-start w-100">Location</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="virtual-location"
                                                placeholder="Country used for default timezone"
                                                value={data.location_base}
                                                onChange={(e) => setData('location_base', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.location_base} </Form.Control.Feedback>
                                        </div>

                                    </Tab.Pane>

                                    <Tab.Pane eventKey="2" id="product">
                                        <div className="">
                                            <Form.Label htmlFor="in-person-location" className="form-label text-start w-100">Location</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="in-person-location"
                                                placeholder="Where does your event take place?"
                                                value={data.location_base}
                                                onChange={(e) => setData('location_base', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.location_base} </Form.Control.Feedback>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="3" id="in-person">
                                        <div className="">
                                            <Form.Label htmlFor="hybrid-location" className="form-label text-start w-100">Location</Form.Label>
                                            {/* <Autocomplete
                                                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                                onPlaceChanged={onPlaceChanged}
                                            > */}
                                                <Form.Control
                                                    type="text"
                                                    className="form-control mb-3"
                                                    id="hybrid-location"
                                                    placeholder="Where does your event take place?"
                                                    value={data.location_base}
                                                    // onChange={handleLocationChange}
                                                />
                                            {/* </Autocomplete> */}
                                            {/* <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}> 
                                                <GoogleMap
                                                    mapContainerStyle={containerStyle}
                                                    center={mapCenter}
                                                    zoom={13} // Adjust zoom level (e.g., 13 for city-level view)
                                                    onClick={onMapClick}
                                                >
                                                    {selectedLocation && <Marker position={selectedLocation} />}
                                                </GoogleMap>
                                            </LoadScript> */}
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.location_base} </Form.Control.Feedback>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Col>
                        <Col md={12}>
                            <div className="">
                                <Form.Label htmlFor="description" className="form-label text-start w-100">Event Description</Form.Label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    placeholder="Enter description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.description} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <div className="">
                            <Form.Label htmlFor="location-type" className="form-label text-start w-100">Location Type</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="location-type"
                                placeholder="Enter location type"
                                value={data.location_type}
                                onChange={(e) => setData('location_type', e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.location_type} </Form.Control.Feedback>
                        </div>
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <div>
                                <Form.Label htmlFor="singleDay" className="form-label text-start w-100">Single Day</Form.Label>
                                <Form.Check.Input
                                    type="radio"
                                    name='schedualType'
                                    className="form-check-input"
                                    id="singleDay"
                                    value={data.schedual_type}
                                    onChange={(e) => setData('schedual_type', 'singleday')}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.schedual_type} </Form.Control.Feedback>
                            </div>
                            <div>
                                <Form.Label htmlFor="multiDays" className="form-label text-start w-100">Multi Days</Form.Label>
                                <Form.Check.Input
                                    type="radio"
                                    name='schedualType'
                                    className="form-check-input"
                                    id="multiDays"
                                    value={data.schedual_type}
                                    onChange={(e) => setData('schedual_type', 'multiday')}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.schedual_type} </Form.Control.Feedback>
                            </div>
                            <div>
                                <Form.Label htmlFor="recurring" className="form-label text-start w-100">Recurring</Form.Label>
                                <Form.Check.Input
                                    type="radio"
                                    name='schedualType'
                                    className="form-check-input"
                                    id="recurring"
                                    value={data.schedual_type}
                                    onChange={(e) => setData('schedual_type', 'recurring')}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.schedual_type} </Form.Control.Feedback>
                            </div>
                        </div>
                    </Row>

                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Button disabled={processing} className="btn btn-light" onClick={() => showModal()}>Close</Button>
                        <Button type='submit' disabled={processing} className="btn btn-success">Create</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    )
}

export default CreateModal