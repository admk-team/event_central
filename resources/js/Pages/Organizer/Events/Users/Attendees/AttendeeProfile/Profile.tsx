import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../../../../Layouts/Event";

const Profile = ({ attendee,user }: any) => {
 
    return (
        <React.Fragment>
            <Head title="Profile | Velzon - React Admin & Dashboard Template" />
            <div className="page-content">
                <Container fluid>
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src="" alt="" className="profile-wid-img" />
                        </div>
                    </div>
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                        <Row className="g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img
                                        src={user.avatar ??user.avatar_img}
                                        alt="user-img"
                                        className="img-thumbnail rounded-circle"
                                    />
                                </div>
                            </div>

                            <Col>
                                <div className="p-2">
                                    <h3 className="text-white mb-1">
                                        {user.first_name}{" "}
                                        {user.last_name}
                                    </h3>
                                    <p className="text-white text-opacity-75">
                                        {user.email}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <Row>
                                <Col xxl={3}>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="card-title mb-3">
                                                Info
                                            </h5>
                                            <div className="table-responsive">
                                                <Table className="table-borderless mb-0">
                                                    <tbody>
                                                        <tr>
                                                            <th
                                                                className="ps-0"
                                                                scope="row"
                                                            >
                                                                Full Name :
                                                            </th>
                                                            <td className="text-muted">
                                                                {
                                                                    user.first_name
                                                                }{" "}
                                                                {
                                                                    user.last_name
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                className="ps-0"
                                                                scope="row"
                                                            >
                                                                Mobile :
                                                            </th>
                                                            <td className="text-muted">
                                                                {user.phone ??
                                                                    "N/A"}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                className="ps-0"
                                                                scope="row"
                                                            >
                                                                E-mail :
                                                            </th>
                                                            <td className="text-muted">
                                                                {user.email}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                className="ps-0"
                                                                scope="row"
                                                            >
                                                                Location :
                                                            </th>
                                                            <td className="text-muted">
                                                                {user.country ?? 'N/A'}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                className="ps-0"
                                                                scope="row"
                                                            >
                                                                Joining Date
                                                            </th>
                                                            <td className="text-muted">
                                                                {new Date(user.created_at).toLocaleString() ?? 'N/A'}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card>
                                        <Card.Body>
                                            <h5 className="card-title mb-4">
                                                Portfolio
                                            </h5>
                                            <div className="d-flex flex-wrap gap-2">
                                                <div>
                                                    <a target="blank"
                                                        href={user.facebook_link}
                                                        className="avatar-xs d-block"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 text-light" style={{background:'blue'}}>
                                                            <i className="ri-facebook-fill"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a target="blank"
                                                        href={user.linkedin_link}
                                                        className="avatar-xs d-block"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 text-light" style={{ background:'DodgerBlue'}}>
                                                            <i className="ri-linkdin-fill fw-bold cursor-pointer">In</i>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        target="blank"
                                                        href={user.other_link}
                                                        className="avatar-xs d-block"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 bg-danger">
                                                            <i className="ri-global-fill"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                    target="blank"
                                                        href={user.twitter_link}
                                                        className="avatar-xs d-block"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16" style={{ background:'DodgerBlue'}}>
                                                            <i className="ri-twitter-fill"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                                
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xxl={9}>
                                <Card>
                                    <Card.Body>
                                        <h5 className="card-title mb-3">Other Information</h5>
                                        {attendee[0]?.field_values.length > 0 && attendee[0]?.form_fields.length > 0 ? (
                                                attendee[0]?.form_fields.map((field:any, index:any) => (
                                                    <div className="row p-2">
                                                        <div className="col">
                                                            <h6 className="mb-0">{field.label}: 
                                                                <span className="text-secondary">{" "}{attendee[0]?.field_values[index].value}
                                                                    </span></h6>
                                                        </div>
                                                    </div>
                                                ))
                                        ): (<p>No Info available</p>)}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

Profile.layout = (page: any) => <Layout children={page} />;

export default Profile;
