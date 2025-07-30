import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../Components/HasPermission";
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import CreateEditModal from './Components/CreateEditModal';

function Index({ data }: any) {
    const [showCreateEditModal, setShowCreateEditModal] = useState(false);
    const [editReferralLink, setEditReferralLink] = useState<any>(null);
    const [deleteReferralLink, setDeleteReferralLink] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
    // State to track which referral link's URL was copied
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const deleteForm = useForm({
        _method: 'DELETE',
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (referralLink: any) => {
        setEditReferralLink(referralLink);
        setShowCreateEditModal(true);
    };

    const deleteAction = (referralLink: any) => {
        setDeleteReferralLink(referralLink);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        deleteForm.delete(route('organizer.events.refferal-link.destroy', deleteReferralLink.id));
        setShowDeleteConfirmation(false);
    };

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData((data) => ({ ...data, ids }));
        setShowDeleteManyConfirmation(true);
    };

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.refferal-link.destroy.many'));
        setShowDeleteManyConfirmation(false);
    };

    // Function to handle copying the URL and showing "Copied" tooltip
    const copyUrlAction = (url: string, id: number) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopiedId(id); // Set the copied ID to show "Copied" tooltip and checkmark
            setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
        }).catch((err) => {
            console.error('Failed to copy URL:', err);
        });
    };

    const columns: ColumnDef<typeof data.data[0]> = [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: (referralLink) => referralLink.id,
            cellClass: 'fw-medium',
            enableSorting: true,
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            cell: (referralLink) => referralLink.name,
            enableSorting: true,
        },
        {
            accessorKey: 'url',
            header: () => 'URL',
            cell: (referralLink) => (
                <a href={referralLink.url} target="_blank" rel="noopener noreferrer">
                    {referralLink.url}
                </a>
            ),
            enableSorting: true,
        },
        {
            accessorKey: 'successful',
            header: () => 'Successful Attendees',
            cell: (referralLink) => referralLink.successful,
            enableSorting: true,
        },
        {
            accessorKey: 'nextcount',
            header: () => 'Total Clicks',
            cell: (referralLink) => referralLink.nextcount,
            enableSorting: true,
        },
        {
            header: () => 'Action',
            cell: (referralLink) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="delete_referral_link">
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => deleteAction(referralLink)}
                        >
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                    {/* Copy URL Action with Tooltip and Checkmark Reaction */}
                    <span
                        className="link-success cursor-pointer"
                        onClick={() => copyUrlAction(referralLink.url, referralLink.id)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={copiedId === referralLink.id ? 'Copied' : 'Copy URL'}
                    >
                        <i className={copiedId === referralLink.id ? "ri-check-line" : "ri-file-copy-line"}></i>
                    </span>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title="Referral Links" />
            <div className="page-content">
                <Container fluid>
                <BreadCrumb
                        title={`Event`}
                        pageTitle="Referral Links"
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={data}
                                columns={columns}
                                title="Referral Links"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_referral_link">
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
                                                    <i className="ri-delete-bin-5-line"></i> Delete (
                                                    {dataTable.getSelectedRows().length})
                                                </Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_referral_link">
                                                <Button onClick={() => setShowCreateEditModal(true)}>
                                                    <i className="ri-add-fill"></i> Add New
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
                        setEditReferralLink(null);
                    }}
                    onHide={() => {
                        setShowCreateEditModal(false);
                        setEditReferralLink(null);
                    }}
                    refferal={editReferralLink}
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