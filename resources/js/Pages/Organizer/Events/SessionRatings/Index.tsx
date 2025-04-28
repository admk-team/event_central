
import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Container, Row, Col, Card, CardBody, Modal, Form, Button } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../Components/HasPermission";
import DeleteModal from "../../../../Components/Common/DeleteModal";

interface User {
    id?: number;
    name?: string;
    role?: string;
    is_organizer?: boolean;
}

interface EventSession {
    id: number;
    name: string;
    attendees_rating?: {
        id: number;
        first_name: string;
        avatar?: string;
        pivot: { rating: number; rating_description?: string };
    }[];
}

interface Props {
    eventSession: EventSession;
}

// Edit Rating Modal Component
function EditRatingModal({
    show,
    onHide,
    attendee,
    eventSessionId,
}: {
    show: boolean;
    onHide: () => void;
    attendee: any;
    eventSessionId: number;
}) {
    const { data, setData, put, errors } = useForm({
        rating: attendee?.pivot.rating || 0,
        rating_description: attendee?.pivot.rating_description || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("organizer.sessions.ratings.update", { eventSession: eventSessionId, attendeeId: attendee.id }), {
            onSuccess: () => onHide(),
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Rating</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Rating (1-5)</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            max={5}
                            value={data.rating}
                            onChange={(e) => setData("rating", parseInt(e.target.value))}
                            isInvalid={!!errors.rating}
                        />
                        <Form.Control.Feedback type="invalid">{errors.rating}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={data.rating_description}
                            onChange={(e) => setData("rating_description", e.target.value)}
                            isInvalid={!!errors.rating_description}
                        />
                        <Form.Control.Feedback type="invalid">{errors.rating_description}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

function Index({ eventSession }: Props) {
    const { auth } = usePage().props as { auth: { user: User } };
    const [showEditRatingModal, setShowEditRatingModal] = useState(false);
    const [editAttendee, setEditAttendee] = useState<any>(null);
    const [showDeleteRatingModal, setShowDeleteRatingModal] = useState(false);
    const [deleteAttendee, setDeleteAttendee] = useState<any>(null);

    const deleteForm = useForm({
        _method: "DELETE",
    });

    // Calculate ratings
    const ratedAttendees = eventSession.attendees_rating?.filter((attendee: any) => attendee.pivot.rating !== null) || [];
    const averageRating =
        ratedAttendees.length > 0
            ? ratedAttendees.reduce((acc: any, attendee: any) => acc + (attendee.pivot.rating || 0), 0) / ratedAttendees.length
            : 0;

    // Edit and Delete actions
    const handleEditRating = (attendee: any) => {
        setEditAttendee(attendee);
        setShowEditRatingModal(true);
    };

    const handleDeleteRating = (attendee: any) => {
        setDeleteAttendee(attendee);
        setShowDeleteRatingModal(true);
    };

    const confirmDeleteRating = () => {
        deleteForm.delete(
            route("organizer.sessions.ratings.destroy", { eventSession: eventSession.id, attendeeId: deleteAttendee.id }),
            {
                onSuccess: () => setShowDeleteRatingModal(false),
            }
        );
    };

    return (
        <React.Fragment>
            <Head title={`Ratings | ${eventSession?.name || "Event Central"}`} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title={`Ratings for ${eventSession?.name || "Unnamed Session"}`}
                        pageTitle="Events"
                    />
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6}>
                            <div className="text-center">
                                <h1>Session Ratings</h1>
                            </div>
                            <Card className="mt-4">
                                <CardBody>
                                    {/* Attendee Ratings with Average */}
                                    {ratedAttendees.length > 0 && (
                                        <div className="d-flex align-items-center mb-4">
                                            <span className="fs-3 me-3 mb-0">Attendee Ratings</span>
                                            {[...Array(5)].map((_, i) => (
                                                <i
                                                    key={i}
                                                    className={`bx ${i < Math.round(averageRating) ? 'bxs-star text-primary' : 'bx-star text-muted'}`}
                                                ></i>
                                            ))}
                                            <span className="ms-3 text-muted">({averageRating.toFixed(1)})</span>
                                        </div>
                                    )}
                                    {/* Individual Ratings with Scroll */}
                                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        {ratedAttendees.length > 0 ? (
                                            [...ratedAttendees].reverse().map((attendee) => (
                                                <div key={attendee.id} className="d-flex align-items-start mb-3">
                                                    <img
                                                        src={attendee.avatar || '/default-avatar.png'}
                                                        alt={attendee.first_name}
                                                        className="rounded-circle me-3"
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1">{attendee.first_name}</h6>
                                                        <div className="d-flex align-items-center mb-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <i
                                                                    key={i}
                                                                    className={`bx ${
                                                                        i < (attendee.pivot.rating || 0)
                                                                            ? 'bxs-star text-primary'
                                                                            : 'bx-star text-muted'
                                                                    }`}
                                                                ></i>
                                                            ))}
                                                        </div>
                                                        <p className="mb-0 text-muted">
                                                            {attendee.pivot.rating_description || 'No description provided'}
                                                        </p>
                                                    </div>
                                                    <div className="d-flex gap-2">
                                                        <HasPermission permission="edit_ratings">
                                                            <span
                                                                className="link-primary cursor-pointer"
                                                                onClick={() => handleEditRating(attendee)}
                                                            >
                                                                <i className="ri-edit-fill"></i>
                                                            </span>
                                                        </HasPermission>
                                                        <HasPermission permission="delete_ratings">
                                                            <span
                                                                className="link-danger cursor-pointer"
                                                                onClick={() => handleDeleteRating(attendee)}
                                                            >
                                                                <i className="ri-delete-bin-5-line"></i>
                                                            </span>
                                                        </HasPermission>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No ratings available for this session yet.</p>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="text-center">
                            <Link
                                href={route("organizer.events.schedule.index")}
                                className="btn btn-outline-primary"
                            >
                                <i className="ri-arrow-left-line"></i> Back to Schedule
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Edit Rating Modal */}
            <EditRatingModal
                show={showEditRatingModal}
                onHide={() => {
                    setShowEditRatingModal(false);
                    setEditAttendee(null);
                }}
                attendee={editAttendee}
                eventSessionId={eventSession.id}
            />

            {/* Delete Rating Modal */}
            <DeleteModal
                show={showDeleteRatingModal}
                onDeleteClick={confirmDeleteRating}
                onCloseClick={() => setShowDeleteRatingModal(false)}
            />
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
