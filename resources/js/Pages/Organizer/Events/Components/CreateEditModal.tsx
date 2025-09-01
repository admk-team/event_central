import { Link, useForm } from "@inertiajs/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import ImageCroper from "../../../../Components/ImageCroper/Index";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Modal,
    Row,
    Spinner,
} from "react-bootstrap";
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import QuillEditor from "../../../../Components/Quill/QuillEditor";
import { useLaravelReactI18n } from "laravel-react-i18n";
const containerStyle = {
    width: "100%",
    height: "200px",
};

//https://advanced-cropper.github.io/react-advanced-cropper/ To be used in future

const center = { lat: 37.778519, lng: -122.40564 };
const second = { lat: 54.526, lng: 15.2551 };
const third = { lat: 8.7832, lng: 34.5085 };
const fourth = { lat: 19.076, lng: 72.8777 };
const { t } = useLaravelReactI18n();
type EventImage = {
    image_url: string | ArrayBuffer | null;
    id: string;
    is_new?: boolean;
};

function CreateEditModal({
    show,
    hide,
    onHide,
    event,
    recurring_types,
    event_category_types,
}: {
    show: boolean;
    hide: () => void;
    onHide: () => void;
    event: any | null;
    recurring_types: any;
    event_category_types: any;
}) {
    const fileInput = useRef<HTMLInputElement>(null);
    const logoFileInput = useRef<HTMLInputElement>(null);
    const [imageHash, setImageHash] = useState(Date.now()); //Causing image to be reloaded (overriding cache)
    const [showRecurringOptions, setShowRecurringOptions] = useState(
        event?.is_recurring ?? false
    );
    const [eventImageFiles, setEventImageFiles] = useState(Array<File>());
    const [eventImagePreviews, setEventImagePreviews] = useState<EventImage[]>(
        []
    );

    const [imagePreview, setImagePreview] = useState<
        string | ArrayBuffer | null
    >(
        event
            ? event.logo_img + "?" + imageHash
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s"
    );

    //for image croper
    const [showCropper, setShowCropper] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [logoImage, setLogoImage] = useState(false);

    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
            _method: event ? "PUT" : "POST",
            id: event?.id ?? null,
            event_app_category_id: event?.event_app_category_id ?? "",
            recurring_type_id: event?.recurring_type_id ?? "",
            name: event?.name ?? "",
            tagline: event?.tagline ?? "",
            start_date: event?.dates[0].date ?? "",
            description: event?.description ?? "",
            location_type: event?.location_type ?? "test",
            location_base: event?.location_base ?? "test",
            type: "in-person",
            is_recurring: event?.is_recurring ?? false,
            schedual_type: event?.schedual_type ?? "singleday",
            logo_file: null, //To be used for new file
            image_files: [],
        });

    useEffect(() => {
        setEventImagePreviews(event?.images ?? []);
    }, [event]);

    const btnTitle = event ? "UPDATE" : "CREATE";

    const afterSumbitAction = {
        preserveScroll: true,
        onSuccess: () => {
            hide();
            setImageHash(Date.now());
        },
    };
    const submit = (e: any) => {
        e.preventDefault();

        if (!data.id) {
            post(route("organizer.events.store"), afterSumbitAction);
        } else {
            post(route("organizer.events.update", event.id), afterSumbitAction);
        }
        console.log("error data ", errors);
        console.log(" data ", data);
    };

    const handleLogoFileChange = (event: any) => {
        setLogoImage(true);
        let file = event.target.files[0];
        setSelectedImage(file);
        setShowCropper(true);
    };

    const updateImagePreview = (file: any) => {
        const reader = new FileReader();
        setData("logo_file", file);
        reader.addEventListener(
            "load",
            () => {
                setImagePreview(reader.result);
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
        setImageHash(Date.now());
    };

    const handleCheckChange = (e: any) => {
        setData("is_recurring", e.target.checked);
        setShowRecurringOptions(e.target.checked);
    };

    // ----------- Google Maps ------------------------

    const selectedPlace: any = {};
    const [selected, setSelected] = useState<any>(null);

    const onSelect = (marker: any) => {
        setSelected(marker);
    };

    const [mapCenter, setMapCenter] = useState({
        lat: 37.7749,
        lng: -122.4194,
    }); // Default center (San Francisco)
    const [selectedLocation, setSelectedLocation] = useState(null);

    const googleMapsApiKey = "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE"; //
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );

    const onMapClick = useCallback(
        (event: any) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            const newLocation = { lat, lng };
            setSelectedLocation(newLocation);
            setMapCenter(newLocation);
            setData({ ...data, location_base: `${lat}, ${lng}` }); // Update location with lat,lng
        },
        [data]
    );

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const newLocation = { lat, lng };
                setSelectedLocation(newLocation);
                setMapCenter(newLocation);
                setData({
                    ...data,
                    location_base: place.formatted_address || `${lat}, ${lng}`,
                }); // Use formatted address or coordinates
            }
        }
    };

    // Handle manual location input
    const handleLocationChange = (e: any) => {
        setData({ ...data, location_base: e.target.value });
    };

    const triggerFileUpload = () => {
        setLogoImage(false);
        fileInput.current?.click();
    };

    const handleImageSelected = (e: any) => {
        const file = e.target.files[0];
        // updatePreview(file);
        setSelectedImage(file);
        setShowCropper(true);
    };

    const updatePreview = (file: any) => {
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                let list = Array<EventImage>(...eventImagePreviews);
                list.push({
                    image_url: reader.result,
                    id: new Date().toString(),
                    is_new: true,
                });
                setEventImagePreviews(list);

                let list_files = Array<File>(...eventImageFiles);
                list_files.push(file);
                setEventImageFiles(list_files);
                console.log("file added..");
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        let list = [...eventImageFiles];
        transform((data) => ({
            ...data,
            image_files: list,
        }));
        setData("image_files", list);
    }, [eventImageFiles]);

    const removeImageForm = useForm();

    const removeImage = (imageId: EventImage["id"]) => {
        const eventImage = eventImagePreviews.find(
            (item: EventImage) => item.id === imageId
        );
        if (eventImage?.is_new ?? false) {
            setEventImagePreviews((prev) =>
                prev.filter((item: EventImage) => item.id !== imageId)
            );
        } else {
            removeImageForm.delete(
                route("organizer.events.images.destroy", {
                    event_app: event.id,
                    eventAppImage: imageId,
                }),
                {
                    preserveScroll: true,
                }
            );
        }
    };

    const listImages = eventImagePreviews.map((image: EventImage) => (
        <div className="position-relative" key={image.id}>
            <img
                className="rounded img-fluid"
                src={image.image_url}
                alt="event image"
                style={{ width: "100%", marginTop: "15px" }}
            />
            <Button
                onClick={() => removeImage(image.id)}
                type="button"
                variant="danger"
                className="position-absolute"
                style={{ top: "15px", left: "0px" }}
                disabled={removeImageForm.processing}
            >
                {t("Remove")}
            </Button>
        </div>
    ));

    return (
        <>
            <Modal
                className="modal-dialog-centered"
                size="xl"
                centered
                show={show}
                onHide={() => { }}
                backdrop={"static"}
            >
                <Modal.Header>
                    <h5 className="modal-title" id="staticBackdropLabel">
                        {t("Create Event")}
                    </h5>
                    <Button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                            hide();
                        }}
                        aria-label="Close"
                    ></Button>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <form onSubmit={submit}>
                        <Row>
                            <Col md={6} lg={6}>
                                <FormGroup className="mb-3">
                                    <Form.Label
                                        htmlFor="event_app_category_id"
                                        className="form-label text-start w-100"
                                    >
                                        {t("Event Category")}
                                    </Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        className="form-control"
                                        id="name"
                                        value={data.event_app_category_id}
                                        onChange={(e) =>
                                            setData(
                                                "event_app_category_id",
                                                e.target.value
                                            )
                                        }
                                        isInvalid={
                                            !!errors.event_app_category_id
                                        }
                                    >
                                        <option>{t("Select Event Type")}</option>
                                        {event_category_types &&
                                            event_category_types.map(
                                                (type: any) => (
                                                    <option
                                                        value={type.id}
                                                        key={type.id}
                                                    >
                                                        {type.name}
                                                    </option>
                                                )
                                            )}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.event_app_category_id}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Form.Label
                                        htmlFor="name"
                                        className="form-label text-start w-100"
                                    >
                                        {t("Event Name")}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder={t("Enter name")}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {" "}
                                        {errors.name}{" "}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Form.Label
                                        htmlFor="start_date"
                                        className="form-label text-start w-100"
                                    >
                                        {t("Start Date")}
                                    </Form.Label>
                                    <Flatpickr
                                        id="start_date"
                                        className={
                                            "form-control " +
                                            (!!errors.start_date
                                                ? "is-invalid"
                                                : "")
                                        }
                                        options={{
                                            altInput: true,
                                            altFormat: "d M, Y",
                                            dateFormat: "Y-m-d",
                                        }}
                                        value={data.start_date}
                                        onChange={([selectedDate]: Date[]) => {
                                            setData((prevData) => ({
                                                ...prevData,
                                                start_date: selectedDate
                                                    .toLocaleDateString("en-CA")
                                                    .split("T")[0],
                                            }));
                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {" "}
                                        {errors.start_date}{" "}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Form.Label
                                        htmlFor="tagline"
                                        className="form-label text-start w-100"
                                    >
                                        {t("Tagline")}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="tagline"
                                        placeholder={t("Enter tagline")}
                                        value={data.tagline}
                                        onChange={(e) =>
                                            setData("tagline", e.target.value)
                                        }
                                        isInvalid={!!errors.tagline}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {" "}
                                        {errors.tagline}{" "}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Form.Label
                                        htmlFor="description"
                                        className="form-label text-start w-100"
                                    >
                                        {t("Event Description")}
                                    </Form.Label>
                                    <div className={!!errors.description ? "is-invalid" : ""}>
                                        <QuillEditor
                                        value={data.description}
                                        onChange={(val) => setData("description", val)}
                                        placeholder="Enter description"
                                        className="form-control"
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {" "}
                                        {errors.description}{" "}
                                    </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Row className="mt-3">
                                        <Col
                                            md={12}
                                            lg={12}
                                            className="d-flex justify-content-between align-items-center"
                                        >
                                            <Form.Check // prettier-ignore
                                                type="switch"
                                                isInvalid={
                                                    !!errors.is_recurring
                                                }
                                                id="is_recurring"
                                                label={t("Recurring")}
                                                checked={data.is_recurring}
                                                value={data.is_recurring}
                                                onClick={handleCheckChange}
                                                onChange={handleCheckChange}
                                            />
                                            {showRecurringOptions && (
                                                <div className="">
                                                    <Form.Select
                                                        aria-label="Select Recurring Frequency"
                                                        className="form-control"
                                                        id="name"
                                                        value={
                                                            data.recurring_type_id
                                                        }
                                                        isInvalid={
                                                            !!errors.recurring_type_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "recurring_type_id",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option>
                                                            {t("Select Recurring Frequency")}
                                                        </option>

                                                        {recurring_types &&
                                                            recurring_types.map(
                                                                (type: any) => (
                                                                    <option
                                                                        value={
                                                                            type.id
                                                                        }
                                                                        key={
                                                                            type.id
                                                                        }
                                                                    >
                                                                        {
                                                                            type.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        {" "}
                                                        {
                                                            errors.recurring_type_id
                                                        }{" "}
                                                    </Form.Control.Feedback>
                                                </div>
                                            )}
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
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="d-flex flex-column align-items-center w-100">
                                                <img
                                                    src={imagePreview}
                                                    alt="Event Model Logo"
                                                    className="img-fluid rounded-circle avatar-lg"
                                                />
                                                <Button
                                                    className="btn btn-primary mt-3 btn-sm w-50"
                                                    onClick={() => {
                                                        logoFileInput.current?.click();
                                                    }}
                                                >
                                                    {t("Change Event Logo")}
                                                </Button>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={handleLogoFileChange}
                                                ref={logoFileInput}
                                            />
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className=" d-block"
                                        >
                                            {errors.logo_file}
                                        </Form.Control.Feedback>
                                        {/* <Form.Group
                                            controlId="formFileMultiple"
                                            className="mb-3"
                                        >
                                            <Form.Label>Event Logo</Form.Label>
                                            <Form.Control
                                                type="file"
                                                name="logo_file"
                                                placeholder="Choose File For Event Logo"
                                                onChange={handleLogoFileChange}
                                                isInvalid={!!errors.logo_file}
                                                accept="image/*"
                                            />
                                        </Form.Group> */}
                                    </Col>
                                </Row>
                                <Row className="bg-light p-2 rounded mt-2">
                                    <Col
                                        md={10}
                                        lg={10}
                                        className="d-flex align-items-center"
                                    >
                                        <h5 className="p-0 m-0">
                                            {t("Event Images")}{" "}
                                            {eventImagePreviews.length > 0
                                                ? `(${eventImagePreviews.length})`
                                                : ""}
                                        </h5>
                                    </Col>
                                    <Col
                                        md={2}
                                        lg={2}
                                        className="d-flex justify-content-end"
                                    >
                                        <Button
                                            className="btn btn-primary btn-sm"
                                            size="sm"
                                            onClick={triggerFileUpload}
                                        >
                                            <i className="bx bx-plus fs-5"></i>
                                        </Button>
                                        <input
                                            type="file"
                                            hidden
                                            ref={fileInput}
                                            onChange={handleImageSelected}
                                        />
                                    </Col>
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className=" d-block"
                                    >
                                        {" "}
                                        {errors.image_files}{" "}
                                    </Form.Control.Feedback>
                                </Row>
                                <Row>
                                    <Col
                                        md={12}
                                        lg={12}
                                        className="p-2"
                                        style={{
                                            marginTop: "10px",
                                            overflowY: "auto",
                                            maxHeight: "330px",
                                        }}
                                    >
                                        {listImages}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <div className="hstack gap-2 justify-content-between mt-4">
                            <Button
                                disabled={processing}
                                className="btn btn-light"
                                onClick={hide}
                            >
                                {t("Close")}
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="btn btn-success"
                                style={{ width: "150px" }}
                            >
                                {btnTitle}
                                {processing && (
                                    <Spinner
                                        animation="border"
                                        role="status"
                                        size="sm"
                                        className="ms-2"
                                    >
                                        <span className="visually-hidden">
                                            {t("Loading...")}
                                        </span>
                                    </Spinner>
                                )}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <ImageCroper
                visible={showCropper}
                imageSrc={selectedImage}
                onClose={() => setShowCropper(false)}
                onCrop={logoImage == true ? updateImagePreview : updatePreview}
            />
        </>
    );
}

export default CreateEditModal;
