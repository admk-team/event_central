import React from 'react';
import { Card, Col, Nav, Row, Table, Dropdown, Tab, Button } from 'react-bootstrap';

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import avatar7 from "../../../../../images/users/avatar-7.jpg";
import avatar10 from "../../../../../images/users/avatar-10.jpg";
import avatar8 from "../../../../../images/users/avatar-8.jpg";
import avatar6 from "../../../../../images/users/avatar-6.jpg";
import image4 from "../../../../../images/small/img-4.jpg";
import image5 from "../../../../../images/small/img-5.jpg";
import { Link } from '@inertiajs/react';

const Comments = () => {
    return (
        <React.Fragment>
            <Card>
                <Tab.Container defaultActiveKey="1">
                    <Card.Header>
                        <div>
                            <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                <Nav.Item>
                                    <Nav.Link
                                        href="#"
                                        eventKey="1"
                                    >
                                        Comments (5)
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        href="#"
                                        eventKey="2"
                                    >
                                        Attachments File (4)
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        href="#"
                                        eventKey="3"
                                    >
                                        Time Entries (9 hrs 13 min)
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Tab.Content >
                            <Tab.Pane eventKey="1">
                                <h5 className="card-title mb-4">Comments</h5>
                                <SimpleBar style={{ height: "508px" }} className="px-3 mx-n3 mb-2">
                                    <div className="d-flex mb-4">
                                        <div className="flex-shrink-0">
                                            <img src={avatar7} alt="" className="avatar-xs rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h5 className="fs-13 text-body"><Link href="/pages-profile" className='text-reset'>Joseph Parker</Link> <small className="text-muted">20 Dec 2021 - 05:47AM</small></h5>
                                            <p className="text-muted">I am getting message from customers that when they place order always get error message .</p>
                                            <Link href="#" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</Link>
                                            <div className="d-flex mt-4">
                                                <div className="flex-shrink-0">
                                                    <img src={avatar10} alt="" className="avatar-xs rounded-circle" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h5 className="fs-13 text-body"><Link href="/pages-profile" className='text-reset'>Tonya Noble</Link> <small className="text-muted">22 Dec 2021 - 02:32PM</small></h5>
                                                    <p className="text-muted">Please be sure to check your Spam mailbox to see if your email filters have identified the email from Dell as spam.</p>
                                                    <Link href="#" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-4">
                                        <div className="flex-shrink-0">
                                            <img src={avatar8} alt="" className="avatar-xs rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h5 className="fs-13 text-body"><Link href="/pages-profile" className='text-reset'>Thomas Taylor</Link> <small className="text-muted">24 Dec 2021 - 05:20PM</small></h5>
                                            <p className="text-muted">If you have further questions, please contact Customer Support from the “Action Menu” on your <Link href="#" className="text-decoration-underline">Online Order Support</Link>.</p>
                                            <Link href="#" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</Link>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0">
                                            <img src={avatar10} alt="" className="avatar-xs rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h5 className="fs-13 text-body"><Link href="/pages-profile" className='text-reset'>Tonya Noble</Link> <small className="text-muted">26 min ago</small></h5>
                                            <p className="text-muted">Your <Link href="#" className="text-decoration-underline">Online Order Support</Link> provides you with the most current status of your order. To help manage your order refer to the “Action Menu” to initiate return, contact Customer Support and more.</p>
                                            <Row className="g-2 mb-3">
                                                <Col lg={1} sm={2} xs={6}>
                                                    <img src={image4} alt="" className="img-fluid rounded" />
                                                </Col>
                                                <Col lg={1} sm={2} xs={6}>
                                                    <img src={image5} alt="" className="img-fluid rounded" />
                                                </Col>
                                            </Row>
                                            <Link href="#" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</Link>
                                            <div className="d-flex mt-4">
                                                <div className="flex-shrink-0">
                                                    <img src={avatar6} alt="" className="avatar-xs rounded-circle" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h5 className="fs-13 text-body"><Link href="/pages-profile" className='text-reset'>Nancy Martino</Link> <small className="text-muted">8 sec ago</small></h5>
                                                    <p className="text-muted">Other shipping methods are available at checkout if you want your purchase delivered faster.</p>
                                                    <Link href="#" className="badge text-muted bg-light"><i className="mdi mdi-reply"></i> Reply</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SimpleBar>
                                <form className="mt-4">
                                    <Row className="g-3">
                                        <Col lg={12}>
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Leave a Comments</label>
                                            <textarea className="form-control bg-light border-light" id="exampleFormControlTextarea1" rows={3} placeholder="Enter comments"></textarea>
                                        </Col>
                                        <Col xs={12} className="text-end">
                                            <button type="button" className="btn btn-ghost-secondary btn-icon waves-effect me-1"><i className="ri-attachment-line fs-16"></i></button>
                                            <Link href="#" className="btn btn-primary">Post Comments</Link>
                                        </Col>
                                    </Row>
                                </form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="2">
                                <div className="table-responsive table-card">
                                    <Table className="table-borderless align-middle mb-0">
                                        <thead className="table-light text-muted">
                                            <tr>
                                                <th scope="col">File Name</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Size</th>
                                                <th scope="col">Upload Date</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-sm">
                                                            <div className="avatar-title bg-primary-subtle text-primary rounded fs-20">
                                                                <i className="ri-file-zip-fill"></i>
                                                            </div>
                                                        </div>
                                                        <div className="ms-3 flex-grow-1">
                                                            <h6 className="fs-15 mb-0"><Link href="#">App pages.zip</Link></h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Zip File</td>
                                                <td>2.22 MB</td>
                                                <td>21 Dec, 2021</td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="a" href="#" className="btn btn-light btn-icon arrow-none">
                                                            <i className="ri-equalizer-fill"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(0px, 23px)" }}>
                                                            <li><Dropdown.Item><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</Dropdown.Item></li>
                                                            <li><Dropdown.Item><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</Dropdown.Item></li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><Dropdown.Item><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-sm">
                                                            <div className="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                <i className="ri-file-pdf-fill"></i>
                                                            </div>
                                                        </div>
                                                        <div className="ms-3 flex-grow-1">
                                                            <h6 className="fs-15 mb-0"><Link href="#">Velzon admin.ppt</Link></h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>PPT File</td>
                                                <td>2.24 MB</td>
                                                <td>25 Dec, 2021</td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="a" href="#" className="btn btn-light btn-icon arrow-none">
                                                            <i className="ri-equalizer-fill"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(0px, 23px)" }}>
                                                            <li><Dropdown.Item><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</Dropdown.Item></li>
                                                            <li><Dropdown.Item><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</Dropdown.Item></li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><Dropdown.Item><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-sm">
                                                            <div className="avatar-title bg-info-subtle text-info rounded fs-20">
                                                                <i className="ri-folder-line"></i>
                                                            </div>
                                                        </div>
                                                        <div className="ms-3 flex-grow-1">
                                                            <h6 className="fs-15 mb-0"><Link href="#">Images.zip</Link></h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>ZIP File</td>
                                                <td>1.02 MB</td>
                                                <td>28 Dec, 2021</td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="a" href="#" className="btn btn-light btn-icon arrow-none">
                                                            <i className="ri-equalizer-fill"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(0px, 23px)" }}>
                                                            <li><Dropdown.Item><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</Dropdown.Item></li>
                                                            <li><Dropdown.Item><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</Dropdown.Item></li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><Dropdown.Item><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-sm">
                                                            <div className="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                <i className="ri-image-2-fill"></i>
                                                            </div>
                                                        </div>
                                                        <div className="ms-3 flex-grow-1">
                                                            <h6 className="fs-15 mb-0"><Link href="#">Bg-pattern.png</Link></h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>PNG File</td>
                                                <td>879 KB</td>
                                                <td>02 Nov 2021</td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="a" href="#" className="btn btn-light btn-icon arrow-none">
                                                            <i className="ri-equalizer-fill"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(0px, 23px)" }}>
                                                            <li><Dropdown.Item><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</Dropdown.Item></li>
                                                            <li><Dropdown.Item><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</Dropdown.Item></li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><Dropdown.Item><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="3">
                                <h6 className="card-title mb-4 pb-2">Time Entries</h6>
                                <div className="table-responsive table-card">
                                    <table className="table align-middle mb-0">
                                        <thead className="table-light text-muted">
                                            <tr>
                                                <th scope="col">Member</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Timer Idle</th>
                                                <th scope="col">Tasks Title</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <div className="d-flex align-items-center">
                                                        <img src={avatar8} alt="" className="rounded-circle avatar-xxs" />
                                                        <div className="flex-grow-1 ms-2">
                                                            <Link href="/pages-profile" className="fw-medium text-reset">Thomas Taylor</Link>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>02 Jan, 2022</td>
                                                <td>3 hrs 12 min</td>
                                                <td>05 min</td>
                                                <td>Apps Pages</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={avatar10} alt="" className="rounded-circle avatar-xxs" />
                                                        <div className="flex-grow-1 ms-2">
                                                            <Link href="/pages-profile" className="fw-medium text-reset">Tonya Noble</Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>28 Dec, 2021</td>
                                                <td>1 hrs 35 min</td>
                                                <td>-</td>
                                                <td>Profile Page Design</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="d-flex align-items-center">
                                                        <img src={avatar10} alt="" className="rounded-circle avatar-xxs" />
                                                        <div className="flex-grow-1 ms-2">
                                                            <Link href="/pages-profile" className="fw-medium text-reset">Tonya Noble</Link>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>27 Dec, 2021</td>
                                                <td>4 hrs 26 min</td>
                                                <td>03 min</td>
                                                <td>Ecommerce Dashboard</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Card.Body>
                </Tab.Container>
            </Card>
        </React.Fragment>
    );
};

export default Comments;