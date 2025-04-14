import React, { useRef } from "react";
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
} from "react-bootstrap";

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

    // console.log(eventApp);

    const { data, setData, post, put, processing, errors, reset, transform } =
        useForm({
            _method: isEdit ? "PUT" : "POST",
            event_app_id: addon?.event_app_id ?? eventApp.id,
            organizer_id: addon?.organizer_id ?? eventApp.organizer_id,
            name: addon?.name ?? "",
            price: addon?.price ?? "0",
            qty_total: addon?.qty_total ?? "",
            qty_sold: addon?.qty_sold ?? "0",
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

    const handleChange = (editorData: any) => {
        setData("name", editorData);
    };

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
