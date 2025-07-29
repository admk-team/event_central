import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
    Offcanvas,
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Tabs,
    Tab,
} from "react-bootstrap";

//SimpleBar
import SimpleBar from "simplebar-react";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import { usePage } from "@inertiajs/react";

const RightSidebar = (props: any) => {
    const user: any = usePage().props.auth.user;
    const [show, setShow] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = () => {
        if (user.personal_url) {
            navigator.clipboard.writeText(user.personal_url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    useEffect(() => {
        const sidebarColorDark = document.getElementById(
            "sidebar-color-dark"
        ) as HTMLInputElement;
        const sidebarColorLight = document.getElementById(
            "sidebar-color-light"
        ) as HTMLInputElement;

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
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
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
                <Offcanvas
                    show={open}
                    onHide={toggleLeftCanvas}
                    placement="end"
                    className="offcanvas-end border-0"
                >
                    <Offcanvas.Header
                        className="d-flex align-items-center p-3 offcanvas-header-dark"
                        closeButton
                        style={{ backgroundColor: "var(--vz-success)" }}
                    >
                        <span className="m-0 me-2 text-white fw-bold">
                            Profile Settings
                        </span>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-0">
                        <SimpleBar className="h-100">
                            {user.personal_url && (
                                <div className="p-3">
                                    <Card className="border shadow-sm">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <strong>
                                                        Referral Link
                                                    </strong>
                                                    <div className="text-muted small">
                                                        Share this link to
                                                        invite others
                                                    </div>
                                                </div>
                                                <div className="position-relative">
                                                    <Button
                                                        variant="outline-success"
                                                        size="sm"
                                                        onClick={handleCopy}
                                                    >
                                                        <i className="ri-file-copy-line me-1"></i>{" "}
                                                        Copy
                                                    </Button>
                                                    {copied && (
                                                        <span className="position-absolute top-0 start-100 translate-middle badge bg-success rounded-pill">
                                                            Copied!
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bg-light p-2 rounded text-break small">
                                                {user.personal_url}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )}

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
                                    <ChangePassword />
                                </Tab>
                            </Tabs>
                        </SimpleBar>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </React.Fragment>
    );
};

export default RightSidebar;
