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

// interface CreateModalProps {
//     addEventModal: boolean;
//     showModal: () => void;
// }

function CreateEditModal({ show, hide, onHide, event, recurring_types, event_category_types }: { show: boolean, hide: () => void, onHide: () => void, event: any | null, recurring_types: any, event_category_types: any }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        event_category_id: event?.event_category_id ?? "",
        recurring_type_id: event?.recurring_type_id ?? "",
        name: event?.name ?? "",
        start_date: event?.start_date ?? "",
        description: event?.description ?? "",
        location_type: event?.location_type ?? "",
        location_base: event?.location_base ?? "",
        type: 'in-person',
        is_recurring: event?.is_recurring ?? false,
        schedual_type: event?.schedual_type ?? 'singleday',
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
        <Modal className='modal-dialog-centered' centered show={show} onHide={() => { }} backdrop={'static'}>
            <Modal.Header>
                <h5 className="modal-title" id="staticBackdropLabel">Create Event</h5>
                <Button type="button" className="btn-close"
                    onClick={() => {
                        hide();
                    }} aria-label="Close"></Button>
            </Modal.Header>
            <Modal.Body className="text-center p-4">
                <form onSubmit={submit}>
                    <Row className="gy-3">
                        <Col md={12}>
                            <div className="">
                                <Form.Label htmlFor="event_category_id" className="form-label text-start w-100">Event Category</Form.Label>
                                <Form.Select aria-label="Default select example" className="form-control" id="name"
                                    value={data.event_category_id} onChange={(e) => setData('event_category_id', e.target.value)}>
                                    <option>Select Event Type</option>

                                    {event_category_types && event_category_types.map((type: any) =>
                                        <option value={type.id} key={type.id}>{type.name}</option>
                                    )}
                                </Form.Select>

                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.name} </Form.Control.Feedback>
                            </div>
                        </Col>
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
                        <Col md={12}>
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
                        <Col md={12}>
                            <div className="">
                                <Form.Label htmlFor="description" className="form-label text-start w-100">Event Description</Form.Label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows={4}
                                    placeholder="Enter description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.description} </Form.Control.Feedback>
                            </div>
                        </Col>
                        <Col md={12}>
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
                        </Col>
                        <Row>
                            <Col md={12} lg={12} className='d-flex justify-content-between align-items-center'>
                                <Form.Check // prettier-ignore
                                    type='switch'
                                    id='is_recurring'
                                    label="Is Event Recurring"
                                    value={data.is_recurring}
                                    onChange={(e) => setData('is_recurring', e.target.value)}
                                />
                                {data.is_recurring &&
                                    <div className="">
                                        <Form.Select aria-label="Default select example" className="form-control" id="name"
                                            value={data.recurring_type_id} onChange={(e) => setData('recurring_type_id', e.target.value)}>
                                            <option>Select Recurring Type</option>

                                            {recurring_types && recurring_types.map((type: any) =>
                                                <option value={type.id} key={type.id}>{type.name}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.recurring_type_id} </Form.Control.Feedback>
                                    </div>
                                }
                            </Col>
                        </Row>
                    </Row>

                    <div className="hstack gap-2 justify-content-center mt-4">
                        <Button disabled={processing} className="btn btn-light">Close</Button>
                        <Button type='submit' disabled={processing} className="btn btn-success">Create</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    )
}

export default CreateEditModal
