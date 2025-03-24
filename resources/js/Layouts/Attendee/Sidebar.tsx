import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "../../../images/logo-sm.png";
import logoDark from "../../../images/logo.png";
import logoLight from "../../../images/logo-white.png";
import defaultEventImage from "../../../images/default-event-image.png";
//Import Components
import VerticalLayout from "./VerticalLayouts";
import { Container } from "react-bootstrap";
import HorizontalLayout from "./HorizontalLayout";
import TwoColumnLayout from "./TwoColumnLayout";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = ({ layoutType }: any) => {
    const eventApp: any = usePage().props.currentEvent;

    useEffect(() => {
        var verticalOverlay =
            document.getElementsByClassName("vertical-overlay");
        if (verticalOverlay) {
            verticalOverlay[0].addEventListener("click", function () {
                document.body.classList.remove("vertical-sidebar-enable");
            });
        }
    });

    const addEventListenerOnSmHoverMenu = () => {
        // add listener Sidebar Hover icon on change layout from setting
        if (
            document.documentElement.getAttribute("data-sidebar-size") ===
            "sm-hover"
        ) {
            document.documentElement.setAttribute(
                "data-sidebar-size",
                "sm-hover-active"
            );
        } else if (
            document.documentElement.getAttribute("data-sidebar-size") ===
            "sm-hover-active"
        ) {
            document.documentElement.setAttribute(
                "data-sidebar-size",
                "sm-hover"
            );
        } else {
            document.documentElement.setAttribute(
                "data-sidebar-size",
                "sm-hover"
            );
        }
    };

    const truncateAppName = (name: any) => {
        return name.length > 18 ? name.substring(0, 17) + "..." : name;
    };

    const { currentEvent } = usePage().props as Record<string, any>;

    return (
        <React.Fragment>
            <div className="app-menu navbar-menu">
                <div className="navbar-brand-box d-flex justify-content-start py-3">
                    <Link
                        href={route("attendee.event.detail.dashboard")}
                        className="inertia-link"
                    >
                        <div className="d-flex align-items-center event-logo">
                            <img
                                src={currentEvent.logo_img}
                                alt="event"
                                className="img-fluid rounded-circle avatar-sm"
                            />
                            <div className="fs-6 fw-semibold ms-2 text-start event-name">
                                <span
                                    className="d-block text-capitalize"
                                    title={currentEvent.name}
                                >
                                    {truncateAppName(currentEvent.name)}
                                </span>
                                <span className="d-block fw-normal text-muted">
                                    {currentEvent.created_at_date}
                                </span>
                            </div>
                        </div>
                    </Link>
                    <Link href="/" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={logoSm} alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src={logoLight} alt="" height="17" />
                        </span>
                    </Link>
                    <button
                        onClick={addEventListenerOnSmHoverMenu}
                        type="button"
                        className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                        id="vertical-hover"
                    >
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div>
                {layoutType === "horizontal" ? (
                    <div id="scrollbar">
                        <Container fluid>
                            <div id="two-column-menu"></div>
                            <ul className="navbar-nav" id="navbar-nav">
                                <HorizontalLayout />
                            </ul>
                        </Container>
                    </div>
                ) : layoutType === "twocolumn" ? (
                    <React.Fragment>
                        <TwoColumnLayout layoutType={layoutType} />
                        <div className="sidebar-background"></div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <SimpleBar id="scrollbar" className="h-100">
                            <Container fluid>
                                <div id="two-column-menu"></div>
                                <ul className="navbar-nav" id="navbar-nav">
                                    <VerticalLayout layoutType={layoutType} />
                                </ul>
                            </Container>
                        </SimpleBar>
                        <div className="sidebar-background"></div>
                    </React.Fragment>
                )}
            </div>
            <div className="vertical-overlay"></div>
        </React.Fragment>
    );
};
export default Sidebar;
