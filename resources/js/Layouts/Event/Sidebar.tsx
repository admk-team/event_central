import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "../../../../images/logo-sm.png";
import logoDark from "../../../../images/logo.png";
import logoLight from "../../../../images/logo-white.png";
import Select from "react-select";

//Import Components
import VerticalLayout from "./VerticalLayouts";
import { Button, Container, Dropdown } from "react-bootstrap";
import { Link, router, usePage } from "@inertiajs/react";
import HorizontalLayout from "../Event/HorizontalLayout";
import TwoColumnLayout from "../Event/TwoColumnLayout";
import { Label, MenuSeparator } from "@headlessui/react";
import { current } from "@reduxjs/toolkit";

const Sidebar = ({ layoutType }: any) => {
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

    const [sortBy, setsortBy] = useState<any>(null);

    const { currentEvent } = usePage().props as Record<string, any>;

    const { events, auth } = usePage<{ events: any[], auth: { user: any } }>().props;

    const truncateAppName = (name: any) => {
        return name.length > 15 ? name.substring(0, 15) + "..." : name;
    }
    return (
        <React.Fragment>
            <div className="app-menu navbar-menu">
                <Dropdown className="navbar-brand-box my-3">
                    <Dropdown.Toggle as="button" className="btn d-flex align-items-center p-1" id="dropdown.MenuButton">
                        <div className="d-flex align-items-center ">
                            <img src={currentEvent.logo_img} alt="event" className="img-fluid rounded-circle avatar-sm" />
                            <div className="fs-6 fw-semibold ms-2 text-start">
                                <span className="d-block" title={currentEvent.name}>{truncateAppName(currentEvent.name)}</span>
                                <span className="d-block fw-normal text-muted">{currentEvent.created_at_date}</span>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-75">
                        {events?.map((event: any, key: any) => (
                            <Dropdown.Item key={key} className="p-2 px-4 text-primary d-flex align-items-center gap-2"
                                onClick={() => router.visit(route('organizer.events.select', event.id))}>
                                <img src={event.logo_img} alt="event" className="img-fluid rounded-circle avatar-xxs" />
                                <span className="d-block text-wrap">
                                    {event.name}
                                </span>
                            </Dropdown.Item>
                        ))}
                        <div className="border-top my-2"></div>
                        <Dropdown.Item className="p-2 px-4 text-primary " onClick={() => router.visit(route('organizer.events.index'))}>
                            See all events
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
