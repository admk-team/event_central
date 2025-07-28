import Layout from "../../../../Layouts/Event";
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Card, Tab, Nav } from 'react-bootstrap';
import ManageCategories from "./Components/ManageCategories";

function CreateOrEdit({ partner, partnerCategories }: any) {
    console.log('category test', partner);

    // Determine if the form is in edit mode
    const isEdit = !!partner;
    const { data, setData, post, processing, errors, reset } = useForm({
        partner_category_id: partner?.partner_category_id || '',
        type: partner?.type || '',
        company_name: partner?.company_name || "",
        email: partner?.email || "",
        description: partner?.description || "",
        web: partner?.web || "",
        phone: partner?.phone || "",
        address: partner?.address || "",
        exhibitor_logo: null,
        exhibitor_booth_no: partner?.exhibitor_booth_no || "",
        facebook: partner?.facebook || "",
        twitter: partner?.twitter || "",
        linkedin: partner?.linkedin || "",
        youtube: partner?.youtube || "",
        _method: partner?.id ? "PUT" : "POST", // Spoof method
    });

    function exhibitor_logo_handle(e: any) {
        console.log(e.target.files);
        const file = e.target.files[0]
        setData('exhibitor_logo', file);

    }
    const submit = (e: any) => {
        e.preventDefault();
        if (isEdit) {
            post(route('organizer.events.partner.update', partner.id))
        } else {
            post(route('organizer.events.partner.store'));
            console.log('testing ', errors);

        }
    };

    const [manageCategoriesModal, setManageCategoriesModal] = useState(false);
    function showModal() {
        setManageCategoriesModal(!manageCategoriesModal);
    }

    return (
        <React.Fragment>
            <Head title={isEdit ? 'Edit partner' : 'Create partner'} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={isEdit ? 'Edit partner' : 'Create partner'} pageTitle="Dashboard" />
                    <Row>

                        <Card className="mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-title">{isEdit ? 'Edit partner' : 'Create partner'}</div>
                            </div>
                            <Card.Body>
                                <div className="card-body">
                                    <form onSubmit={submit} >
                                        <Row className="gy-2">

                                            <Col xxl={12} md={12}>
                                                <Form.Label htmlFor="name" className="form-label">Partner Type</Form.Label>
                                                <div className="d-flex align-items-center">
                                                    <div className="form-check  me-5">
                                                        <Form.Check.Input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={data.type === 'exhibitor'} onChange={(e) => setData('type', 'exhibitor')} />
                                                        <Form.Check.Label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            Exhibitor
                                                        </Form.Check.Label>
                                                    </div>
                                                    <div className="form-check">
                                                        <Form.Check.Input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={data.type === 'sponsor'} onChange={(e) => setData('type', 'sponsor')} />
                                                        <Form.Check.Label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            Sponsor
                                                        </Form.Check.Label>
                                                    </div>
                                                </div>
                                                <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.type} </Form.Control.Feedback>

                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Company Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="company_name"
                                                        placeholder="Enter company name"
                                                        value={data.company_name}
                                                        onChange={(e) => setData('company_name', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.company_name} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Enter email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.email} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Phone</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        placeholder="Enter phone"
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.phone} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="address"
                                                        placeholder="Enter address"
                                                        value={data.address}
                                                        onChange={(e) => setData('address', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.address} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="description"
                                                        placeholder="Enter description"
                                                        value={data.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.description} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Web</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="web"
                                                        placeholder="Enter web"
                                                        value={data.web}
                                                        onChange={(e) => setData('web', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.web} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Facebook</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="facebook"
                                                        placeholder="Enter facebook"
                                                        value={data.facebook}
                                                        onChange={(e) => setData('facebook', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.facebook} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">Enter X</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="twitter"
                                                        placeholder="Enter X"
                                                        value={data.twitter}
                                                        onChange={(e) => setData('twitter', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.twitter} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">linkedin</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="linkedin"
                                                        placeholder="Enter linkedin"
                                                        value={data.linkedin}
                                                        onChange={(e) => setData('linkedin', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.linkedin} </Form.Control.Feedback>

                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                                <div className="">
                                                    <Form.Label htmlFor="name" className="form-label">youtube</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control"
                                                        id="youtube"
                                                        placeholder="Enter youtube"
                                                        value={data.youtube}
                                                        onChange={(e) => setData('youtube', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.youtube} </Form.Control.Feedback>
                                                </div>
                                            </Col>

                                            {data.type === 'exhibitor' && (
                                                <>
                                                    <Col xxl={6} md={6}>
                                                        <div className="">
                                                            <Form.Label htmlFor="name" className="form-label">Exhibitor profile</Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                className="form-control"
                                                                id="exhibitor_logo"
                                                                placeholder="exhibitor_logo"
                                                                onChange={exhibitor_logo_handle}
                                                            />
                                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.exhibitor_logo} </Form.Control.Feedback>

                                                        </div>
                                                    </Col>
                                                    <Col xxl={6} md={6}>
                                                        <div className="">
                                                            <Form.Label htmlFor="name" className="form-label">Booth number</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control"
                                                                id="exhibitor_booth_no"
                                                                placeholder="Enter Booth Number"
                                                                value={data.exhibitor_booth_no}
                                                                onChange={(e) => setData('exhibitor_booth_no', e.target.value)}
                                                            />
                                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.exhibitor_booth_no} </Form.Control.Feedback>
                                                        </div>
                                                    </Col>
                                                </>
                                            )}
                                            {data.type === 'sponsor' && (
                                                <>
                                                    <Col xxl={6} md={6}>
                                                        <div className="">
                                                            <Form.Label htmlFor="name" className="form-label">Sponsor profile</Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                className="form-control"
                                                                id="exhibitor_logo"
                                                                placeholder="exhibitor_logo"
                                                                onChange={exhibitor_logo_handle}
                                                            />
                                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.exhibitor_logo} </Form.Control.Feedback>
                                                        </div>
                                                    </Col>
                                                    <Col xxl={6} md={6}>
                                                        <Form.Label htmlFor="event_app_id" className="form-label">Sponsor Category</Form.Label>
                                                        <div className="d-flex align-items-center">
                                                            <select
                                                                className="form-select me-2"
                                                                id="category"
                                                                aria-label="Select Category"
                                                                value={data.partner_category_id}
                                                                onChange={(e) => setData('partner_category_id', e.target.value)}
                                                            >
                                                                <option value="">Select category</option>
                                                                {partnerCategories?.map((category: any) => (
                                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                                ))}
                                                            </select>
                                                            <Button variant="secondary" className="w-25" onClick={() => showModal()}>Manage Categories</Button>
                                                        </div>
                                                        <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.partner_category_id} </Form.Control.Feedback>

                                                    </Col>

                                                </>
                                            )}
                                        </Row>
                                        <div className="mt-4 text-center ">
                                            <Button type="submit" className="btn btn-success px-3" disabled={processing}>
                                                {isEdit ? 'Update' : 'Create'}
                                            </Button>
                                        </div>

                                    </form>

                                </div>

                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
            <ManageCategories manageCategoriesModal={manageCategoriesModal}
                showModal={showModal}
                partnerCategories={partnerCategories} />

        </React.Fragment>
    )
}

CreateOrEdit.layout = (page: any) => <Layout children={page} />;

export default CreateOrEdit;
