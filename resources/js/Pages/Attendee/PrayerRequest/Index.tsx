import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import axios from "axios";
import {
    Card,
    Col,
    Container,
    Row,
    Tabs,
    Tab,
    Button,
    Form,
    Badge,
    Modal,
    Image,
} from "react-bootstrap";

interface Attendee {
    first_name: string;
    last_name: string;
    avatar: string | null;
}

interface PrayerRequest {
    id: number;
    message: string;
    request_type: string;
    status: string;
    count: number;
    attendee?: Attendee;
}

interface Props {
    my_requests: PrayerRequest[];
    public_requests: PrayerRequest[];
}

const PrayerRequests = ({ my_requests, public_requests }: Props) => {
    const [key, setKey] = useState("send");
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [viewRequest, setViewRequest] = useState<PrayerRequest | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [publicList, setPublicList] =
        useState<PrayerRequest[]>(public_requests);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        message: "",
        request_type: "public",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(route("attendee.prayer.update", editId), {
                onSuccess: () => {
                    reset();
                    setEditId(null);
                    setKey("my");
                },
            });
        } else {
            post(route("attendee.prayer.store"), {
                onSuccess: () => {
                    reset();
                    setKey("my");
                },
            });
        }
    };

    const handleEdit = (req: PrayerRequest) => {
        setData({ message: req.message, request_type: req.request_type });
        setEditId(req.id);
        setKey("send");
    };

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (deleteId !== null) {
            destroy(route("attendee.prayer.destroy", deleteId), {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                },
            });
        }
    };

    const handleView = async (req: PrayerRequest) => {
        try {
            setViewRequest(req);
            setShowViewModal(true);

            // Send view request and receive updated count
            const response = await axios.post(
                route("attendee.prayer.view", req.id)
            );

            const updatedCount = response.data?.count;

            if (updatedCount !== undefined) {
                // Update only that item's count in publicList
                setPublicList((prev) =>
                    prev.map((item) =>
                        item.id === req.id
                            ? { ...item, count: updatedCount }
                            : item
                    )
                );
            }
        } catch (err) {
            console.error("Failed to mark as viewed", err);
        }
    };

    const renderRequestCard = (req: PrayerRequest, isMine = false) => (
        <Col md={6} key={req.id} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                    {!isMine && req.attendee && (
                        <div className="d-flex align-items-center mb-2">
                            <Image
                                src={
                                    req.attendee.avatar ||
                                    "/images/default-avatar.png"
                                }
                                roundedCircle
                                width={40}
                                height={40}
                                className="me-2"
                            />
                            <div>
                                <strong>
                                    {req.attendee.first_name}{" "}
                                    {req.attendee.last_name}
                                </strong>
                                <div className="text-muted small">
                                    Shared publicly
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <Badge
                                bg={
                                    req.request_type === "public"
                                        ? "success"
                                        : "secondary"
                                }
                            >
                                {req.request_type.toUpperCase()}
                            </Badge>
                            {req.request_type === "public" && (
                                <span className="text-muted small">
                                    👁️ {req.count}
                                </span>
                            )}
                        </div>
                        {isMine && (
                            <div>
                                <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => handleEdit(req)}
                                    className="me-2"
                                >
                                    ✏️
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline-danger"
                                    onClick={() => confirmDelete(req.id)}
                                >
                                    🗑️
                                </Button>
                            </div>
                        )}
                    </div>

                    <Card.Text
                        className="fs-5 text-truncate"
                        style={{ maxHeight: "150px", cursor: "pointer" }}
                        onClick={() => handleView(req)}
                    >
                        {req.message.length > 300
                            ? req.message.slice(0, 300) + "..."
                            : req.message}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );

    return (
        <>
            <Head title="Prayer Requests" />
            <section className="section-bg py-5 mt-5 mb-5 bg-light">
                <Container>
                    <h2 className="text-center fw-bold mb-4 text-primary">
                        🙏 Prayer Requests
                    </h2>

                    <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k || "send")}
                        className="mb-4"
                        justify
                    >
                        <Tab
                            eventKey="send"
                            title={
                                editId ? "✏️ Edit Request" : "➕ Send Request"
                            }
                        >
                            <Card className="p-4 shadow-sm border-0">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">
                                            Prayer Message
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            placeholder="Write your prayer request here..."
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <div className="d-flex gap-3">
                                            <Form.Check
                                                type="radio"
                                                label="🌍 Public"
                                                name="request_type"
                                                checked={
                                                    data.request_type ===
                                                    "public"
                                                }
                                                onChange={() =>
                                                    setData(
                                                        "request_type",
                                                        "public"
                                                    )
                                                }
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="🔒 Private"
                                                name="request_type"
                                                checked={
                                                    data.request_type ===
                                                    "private"
                                                }
                                                onChange={() =>
                                                    setData(
                                                        "request_type",
                                                        "private"
                                                    )
                                                }
                                            />
                                        </div>
                                    </Form.Group>
                                    <Button type="submit" variant="primary">
                                        {editId
                                            ? "Update Request"
                                            : "Submit Request"}
                                    </Button>
                                    {editId && (
                                        <Button
                                            variant="secondary"
                                            className="ms-2"
                                            onClick={() => {
                                                reset();
                                                setEditId(null);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </Form>
                            </Card>
                        </Tab>

                        <Tab eventKey="my" title="📋 My Requests">
                            <Row>
                                {my_requests.length ? (
                                    my_requests.map((req) =>
                                        renderRequestCard(req, true)
                                    )
                                ) : (
                                    <Col className="text-center text-muted">
                                        You haven't made any requests yet.
                                    </Col>
                                )}
                            </Row>
                        </Tab>

                        <Tab eventKey="public" title="🌍 Public Requests">
                            <Row>
                                {publicList.length ? (
                                    publicList.map((req) =>
                                        renderRequestCard(req)
                                    )
                                ) : (
                                    <Col className="text-center text-muted">
                                        No public prayer requests yet.
                                    </Col>
                                )}
                            </Row>
                        </Tab>
                    </Tabs>
                </Container>
            </section>

            {/* View Modal */}
            <Modal
                show={showViewModal}
                onHide={() => setShowViewModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Prayer Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewRequest && <p>{viewRequest.message}</p>}
                </Modal.Body>
            </Modal>

            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Prayer Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this prayer request?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

PrayerRequests.layout = (page: any) => <Layout children={page} />;
export default PrayerRequests;
