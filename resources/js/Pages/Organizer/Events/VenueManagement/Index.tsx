import React from 'react'
import Layout from '../../../../Layouts/Event';
import { Head, useForm } from '@inertiajs/react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb2 from '../../../../Components/Common/BreadCrumb2';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import HasPermission from '../../../../Components/HasPermission';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import CreateEditEventPlatformModal from '../Schedule/Components/CreateEditEventPlatformModal';
import BlueprintImportModal from './Components/BlueprintImportModal';

type Props = {
    eventPlatforms: any
}

function Index({ eventPlatforms }: Props) {
    const { t } = useLaravelReactI18n();

    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editPlatform, setEditPlatform] = React.useState<any>(null);
    const [deletePlatform, setDeletePlatform] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = React.useState(false);
    const [showBlueprintImportModal, setShowBlueprintImportModal] = React.useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditPlatform(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (user: any) => {
        setEditPlatform(user);
        setShowCreateEditModal(true);
    }

    const deleteAction = (user: any) => {
        setDeletePlatform(user);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('organizer.events.event-platforms.destroy', deletePlatform.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.event-platforms.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof eventPlatforms.data[0]> = [
        {
            accessorKey: 'id',
            header: () => t('ID'),
            cell: (platform) => platform.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'name',
            header: () => t('Name'),
            cell: (platform) => platform.name,
            enableSorting: true,
            searchable: true,
        },
        {
            accessorKey: 'type',
            header: () => t('Type'),
            cell: (platform) => platform.type,
            enableSorting: true,
            searchable: true,
        },
        {
            accessorKey: 'seats',
            header: () => t('Seats'),
            cell: (platform) => platform.seats ?? 0,
            enableSorting: true,
        },
        {
            header: () => t('Action'),
            cell: (user) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_locations">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(user)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_locations">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(user)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title={t("Venue Management")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2 title={t("Venue Management")} />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={eventPlatforms}
                                columns={columns}
                                title={t("Locations")}
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_locations">
                                                <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> {t("Delete")} ({dataTable.getSelectedRows().length})</Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    {
                                        render: (
                                            <HasPermission permission="create_locations">
                                                <Button onClick={() => setShowBlueprintImportModal(true)}><i className="ri-add-fill"></i> {t("Import from Blueprint")}</Button>
                                            </HasPermission>
                                        )
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_locations">
                                                <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> {t("Add New")}</Button>
                                            </HasPermission>
                                        )
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
            {showCreateEditModal && (
                <CreateEditEventPlatformModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    eventPlatform={editPlatform}
                />
            )}

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => { setShowDeleteConfirmation(false) }}
            />

            <DeleteManyModal
                show={showDeleteManyConfirmation}
                onDeleteClick={handleDeleteMany}
                onCloseClick={() => { setShowDeleteManyConfirmation(false) }}
            />

            <BlueprintImportModal
                show={showBlueprintImportModal}
                onHide={() => setShowBlueprintImportModal(false)}
            />
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />

export default Index