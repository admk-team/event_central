
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
import moment from 'moment';


function Index({ promoCodes, tickets }: any) {

    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [EditPromoCode, setEditPromoCode] = React.useState<any>(null);

    const [deleteschedule, setDeleteSchedule] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);


    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditPromoCode(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (promoCode: any) => {

        setEditPromoCode(promoCode);
        setShowCreateEditModal(true);
    }

    const deleteAction = (promoCode: any) => {

        setDeleteSchedule(promoCode);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        deleteForm.post(route('organizer.events.promo-codes.destroy', deleteschedule.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {

        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {

        deleteManyForm.delete(route('organizer.events.promo-codes.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }


    const columns: ColumnDef<typeof promoCodes.data[0]> = [
        {
            header: () => 'ID',
            cell: (promoCode) => promoCode.id,
            cellClass: "fw-medium"
        },
        // {
        //     header: () => 'Event Name',
        //     cell: (promoCode) => (<span key={promoCode.event?.id ?? ''} className="badge bg-secondary-subtle text-secondary fs-6" style={{ marginRight: '3px' }}>{promoCode.event?.name ?? ''}</span>),
        // },
        {
            header: () => 'Code',
            cell: (promoCode) => {

                return (<span className="text-uppercase"> {promoCode.code}</span>)
            },
        },
        {
            header: () => 'Description',
            cell: (promoCode) => promoCode.description,
        },
        {
            header: () => 'Discount Type',
            cell: (promoCode: any) => {
                switch (promoCode.discount_type) {
                    case "fixed":
                        return (<span className="badge rounded-pill border border-success text-success text-uppercase"> {promoCode.discount_type}</span>);
                    case "percentage":
                        return (<span className="badge rounded-pill border border-info text-info text-uppercase"> {promoCode.discount_type}</span>);
                    default:
                        return (<span className="badge bg-danger-subtle  text-danger text-uppercase"> na</span>);
                }
            },
        },

        {
            header: () => 'Discount Value',
            cell: (promoCode) => promoCode.discount_value,
        },
        {
            header: () => 'Usage Limit',
            cell: (promoCode) => promoCode.usage_limit,
        },
        {
            header: () => 'Used Count',
            cell: (promoCode) => promoCode.used_count,
        },
        {
            header: () => 'Status',
            cell: (promoCode: any) => {
                switch (promoCode.status) {
                    case "active":
                        return (<span className="badge rounded-pill border border-success text-success text-uppercase fs-7"> Active </span>);
                    case "expired":
                        return (<span className="badge rounded-pill border border-info text-info text-uppercase fs-7"> Expired </span>);
                    case "disabled":
                        return (<span className="badge rounded-pill border border-danger text-danger text-uppercase fs-7"> Disabled </span>);
                    default:
                        return (<span className="badge bg-danger-subtle  text-danger text-uppercase"> NA</span>);
                }
            },
        },
        {
            header: () => 'Start Date',
            cell: (promoCode) => moment(promoCode.start_date).format('DD MMM, YYYY'),
        },
        {
            header: () => 'End Date',
            cell: (promoCode) => moment(promoCode.end_date).format('DD MMM, YYYY'),
        },
        {
            header: () => 'Tickets',
            cell: (promoCode) => (
                promoCode.tickets.map((ticket: any) =>
                    <span key={ticket.id} className="badge rounded-pill border border-secondary text-secondary fs-7" style={{ marginRight: '3px' }}>{ticket.name}</span>
                )
            ),
        },
        {
            header: () => 'Action',
            cell: (promoCode) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_tickets">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(promoCode)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_tickets">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(promoCode)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title='Promo Codes' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Promo Codes" pageTitle="Promo Codes" />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_tickets">
                                <DataTable
                                    data={promoCodes}
                                    columns={columns}
                                    title="Codes"
                                    actions={[
                                        // Delete multiple
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_tickets">
                                                    <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },

                                        // Add new
                                        {
                                            render: (
                                                <HasPermission permission="create_tickets">
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
                    promoCode={EditPromoCode}
                    tickets={tickets}
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

