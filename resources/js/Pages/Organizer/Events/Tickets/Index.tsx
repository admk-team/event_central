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
import { DialogBackdrop } from "@headlessui/react";

function Index({ tickets, sessions, addonsAll, fees, event_ticket_type }: any) {
    // console.log('tickets', tickets);

    const [showCreateEditModal, _setShowCreateEditModal] =
        React.useState(false);
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
        // {
        //     header: () => "Event Name",
        //     cell: (ticket) => (
        //         <span
        //             key={ticket.event.id}
        //             className="badge rounded-pill border border-success text-success text-uppercase fs-6"
        //             style={{
        //                 marginRight: "3px",
        //                 maxWidth: "300px",
        //                 textWrap: "balance",
        //             }}
        //         >
        //             {ticket.event.name}
        //         </span>
        //     ),
        // },
        {
            header: () => "Name",
            cell: (ticket) => ticket.name,
        },
        // {
        //     header: () => "Description",
        //     cell: (ticket) => (
        //         <div style={{ maxWidth: "300px", textWrap: "balance" }}>
        //             <p className="mb-0">{ticket.description}</p>
        //         </div>
        //     ),
        // },
        {
            header: () => "Type",
            cell: (ticket) => ticket.ticket_type?.name || "No Type",
        },
        {
            header: () => "Base Price",
            cell: (ticket) => ticket.base_price,
        },
        {
            header: () => "Sessions",
            cell: (ticket) => (
                <div className="d-flex flex-column">
                    {ticket.sessions.map((session, index) => {
                        if (index < 2) {
                            return (
                                <span
                                    key={session.id}
                                    className="badge bg-light rounded-pill border border-secondary text-secondary text-capitalize fs-6 mt-1 text-truncate"
                                    style={{
                                        maxWidth: "150px", // Consistent width
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        marginRight: "3px",
                                    }}
                                    title={session.name} // Tooltip for full name
                                >
                                    {session.name}
                                </span>
                            );
                        } else if (index === 2) {
                            const moreCount = ticket.sessions.length - 2;
                            const moreText = `+${moreCount} more`;
                            return (
                                <span
                                    key={`more-${ticket.id}`}
                                    className="badge rounded-pill bg-secondary border border-secondary text-white text-capitalize fs-6 mt-1 text-truncate"
                                    style={{
                                        maxWidth: "150px", // Match session badge width
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        marginRight: "3px",
                                    }}
                                    title={moreText} // Tooltip for full "+X more"
                                >
                                    {moreText}
                                </span>
                            );
                        }
                        return null; // Explicitly return null for other indices
                    })}
                </div>
            ),
        },
        {
            header: () => "Increment By",
            cell: (ticket) => ticket.increment_by ?? 'N/A',
        },
        {
            header: () => "Increment Rate",
            cell: (ticket) => ticket.increment_rate ?? 'N/A',
        },
        {
            header: () => "Start Increment",
            cell: (ticket) =>
                ticket.start_increment
                    ? moment(ticket.start_increment).format("MMM DD, YYYY")
                    : "N/A",
        },
        {
            header: () => "End Increment",
            cell: (ticket) =>
                ticket.end_increment
                    ? moment(ticket.end_increment).format("MMM DD, YYYY")
                    : "N/A",
        },
        {
            header: () => "Show To Attendee",
            cell: (ticket) => (
                <div className="w-100 text-center">
                    {ticket.show_on_attendee_side && (
                        <span className="w-50 badge rounded-pill bg-secondary border border-secondary text-white text-capitalize fs-6 mt-1">
                            Yes
                        </span>
                    )}
                    {!ticket.show_on_attendee_side && (
                        <span className="w-50 badge rounded-pill bg-light border border-secondary text-black text-capitalize fs-6 mt-1">
                            No
                        </span>
                    )}
                </div>
            ),
        },
        {
            header: () => "Action",
            cell: (ticket) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_tickets">
                        <span
                            className="link-primary cursor-pointer"
                            onClick={() => editAction(ticket)}
                        >
                            <i className="ri-edit-fill"></i>
                        </span>
                    </HasPermission>
                    <HasPermission permission="delete_tickets">
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => deleteAction(ticket)}
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
            <Head title="Tickets" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Tickets" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_tickets">
                                <DataTable
                                    data={tickets}
                                    columns={columns}
                                    title="Tickets"
                                    actions={[
                                        {
                                            render: (
                                                <HasPermission permission="edit_tickets">
                                                    <Link href={route('organizer.events.tickets.sort')}>
                                                        <Button type="button">
                                                            <i className="ri-drag-drop-fill"></i>{" "}
                                                            Sort
                                                        </Button>
                                                    </Link>
                                                </HasPermission>
                                            ),
                                        },
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
                                                                        (row) =>
                                                                            row.id
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
                    ticket={editTicket}
                    sessions={sessions}
                    addons={
                        addonsAll
                            .filter((addon: any) => addon.event_app_ticket_id === null || addon.event_app_ticket_id === editTicket?.id)
                            .map((addon: any) => ({ value: addon.value, label: addon.label }))
                    }
                    fees={fees}
                    event_ticket_type={event_ticket_type}
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
