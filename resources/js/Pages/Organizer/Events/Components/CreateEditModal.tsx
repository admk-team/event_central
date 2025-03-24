import { Link, useForm } from '@inertiajs/react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Flatpickr from "react-flatpickr";
import { Button, Col, Form, FormGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '200px',
};

const center = { lat: 37.778519, lng: -122.40564 };
const second = { lat: 54.5260, lng: 15.2551 }
const third = { lat: 8.7832, lng: 34.5085 }
const fourth = { lat: 19.0760, lng: 72.8777 }

function CreateEditModal({ show, hide, onHide, event, recurring_types, event_category_types }:
    { show: boolean, hide: () => void, onHide: () => void, event: any | null, recurring_types: any, event_category_types: any }) {

    const fileInput = useRef(null);
    const [imageHash, setImageHash] = useState(Date.now());   //Causing image to be reloaded (overriding cache)
    const [showRecurringOptions, setShowRecurringOptions] = useState(event?.is_recurring ?? false);
    const [eventImageFiles, setEventImageFiles] = useState([]);
    const [eventImagePreviews, setEventImagePreviews] = useState([]);

    const [imagePreview, setImagePreview] = useState(event ? (event.logo_img + '?' + imageHash) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s');


    const { data, setData, post, processing, errors, reset, transform } = useForm({
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
        logo_file: null,      //To be used for new file
        image_files: [],
    });

    useEffect(() => {
        setEventImagePreviews(event?.images ?? []);
    }, []);

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
        console.log('error data ', errors);
        console.log(' data ', data);
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

    const triggerFileUpload = () => {
        fileInput.current?.click();
    }

    const handleImageSelected = (e: any) => {
        const file = e.target.files[0];
        updatePreview(file);
    }

    const updatePreview = (file: any) => {
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                let list = [...eventImagePreviews];
                list.push({ image_url: reader.result, id: new Date().toString() });
                setEventImagePreviews(list);

                let list_files = [...eventImageFiles];
                list_files.push(file);
                setEventImageFiles(list_files);
                console.log('file added..');
            },
            false,
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        let list = [...eventImageFiles];
        transform((data) => ({
            ...data,
            image_files: list
        }));
        setData('image_files', list);
    }, [eventImageFiles]);

    const listImages = eventImagePreviews.map(image =>
        <img src={image.image_url} alt="event image" style={{ width: '100%', marginTop: '15px' }} key={image.id} />
    );

    return (
        <Modal className='modal-dialog-centered' size='xl' centered show={show} onHide={() => { }} backdrop={'static'}>
            <Modal.Header>
                <h5 className="modal-title" id="staticBackdropLabel">Create Event</h5>
                <Button type="button" className="btn-close"
                    onClick={() => {
                        hide();
                    }} aria-label="Close"></Button>
            </Modal.Header>
            <Modal.Body className="p-4">
                <form onSubmit={submit}>
                    <Row>
                        <Col md={6} lg={6}>
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
                                    rows={10}
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
                            {/* <FormGroup className="mb-3">
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
                            </FormGroup> */}
                        </Col>
                        <Col md={6} lg={6}>
                            <Row>
                                <Col md={12} lg={12}>
                                    <div className='d-flex justify-content-center'>
                                        <img src={imagePreview} alt="Event Model Logo" style={{ borderRadius: '50%', height: '100px', border: '1px solid lightgray' }} />
                                    </div>
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
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10} lg={10} className='d-flex align-items-center'>
                                    <h5>Event Images</h5>
                                </Col>
                                <Col md={2} lg={2} className='d-flex justify-content-end'>
                                    <Button className="btn btn-primary" size='sm' onClick={triggerFileUpload}>
                                        <i className='bx bx-plus fs-3'></i>
                                    </Button>
                                    <input type="file" hidden ref={fileInput} onChange={handleImageSelected} />
                                </Col>
                                <Form.Control.Feedback type="invalid" className=' d-block'> {errors.image_files} </Form.Control.Feedback>
                            </Row>
                            <Row>
                                <Col md={12} lg={12} className='p-2' style={{ marginTop: '10px', overflowY: 'auto', maxHeight: '250px' }}>
                                    {listImages}
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <div className="hstack gap-2 justify-content-between mt-4">
                        <Button disabled={processing} className="btn btn-light" onClick={hide}>Close</Button>
                        <Button type='submit' disabled={processing} className="btn btn-success" style={{ width: '150px' }}>
                            {btnTitle}
                            {processing && <Spinner animation="border" role="status" size='sm'>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    )
}

export default CreateEditModal
