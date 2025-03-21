import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../../../../Layouts/Event";

const Profile = ({ attendee }: any) => {
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
                                        src={attendee.avatar ??attendee.avatar_img}
                                        alt="user-img"
                                        className="img-thumbnail rounded-circle"
                                    />
                                </div>
                            </div>

                            <Col>
                                <div className="p-2">
                                    <h3 className="text-white mb-1">
                                        {attendee.first_name}{" "}
                                        {attendee.last_name}
                                    </h3>
                                    <p className="text-white text-opacity-75">
                                        {attendee.email}
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
                                                                    attendee.first_name
                                                                }{" "}
                                                                {
                                                                    attendee.last_name
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
                                                                {attendee.mobile ??
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
                                                                {attendee.email}
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
                                                                {attendee.country ?? 'N/A'}
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
                                                                {new Date(attendee.created_at).toLocaleString() ?? 'N/A'}
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
                                                    <Link
                                                        href="#"
                                                        className="avatar-xs d-block"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                                                            <i className="ri-github-fill"></i>
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        href="#"
                                                        className="avatar-xs d-block"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 bg-primary">
                                                            <i className="ri-global-fill"></i>
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        href="#"
                                                        className="avatar-xs d-block"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 bg-success">
                                                            <i className="ri-dribbble-fill"></i>
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        href="#"
                                                        className="avatar-xs d-block"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 bg-danger">
                                                            <i className="ri-pinterest-fill"></i>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xxl={9}>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="card-title mb-3">
                                                About
                                            </h5>
                                            <p>
                                                Hi I'm Anna Adame, It will be as
                                                simple as Occidental; in fact,
                                                it will be Occidental. To an
                                                English person, it will seem
                                                like simplified English, as a
                                                skeptical Cambridge friend of
                                                mine told me what Occidental is
                                                European languages are members
                                                of the same family.
                                            </p>
                                            <p>
                                                You always want to make sure
                                                that your fonts work well
                                                together and try to limit the
                                                number of fonts you use to three
                                                or less. Experiment and play
                                                around with the fonts that you
                                                already have in the software
                                                you’re working with reputable
                                                font websites. This may be the
                                                most commonly encountered tip I
                                                received from the designers I
                                                spoke with. They highly
                                                encourage that you use different
                                                fonts in one design, but do not
                                                over-exaggerate and go
                                                overboard.
                                            </p>
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
