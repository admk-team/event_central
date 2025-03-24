import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../../Layouts/Admin';
import CreateEditModal from './Components/CreateEditModal';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import DeleteManyModal from '../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../Components/HasPermission';

function Index({ platforms }: any) {
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editPlatform, setEditPlatform] = React.useState<any>(null);
    const [deletePlatform, setDeletePlaform] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

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

    const editAction = (platform: any) => {
        setEditPlatform(platform);
        setShowCreateEditModal(true);
    }

    const deleteAction = (platform: any) => {
        setDeletePlaform(platform);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('admin.platforms.destroy', deletePlatform.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('admin.platforms.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof platforms.data[0]> = [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: (platform) => platform.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            cell: (platform) => platform.name,
            cellClass: "fw-medium",
            enableSorting: true,
        },

        {
            header: () => 'Action',
            cell: (platform) => (
                <div className="hstack gap-3 fs-15">
                    {/* <HasPermission permission="edit_platforms"> */}
                        <span className="link-primary cursor-pointer" onClick={() => editAction(platform)}><i className="ri-edit-fill"></i></span>
                    {/* </HasPermission> */}
                    {/* <HasPermission permission="delete_platforms"> */}
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(platform)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    {/* </HasPermission> */}
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title='Spaces & Rooms' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Spaces & Rooms"
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={platforms}
                                columns={columns}
                                title="Spaces & Rooms"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>,
                                        showOnRowSelection: true,
                                    },

                                    // Add new
                                    {
                                        render: (
                                            // <HasPermission permission="create_platforms">
                                                <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> Add New</Button>
                                            // </HasPermission>
                                        )
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
                    platform={editPlatform}
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
