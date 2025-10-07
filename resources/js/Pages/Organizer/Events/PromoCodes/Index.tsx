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
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ promoCodes, tickets }: any) {

    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [EditPromoCode, setEditPromoCode] = React.useState<any>(null);

    const [deleteschedule, setDeleteSchedule] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const { t } = useLaravelReactI18n();

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
            header: () => t('ID'),
            cell: (promoCode) => promoCode.id,
            cellClass: "fw-medium"
        },
        // {
        //     header: () => t('Event Name'),
        //     cell: (promoCode) => (<span key={promoCode.event?.id ?? ''} className="badge bg-secondary-subtle text-secondary fs-6" style={{ marginRight: '3px' }}>{promoCode.event?.name ?? ''}</span>),
        // },
        {
            accessorKey: 'code',
            header: () => t('Code'),
            cell: (promoCode) => {
                return (<span className="text-uppercase"> {promoCode.code}</span>)
            },
            searchable: true,
        },
        {
            accessorKey: 'description',
            header: () => t('Description'),
            cell: (promoCode) => promoCode.description,
            searchable: true,
        },
        {
            header: () => t('Discount Type'),
            cell: (promoCode: any) => {
                switch (promoCode.discount_type) {
                    case "fixed":
                        return (<span className="badge rounded-pill border border-success text-success text-uppercase"> {promoCode.discount_type}</span>);
                    case "percentage":
                        return (<span className="badge rounded-pill border border-info text-info text-uppercase"> {promoCode.discount_type}</span>);
                    default:
                        return (<span className="badge bg-danger-subtle  text-danger text-uppercase"> {t('na')}</span>);
                }
            },
        },

        {
            header: () => t('Discount Value'),
            cell: (promoCode) => promoCode.discount_value,
        },
        {
            header: () => t('Usage Limit'),
            cell: (promoCode) => promoCode.usage_limit,
        },
        {
            header: () => t('Used Count'),
            cell: (promoCode) => promoCode.used_count,
        },
        {
            header: () => t('Status'),
            cell: (promoCode: any) => {
                switch (promoCode.status) {
                    case "active":
                        return (<span className="badge rounded-pill border border-success text-success text-uppercase fs-7"> {t('Active')} </span>);
                    case "expired":
                        return (<span className="badge rounded-pill border border-info text-info text-uppercase fs-7"> {t('Expired')} </span>);
                    case "disabled":
                        return (<span className="badge rounded-pill border border-danger text-danger text-uppercase fs-7"> {t('Disabled')} </span>);
                    default:
                        return (<span className="badge bg-danger-subtle  text-danger text-uppercase"> {t('NA')}</span>);
                }
            },
        },
        {
            header: () => t('Start Date'),
            cell: (promoCode) => moment(promoCode.start_date).format('DD MMM, YYYY'),
        },
        {
            header: () => t('End Date'),
            cell: (promoCode) => moment(promoCode.end_date).format('DD MMM, YYYY'),
        },
        {
            header: () => t('Tickets'),
            cell: (promoCode) => (
                <div className='d-flex flex-column w-100 align-items-baseline'>
                    {promoCode.tickets.map((ticket: any) =>
                        <span key={ticket.id} className="badge rounded-pill border border-secondary mt-1 text-secondary fs-7" style={{ marginRight: '3px' }}>{ticket.name}</span>
                    )}
                </div>
            ),
        },
        {
            header: () => t('Action'),
            cell: (promoCode) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_promo_code">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(promoCode)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_promo_code">
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
            <Head title={t('Promo Codes')} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t("Promo Codes")} pageTitle={t("Promo Codes")} />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_promo_code">
                                <DataTable
                                    data={promoCodes}
                                    columns={columns}
                                    title={t("Codes")}
                                    actions={[
                                        // Delete multiple
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_promo_code">
                                                    <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> {t("Delete")} ({dataTable.getSelectedRows().length})</Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },

                                        // Add new
                                        {
                                            render: (
                                                <HasPermission permission="create_promo_code">
                                                    <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> {t("Add New")}</Button>
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
