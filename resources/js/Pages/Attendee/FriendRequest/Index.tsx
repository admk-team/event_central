import React, { useState } from "react";
import AttendeeLayout from "../../../Layouts/Attendee";
import {Container,Button,Tooltip,Dropdown,Row,Col,Card,Nav,Alert,OverlayTrigger,Tab,Form} from "react-bootstrap";
import { Head, Link } from "@inertiajs/react";
import FindFriends from "./Components/FindFriends";
import Friends from "./Components/Friends";
import IncomingRequest from "./Components/IncomingRequest";

const Index = () => {
    return (
        <React.Fragment>
            <Head title="Firends System " />
            <div className="page-content">
                <Container fluid>
                    <Col>
                            <Card>
                                <Card.Body>
                                    <h5 className="mb-4">Friends</h5>
                                    <Row>
                                        <Tab.Container defaultActiveKey="1">
                                            <Col lg={2}>
                                                <Nav variant='pills' className="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center">
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="1">
                                                            <i className="ri-user-line d-block fs-20 mb-1"></i>
                                                            My Friends
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="2">
                                                            <i className="ri-user-received-line d-block fs-20 mb-1"></i>
                                                            Incoming Requests
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="3">
                                                            <i className="ri-user-add-line d-block fs-20 mb-1"></i>
                                                            Find Friends
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                            <Col lg={10}>
                                                <Tab.Content
                                                    className="text-muted mt-3 mt-lg-0"
                                                >
                                                    <Tab.Pane eventKey="1" id="custom-v-pills-home">
                                                        <Friends/>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="2" id="custom-v-pills-profile">
                                                        <IncomingRequest/>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="3" id="custom-v-pills-messages">
                                                        <FindFriends/>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Col>
                                        </Tab.Container>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col >
                </Container>
            </div>
        </React.Fragment>
    );
};
Index.layout = (page: any) => <AttendeeLayout children={page} />;
export default Index;
