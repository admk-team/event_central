import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';

const TicketCard = ({ ticket, onAddToCart, onRemoveFromCart }: any) => {

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(parseFloat(ticket.total_price));
    const [subTotal, setSubTotal] = useState(quantity * price);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(subTotal - discount);
    const [discountCode, setDiscountCode] = useState('');
    const [haveCode, setHaveCode] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const [viewAllFeatures, setViewAllFeatures] = useState(false);

    const handleHaveCode = (e) => {
        if (e.target.checked) {
            setHaveCode(true);
        } else {
            setHaveCode(false);
        }
    }
    useEffect(() => {
        setSubTotal(quantity * price);
    }, [price, quantity]);

    useEffect(() => {
        console.log('updating total disc');
        setTotal(subTotal - discount);
    }, [subTotal, discount, total]);

    const validateCode = () => {
        setCodeError(false);
        axios.post(route('attendee.validateCode.post', [ticket.id, discountCode])).then((response) => {
            let codeObj = response.data.code;
            switch (codeObj.discount_type) {
                case 'fixed':
                    setDiscount(codeObj.discount_value);
                    setTotal(subTotal - discount);
                    return;
                case 'percentage':
                    setDiscount(subTotal * (codeObj.discount_value / 100));
                    setTotal(subTotal - discount);
                    return;
            }
        }).catch((error) => {
            console.log(error.response.data.message);
            setCodeError(error.response.data.message)
            setDiscount(0);
            setTotal(subTotal - discount);
        });
    }


    return (
        <Col lg={8}>
            <Card className="mb-0">
                <Card.Body className="p-4 m-2" style={{ minHeight: '400px' }}>
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                            <h5 className="mb-1 fw-bold">{ticket.name}</h5>
                            {/* <p className="text-muted mb-0">{ticket.description}</p> */}
                        </div>
                        <div className="flex-grow-2">
                            <h1 className="month">
                                <sup>
                                    <small>$</small>
                                </sup>
                                <span className="ff-secondary fw-bold">{ticket.total_price}</span>
                                <span
                                    className="fs-13 text-muted">
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div>
                        <h5 className="mb-1 fw-bold bg-light p-2 ">Sessions</h5>
                        <ul className="list-unstyled text-muted vstack gap-3">
                            {ticket.sessions.length > 0 && ticket.sessions.map((session: any) =>
                                <li key={session.id}>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 text-success me-1">
                                            <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            {session.name}
                                        </div>
                                    </div>
                                </li>
                            )}

                        </ul>
                        <Row className='bg-light p-2'>
                            <Col md={9} lg={9}>
                                <h5 className="mb-1 fw-bold ">Addon Features</h5>
                            </Col>
                            <Col md={3} lg={3} className='d-flex justify-content-end'>
                                <Button className='btn-sm' onClick={() => setViewAllFeatures(!viewAllFeatures)}>
                                    {viewAllFeatures ? "Only Included" : "View All"}
                                </Button>
                            </Col>
                        </Row>
                        <ul className="list-unstyled text-muted vstack gap-3" id="AttendeeTicketFeature">
                            {!viewAllFeatures &&
                                ticket.all_features.length > 0 && ticket.all_features.map((feature: any) =>
                                    feature.selected > 0 && <li key={feature.id}>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 text-success me-1">
                                                <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: feature.name }} />
                                        </div>
                                    </li>
                                )
                            }
                            {viewAllFeatures &&
                                ticket.all_features.length > 0 && ticket.all_features.map((feature: any) =>
                                    <li key={feature.id}>
                                        <div className="d-flex">
                                            {feature.selected > 0 ? <div className="flex-shrink-0 text-success me-1">
                                                <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                            </div> : <div className="flex-shrink-0 text-muted me-1">
                                                <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                            </div>}
                                            <div dangerouslySetInnerHTML={{ __html: feature.name }} />
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                        <Row>
                            <Col md={6} lg={6}>
                                <Row>
                                    <Col className='d-flex align-items-center'><Form.Label column>Quantity</Form.Label></Col>
                                    <Col><Form.Control
                                        id="ticket-quantity"
                                        type="number"
                                        min={1}
                                        style={{ textAlign: 'center' }}
                                        disabled={isAddedToCart}
                                        name="ticket_quantity"
                                        placeholder="Quantity"
                                        value={quantity}
                                        autoComplete="ticket_quantity"
                                        onChange={(e: any) => setQuantity(parseInt(e.target.value))}
                                    /></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            className='mt-4'
                                            disabled={isAddedToCart}
                                            type='checkbox'
                                            id={"coupon-checkbox-" + ticket.id}
                                            label="Do you have Discount Coupon?"
                                            onChange={handleHaveCode}
                                        />
                                        {haveCode &&
                                            <>
                                                <Row className='fw-bold bg-light mt-2'>
                                                    <Col md={6} lg={6}>
                                                        <h5 className="mb-1 pt-2 pb-2">Sub Total</h5></Col>
                                                    <Col md={6} lg={6}>
                                                        <h5 className="mb-1 pt-2 pb-2 text-end">
                                                            <sup>
                                                                <small>$</small>
                                                            </sup>
                                                            {subTotal}
                                                        </h5>
                                                    </Col>
                                                </Row>
                                                <Row className='mt-2'>
                                                    <Col md={4} lg={4}>
                                                        <Form.Label column>Code</Form.Label>
                                                    </Col>
                                                    <Col md={8} lg={8}>
                                                        <InputGroup >
                                                            <Form.Control
                                                                disabled={isAddedToCart}
                                                                id={"ticket-discount-code" + ticket.id}
                                                                type="text"
                                                                isInvalid={codeError}
                                                                name={"ticket_quantity_" + ticket.id}
                                                                placeholder="Code Here"
                                                                value={discountCode}
                                                                onChange={(e: any) => setDiscountCode(e.target.value)}
                                                            />
                                                            <Button
                                                                disabled={isAddedToCart}
                                                                id={"button-addon2" + ticket.id} onClick={validateCode}>
                                                                Apply
                                                            </Button>
                                                        </InputGroup>
                                                        {codeError && <div className="invalid-feedback d-block">Invalid Code</div>}
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='fw-bold bg-light mt-2'>
                            <Col md={6} lg={6}>
                                <h5 className="mb-1  pt-2 pb-2">Total Payable</h5></Col>
                            <Col md={6} lg={6}>
                                <h5 className="mb-1 pt-2 pb-2 text-end">
                                    <sup>
                                        <small>$</small>
                                    </sup>
                                    {total}
                                </h5>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="">
                        {!isAddedToCart && <Button className="btn btn-secondary w-100" onClick={() => {
                            onAddToCart(ticket, price, quantity, subTotal, discount, total, discountCode);
                            setIsAddedToCart(true);
                        }}>Add To Cart</Button>}
                        {isAddedToCart && <Button className="btn btn-secondary w-100" onClick={() => {
                            onRemoveFromCart(ticket);
                            setIsAddedToCart(false);
                        }}>Remove From Cart</Button>}
                    </div>
                </Card.Footer>
            </Card>
        </Col >
    );
}

export default TicketCard;
