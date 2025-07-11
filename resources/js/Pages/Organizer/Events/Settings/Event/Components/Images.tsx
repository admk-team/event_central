import { router, useForm, usePage } from '@inertiajs/react';
import React from 'react'
import { Button, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap'
import ImageCroper from "../../../../../../Components/ImageCroper";
type EventImage = {
    image_url: string | ArrayBuffer | null;
    id: string;
    is_new?: boolean;
};

export default function Images() {
    const event = usePage().props.event as any;
    const fileInput = React.useRef<HTMLInputElement>(null);
    const [eventImagePreviews, setEventImagePreviews] = React.useState<EventImage[]>([]);

    console.log(eventImagePreviews);
    //for image croper
    const [showCropper, setShowCropper] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

    React.useEffect(() => {
        setEventImagePreviews(event?.images ?? []);
    }, [event]);

    const triggerFileUpload = () => {
        fileInput.current?.click();
    };

    const [imageProcessing, setImageProcessing] = React.useState(false);

    const handleImageSelected = (e: any) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setShowCropper(true);
    };

    const updatePreview = (file: any) => {
        setImageProcessing(true);
        router.post(
            route('organizer.events.images.store', { event_app: event.id }), {
                image_files: file,
            },
            {
                preserveScroll: true,
                onFinish: () => setImageProcessing(false),
            }
        )
    }

    const removeImageForm = useForm();
    
    const removeImage = (imageId: EventImage["id"]) => {
        const eventImage = eventImagePreviews.find((item: EventImage) => item.id === imageId);
        if (eventImage?.is_new ?? false) {
            setEventImagePreviews(prev => prev.filter((item: EventImage) => item.id !== imageId));
        } else {
            removeImageForm.delete(route('organizer.events.images.destroy', {event_app: event.id, eventAppImage: imageId}), {
                preserveScroll: true,
            });
        }
    }

    const listImages = eventImagePreviews.map((image: EventImage) => (
        <div className="position-relative" key={image.id}>
            <img
                className="rounded img-fluid m-0"
                src={image.image_url}
                alt="event image"
                style={{ width: "100%", marginTop: "15px" }}
            />
            <Button 
                onClick={() => removeImage(image.id)} 
                type="button" 
                variant="danger"
                className="position-absolute" 
                style={{ top: '0px', left: '0px' }} 
                disabled={removeImageForm.processing}>
                Remove
            </Button>
        </div>
    ));

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <Card.Title className="mb-0">
                            Images{" "}
                            {eventImagePreviews.length > 0
                                ? `(${eventImagePreviews.length})`
                                : ""}
                        </Card.Title>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button
                            className="btn btn-primary btn-sm"
                            variant="icon"
                            onClick={triggerFileUpload}
                        >
                            {imageProcessing ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                <i className="bx bx-plus fs-5"></i>
                            )}
                        </Button>
                        <input
                            type="file"
                            hidden
                            ref={fileInput}
                            onChange={handleImageSelected}
                        />
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col
                            md={12}
                            lg={12}
                            className="p-2"
                            style={{
                                overflowY: "auto",
                                maxHeight: "330px",
                            }}
                        >
                            {listImages}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <ImageCroper
                visible={showCropper}
                imageSrc={selectedImage}
                onClose={() => setShowCropper(false)}
                onCrop={updatePreview}
            />
        </>
    )
}
