import { Button, Col, Container, Row } from "react-bootstrap";
import Layout from "../../../../Layouts/Event";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import DataTable, { ColumnDef } from "../../../../Components/DataTable";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import HasPermission from "../../../../Components/HasPermission";
import CreateEditModal from "./CreateEditModal";

function Index({ addons }: any) {

    // console.log('addons', addons);

    const [showCreateEditModal, _setShowCreateEditModal] =
        React.useState(false);
    const [editAddon, setEditAddon] = React.useState<any>(null);

    const [deleteAddon, setDeleteAddon] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditAddon(null);
        }
    };

    const deleteForm = useForm({
        _method: "DELETE",
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: "DELETE",
        ids: [],
    });
    const editAction = (ticket: any) => {
        setEditAddon(ticket);
        setShowCreateEditModal(true);
    };

    const deleteAction = (ticket: any) => {
        setDeleteAddon(ticket);
        setShowDeleteConfirmation(true);
    };
    const handleDelete = () => {
        deleteForm.post(
            route(
                "organizer.events.addon.destroy",
                deleteAddon.id
            )
        );
        setShowDeleteConfirmation(false);
    };

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData((data) => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    };
    const handleDeleteMany = () => {
        deleteManyForm.delete(
            route("organizer.events.addon.destroy.many")
        );
        setShowDeleteManyConfirmation(false);
    };
    const columns: ColumnDef<(typeof addons.data)[0]> = [
        {
            header: () => "ID",
            cell: (addon) => addon.id,
            cellClass: "fw-medium",
        },
        {
            header: () => "Add-ons Name",
            cell: (addon) => (
                <div style={{ minWidth: '200px' }} dangerouslySetInnerHTML={{ __html: addon.name }} />
            ),
        },
        {
            header: () => "Price",
            cell: (addon) => (
                <span className="text-right d-block">
                    {addon.price > 0 ? addon.price : "Free"}
                </span>
            ),
        },
        {
            header: () => "Total Qty",
            cell: (addon) => addon.qty_total,
        },
        {
            header: () => "Total Sold",
            cell: (addon) => addon.qty_sold,
        },
        {
            header: () => "Action",
            cell: (addon) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_tickets">
                        <span
                            className="link-primary cursor-pointer"
                            onClick={() => editAction(addon)}
                        >
                            <i className="ri-edit-fill"></i>
                        </span>
                    </HasPermission>
                    <HasPermission permission="delete_tickets">
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => deleteAction(addon)}
                        >
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title="Ticket Add-ons" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Ticket Add-ons" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12} id="TicketFeatureTable">
                            <HasPermission permission="view_tickets">
                                <DataTable
                                    data={addons}
                                    columns={columns}
                                    title="Add-ons"
                                    actions={[
                                        // Delete multiple
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_tickets">
                                                    <Button
                                                        className="btn-danger"
                                                        onClick={() =>
                                                            deleteManyAction(
                                                                dataTable
                                                                    .getSelectedRows()
                                                                    .map(
                                                                        (row) => row.id
                                                                    )
                                                            )
                                                        }
                                                    >
                                                        <i className="ri-delete-bin-5-line"></i>{" "}
                                                        Delete (
                                                        {
                                                            dataTable.getSelectedRows()
                                                                .length
                                                        }
                                                        )
                                                    </Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },
                                        // Add new
                                        {
                                            render: (
                                                <HasPermission permission="create_tickets">
                                                    <Button
                                                        onClick={() =>
                                                            setShowCreateEditModal(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <i className="ri-add-fill"></i>{" "}
                                                        Add New
                                                    </Button>
                                                </HasPermission>
                                            ),
                                        },
                                    ]}
                                />
                            </HasPermission>
                        </Col>
                    </Row>
                </Container>
            </div>

            {showCreateEditModal && (
                <CreateEditModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    addon={editAddon}
                />
            )}
            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => {
                    setShowDeleteConfirmation(false);
                }}
            />

            <DeleteManyModal
                show={showDeleteManyConfirmation}
                onDeleteClick={handleDeleteMany}
                onCloseClick={() => {
                    setShowDeleteManyConfirmation(false);
                }}
            />
        </React.Fragment>
    );
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
