import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../Components/HasPermission";
import DataTable, { ColumnDef } from "../../../../Components/DataTable";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import CreateEditModal from "./Components/CreateEditModal";

function Index({ data }: any) {
    const [showCreateEditModal, setShowCreateEditModal] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);
    const [deleteItem, setDeleteItem] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const deleteForm = useForm({
        _method: "DELETE",
    });

    const handleEdit = (item: any) => {
        setEditItem(item);
        setShowCreateEditModal(true);
    };

    const handleDelete = () => {
        deleteForm.delete(
            route("organizer.prayer-requests.destroy", deleteItem.id)
        );
        setShowDeleteConfirmation(false);
    };
    const columns: ColumnDef<(typeof data.data)[0]> = [
        {
            accessorKey: "id",
            header: () => "ID",
            cell: (row) => row.id,
            enableSorting: true,
        },
        {
            accessorKey: "name",
            header: () => "Name",
            cell: (row) => row.attendee.name,
            enableSorting: true,
        },
        {
            accessorKey: "request",
            header: () => "Prayer Request",
            cell: (row) => {
                const message = row.message || "";
                return message.length > 100
                    ? `${message.slice(0, 100)}...`
                    : message;
            },
        },
        {
            accessorKey: "status",
            header: () => "Status",
            cell: (row) => {
                const status = row.status;
                let color = "#6c757d"; // default: gray
                let bgColor = "#e2e3e5"; // light gray

                if (status === "approved") {
                    color = "#0f5132";
                    bgColor = "#d1e7dd";
                } else if (status === "rejected") {
                    color = "#842029";
                    bgColor = "#f8d7da";
                } else if (status === "pending") {
                    color = "#664d03";
                    bgColor = "#fff3cd";
                }

                return (
                    <span
                        style={{
                            backgroundColor: bgColor,
                            color,
                            padding: "4px 8px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            textTransform: "capitalize",
                            fontWeight: "500",
                            display: "inline-block",
                        }}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            accessorKey: "is_public",
            header: () => "Visibility",
            cell: (row) => {
                const isPublic = row.request_type;
                const visibilityText = isPublic ? "Public" : "Private";

                const style = {
                    backgroundColor: isPublic ? "#cfe2ff" : "#d3d3d4",
                    color: isPublic ? "#084298" : "#343a40",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "500",
                    display: "inline-block",
                };

                return <span style={style}>{visibilityText}</span>;
            },
        },
        {
            header: () => "Actions",
            cell: (row) => (
                <div className="hstack gap-3 fs-15">
                    {/* <HasPermission permission="edit_prayer_request"> */}
                    <span
                        className="link-primary cursor-pointer"
                        onClick={() => handleEdit(row)}
                    >
                        <i className="ri-edit-line"></i>
                    </span>
                    {/* </HasPermission>
                    <HasPermission permission="delete_prayer_request"> */}
                    <span
                        className="link-danger cursor-pointer"
                        onClick={() => {
                            setDeleteItem(row);
                            setShowDeleteConfirmation(true);
                        }}
                    >
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                    {/* </HasPermission> */}
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Prayer Requests" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title="Admin Panel"
                        pageTitle="Prayer Requests"
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={data}
                                columns={columns}
                                title="Prayer Requests"
                                actions={[]} // No Add New or Delete Many
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {showCreateEditModal && (
                <CreateEditModal
                    show={showCreateEditModal}
                    hide={() => {
                        setShowCreateEditModal(false);
                        setEditItem(null);
                    }}
                    onHide={() => {
                        setShowCreateEditModal(false);
                        setEditItem(null);
                    }}
                    prayer={editItem}
                />
            )}

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => setShowDeleteConfirmation(false)}
            />
        </>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
