import React, { useState } from "react";
import Layout from "../../../../../Layouts/Event";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import DataTable, { ColumnDef } from "../../../../../Components/DataTable";
//import CreateEditModal from "./Components/CreateEditModal";
import DeleteModal from "../../../../../Components/Common/DeleteModal";

const Index = ({ orders }: any) => {


    console.log(orders);
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [product, setProduct] = useState(null);

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const editAction = (product: any) => {
        setProduct(product || null);
        setShowAddUpdateModal(true);
    }
    const deleteAction = (product: any) => {
        setDeleteProduct(product);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {

        deleteForm.post(route('organizer.events.products.destroy', deleteProduct.id));
        setShowDeleteConfirmation(false);
    }


    const columns: ColumnDef<(typeof orders.data)[0]> = [
        {
            header: () => "Id",
            cell: (product) => product.id,
        },
        // {
        //     header: () => "Descrption",
        //     cell: (product) => product.description,
        //     cellStyle: { width: '300px', textWrap: 'wrap'},
        // },
        // {
        //     header: () => "Price",
        //     cell: (product) => product.price,
        // },
        // {
        //     header: () => "Old Price",
        //     cell: (product) => product.old_price,
        // },
        // {
        //     header: () => "Stock",
        //     cell: (product) => product.stock,
        // },
        // {
        //     header: () => "Sold",
        //     cell: (product) => product.sold_qty,
        // },

        {
            header: () => "Action",
            cell: (product) => (
                <div className="hstack gap-3 fs-15">
                    {/* <HasPermission permission="edit_partner"> */}
                        <span
                            className="link-primary cursor-pointer"
                            onClick={() => editAction(product)}
                        >
                            <i className="ri-edit-fill"></i>
                        </span>
                    {/* </HasPermission> */}

                    {/* <HasPermission permission="delete_partner"> */}
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => deleteAction(product)}
                        >
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    {/* </HasPermission> */}
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title="Products" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Event Products" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            {/* <HasPermission permission="view_partner"> */}
                                <DataTable
                                    data={orders}
                                    columns={columns}
                                    title="Products"
                                    actions={[
                                        // Delete multiple
                                        {
                                            render: (dataTable) => (
                                                // <HasPermission permission="delete_partner">
                                                    <Button className="btn-danger"
                                                    // onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}
                                                    ><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                                // </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },

                                        // Add new
                                        {
                                            render: (
                                                // <HasPermission permission="create_partner">
                                                    <Button onClick={() => editAction(null)} ><i className="ri-add-fill"></i> Add New</Button>
                                                // </HasPermission>
                                            )

                                        },

                                    ]}
                                />
                            {/* </HasPermission> */}
                        </Col>
                    </Row>
                </Container>
            </div>

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => { setShowDeleteConfirmation(false) }}
            />
        </React.Fragment>
    );
};

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
