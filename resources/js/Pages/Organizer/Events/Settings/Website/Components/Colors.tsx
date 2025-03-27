import { useForm, usePage } from '@inertiajs/react'
import { Key } from 'lucide-react';
import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { object } from 'yup';

export default function Colors() {
    const colors = usePage().props.colors as any;

    const { data, setData, post, processing } = useForm({
        'colors': colors,
    });

    const submit = (e: any) => {
        e.preventDefault();

        post(route('organizer.events.settings.website.save-colors'), {
            preserveScroll: true,
        });
    }

    return (
        <Form onSubmit={submit}>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <CardTitle className="mb-0">Colors</CardTitle>
                    <div>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Saving
                                </span>
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    {Object.entries(data.colors.light).map(([groupName, groupColors]: any) => (
                        <ListGroup className="mb-3" key={groupName}>
                            {Object.entries(groupColors).map(([name, value]) => (
                                <ListGroupItem className="py-2" key={name}>
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
                                                value={value as string}
                                                onChange={(e) => {
                                                    const newData = { ...data };
                                                    newData.colors.light[groupName][name] = e.target.value;
                                                    setData(newData);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    ))}
                </CardBody>
            </Card>
        </Form>
    )
}
