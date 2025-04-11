import React, { useEffect, useState, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Offcanvas, Button, Card, Col, Container, Form, Row, Tabs, Tab } from 'react-bootstrap';

//SimpleBar
import SimpleBar from "simplebar-react";
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

const RightSidebar = (props: any) => {

    const [show, setShow] = useState<boolean>(false);

    // open offcanvas
    const [open, setOpen] = useState<boolean>(false);

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


    return (
        <React.Fragment>
            <Dropdown.Item onClick={toggleLeftCanvas} className="dropdown-item">
                <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span className="align-middle">Edit Profile</span>
            </Dropdown.Item>
            <div>
                <Offcanvas show={open} onHide={toggleLeftCanvas} placement="end" className='offcanvas-end border-0'>
                    <Offcanvas.Header className="d-flex align-items-center p-3 offcanvas-header-dark" closeButton style={{ backgroundColor: 'var(--vz-success)' }}>
                        <span className="m-0 me-2 text-white fw-bold">Profile Settings</span>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-0">
                        <SimpleBar className="h-100">
                            <Tabs
                                defaultActiveKey="userInfo"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="userInfo" title="Basic Info">
                                    <UserInfo />
                                </Tab>
                                <Tab eventKey="passowrd" title="Password">
                                    <ChangePassword></ChangePassword>
                                </Tab>
                            </Tabs>
                        </SimpleBar>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </React.Fragment >
    );
};

export default RightSidebar;
