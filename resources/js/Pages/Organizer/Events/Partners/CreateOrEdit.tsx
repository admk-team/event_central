import Layout from "../../../../Layouts/Event";
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';
import ManageCategories from "./Components/ManageCategories";
import { useLaravelReactI18n } from "laravel-react-i18n";

function CreateOrEdit({ partner, partnerCategories }: any) {
    const { t } = useLaravelReactI18n();

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
        insta: partner?.insta || "",
        tiktok: partner?.tiktok || "",
        banner_image: "",
        _method: partner?.id ? "PUT" : "POST",
    });

    function exhibitor_logo_handle(e: any) {
        const file = e.target.files[0];
        setData('exhibitor_logo', file);
    }

    function banner_image_handle(e: any) {
        const file = e.target.files[0];
        setData('banner_image', file);
    }

    const submit = (e: any) => {
        e.preventDefault();
        if (isEdit) {
            post(route('organizer.events.partner.update', partner.id));
        } else {
            post(route('organizer.events.partner.store'));
        }
    };

    const [manageCategoriesModal, setManageCategoriesModal] = useState(false);
    function showModal() {
        setManageCategoriesModal(!manageCategoriesModal);
    }

    return (
        <React.Fragment>
            <Head title={isEdit ? t("Edit Partner") : t("Create Partner")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={isEdit ? t("Edit Partner") : t("Create Partner")} pageTitle={t("Dashboard")} />
                    <Row>
                        <Card className="mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-title">{isEdit ? t("Edit Partner") : t("Create Partner")}</div>
                            </div>
                            <Card.Body>
                                <form onSubmit={submit}>
                                    <Row className="gy-2">
                                        <Col xxl={12} md={12}>
                                            <Form.Label className="form-label">{t("Partner Type")}</Form.Label>
                                            <div className="d-flex align-items-center">
                                                <div className="form-check me-5">
                                                    <Form.Check.Input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="type"
                                                        id="exhibitor"
                                                        checked={data.type === 'exhibitor'}
                                                        onChange={() => setData('type', 'exhibitor')}
                                                    />
                                                    <Form.Check.Label htmlFor="exhibitor">{t("Exhibitor")}</Form.Check.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Check.Input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="type"
                                                        id="sponsor"
                                                        checked={data.type === 'sponsor'}
                                                        onChange={() => setData('type', 'sponsor')}
                                                    />
                                                    <Form.Check.Label htmlFor="sponsor">{t("Sponsor")}</Form.Check.Label>
                                                </div>
                                            </div>
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.type} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("Company Name")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="company_name"
                                                placeholder={t("Enter Company Name")}
                                                value={data.company_name}
                                                onChange={(e) => setData('company_name', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.company_name} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("Email")}</Form.Label>
                                            <Form.Control
                                                type="email"
                                                id="email"
                                                placeholder={t("Enter Email")}
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.email} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("Phone")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="phone"
                                                placeholder={t("Enter Phone")}
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.phone} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("Address")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="address"
                                                placeholder={t("Enter Address")}
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.address} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("Description")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="description"
                                                placeholder={t("Enter Description")}
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.description} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("Website")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="web"
                                                placeholder={t("Enter Website")}
                                                value={data.web}
                                                onChange={(e) => setData('web', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.web} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("Facebook")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="facebook"
                                                placeholder={t("Enter Facebook")}
                                                value={data.facebook}
                                                onChange={(e) => setData('facebook', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.facebook} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("X (Twitter)")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="twitter"
                                                placeholder={t("Enter X")}
                                                value={data.twitter}
                                                onChange={(e) => setData('twitter', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.twitter} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("LinkedIn")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="linkedin"
                                                placeholder={t("Enter LinkedIn")}
                                                value={data.linkedin}
                                                onChange={(e) => setData('linkedin', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.linkedin} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("YouTube")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="youtube"
                                                placeholder={t("Enter YouTube")}
                                                value={data.youtube}
                                                onChange={(e) => setData('youtube', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.youtube} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("Instagram")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="insta"
                                                placeholder={t("Enter Instagram")}
                                                value={data.insta}
                                                onChange={(e) => setData('insta', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.insta} </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label className="form-label">{t("TikTok")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="tiktok"
                                                placeholder={t("Enter TikTok")}
                                                value={data.tiktok}
                                                onChange={(e) => setData('tiktok', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.tiktok} </Form.Control.Feedback>
                                        </Col>

                                        {data.type === 'exhibitor' && (
                                            <>
                                                <Col xxl={6} md={6}>
                                                    <Form.Label className="form-label">{t("Exhibitor Logo")}</Form.Label>
                                                    <Form.Control type="file" id="exhibitor_logo" onChange={exhibitor_logo_handle} />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.exhibitor_logo} </Form.Control.Feedback>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <Form.Label className="form-label">{t("Booth Number")}</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        id="exhibitor_booth_no"
                                                        placeholder={t("Enter Booth Number")}
                                                        value={data.exhibitor_booth_no}
                                                        onChange={(e) => setData('exhibitor_booth_no', e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.exhibitor_booth_no} </Form.Control.Feedback>
                                                </Col>
                                            </>
                                        )}

                                        {data.type === 'sponsor' && (
                                            <>
                                                <Col xxl={6} md={6}>
                                                    <Form.Label className="form-label">{t("Sponsor Logo")}</Form.Label>
                                                    <Form.Control type="file" id="exhibitor_logo" onChange={exhibitor_logo_handle} />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.exhibitor_logo} </Form.Control.Feedback>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <Form.Label className="form-label">{t("Sponsor Banner")}</Form.Label>
                                                    <Form.Control type="file" id="banner_image" onChange={banner_image_handle} />
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.banner_image} </Form.Control.Feedback>
                                                </Col>
                                                <Col xxl={6} md={6}>
                                                    <Form.Label className="form-label">{t("Sponsor Category")}</Form.Label>
                                                    <div className="d-flex align-items-center">
                                                        <select
                                                            className="form-select me-2"
                                                            id="category"
                                                            value={data.partner_category_id}
                                                            onChange={(e) => setData('partner_category_id', e.target.value)}
                                                        >
                                                            <option value="">{t("Select Category")}</option>
                                                            {partnerCategories?.map((category: any) => (
                                                                <option key={category.id} value={category.id}>{category.name}</option>
                                                            ))}
                                                        </select>
                                                        <Button variant="secondary" className="w-25" onClick={() => showModal()}>
                                                            {t("Manage Categories")}
                                                        </Button>
                                                    </div>
                                                    <Form.Control.Feedback type="invalid" className='d-block mt-2'> {errors.partner_category_id} </Form.Control.Feedback>
                                                </Col>
                                            </>
                                        )}
                                    </Row>
                                    <div className="mt-4 text-center">
                                        <Button type="submit" className="btn btn-success px-3" disabled={processing}>
                                            {isEdit ? t("Update") : t("Create")}
                                        </Button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
            <ManageCategories
                manageCategoriesModal={manageCategoriesModal}
                showModal={showModal}
                partnerCategories={partnerCategories}
            />
        </React.Fragment>
    );
}

CreateOrEdit.layout = (page: any) => <Layout children={page} />;
export default CreateOrEdit;
