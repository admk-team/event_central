import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Row, Image } from "react-bootstrap";

export default function CreateEditModal({ show, handleClose, product }: any) {
    const [isPreview, setIsPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        price: "",
        old_price: "",
        stock: "",
        image: null,
    });

    // Only run when modal is opened or product changes
    useEffect(() => {
        if (!show) return;

        if (product && product.id) {
            // Edit mode
            setData({
                name: product.name ?? "",
                description: product.description ?? "",
                price: product.price ?? "",
                old_price: product.old_price ?? "",
                stock: product.stock ?? "",
                image: null,
            });
            setIsPreview(product.image_url ?? null);
        } else {
            // Add mode
            reset();
            setIsPreview(null);
        }
    }, [show, product]);

    const handleChange = (e: any) => {
        const { name, files, value } = e.target;

        if (name === "image" && files && files[0]) {
            const file = files[0];
            setData("image", file);
            setIsPreview(URL.createObjectURL(file));
        } else {
            setData(name, value);
        }
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const url = product?.id
            ? route("organizer.events.update.product", product.id)
            : route("organizer.events.products.store");

        post(url, {
            onSuccess: () => {
                handleClose();
                reset();
                setIsPreview(null);
            },
        });
    };

    const isEditMode = Boolean(product?.id);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEditMode ? "Edit Product" : "Add Product"}
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(event) => setData("name", event.target.value)}
                            placeholder="Enter product name"
                        />
                        {errors.name && (
                            <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                {errors.name}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={data.description}
                            onChange={(event) => setData("description", event.target.value)}
                            placeholder="Enter description"
                        />
                        {errors.description && (
                            <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                {errors.description}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={data.price}
                                    onChange={(event) => setData("price", event.target.value)}
                                    placeholder="Enter price"
                                />
                                {errors.price && (
                                    <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Old Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="old_price"
                                    value={data.old_price}
                                    onChange={(event) => setData("old_price", event.target.value)}
                                    placeholder="Enter old price"
                                />
                                {errors.old_price && (
                                    <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                        {errors.old_price}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={data.stock}
                            onChange={(event) => setData("stock", event.target.value)}
                            placeholder="Enter stock quantity"
                        />
                        {errors.stock && (
                            <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                {errors.stock}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="image" onChange={handleChange} />
                        {errors.image && (
                            <Form.Control.Feedback type="invalid" className="d-block mt-2">
                                {errors.image}
                            </Form.Control.Feedback>
                        )}
                        {isPreview && (
                            <div className="mt-3 text-center">
                                <Image
                                    src={isPreview}
                                    thumbnail
                                    alt="Preview"
                                    style={{
                                        maxHeight: "150px",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        )}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={processing}>
                        {isEditMode ? "Update Product" : "Save Product"}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
