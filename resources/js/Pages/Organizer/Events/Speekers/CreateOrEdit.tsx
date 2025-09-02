import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';
import { Head, useForm } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Select from "react-select";
import languageData from "../../../../common/language-list.json";
import countryData from "../../../../common/countries.json";
import ImageCroper from "../../../../Components/ImageCroper/Index";
import { useLaravelReactI18n } from "laravel-react-i18n";

function CreateOrEdit({ speaker, events }: any) {
    const { t } = useLaravelReactI18n();

    const isEdit = !!speaker;
    const [showCropper, setShowCropper] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: speaker?.name || "",
        avatar: null,
        company: speaker?.company || "",
        position: speaker?.position || "",
        bio: speaker?.bio || "",
        email: speaker?.email || "",
        phone: speaker?.phone || "",
        web: speaker?.web || "",
        linkedin: speaker?.linkedin || "",
        facebook: speaker?.facebook || "",
        twitter: speaker?.twitter || "",
        instagram: speaker?.instagram || "",
        country: speaker?.country || "",
        language: speaker?.language ? speaker.language.split(",") : [],
        _method: speaker?.id ? "PUT" : "POST",
    });

    const languageOptions = Object.entries(languageData).map(([key, value]) => ({
        value: key,
        label: value.name,
    }));

    const countryOptions = countryData.map(country => ({
        value: country.name,
        label: country.name
    }));

    function handleAvatar(e: any) {
        const file = e.target.files[0];
        setSelectedImage(file);
        setShowCropper(true);
    }

    const submit = (e: any) => {
        e.preventDefault();
        if (isEdit) {
            post(route('organizer.events.speaker.update', speaker.id));
        } else {
            post(route('organizer.events.speaker.store'));
        }
    };

    const updateImagePreview = (file: any) => {
        setData('avatar', file);
    };

    return (
        <React.Fragment>
            <Head title={isEdit ? t('Edit Speaker') : t('Create Speaker')} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={isEdit ? t('Edit Speaker') : t('Create Speaker')} pageTitle={t("Dashboard")} />
                    <Row>
                        <Card className="mt-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-title">{isEdit ? t('Edit Speaker') : t('Create Speaker')}</div>
                            </div>
                            <Card.Body>
                                <form onSubmit={submit}>
                                    <Row className="gy-2">

                                        {/* Name */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="name">{t("Name")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="name"
                                                placeholder={t("Name")}
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Avatar */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="avatar">{t("Avatar")}</Form.Label>
                                            <Form.Control
                                                type="file"
                                                id="avatar"
                                                onChange={handleAvatar}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.avatar}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Company */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="company">{t("Company")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="company"
                                                placeholder={t("Company")}
                                                value={data.company}
                                                onChange={(e) => setData('company', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.company}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Position */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="position">{t("Position")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="position"
                                                placeholder={t("Position")}
                                                value={data.position}
                                                onChange={(e) => setData('position', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.position}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Bio */}
                                        <Col xxl={12} md={12}>
                                            <Form.Label htmlFor="bio">{t("Bio")}</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                id="bio"
                                                placeholder={t("Bio")}
                                                value={data.bio}
                                                onChange={(e) => setData('bio', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.bio}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Email */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="email">{t("Email")}</Form.Label>
                                            <Form.Control
                                                type="email"
                                                id="email"
                                                placeholder={t("Email")}
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Phone */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="phone">{t("Phone")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="phone"
                                                placeholder={t("Phone")}
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Website */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="web">{t("Website")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="web"
                                                placeholder={t("Website")}
                                                value={data.web}
                                                onChange={(e) => setData('web', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.web}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Social Links */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="linkedin">{t("LinkedIn")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="linkedin"
                                                placeholder={t("LinkedIn")}
                                                value={data.linkedin}
                                                onChange={(e) => setData('linkedin', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.linkedin}
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="facebook">{t("Facebook")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="facebook"
                                                placeholder={t("Facebook")}
                                                value={data.facebook}
                                                onChange={(e) => setData('facebook', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.facebook}
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="twitter">{t("X")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="twitter"
                                                placeholder={t("X")}
                                                value={data.twitter}
                                                onChange={(e) => setData('twitter', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.twitter}
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="instagram">{t("Instagram")}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="instagram"
                                                placeholder={t("Instagram")}
                                                value={data.instagram}
                                                onChange={(e) => setData('instagram', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.instagram}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Country */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="country">{t("Country")}</Form.Label>
                                            <Select
                                                id="country"
                                                options={countryOptions}
                                                value={countryOptions.find(option => option.value === data.country)}
                                                onChange={(selected) => setData("country", selected?.value || "")}
                                                isSearchable={true}
                                                placeholder={t("Select a Country...")}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.country}
                                            </Form.Control.Feedback>
                                        </Col>

                                        {/* Language */}
                                        <Col xxl={6} md={6}>
                                            <Form.Label htmlFor="language">{t("Language")}</Form.Label>
                                            <Select
                                                id="language"
                                                options={languageOptions}
                                                isMulti={true}
                                                value={languageOptions.filter(option => data.language?.includes(option.value))}
                                                onChange={(selected) => setData("language", selected ? selected.map(option => option.value) : [])}
                                                isSearchable={true}
                                                placeholder={t("Select a language...")}
                                            />
                                            <Form.Control.Feedback type="invalid" className='d-block mt-2'>
                                                {errors.language}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>

                                    <div className="mt-4 text-center">
                                        <Button type="submit" className="btn btn-success px-3" disabled={processing}>
                                            {isEdit ? t('Update') : t('Create')}
                                        </Button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>

            <ImageCroper
                visible={showCropper}
                imageSrc={selectedImage}
                onClose={() => setShowCropper(false)}
                onCrop={updateImagePreview}
            />
        </React.Fragment>
    )
}

CreateOrEdit.layout = (page: any) => <Layout children={page} />;

export default CreateOrEdit;
