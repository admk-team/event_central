import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

interface Product {
    name: string;
}

interface OrderItem {
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
    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {order && order.items && order.items.length > 0 ? (
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product?.name || "N/A"}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No items found for this order.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderDetailsModal;
