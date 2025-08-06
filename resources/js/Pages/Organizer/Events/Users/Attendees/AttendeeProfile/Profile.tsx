import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../../../../Layouts/Event";
import CheckInModal from "./Component/CheckInModal";
import TicketAddonsModal from "./Component/TicketAddonsModal";

const Profile = ({ attendee,user,sessions,tickets,sessionsPurchased }: any) => {
    console.log(tickets);

    const [showModal, setShowModal] = useState(false);
    const [currentTicketId, setCurrentTicketId] = useState<number | null>(null);
    const [showAddonModal, setShowAddonsModal] = useState(false);
    const handleShowAddonsModal = (ticketId: number) => {
        setCurrentTicketId(ticketId);
        setShowAddonsModal(true);
    }





    return (
        <React.Fragment>
            <Head title="Attendee Profile" />
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
                            <Col xs={12} className="col-lg-auto order-last order-lg-0">
                                <Row className="text text-white-50 text-center">
                                    <Col lg={12} xs={12}>
                                        <Button className="p-2 fw-bold" onClick={() => setShowModal(true)}>
                                            Check In
                                        </Button>
                                    </Col>
                                </Row>
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
                                                                {user.location ?? 'N/A'}
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
                                                    <a
                                                        href={user.facebook_link}
                                                        className="avatar-xs d-block"
                                                        target="_blank"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 text-light" style={{background:'blue'}}>
                                                            <i className="ri-facebook-fill"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        href={user.linkedin_link}
                                                        className="avatar-xs d-block"
                                                        target="_blank"
                                                    >
                                                        <span className="avatar-title rounded-circle fs-16 text-light" style={{ background:'DodgerBlue'}}>
                                                            <i className="ri-linkdin-fill fw-bold cursor-pointer">In</i>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        href={user.other_link}
                                                        className="avatar-xs d-block"
                                                        target="_blank"
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
                                                        <span className="avatar-title rounded-circle fs-16" style={{ background:'black'}}>
                                                            <i className="ri-twitter-x-line"></i>
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
                                                        <div className="row p-2" key={index}>
                                                            <div className="col">
                                                                <h6 className="mb-0">{field.label}:
                                                                    <span className="text-secondary">{" "}{attendee[0]?.field_values[index].value}
                                                                        </span></h6>
                                                            </div>
                                                        </div>
                                                    ))
                                            ): (<p className="text-center">No Info available</p>)}
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="card-title mb-3">Tickets</h5>
                                            <div className="table-responsive">
                                            <Table className="table-striped table-nowrap align-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Status</th>
                                                            <th scope="col">Addons</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {tickets && tickets.length > 0 ? (
                                                        tickets.map((ticket: any, index: number) => (
                                                            <tr key={index}>
                                                                <td>{ticket.ticket_name}</td>
                                                                <td>{ticket.amount}</td>
                                                                <td>{ticket.qty}</td>
                                                                <td>{ticket.type}</td>
                                                                <td style={{ color: "#0d6efd" }}><i className="ri-checkbox-circle-line fs-17 align-middle"></i> Paid</td>
                                                                <td>
                                                                    <Button variant="primary" onClick={(e) => handleShowAddonsModal(ticket.attendee_purchased_ticket_id)} size="sm" disabled={ticket.addons_count === 0}>
                                                                        Addons ({ticket.addons_count})
                                                                    </Button>

                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={5} className="text-center">No record found !!</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="card-title mb-3">Sessions</h5>
                                            <div className="table-responsive">
                                            <Table className="table-striped table-nowrap align-middle mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Start Time</th>
                                                        <th scope="col">End Time</th>
                                                        <th scope="col">Check In</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {sessions && sessions.length > 0 ? (
                                                        sessions.map((data: any, index: number) => (
                                                            <tr key={index}>
                                                                <td>{data.session_name}</td>
                                                                <td>{data.start_time}</td>
                                                                <td>{data.end_time}</td>
                                                                <td>{data?.check_in_time ? new Date(data.check_in_time).toLocaleString() : "N/A"}</td>
                                                                <td>
                                                                    <span className={`badge ${data.status === 'Checked In' ? 'bg-info' : 'bg-success'}`}>
                                                                        {data.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={5} className="text-center">No record found !!</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </div>
            <CheckInModal
                show={showModal}
                onHide={() => setShowModal(false)}
                attendee={user}
                purchasedSession= {sessionsPurchased}
            />

            <TicketAddonsModal
                show={showAddonModal}
                onHide={() => setShowAddonsModal(false)}
                puchasedTicketId={currentTicketId}
            />
        </React.Fragment>
    );
};

Profile.layout = (page: any) => <Layout children={page} />;

export default Profile;
