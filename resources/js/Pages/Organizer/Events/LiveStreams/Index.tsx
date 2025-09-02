import React, { useState } from "react";
import {
    Badge,
    Button,
    Col,
    Container,
    Row,
    Spinner,
} from "react-bootstrap";
import { Head, useForm } from "@inertiajs/react";
import Layout from "../../../../Layouts/Event";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import DataTable, { ColumnDef } from "../../../../Components/DataTable";
import BreadCrumb2 from "../../../../Components/Common/BreadCrumb2";
import HasPermission from "../../../../Components/HasPermission";
import CreateEditModal from "./Components/CreateEditModal";
import CopyTextBox from "../../../../Components/CopyTextBox";
import moment from "moment";
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ liveStreams, eventTickets }: any) {
    const [showCreateEditModal, setShowCreateEditModal] = useState(false);
    const [editLiveStream, setEditLiveStream] = useState<any>(null);
    const [deleteLiveStream, setDeleteLiveStream] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] =
        useState(false);
         const { t } = useLaravelReactI18n();

    const deleteForm = useForm({ _method: "DELETE" });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: "DELETE",
        ids: [],
    });

    const handleEdit = (liveStream: any) => {
        setEditLiveStream(liveStream);
        setShowCreateEditModal(true);
    };

    const handleDelete = () => {
        if (deleteLiveStream) {
            deleteForm.delete(
                route("organizer.events.live-streams.destroy", deleteLiveStream.id)
            );
            setShowDeleteConfirmation(false);
        }
    };

    const handleDeleteMany = () => {
        deleteManyForm.delete(
            route("organizer.events.live-streams.destroy.many")
        );
        setShowDeleteManyConfirmation(false);
    };

    const columns: ColumnDef<typeof liveStreams.data[0]> = [
        {
            accessorKey: "id",
            header: () => t("ID"),
            cell: (row) => row.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: "ticket",
            header: () => t("Ticket"),
            cell: (row) => row?.event_tickets?.name ?? "—",
            enableSorting: true,
        },
        {
            accessorKey: "title",
            header: () => t("Title"),
            cell: (row) => row.title,
            enableSorting: true,
        },
        {
            accessorKey: "stream_key",
            header: () => t("Stream Key"),
            cell: (row) => <CopyTextBox text={row.stream_key} />,
        },
        {
            accessorKey: "resolution",
            header: () => t("Resolution"),
            cell: (row) => row.resolution,
        },
        {
            accessorKey: "stream_url",
            header: () => t("Stream URL"),
            cell: (row) => <CopyTextBox text={row.stream_url} />,
        },
        {
            accessorKey: "playback_url",
            header: () => t("Playback URL"),
            cell: (row) => <CopyTextBox text={row.playback_url} />,
        },
        {
            accessorKey: "start_time",
            header: () => t("Start Time"),
            cell: (row) =>
                row.start_time
                    ? moment(row.start_time).format("DD MMM YYYY, HH:mm")
                    : "",
        },
        {
            accessorKey: "status",
            header: () => t("Status"),
            cell: (row) => {
                const statusColors: Record<string, string> = {
                    created: "secondary",
                    started: "success",
                    completed: "info",
                };
                return (
                    <Badge bg={statusColors[row.status]} className="fs-6">
                        {row.status}
                    </Badge>
                );
            },
        },
        {
            header: () => t("Action"),
            cell: (row) => (
                <div className="hstack gap-3 fs-15">
                    {row.status === "created" && (
                        <HasPermission permission="edit_live_streams">
                            <StartStreamButton liveStream={row} />
                        </HasPermission>
                    )}
                    {(row.status === "preparing" || row.status === "started") && (
                        <HasPermission permission="edit_live_streams">
                            <EndStreamButton liveStream={row} />
                        </HasPermission>
                    )}
                    <HasPermission permission="edit_live_streams">
                        <span
                            className="link-primary cursor-pointer"
                            onClick={() => handleEdit(row)}
                        >
                            <i className="ri-edit-fill"></i>
                        </span>
                    </HasPermission>
                    <HasPermission permission="delete_live_streams">
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => {
                                setDeleteLiveStream(row);
                                setShowDeleteConfirmation(true);
                            }}
                        >
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Live Streams" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2 title="Live Streams" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={liveStreams}
                                columns={columns}
                                title="Live Streams"
                                actions={[
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_live_streams">
                                                <Button
                                                    className="btn-danger"
                                                    onClick={() =>
                                                        deleteManyForm.setData({
                                                            ...deleteManyForm.data,
                                                            ids: dataTable
                                                                .getSelectedRows()
                                                                .map((row) => row.id),
                                                        }) ||
                                                        setShowDeleteManyConfirmation(true)
                                                    }
                                                >
                                                    <i className="ri-delete-bin-5-line"></i> {t("Delete")} (
                                                    {dataTable.getSelectedRows().length})
                                                </Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    {
                                        render: (
                                            <HasPermission permission="create_live_streams">
                                                <Button
                                                    onClick={() =>
                                                        setShowCreateEditModal(true)
                                                    }
                                                >
                                                    <i className="ri-add-fill"></i> {t("Add New")}
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
                    onHide={() => setShowCreateEditModal(false)}
                    liveStream={editLiveStream}
                    eventTickets={eventTickets}
                />
            )}

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => setShowDeleteConfirmation(false)}
            />

            <DeleteManyModal
                show={showDeleteManyConfirmation}
                onDeleteClick={handleDeleteMany}
                onCloseClick={() => setShowDeleteManyConfirmation(false)}
            />
        </>
    );
}

Index.layout = (page: any) => <Layout children={page} />;
export default Index;

// Start Stream Button
function StartStreamButton({ liveStream }: any) {
    const { post, processing } = useForm({ id: liveStream.id });

    const startStream = () => {
        post(route("organizer.events.live-streams.start"), {
            preserveScroll: true,
        });
    };

    return (
        <Button size="sm" onClick={startStream} disabled={processing}>
            {processing ? <Spinner size="sm" animation="border" /> : "Start"}
        </Button>
    );
}

// End Stream Button
function EndStreamButton({ liveStream }: any) {
    const { get, processing } = useForm();

    const endStream = () => {
        get(route("organizer.events.live-streams.status", liveStream.id), {
            preserveScroll: true,
        });
    };

    return (
        <Button size="sm" onClick={endStream} disabled={processing}>
            {processing ? <Spinner size="sm" animation="border" /> : "End"}
        </Button>
    );
}
