import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "../../../images/logo-sm.png";
import logoDark from "../../../images/logo-dark.png";
import logoLight from "../../../images/logo-light.png";
import defaultEventImage from '../../../images/default-event-image.png';
//Import Components
import VerticalLayout from "./VerticalLayouts";
import { Container } from "react-bootstrap";
import HorizontalLayout from "./HorizontalLayout";
import TwoColumnLayout from "./TwoColumnLayout";
import { Link, usePage } from '@inertiajs/react';


const Sidebar = ({ layoutType }: any) => {
    const eventApp: any = usePage().props.eventApp;
    useEffect(() => {
        var verticalOverlay = document.getElementsByClassName("vertical-overlay");
        if (verticalOverlay) {
            verticalOverlay[0].addEventListener("click", function () {
                document.body.classList.remove("vertical-sidebar-enable");
            });
        }
    });

    const addEventListenerOnSmHoverMenu = () => {
        // add listener Sidebar Hover icon on change layout from setting
        if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover') {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
        } else if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover-active') {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        } else {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        }
    };

    const truncateAppName = (name: any) => {
        return name.length > 18 ? name.substring(0, 17) + "..." : name;
    }

    return (
        <React.Fragment>
            <div className="app-menu navbar-menu">
                <div className="navbar-brand-box">
                    <Link href={route('attendee.event.detail.dashboard', [eventApp.id])} className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={logoSm} alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <div className="d-flex justify-content-start align-items-center">
                                <img src={defaultEventImage} alt="default event image" style={{ height: '35px', borderRadius: '50%' }} />
                                <span style={{ marginLeft: '15px' }} title={eventApp.name}>{truncateAppName(eventApp.name)}</span>
                            </div>
                        </span>
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
                ) : layoutType === 'twocolumn' ? (
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
