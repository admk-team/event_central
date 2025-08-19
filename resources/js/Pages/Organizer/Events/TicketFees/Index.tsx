
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


function Index({ fees, getCurrency }: any) {

    // console.log(fees);

    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [EditFee, setEditFee] = React.useState<any>(null);

    const [deleteFee, setDeleteFee] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);


    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditFee(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (fee: any) => {

        setEditFee(fee);
        setShowCreateEditModal(true);
    }

    const deleteAction = (fee: any) => {

        setDeleteFee(fee);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        deleteForm.post(route('organizer.events.ticket-fees.destroy', deleteFee.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {

        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {

        deleteManyForm.delete(route('organizer.events.ticket-fees.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }


    const columns: ColumnDef<typeof fees.data[0]> = [
        {
            header: () => 'ID',
            cell: (fee) => fee.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Name',
            cell: (fee) => fee.name,
        },
        {
            header: () => 'Description',
            cell: (fee) => fee.description,
        },
        {
            header: () => 'Fee Type',
            cell: (fee: any) => {
                switch (fee.fee_type) {
                    case "flat":
                        return (<span className="badge rounded-pill border border-success text-success text-uppercase"> Flat</span>);
                    case "percentage":
                        return (<span className="badge rounded-pill border border-info text-info text-uppercase"> Percentage</span>);
                    default:
                        return (<span className="badge bg-danger-subtle  text-danger text-uppercase"> na</span>);
                }
            },
        },
        {
            header: () => <span className='d-block text-start' style={{ width: '50px' }}>Fee Value</span>,
            cell: (fee) => {
                switch (fee.fee_type) {
                    case "flat":
                        return <span className='d-block text-start' style={{ width: '50px' }}>{getCurrency.currency_symbol } {fee.fee_amount + " "}</span>
                    case "percentage":
                        return <span className='d-block text-start' style={{ width: '50px' }}>{fee.fee_amount + " "}%</span>
                }
            },
        },
        {
            header: () => 'Action',
            cell: (fee) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_ticket_fee">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(fee)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_ticket_fee">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(fee)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title='Ticket Fees' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Ticket Fees" pageTitle="Ticket Fees" />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_ticket_fee">
                                <DataTable
                                    data={fees}
                                    columns={columns}
                                    title="Fees"
                                    actions={[
                                        // Delete multiple
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_ticket_fee">
                                                    <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },

                                        // Add new
                                        {
                                            render: (
                                                <HasPermission permission="create_ticket_fee">
                                                    <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> Add New</Button>
                                                </HasPermission>
                                            )
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
                    fee={EditFee}
                />
            )}
            <DeleteManyModal
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

