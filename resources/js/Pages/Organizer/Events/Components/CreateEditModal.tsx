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

    const [imageHash, setImageHash] = useState(Date.now());   //Causing image to be reloaded (overriding cache)
    const [showRecurringOptions, setShowRecurringOptions] = useState(event?.is_recurring ?? false);
    const [imagePreview, setImagePreview] = useState(event ? (event.logo_img + '?' + imageHash) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s');

    // console.log(event);

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: event ? "PUT" : "POST",
        id: event?.id ?? null,
        event_app_category_id: event?.event_app_category_id ?? "",
        recurring_type_id: event?.recurring_type_id ?? "",
        name: event?.name ?? "",
        start_date: event?.start_date ?? "",
        description: event?.description ?? "",
        location_type: event?.location_type ?? "test",
        location_base: event?.location_base ?? "test",
        type: 'in-person',
        is_recurring: event?.is_recurring ?? false,
        schedual_type: event?.schedual_type ?? 'singleday',
        logo_file: '',      //To be use for new file
    });


    const btnTitle = event ? 'UPDATE' : 'CREATE';
    const afterSumbitAction = {
        preserveScroll: true,
        onSuccess: () => {
            hide();
            setImageHash(Date.now());
        }
    };
    const submit = (e: any) => {
        e.preventDefault();
        if (!data.id) {
            post(route('organizer.events.store'), afterSumbitAction);
        } else {
            post(route('organizer.events.update', event.id), afterSumbitAction);
        }
        // console.log('form data ', data);
        console.log('error data ', errors);
        // hide();
    }

    const handleLogoFileChange = (event: any) => {
        let file = event.target.files[0];
        setData('logo_file', file);
        updateImagePreview(file);
        setImageHash(Date.now());
    }

    const updateImagePreview = (file: any) => {
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                setImagePreview(reader.result);
            },
            false,
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleCheckChange = (e: any) => {
        setData('is_recurring', e.target.checked);
        setShowRecurringOptions(e.target.checked);
    }



    // ----------- Google Maps ------------------------

    const selectedPlace: any = {}
    const [selected, setSelected] = useState<any>(null);

    const onSelect = (marker: any) => {
        setSelected(marker);
    };

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
            <Modal.Body className="p-4">

                <div className='d-flex justify-content-center'>
                    <img src={imagePreview} alt="Event Model Logo" style={{ borderRadius: '50%', height: '150px' }} />
                </div>

                <form onSubmit={submit}>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Event Logo</Form.Label>
                        <Form.Control
                            type="file"
                            name='logo_file'
                            placeholder="Choose File For Event Logo"
                            onChange={handleLogoFileChange}
                            isInvalid={!!errors.logo_file}
                            accept="image/*"
                        />
                        <Form.Control.Feedback type="invalid"> {errors.logo_file} </Form.Control.Feedback>
                    </Form.Group>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="event_app_category_id" className="form-label text-start w-100">Event Category</Form.Label>
                        <Form.Select aria-label="Default select example" className="form-control" id="name"
                            value={data.event_app_category_id} onChange={(e) => setData('event_app_category_id', e.target.value)} isInvalid={!!errors.event_app_category_id}>
                            <option>Select Event Type</option>
                            {event_category_types && event_category_types.map((type: any) =>
                                <option value={type.id} key={type.id}>{type.name}</option>
                            )}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid"> {errors.event_app_category_id} </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="name" className="form-label text-start w-100">Event Name</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid"> {errors.name} </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="start_date" className="form-label text-start w-100">Start Date</Form.Label>
                        <Flatpickr
                            id="start_date"
                            className={'form-control ' + (!!errors.start_date ? 'is-invalid' : '')}
                            options={{
                                altInput: true,
                                altFormat: "d M, Y",
                                dateFormat: "Y-m-d"
                            }}
                            value={data.start_date}
                            onChange={([selectedDate]: Date[]) => {
                                setData((prevData) => ({
                                    ...prevData,
                                    start_date: selectedDate.toLocaleDateString("en-CA").split("T")[0]
                                }))
                            }
                            }
                        />
                        <Form.Control.Feedback type="invalid"> {errors.start_date} </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="description" className="form-label text-start w-100">Event Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            className="form-control"
                            id="description"
                            rows={4}
                            isInvalid={!!errors.description}
                            placeholder="Enter description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid"> {errors.description} </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Row className='mt-3'>
                            <Col md={12} lg={12} className='d-flex justify-content-between align-items-center'>
                                <Form.Check // prettier-ignore
                                    type='switch'
                                    isInvalid={!!errors.is_recurring}
                                    id='is_recurring'
                                    label="Recurring"
                                    checked={data.is_recurring}
                                    value={data.is_recurring}
                                    onClick={handleCheckChange}
                                    onChange={handleCheckChange}
                                />
                                {showRecurringOptions && <div className="">
                                    <Form.Select
                                        aria-label="Select Recurring Frequency"
                                        className="form-control" id="name"
                                        value={data.recurring_type_id}
                                        isInvalid={!!errors.recurring_type_id}
                                        onChange={(e) => setData('recurring_type_id', e.target.value)}>
                                        <option>Select Recurring Frequency</option>

                                        {recurring_types && recurring_types.map((type: any) =>
                                            <option value={type.id} key={type.id}>{type.name}</option>
                                        )}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid"> {errors.recurring_type_id} </Form.Control.Feedback>
                                </div>}
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="location-type" className="form-label text-start w-100">Location Type</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            id="location-type"
                            isInvalid={!!errors.location_type}
                            placeholder="Enter location type"
                            value={data.location_type}
                            onChange={(e) => setData('location_type', e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid"> {errors.location_type} </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <LoadScript googleMapsApiKey="AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE">
                            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                                <Marker position={center} onClick={() => onSelect(center)} />
                                {selected && (
                                    <InfoWindow
                                        position={selected}
                                        onCloseClick={() => setSelected(null)}
                                    >
                                        <div>
                                            <h1>{selectedPlace.name}</h1>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        </LoadScript>
                    </FormGroup>
                    <div className="hstack gap-2 justify-content-between mt-4">
                        <Button disabled={processing} className="btn btn-light" onClick={hide}>Close</Button>
                        <Button type='submit' disabled={processing} className="btn btn-success">{btnTitle}</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    )
}

export default CreateEditModal
