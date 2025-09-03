
import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../Components/HasPermission";
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import CreateEditModal from './Components/CreateEditModal'; // Updated to badge-specific modal
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ data }: any) {
    const [showCreateEditModal, setShowCreateEditModal] = useState(false);
    const [editBadge, setEditBadge] = useState<any>(null);
    const [deleteBadge, setDeleteBadge] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
         const { t } = useLaravelReactI18n();

    const deleteForm = useForm({
        _method: 'DELETE',
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (badge: any) => {
        setEditBadge(badge);
        setShowCreateEditModal(true);
    };

    const deleteAction = (badge: any) => {
        setDeleteBadge(badge);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        deleteForm.delete(route('organizer.events.badge.destroy', deleteBadge.id));
        setShowDeleteConfirmation(false);
    };

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData((data) => ({ ...data, ids }));
        setShowDeleteManyConfirmation(true);
    };

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.badge.destroy.many'));
        setShowDeleteManyConfirmation(false);
    };

    const columns: ColumnDef<typeof data.data[0]> = [
        {
            accessorKey: 'id',
            header: () => t('ID'),
            cell: (badge) => badge.id,
            cellClass: 'fw-medium',
            enableSorting: true,
        },
        {
            accessorKey: 'title',
            header: () => t('Title'),
            cell: (badge) => badge.title,
            enableSorting: true,
        },
        // {
        //     accessorKey: 'description',
        //     header: () => 'Description',
        //     cell: (badge) => badge.description,
        //     enableSorting: true,
        // },
        {
            accessorKey: 'icon',
            header: () => t('Icon'),
            cell: (badge) => (
                badge.icon ? (
                    <img src={`/storage/${badge.icon}`} alt={badge.title} style={{ width: '32px', height: '32px' }} />
                ) : (
                    'No Icon'
                )
            ),
            enableSorting: false,
        },
        {
            accessorKey: 'type',
            header: () => t('Type'),
            cell: (badge) => badge.type,
            enableSorting: true,
        },
        {
            accessorKey: 'points',
            header: () => t('Points'),
            cell: (badge) => badge.points,
            enableSorting: true,
        },
        {
            accessorKey: 'milestone',
            header: () => t('Milestone'),
            cell: (badge) => badge.milestone || 'N/A',
            enableSorting: true,
        },
        {
            header: () => t('Action'),
            cell: (badge) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_event_badge">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(badge)}>
                            <i className="ri-edit-fill"></i>
                        </span>
                    </HasPermission>
                    <HasPermission permission="delete_event_badge">
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => deleteAction(badge)}
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
            <Head title={t("Badges")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title={t(`Event`)}
                        pageTitle={t("Badges")}
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={data}
                                columns={columns}
                                title={t("Badges")}
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_event_badge">
                                                <Button
                                                    className="btn-danger"
                                                    onClick={() =>
                                                        deleteManyAction(
                                                            dataTable
                                                                .getSelectedRows()
                                                                .map((row) => row.id)
                                                        )
                                                    }
                                                >
                                                    <i className="ri-delete-bin-5-line"></i> {t("Delete")} (
                                                    {dataTable.getSelectedRows().length})
                                                </Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_event_badge">
                                                <Button onClick={() => setShowCreateEditModal(true)}>
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
                    hide={() => {
                        setShowCreateEditModal(false);
                        setEditBadge(null);
                    }}
                    onHide={() => {
                        setShowCreateEditModal(false);
                        setEditBadge(null);
                    }}
                    badge={editBadge}
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
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
