import React, { useState } from "react";
import Layout from "../../../../../Layouts/Event";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import DataTable, { ColumnDef } from "../../../../../Components/DataTable";
import OrderDetailsModal from "./Components/OrderDetailsModal";
import DeleteModal from "../../../../../Components/Common/DeleteModal";

const Index = ({ orders }: any) => {
    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const deleteForm = useForm({
        _method: "DELETE",
    });

    const handleView = (order:any) => {
        console.log(order);
        setSelectedOrder(order);
        setShowModal(true);
    };

    const editAction = (product: any) => {
        setProduct(product || null);
        setShowAddUpdateModal(true);
    };

    const deleteAction = (product: any) => {
        setDeleteProduct(product);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        deleteForm.post(route("organizer.events.products.destroy", deleteProduct.id));
        setShowDeleteConfirmation(false);
    };

    const columns: ColumnDef<(typeof orders.data)[0]> = [
        {
            header: () => "Id",
            cell: (order) => order.id,
        },
        {
            header: () => "Name",
            cell: (order) => order.user.name,
            cellStyle: { width: "300px", textWrap: "wrap" },
        },
        {
            header: () => "Email",
            cell: (order) => order.user.email,
        },
        {
            header: () => "Amount",
            cell: (order) => order.total_amount,
        },
        {
            header: () => "Payment Method",
            cell: (order) => order.payment_method,
        },
        {
            header: () => "Status",
            cell: (order) => order.status,
        },
        {
            header: () => "Action",
            cell: (order) => (
                <div className="hstack gap-3 fs-15">
                    <span
                        className="link-info cursor-pointer"
                        onClick={() => handleView(order.items)}
                    >
                        <i className="ri-eye-fill"></i>
                    </span>
                    <span
                        className="link-danger cursor-pointer"
                        onClick={() => deleteAction(order)}
                    >
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title="Orders" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Event Orders" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={orders}
                                columns={columns}
                                title="Orders"
                                actions={[
                                    {
                                        render: (dataTable) => (
                                            <Button className="btn-danger">
                                                <i className="ri-delete-bin-5-line"></i>{" "}
                                                Delete ({dataTable.getSelectedRows().length})
                                            </Button>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => setShowDeleteConfirmation(false)}
            />

            <OrderDetailsModal
                show={showModal}
                onClose={() => setShowModal(false)}
                order={selectedOrder}
            />
        </React.Fragment>
    );
};

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
