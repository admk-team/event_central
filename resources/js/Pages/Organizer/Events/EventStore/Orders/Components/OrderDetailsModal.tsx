import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface Product {
    name: string;
}

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product?: Product;
}

interface Order {
    id: number;
    items: OrderItem[];
}

interface Props {
    show: boolean;
    onClose: () => void;
    order: Order | null;
}

const OrderDetailsModal: React.FC<Props> = ({ show, onClose, order }) => {
    const { t } = useLaravelReactI18n();

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("Order Details")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {order && order.items && order.items.length > 0 ? (
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>{t("Product Name")}</th>
                                <th>{t("Quantity")}</th>
                                <th>{t("Price")}</th>
                                <th>{t("Total")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.product?.name || t("N/A")}</td>
                                    <td>{item.quantity}</td>
                                    <td>${Number(item.price).toFixed(2)}</td>
                                    <td>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>{t("No items found for this order.")}</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {t("Close")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderDetailsModal;
