import { useForm, usePage } from '@inertiajs/react'
import { Key } from 'lucide-react';
import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { object } from 'yup';

export default function Colors() {
    const colors = usePage().props.colors as Record<string, string>;

    const { data, setData, post, processing } = useForm({
        'colors': colors,
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-0">Colors</CardTitle>
            </CardHeader>
            <CardBody>
                {Object.entries(data.colors.light).map(([_, groupColors]) => (
                    <ListGroup className="mb-3">
                        {Object.entries(groupColors).map(([name, value]) => (
                            <ListGroupItem className="py-2">
                                <Row>
                                    <Col lg={2}>
                                        <div className="d-flex align-items-center h-100">
                                            <Form.Label className="form-label mb-0 text-capitalize">{name.replaceAll('_', ' ')}</Form.Label>
                                        </div>
                                    </Col>
                                    <Col md={10}>
                                        <Form.Control
                                            type="color"
                                            className="form-control"
                                            value={value}
                                            onChange={(e) => setData((oldData) => {
                                                
                                            })}
                                            // isInvalid={!!errors.title}
                                        />
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                ))}
            </CardBody>
        </Card>
    )
}
