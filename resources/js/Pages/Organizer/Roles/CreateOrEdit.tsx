import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, useForm, Link } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import Layout from '../../../Layouts/Organizer';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';

function CreateOrEdit({ role, allPermissions, roleSpecific }: { role: any | null, allPermissions: any[], roleSpecific: any[] }) {
    const isEdit = role != null;

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: role?.name ?? '',
        permissions: isEdit ? roleSpecific.map((p) => p.id) : [],
    });

    // Handle individual checkbox selection
    const handleCheckboxChange = (id: number) => {
        let updatedPermissions = data.permissions.includes(id)
            ? data.permissions.filter((permId: number) => permId !== id) // Remove if already selected
            : [...data.permissions, id]; // Add if not selected

        setData("permissions", updatedPermissions);
    };

    // Handle Select All toggle
    const handleSelectAll = () => {
        if (data.permissions.length === allPermissions.length) {
            setData("permissions", []); // Deselect all
        } else {
            setData("permissions", allPermissions.map(p => p.id)); // Select all
        }
    };

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.roles.update', role.id), {
                preserveScroll: true,
            });
        } else {
            post(route('organizer.roles.store'), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <React.Fragment>
            <Head title={`${isEdit ? 'Edit Role' : 'Create Role'}`} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={isEdit ? 'Edit' : 'Create'}
                        items={[
                            { title: "Roles", link: route('organizer.roles.index') }
                        ]}
                    />
                    <Row>
                        <Col xs={12}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="card-title">{isEdit ? "Edit Role" : "Create Role"}</div>
                                </div>
                                <div className="card-body">
                                    <Form onSubmit={submit}>
                                        <FormGroup className="mb-3">
                                            <Form.Label className="form-label">Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                value={data.name}
                                                onChange={(e) => setData("name", e.target.value)}
                                                isInvalid={!!errors.name}
                                            />
                                            {errors.name && (
                                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                            )}
                                        </FormGroup>

                                        <div style={{
                                            padding: '1rem',
                                            borderLeft: '4px solid #f59e0b',
                                            backgroundColor: '#fff7ed',
                                            color: '#78350f',
                                            fontFamily: 'Arial, sans-serif',
                                            borderRadius: '8px',
                                            marginBottom: '1rem'
                                        }}>
                                            <strong>Important Note:</strong>
                                            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                                                <li>
                                                    All roles under <strong>Organizer</strong> must have the <strong>View Event</strong> permission.
                                                </li>
                                                <li>
                                                    Every <strong>Create</strong> permission must be accompanied by the corresponding <strong>View</strong> permission,
                                                    as users need visibility after creating items.
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Select All Checkbox */}
                                        <Form.Check
                                            type="checkbox"
                                            id="select-all"
                                            label="Select All"
                                            checked={data.permissions.length === allPermissions.length}
                                            onChange={handleSelectAll}
                                            className="mb-2"
                                        />
                                        <Row className="mt-4">
                                            {allPermissions.map((permission: any) => (
                                                <Col key={permission.id} xs={6} md={4} lg={3}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        id={`permission-${permission.id}`}
                                                        label={permission.name.replaceAll('_', ' ')}
                                                        checked={data.permissions.includes(permission.id)}
                                                        onChange={() => handleCheckboxChange(permission.id)}
                                                    />
                                                </Col>
                                            ))}
                                            {errors.permissions && (
                                                <span className="text-danger mt-4">{errors.permissions}</span>
                                            )}
                                        </Row>

                                        <Button type="submit" className="mt-3" disabled={processing}>
                                            {isEdit ? "Update Role" : "Create Role"}
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

CreateOrEdit.layout = (page: any) => <Layout children={page} />;
export default CreateOrEdit;
