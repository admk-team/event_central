import React, { useEffect, useRef, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    Spinner,
    Col,
    Form,
    FormGroup,
    Modal,
    Nav,
    Row,
    Tab,
    Table,
    Button,
    ListGroup,
} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import Variants from "./Variants";
import { Container, Plus, Trash } from 'lucide-react';
import { boolean } from "yup";

export default function CreateEditModal({
    show,
    hide,
    onHide,
    addon,
}: {
    show: boolean;
    hide: () => void;
    onHide: () => void;
    addon: any;
}) {
    const isEdit = addon != null ? true : false;
    const editorRef = useRef<ClassicEditor>();
    const eventApp = usePage().props.currentEvent;
    const tickets = usePage().props.tickets as any[];
    const [displayNewField, setDisplayNewField] = useState(false);

    // console.log(eventApp);

    const { data, setData, post, put, processing, errors, reset, transform } =
        useForm<{
            _method: string;
            event_app_id: number;
            organizer_id: number;
            name: string;
            price: string;
            qty_total: string;
            qty_sold: string;
            enable_discount: boolean;
            event_app_ticket_id?: number | null;
            attributes: any[];
            variants: any[];
            deletedAttributes?: number[];
            deletedOptions?: number[];
            newField: string[];
        }>({
            _method: isEdit ? "PUT" : "POST",
            event_app_id: addon?.event_app_id ?? eventApp.id,
            organizer_id: addon?.organizer_id ?? eventApp.organizer_id,
            name: addon?.name ?? "",
            price: addon?.price ?? "0",
            qty_total: addon?.qty_total ?? "",
            qty_sold: addon?.qty_sold ?? "0",
            enable_discount: addon?.enable_discount ?? true,
            event_app_ticket_id: addon?.event_app_ticket_id,
            attributes: addon?.attributes ?? [],
            variants: addon?.variants ?? [],
            deletedAttributes: [],
            deletedOptions: [],
            newField: addon?.extra_fields ? JSON.parse(addon.extra_fields) : [],
        });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route("organizer.events.addon.update", addon.id), {
                onSuccess: () => {
                    reset();
                    hide();
                },
            });
        } else {
            post(route("organizer.events.addon.store"), {
                onSuccess: () => {
                    reset();
                    hide();
                },
            });
        }
    };

    const [useTicketInventory, setUseTicketInventory] = useState(data.event_app_ticket_id);

    const handleChange = (editorData: any) => {
        setData("name", editorData);
    };

    useEffect(() => {
        setData('qty_total', data.variants.reduce((total, variant) => total = total + variant.qty, 0));
    }, data.variants);

    function showNewField() {
        setDisplayNewField(true);
        setData("newField", [...data.newField, ""]);
    }

    function handleDeleteField(index: number) {
        const updatedFields = [...data.newField];
        updatedFields.splice(index, 1);
        setData("newField", updatedFields);
    }

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? "Edit Add-ons" : "Create Add-ons"}
                </h5>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={submit} className="tablelist-form">
                    <Row>
                        <Col md={12}>
                            <FormGroup className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    isInvalid={!!errors.name}
                                />
                                {errors.name && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                            {/* <FormGroup className="mb-3">
                                <CKEditor
                                    id="name"
                                    editor={ClassicEditor}
                                    data={data.name}
                                    config={
                                        {
                                            // removePlugins: ['Heading', 'Image']
                                        }
                                    }
                                    onReady={(editor) => {
                                        editorRef.current = editor;
                                        // console.log(editor);
                                    }}
                                    onChange={() => {
                                        handleChange(
                                            editorRef.current?.getData()
                                        );
                                    }}
                                />
                                {errors.name && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block"
                                    >
                                        {errors.name}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup className="mb-3">
                                <Form.Label className="m-0 d-flex justify-content-between align-items-center border p-3 cursor-pointer rounded" htmlFor="useTicketInventory">
                                    <Form.Label className="m-0 cursor-pointer" htmlFor="useTicketInventory">Use ticket inventory</Form.Label>
                                    <div className="form-check form-switch form-switch-lg" dir='ltr'>
                                        <FormCheckInput
                                            id="useTicketInventory"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={useTicketInventory}
                                            onChange={(e: any) => {
                                                setUseTicketInventory(e.target.checked);
                                                if (e.target.checked === false) {
                                                    setData('event_app_ticket_id', null);
                                                }
                                            }}
                                        />
                                    </div>
                                </Form.Label>

                            </FormGroup>
                        </Col>
                        {useTicketInventory && (
                            <Col md={12}>
                                <FormGroup className="mb-3">
                                    <Form.Label>Ticket</Form.Label>
                                    <Form.Select
                                        value={data.event_app_ticket_id}
                                        onChange={(e) => setData('event_app_ticket_id', e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {tickets.map(ticket => (
                                            <option value={ticket.id} key={ticket.id}>{ticket.name}</option>
                                        ))}
                                    </Form.Select>
                                </FormGroup>
                            </Col>
                        )}
                        <Col md={4}>
                            <FormGroup className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    isInvalid={!!errors.price}
                                />
                                {errors.price && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup className="mb-3">
                                <Form.Label>Total Qty</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={data.qty_total}
                                    onChange={(e) =>
                                        setData("qty_total", e.target.value)
                                    }
                                    isInvalid={!!errors.qty_total}
                                    disabled={!!useTicketInventory || data.variants.length > 0}
                                />
                                {errors.qty_total && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.qty_total}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup className="mb-3">
                                <Form.Label>Qty Sold</Form.Label>
                                <Form.Control
                                    title="Automatically calculated on Ticket Purchase Action"
                                    type="number"
                                    disabled
                                    value={data.qty_sold}
                                    onChange={(e) =>
                                        setData("qty_sold", e.target.value)
                                    }
                                    isInvalid={!!errors.qty_sold}
                                />
                                {errors.qty_sold && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.qty_sold}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                        </Col>

                        <Col md={12} className="mb-2">
                            <Form.Label>Add Extra Fields</Form.Label>

                            {data.newField.map((fieldValue, i) => (
                                <div key={i}>
                                    <Form.Label>Field Label</Form.Label>
                                    <FormGroup className="mb-3">
                                        <div className="input-group">
                                            <Form.Control
                                                type="text"
                                                value={fieldValue}
                                                onChange={(e) => {
                                                    const updated = [...data.newField];
                                                    updated[i] = e.target.value;
                                                    setData("newField", updated);
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteField(i)}
                                            >
                                                {/* trash icon */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="lucide lucide-trash2"
                                                >
                                                    <path d="M3 6h18"></path>
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                    <line x1="10" x2="10" y1="11" y2="17"></line>
                                                    <line x1="14" x2="14" y1="11" y2="17"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    </FormGroup>
                                </div>
                            ))}

                            <Button variant="light" className="w-100" onClick={showNewField}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-plus">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                            </Button>
                        </Col>



                        <Col md={12}>
                            <FormGroup className="mb-3">
                                <Form.Label className="m-0 d-flex justify-content-between align-items-center border p-3 cursor-pointer rounded" htmlFor="enableDiscount">
                                    <Form.Label className="m-0 cursor-pointer" htmlFor="enableDiscount">Enable Discount</Form.Label>
                                    <div className="form-check form-switch form-switch-lg" dir='ltr'>
                                        <FormCheckInput
                                            id="enableDiscount"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={data.enable_discount}
                                            onChange={(e: any) => setData('enable_discount', e.target.checked)}
                                        />
                                    </div>
                                </Form.Label>
                            </FormGroup>
                        </Col>

                        <Variants
                            data={{
                                attributes: data.attributes,
                                variants: data.variants,
                                defaultPrice: data.price,
                            }}
                            onDataChange={(variantsData) => {
                                setData({
                                    ...data,
                                    attributes: variantsData.attributes,
                                    variants: variantsData.variants,
                                    deletedAttributes: variantsData.deletedAttributes,
                                    deletedOptions: variantsData.deletedOptions,
                                });
                            }}
                        />
                    </Row>
                </Form>
            </Modal.Body>

            <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={hide}>
                    Close
                </button>
                <button
                    type="button"
                    className="btn btn-success"
                    disabled={processing}
                    onClick={submit}
                >
                    {processing ? (
                        <span className="d-flex gap-1 align-items-center">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            {isEdit ? "Updating" : "Creating"}
                        </span>
                    ) : (
                        <span>{isEdit ? "Update" : "Create"}</span>
                    )}
                </button>
            </div>
        </Modal>
    );
}
