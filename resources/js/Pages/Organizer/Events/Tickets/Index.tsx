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
import moment from "moment";

function Index({ tickets, sessions, addons }: any) {

    console.log('addons', addons);

    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editTicket, setEditTicket] = React.useState<any>(null);

    const [deleteschedule, setDeleteSchedule] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] =
        useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditTicket(null);
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
        setEditTicket(ticket);
        setShowCreateEditModal(true);
    };

    const deleteAction = (ticket: any) => {
        setDeleteSchedule(ticket);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        deleteForm.post(
            route("organizer.events.tickets.destroy", deleteschedule.id)
        );
        setShowDeleteConfirmation(false);
    };

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData((data) => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    };

    const handleDeleteMany = () => {
        deleteManyForm.delete(route("organizer.events.tickets.destroy.many"));
        setShowDeleteManyConfirmation(false);
    };

    const columns: ColumnDef<(typeof tickets.data)[0]> = [
        {
            header: () => "ID",
            cell: (ticket) => ticket.id,
            cellClass: "fw-medium",
        },
        {
            header: () => "Event Name",
            cell: (ticket) => (
                <span
                    key={ticket.event.id}
                    className="badge rounded-pill border border-success text-success text-uppercase fs-6"
                    style={{
                        marginRight: "3px",
                        maxWidth: "300px",
                        textWrap: "balance",
                    }}
                >
                    {ticket.event.name}
                </span>
            ),
        },
        {
            header: () => "Name",
            cell: (ticket) => ticket.name,
        },
        {
            header: () => "Description",
            cell: (ticket) => (
                <div style={{ maxWidth: "300px", textWrap: "balance" }}>
                    <p className="mb-0">{ticket.description}</p>
                </div>
            ),
        },
        {
            header: () => "Type",
            cell: (ticket) => ticket.type,
        },
        {
            header: () => "Base Price",
            cell: (ticket) => ticket.base_price,
        },
        {
            header: () => "Sessions",
            cell: (ticket) =>
                ticket.sessions.map((session: any) => (
                    <span
                        key={session.id}
                        className="badge rounded-pill border border-secondary text-secondary text-uppercase fs-6"
                        style={{ marginRight: "3px" }}
                    >
                        {session.name}
                    </span>
                )),
        },
        {
            header: () => "Increment By",
            cell: (ticket) => ticket.increment_by,
        },
        {
            header: () => "Increment Rate",
            cell: (ticket) => ticket.increment_rate,
        },
        {
            header: () => "Start Increment",
            cell: (ticket) =>
                moment(ticket.start_increment).format("DD, MMM, YYYY"),
        },
        {
            header: () => "End Increment",
            cell: (ticket) =>
                moment(ticket.end_increment).format("DD MMM, YYYY"),
        },
        {
            header: () => "Action",
            cell: (ticket) => (
                <div className="hstack gap-3 fs-15">
                    <span
                        className="link-primary cursor-pointer"
                        onClick={() => editAction(ticket)}
                    >
                        <i className="ri-edit-fill"></i>
                    </span>
                    <span
                        className="link-danger cursor-pointer"
                        onClick={() => deleteAction(ticket)}
                    >
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title="Tickets" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Tickets" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={tickets}
                                columns={columns}
                                title="tickets"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
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
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_schedule">
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
                        </Col>
                    </Row>
                </Container>
            </div>

            {showCreateEditModal && (
                <CreateEditModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    ticket={editTicket}
                    sessions={sessions}
                    addons={addons}
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
