import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../../Layouts/Admin';
import CreateEditModal from './Components/CreateEditModal';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import HasPermission from '../../../Components/HasPermission';
import DeleteManyModal from '../../../Components/Common/DeleteManyModal';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ organizers }: any) {
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editOrganizer, setEditOrganizer] = React.useState<any>(null);
    const [deleteOrganizer, setDeleteOrganizer] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
         const { t } = useLaravelReactI18n();

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditOrganizer(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (organizer: any) => {
        setEditOrganizer(organizer);
        setShowCreateEditModal(true);
    }

    const deleteAction = (organizer: any) => {
        setDeleteOrganizer(organizer);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('admin.organizers.destroy', deleteOrganizer.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({...data, ids: ids}));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('admin.organizers.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof organizers.data[0]> = [
        {
            accessorKey: 'id',
            header: () => t('ID'),
            cell: (organizer) => organizer.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'name',
            header: () => t('Name'),
            cell: (organizer) => organizer.name,
            enableSorting: true,
        },
        {
            accessorKey: 'email',
            header: () => t('Email'),
            cell: (organizer) => organizer.email,
            enableSorting: true,
        },
        {
            header: () => t('Action'),
            cell: (organizer) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_organizers">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(organizer)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_organizers">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(organizer)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title='Organizers - Admin' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Organizers")}
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={organizers}
                                columns={columns}
                                title={t("Organizers")}
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_organizers">
                                                <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> {t("Delete")} ({dataTable.getSelectedRows().length})</Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },

                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_organizers">
                                                <Button onClick={() => setShowCreateEditModal(true)}>{t("Add New")}</Button>
                                            </HasPermission>
                                        )
                                    }
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
                    organizer={editOrganizer}
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
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
