
import { Button, Col, Container, Row } from 'react-bootstrap';
import Layout from '../../../../Layouts/Event';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../../Components/HasPermission';
import CreateEditModal from './CreateEditModal';


function Index({ features }: any) {
    // console.log('features', features);

    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editTicketFeature, setEditTicketFeature] = React.useState<any>(null);

    const [deleteTicketFeature, setDeleteTicketFeature] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditTicketFeature(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });
    const editAction = (ticket: any) => {
        setEditTicketFeature(ticket);
        setShowCreateEditModal(true);
    }

    const deleteAction = (ticket: any) => {
        setDeleteTicketFeature(ticket);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        deleteForm.post(route('organizer.events.tickets-feature.destroy', deleteTicketFeature.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        // console.log(ids);
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        // console.log(deleteManyForm);
        deleteManyForm.delete(route('organizer.events.tickets-feature.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }
    const columns: ColumnDef<typeof features.data[0]> = [
        {
            header: () => 'ID',
            cell: (feature) => feature.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Name',
            cell: (feature) => (
                <span>{feature.name}</span>
            ),
        },
        {
            header: () => 'Price',
            cell: (feature) => feature.price,
        },
        {
            header: () => 'Total Qty',
            cell: (feature) => feature.qty_total,
        },
        {
            header: () => 'Total Sold',
            cell: (feature) => feature.qty_sold,
        },
        {
            header: () => 'Action',
            cell: (ticket) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(ticket)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(ticket)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title='Ticket Features' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Ticket Features" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={features}
                                columns={columns}
                                title="tickets"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>,
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_schedule">
                                                <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> Add New</Button>
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
                    feature={editTicketFeature}
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

