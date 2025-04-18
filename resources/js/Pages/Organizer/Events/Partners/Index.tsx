import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../Components/HasPermission";
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";


function Index({ partners }: any) {
    const [deletePartner, setDeletePartner] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);


    const { get } = useForm()
    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });
    const editAction = (partner: any) => {
        get(route('organizer.events.partner.edit', partner))
    }

    const deleteAction = (partner: any) => {
        console.log('testing23423 ', partner);

        setDeletePartner(partner);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.post(route('organizer.events.partner.destroy', deletePartner.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.partner.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }
    const columns: ColumnDef<typeof partners.data[0]> = [
        {
            header: () => 'ID',
            cell: (partner) => partner.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Company Name',
            cell: (partner) => partner.company_name,
        },
        {
            header: () => 'Type',
            cell: (partner) => partner.type,
        },

        {
            header: () => 'Action',
            cell: (partner) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_partner">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(partner)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>

                    <HasPermission permission="delete_partner">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(partner)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Event Partners" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_partner">
                                <DataTable
                                    data={partners}
                                    columns={columns}
                                    title="Partners"
                                    actions={[
                                        // Delete multiple
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_partner">
                                                    <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },

                                        // Add new
                                        {
                                            render: (
                                                <HasPermission permission="create_partner">
                                                    <Link href={route('organizer.events.partner.create')}><Button><i className="ri-add-fill"></i> Add New</Button></Link>
                                                </HasPermission>
                                            )

                                        },

                                    ]}
                                />
                            </HasPermission>
                        </Col>
                    </Row>
                </Container>
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
            </div>
        </React.Fragment>

    )
}

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
