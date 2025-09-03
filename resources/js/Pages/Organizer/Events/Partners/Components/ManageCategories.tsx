import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { Button, Form, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";

interface CreateModalProps {
    manageCategoriesModal: boolean;
    partnerCategories: any;
    showModal: () => void;
}

function ManageCategories({ manageCategoriesModal, showModal, partnerCategories }: CreateModalProps) {
    const { t } = useLaravelReactI18n();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory]: any = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        _method: string;
        order?: string;
    }>({
        name: "",
        order: "",
        _method: "POST",
    });

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const submit = (e: any) => {
        e.preventDefault();
        if (isEditing) {
            // Update the category
            post(route('organizer.events.partner-category.update', selectedCategory.id), {
                onSuccess: () => {
                    setIsEditing(false);
                    setSelectedCategory(null);
                    reset();
                },
            });
        } else {
            // Create a new category
            post(route('organizer.events.partner-category.store'), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const handleDelete = () => {
        if (selectedCategory) {
            // Delete the category
            deleteForm.post(route('organizer.events.partner-category.destroy', selectedCategory.id), {
                onSuccess: () => {
                    setIsEditing(false);
                    setSelectedCategory(null);
                    reset();
                },
            });
        }
    };

    const handleEditClick = (category: any) => {
        setIsEditing(true);
        setSelectedCategory(category);
        setData({
            name: category.name,
            _method: "PUT",
        });
    };

    const handleCreateClick = () => {
        setIsEditing(false);
        setSelectedCategory(null);
        setData({
            name: "",
            _method: "POST",
        });
    };

    return (
        <Modal
            className="modal-dialog-centered"
            centered
            show={manageCategoriesModal}
            onHide={() => showModal()}
            backdrop={"static"}
        >
            <Modal.Header>
                <h5 className="modal-title" id="staticBackdropLabel">
                    {t("Partner Categories")}
                </h5>
                <Button
                    type="button"
                    className="btn-close"
                    onClick={() => showModal()}
                    aria-label={t("Close")}
                ></Button>
            </Modal.Header>

            <Modal.Body className="text-center p-4">
                <ListGroup>
                    <div className="">
                        <form className="py-2" onSubmit={submit}>
                            {!isEditing && (
                                <>
                                    <div className="d-flex">
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            id="category_name"
                                            placeholder={t("Enter Category Name")}
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                        />
                                        <Button
                                            type="submit"
                                            className="btn btn-success ms-1"
                                            disabled={processing}
                                        >
                                            {t("Create")}
                                        </Button>
                                    </div>
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block mt-0"
                                    ></Form.Control.Feedback>
                                </>
                            )}

                            {isEditing && selectedCategory && (
                                <div className="my-4">
                                    <Form.Label htmlFor="name" className="form-label">
                                        {t("Update")}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder={t("Enter Category Name")}
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    <Button
                                        type="button"
                                        className="btn btn-danger ms-1 mt-2"
                                        onClick={handleDelete}
                                        disabled={processing}
                                    >
                                        {t("Delete")}
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="btn btn-success ms-1 mt-2"
                                        disabled={processing}
                                    >
                                        {t("Update")}
                                    </Button>
                                    <Button
                                        type="button"
                                        className="btn btn-secondary ms-1 mt-2"
                                        onClick={handleCreateClick}
                                    >
                                        {t("Cancel")}
                                    </Button>
                                </div>
                            )}
                        </form>

                        {partnerCategories?.map((category: any) => (
                            <ListGroupItem
                                as="button"
                                onClick={() => handleEditClick(category)}
                                className="list-group-item-action d-flex align-items-center justify-content-between w-100 rounded-2"
                                key={category.id}
                            >
                                {category.name}
                                <i className="ri-edit-fill align-middle ms-2"></i>
                            </ListGroupItem>
                        ))}
                    </div>
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default ManageCategories;
