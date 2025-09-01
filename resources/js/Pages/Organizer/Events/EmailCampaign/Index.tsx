import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
// import CreateEditModal from './Components/CreateEditModal';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import BreadCrumb2 from '../../../../Components/Common/BreadCrumb2';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../../Components/HasPermission';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ emailcampaign }: any) {
    const { t } = useLaravelReactI18n();
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editUser, setEditUser] = React.useState<any>(null);
    const [deleteUser, setDeleteUser] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        router.visit(route('organizer.events.email-campaign.create'));
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (user: any) => {
        setEditUser(user);
        setShowCreateEditModal(true);
    }

    const deleteAction = (user: any) => {
        setDeleteUser(user);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('organizer.users.destroy', deleteUser.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.users.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof emailcampaign.data[0]> = [
        {
            accessorKey: 'id',
            header: () => t('ID'),
            cell: (emailcampaignsingle) => emailcampaignsingle.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'name',
            header: () => t('Name'),
            cell: (emailcampaignsingle) => emailcampaignsingle.name,
            enableSorting: true,
        },
        {
            accessorKey: 'Subject',
            header: () => t('subject'),
            cell: (emailcampaignsingle) => emailcampaignsingle.subject,
            enableSorting: true,
        },
        {
            accessorKey: 'Sent To',
            header: () => t('sent_to'),
            cell: (emailcampaignsingle) => emailcampaignsingle.sent_to,
            enableSorting: true,
        },
        {
            accessorKey: 'Status',
            header: () => t('status'),
            cell: (emailcampaignsingle) => <span className="badge bg-success-subtle text-success">{emailcampaignsingle.status}</span>,
            enableSorting: true,
        },
        {
            header: () => t('Action'),
            cell: (emailcampaignsingle) => (
                <div className="hstack fs-15">
                    <HasPermission permission="delete_email_campaign">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(emailcampaignsingle)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title='Users' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Users"
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={emailcampaign}
                                columns={columns}
                                title="Users"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_email_campaign">
                                                <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> {t("Delete")} ({dataTable.getSelectedRows().length})</Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_email_campaign">
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

            {/* {showCreateEditModal && (
                <CreateEditModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    user={editUser}
                />
            )} */}

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
