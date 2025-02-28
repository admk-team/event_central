import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Offcanvas, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
// import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";


// Register the plugins , FilePondPluginFileEncode, FilePondPluginImageCrop
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import { useDispatch } from "react-redux";


//SimpleBar
import SimpleBar from "simplebar-react";

const UserProfileRightSidebar = (props: any) => {
    const user = usePage().props.auth.user;
    const dispatch: any = useDispatch();

    const [show, setShow] = useState<boolean>(false);
    // open offcanvas
    const [open, setOpen] = useState<boolean>(false);
    const [files, setFiles] = useState([
        {
            source: user.avatar_img ? user.avatar_img : null

        }
    ]);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
        const sidebarColorDark = document.getElementById("sidebar-color-dark") as HTMLInputElement;
        const sidebarColorLight = document.getElementById("sidebar-color-light") as HTMLInputElement;

        if (show && sidebarColorDark && sidebarColorLight) {
            sidebarColorDark.checked = false;
            sidebarColorLight.checked = false;
        }
    }, [show]);


    const toggleLeftCanvas = () => {
        setOpen(!open);
    };

    window.onscroll = function () {
        scrollFunction();
    };

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        company: user?.company ?? '',
        position: user?.position ?? '',
        other_link: user?.other_link ?? '',
        facebook_link: user?.facebook_link ?? '',
        linkedin_link: user?.linkedin_link ?? '',
        twitter_link: user?.twitter_link ?? '',
        country: user?.country ?? '',
        phone: user?.phone ?? '',
        bio: user?.bio ?? '',
        email: user?.email ?? '',
        image: null,
        avatar: user?.avatar ?? '',
        imageChanged: false
    });

    const { data: dataPassword, setData: setDataPassword, post: postPassword, processing: processingPassword, errors: errorsPassword, reset: resetPassword } = useForm({
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        return () => {
            // reset('password', 'password_confirmation');
        };
    }, []);

    const submitProfileEdit = (e: any) => {
        e.preventDefault();
        // console.log('here')
        post(route('attendee.profile.update', user.id));
    };
    const submitPasswordChange = (e: any) => {
        e.preventDefault();
        // console.log('here')
        // post(route('attendee.register', [eventApp.id]));
    };
    const submitEmailChange = (e: any) => {
        e.preventDefault();
        // console.log('here')
        // post(route('attendee.register', [eventApp.id]));
    };
    const handleFileUpload = (v: any) => {
        setFiles(v);
        data.image = v[0] ? v[0].file : null;
    }

    return (
        <React.Fragment>
            <Dropdown.Item onClick={toggleLeftCanvas} className="dropdown-item">
                <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span className="align-middle">Edit Profile</span>
            </Dropdown.Item>
            <div>
                <Offcanvas show={open} onHide={toggleLeftCanvas} placement="end" className='offcanvas-end border-0'>
                    <Offcanvas.Header className="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header-dark" closeButton>
                        <span className="m-0 me-2 text-white">Attendee User Profile</span>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-0">
                        <SimpleBar className="h-100">
                            <div className="p-4">
                                {!changeEmail && !changePassword && <form onSubmit={submitProfileEdit}>
                                    <div className="d-flex justify-content-center">
                                        <div style={{ width: '75%' }}>
                                            <FilePond
                                                files={files}
                                                imageCropAspectRatio={'1:1'}
                                                allowImageCrop={true}
                                                imagePreviewHeight={170}
                                                imagePreviewMaxFileSize={2}
                                                allowReorder={true}
                                                allowMultiple={false}
                                                onupdatefiles={handleFileUpload}
                                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Button type="button" className="btn btn-secondary btn-sm" onClick={() => setChangeEmail(true)}>
                                            Change Email
                                        </Button>
                                        <Button type="button" className="btn btn-success btn-sm" onClick={() => setChangePassword(true)}>
                                            Change Password
                                        </Button>
                                    </div>

                                    <Row>
                                        <Col md={6} lg={6}>
                                            {/* <Form.Label htmlFor="first_name" value="First Name" className='form-label'> First Name </Form.Label> */}
                                            {/* <span className="text-danger ms-1">*</span> */}
                                            <Form.Control
                                                id="first_name"
                                                type="text"
                                                name="first_name"
                                                placeholder="Enter First Name"
                                                value={data.first_name}
                                                className={'mt-1 form-control' + (errors.first_name ? 'is-invalid' : '')}
                                                autoComplete="first_name"
                                                onChange={(e: any) => setData('first_name', e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.first_name}</Form.Control.Feedback>
                                        </Col>
                                        <Col md={6} lg={6}>
                                            {/* <Form.Label htmlFor="last_name" value="Last Name" className='form-label'> Last Name </Form.Label> */}
                                            {/* <span className="text-danger ms-1">*</span> */}
                                            <Form.Control
                                                id="last_name"
                                                type="text"
                                                name="last_name"
                                                placeholder="Enter Last Name"
                                                value={data.last_name}
                                                className={'mt-1 form-control' + (errors.last_name ? 'is-invalid' : '')}
                                                autoComplete="last_name"
                                                onChange={(e: any) => setData('last_name', e.target.value)}
                                                required
                                            />

                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.email}</Form.Control.Feedback>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} lg={6}>
                                            {/* <Form.Label htmlFor="company" value="Company" className='form-label'> Company </Form.Label> */}
                                            {/* <span className="text-danger ms-1">*</span> */}
                                            <Form.Control
                                                id="company"
                                                type="text"
                                                name="company"
                                                placeholder="Enter Company"
                                                value={data.company}
                                                className={'mt-1 form-control' + (errors.company ? 'is-invalid' : '')}
                                                autoComplete="company"
                                                onChange={(e: any) => setData('company', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.company}</Form.Control.Feedback>
                                        </Col>
                                        <Col md={6} lg={6}>
                                            {/* <Form.Label htmlFor="position" value="Position" className='form-label'> Position </Form.Label> */}
                                            {/* <span className="text-danger ms-1">*</span> */}
                                            <Form.Control
                                                id="position"
                                                type="text"
                                                name="position"
                                                placeholder="Enter Position"
                                                value={data.position}
                                                className={'mt-1 form-control' + (errors.position ? 'is-invalid' : '')}
                                                autoComplete="position"
                                                onChange={(e: any) => setData('position', e.target.value)}
                                            />

                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.position}</Form.Control.Feedback>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} lg={6}>
                                            {/* <Form.Label htmlFor="country" value="Country" className='form-label'> Country </Form.Label> */}
                                            <Form.Control
                                                id="country"
                                                type="text"
                                                name="country"
                                                placeholder="Enter country"
                                                value={data.country}
                                                className={'mt-1 form-control' + (errors.country ? 'is-invalid' : '')}
                                                autoComplete="company"
                                                onChange={(e: any) => setData('country', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.country}</Form.Control.Feedback>
                                        </Col>
                                        <Col md={6} lg={6}>
                                            {/* <Form.Label htmlFor="phone" value="Phone" className='form-label'> Phone </Form.Label> */}
                                            {/* <span className="text-danger ms-1">*</span> */}
                                            <Form.Control
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                placeholder="Enter Phone"
                                                value={data.phone}
                                                className={'mt-1 form-control' + (errors.phone ? 'is-invalid' : '')}
                                                autoComplete="position"
                                                onChange={(e: any) => setData('phone', e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.phone}</Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                    <div>
                                        {/* <Form.Label htmlFor="other_link" value="Other Link" className='form-label'> Other Web Link </Form.Label> */}
                                        {/* <span className="text-danger ms-1">*</span> */}
                                        <Form.Control
                                            id="other_link"
                                            type="text"
                                            name="other_link"
                                            placeholder="Enter Other link"
                                            value={data.other_link}
                                            className={'mt-1 form-control' + (errors.other_link ? 'is-invalid' : '')}
                                            autoComplete="other_link"
                                            onChange={(e: any) => setData('other_link', e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.other_link}</Form.Control.Feedback>
                                    </div>
                                    <div>
                                        {/* <Form.Label htmlFor="facebook_link" value="Facebook Link" className='form-label'> Facebook Link </Form.Label> */}
                                        {/* <span className="text-danger ms-1">*</span> */}
                                        <Form.Control
                                            id="facebook_link"
                                            type="text"
                                            name="facebook_link"
                                            placeholder="Enter Facebook link"
                                            value={data.facebook_link}
                                            className={'mt-1 form-control' + (errors.facebook_link ? 'is-invalid' : '')}
                                            autoComplete="facebook_link"
                                            onChange={(e: any) => setData('facebook_link', e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.facebook_link}</Form.Control.Feedback>
                                    </div>
                                    <div>
                                        {/* <Form.Label htmlFor="linkedin_link" value="LinkedIn Link" className='form-label'> LinkedIn Link </Form.Label> */}
                                        {/* <span className="text-danger ms-1">*</span> */}
                                        <Form.Control
                                            id="linkedin_link"
                                            type="text"
                                            name="linkedin_link"
                                            placeholder="Enter LinkedIn link"
                                            value={data.linkedin_link}
                                            className={'mt-1 form-control' + (errors.linkedin_link ? 'is-invalid' : '')}
                                            autoComplete="linkedin_link"
                                            onChange={(e: any) => setData('linkedin_link', e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.linkedin_link}</Form.Control.Feedback>
                                    </div>
                                    <div>
                                        {/* <Form.Label htmlFor="twitter_link" value="Twitter Link" className='form-label'> Twitter Link </Form.Label> */}
                                        {/* <span className="text-danger ms-1">*</span> */}
                                        <Form.Control
                                            id="twitter_link"
                                            type="text"
                                            name="twitter_link"
                                            placeholder="Enter Twitter link"
                                            value={data.twitter_link}
                                            className={'mt-1 form-control' + (errors.twitter_link ? 'is-invalid' : '')}
                                            autoComplete="twitter_link"
                                            onChange={(e: any) => setData('twitter_link', e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.twitter_link}</Form.Control.Feedback>
                                    </div>
                                    <div className="mt-4">

                                        <Form.Control
                                            as="textarea"
                                            id="bio"
                                            type="text"
                                            rows={4}
                                            name="bio"
                                            placeholder="Enter Bio"
                                            value={data.bio}
                                            className={"mt-1 form-control" + (errors.bio ? 'is-invalid' : '')}
                                            autoComplete="bio"
                                            onChange={(e: any) => setData('bio', e.target.value)}
                                        />

                                        <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errors.bio}</Form.Control.Feedback>
                                    </div>
                                    <Button type="submit" className="btn btn-success w-100 mt-4" disabled={processing}>
                                        Save Profile Changes
                                    </Button>
                                </form>}

                                {changePassword && <div>
                                    <form onSubmit={submitProfileEdit}>
                                        <div className="mt-4">
                                            <Form.Label htmlFor="password" value="Password" className='form-label'> Password </Form.Label>
                                            <span className="text-danger ms-1">*</span>
                                            <Form.Control
                                                id="password"
                                                type="password"
                                                name="password"
                                                placeholder="Enter Password"
                                                value={dataPassword.password}
                                                className={"mt-1 form-control" + (errorsPassword.password ? 'is-invalid' : '')}
                                                autoComplete="new-password"
                                                onChange={(e: any) => setDataPassword('password', e.target.value)}
                                                required
                                            />

                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errorsPassword.password}</Form.Control.Feedback>
                                        </div>

                                        <div className="mt-4">
                                            <Form.Label htmlFor="password_confirmation" value="Confirm Password" className='form-label'> Confirm Password </Form.Label>
                                            <span className="text-danger ms-1">*</span>

                                            <Form.Control
                                                id="password_confirmation"
                                                type="password"
                                                placeholder="Confirm password"
                                                name="password_confirmation"
                                                value={dataPassword.password_confirmation}
                                                className={"mt-1 form-control" + (errorsPassword.password_confirmation ? 'is-invalid' : '')}
                                                autoComplete="new-password"
                                                onChange={(e: any) => setDataPassword('password_confirmation', e.target.value)}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid" className='mt-2 d-block'>{errorsPassword.password_confirmation}</Form.Control.Feedback>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <Button type="submit" className="btn btn-secondary mt-4" onClick={() => { setChangePassword(false); setChangeEmail(false) }}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="btn btn-success mt-4" disabled={processingPassword}>
                                                Change Password
                                            </Button>
                                        </div>
                                    </form>
                                </div>}
                            </div>
                        </SimpleBar>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </React.Fragment>
    );
};

export default UserProfileRightSidebar;
