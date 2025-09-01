import React, { useState } from "react";
import Layout from "../../../../../Layouts/Event";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import DataTable, { ColumnDef } from "../../../../../Components/DataTable";
import OrderDetailsModal from "./Components/OrderDetailsModal";
import DeleteModal from "../../../../../Components/Common/DeleteModal";
import HasPermission from "../../../../../Components/HasPermission";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Index = ({ orders }: any) => {
    const { t } = useLaravelReactI18n();

    const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const deleteForm = useForm({
        _method: "DELETE",
    });

    const handleView = (order: any) => {
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
        deleteForm.post(route("organizer.events.orders.destroy", deleteProduct.id));
        setShowDeleteConfirmation(false);
    };

    const columns: ColumnDef<(typeof orders.data)[0]> = [
        {
            header: () => t("Id"),
            cell: (order) => order.id,
        },
        {
            header: () => t("Name"),
            cell: (order) => order.user.name,
            cellStyle: { width: "300px", textWrap: "wrap" },
        },
        {
            header: () => t("Email"),
            cell: (order) => order.user.email,
        },
        {
            header: () => t("Amount"),
            cell: (order) => order.total_amount,
        },
        {
            header: () => t("Payment Method"),
            cell: (order) => order.payment_method,
        },
        {
            header: () => t("Status"),
            cell: (order) => order.status,
        },
        {
            header: () => t("Action"),
            cell: (order) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="view_orders">
                        <span
                            className="link-info cursor-pointer"
                            onClick={() => handleView(order)}
                            title={t("View Order")}
                        >
                            <i className="ri-eye-fill"></i>
                        </span>
                    </HasPermission>
                    <HasPermission permission="delete_orders">
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => deleteAction(order)}
                            title={t("Delete Order")}
                        >
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title={t("Orders")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t("Event Orders")} pageTitle={t("Dashboard")} />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="delete_orders">
                                <DataTable
                                    data={orders}
                                    columns={columns}
                                    title={t("Orders")}
                                    actions={[
                                        {
                                            render: (dataTable) => (
                                                <Button className="btn-danger">
                                                    <i className="ri-delete-bin-5-line"></i>{" "}
                                                    {t("Delete")} ({dataTable.getSelectedRows().length})
                                                </Button>
                                            ),
                                            showOnRowSelection: true,
                                        },
                                    ]}
                                />
                            </HasPermission>
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
