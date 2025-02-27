import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";

//import images
import logoSm from "../../../../images/logo-sm.png";
import logoDark from "../../../../images/logo-dark.png";
import logoLight from "../../../../images/logo-light.png";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { Dropdown, Form } from "react-bootstrap";
import { changeSidebarVisibility } from "../../../slices/thunk";
import SearchOption from "../../../Components/Common/SearchOption";
import LanguageDropdown from "../../../Components/Common/LanguageDropdown";
import WebAppsDropdown from "../../../Components/Common/WebAppsDropdown";
import MyCartDropdown from "../../../Components/Common/MyCartDropdown";
import FullScreenDropdown from "../../../Components/Common/FullScreenDropdown";
import ProfileDropdown from "../../../Components/Common/ProfileDropdown";
import LightDark from "../../../Components/Common/LightDark";
import NotificationDropdown from "../../../Components/Common/NotificationDropdown";
import OrganizerProfileDropdown from "../../../Components/Common/OrganizerProfileDropdown";

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }: any) => {
    const dispatch: any = useDispatch();


    const selectDashboardData = createSelector(
        (state: any) => state.Layout,
        (sidebarVisibilitytype: any) => sidebarVisibilitytype.sidebarVisibilitytype
    );
    // Inside your component
    const sidebarVisibilitytype = useSelector(selectDashboardData);


    const [search, setSearch] = useState<boolean>(false);
    const toogleSearch = () => {
        setSearch(!search);
    };

    const toogleMenuBtn = () => {
        var windowSize = document.documentElement.clientWidth;
        const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement;
        dispatch(changeSidebarVisibility("show"));

        if (windowSize > 767)
            humberIcon.classList.toggle('open');

        //For collapse horizontal menu
        if (document.documentElement.getAttribute('data-layout') === "horizontal") {
            document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu");
        }

        //For collapse vertical and semibox menu
        if (sidebarVisibilitytype === "show" && (document.documentElement.getAttribute('data-layout') === "vertical" || document.documentElement.getAttribute('data-layout') === "semibox")) {
            if (windowSize < 1025 && windowSize > 767) {
                document.body.classList.remove('vertical-sidebar-enable');
                (document.documentElement.getAttribute('data-sidebar-size') === 'sm') ? document.documentElement.setAttribute('data-sidebar-size', '') : document.documentElement.setAttribute('data-sidebar-size', 'sm');
            } else if (windowSize > 1025) {
                document.body.classList.remove('vertical-sidebar-enable');
                (document.documentElement.getAttribute('data-sidebar-size') === 'lg') ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg');
            } else if (windowSize <= 767) {
                document.body.classList.add('vertical-sidebar-enable');
                document.documentElement.setAttribute('data-sidebar-size', 'lg');
            }
        }


        //Two column menu
        if (document.documentElement.getAttribute('data-layout') === "twocolumn") {
            document.body.classList.contains('twocolumn-panel') ? document.body.classList.remove('twocolumn-panel') : document.body.classList.add('twocolumn-panel');
        }
    };
      const { currentEvent } = usePage().props as Record<string, any>;
      
      const { events, auth } = usePage<{ events: any[], auth: { user: any } }>().props;

    return (
        <React.Fragment>
            <header id="page-topbar" className={headerClass}>
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box horizontal-logo">
                                {/* <Link href="/" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src={logoSm} alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src={logoDark} alt="" height="17" />
                                    </span>
                                </Link>

                                <Link href="/" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src={logoSm} alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src={logoLight} alt="" height="17" />
                                    </span>
                                </Link> */}
                                <Dropdown className="navbar-brand-box my-3">
                                    <Dropdown.Toggle as="button" className="btn d-flex align-items-center p-1 text-muted" id="dropdown.MenuButton">
                                        <div className="d-flex align-items-center ">
                                            <img src={currentEvent.logo_img} alt="event" className="img-fluid rounded-circle avatar-sm" />
                                            <div className="fs-6 fw-semibold ms-2 text-start">
                                                <span className="d-block text-light">{currentEvent.name}</span>
                                                <span className="d-block fw-normal text-muted">{currentEvent.created_at_date}</span>
                                            </div>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        {events?.map((event: any, key: any) => (
                                            <Dropdown.Item key={key} className="p-2 px-4 text-primary d-flex align-items-center gap-2"
                                                onClick={() => router.visit(route('organizer.events.select', event.id))}>
                                                <img src={event.logo_img} alt="event" className="img-fluid rounded-circle avatar-xs" />
                                                {event.name}
                                            </Dropdown.Item>
                                        ))}
                                        <div className="border-top my-2"></div>
                                        <Dropdown.Item className="p-2 px-4 text-primary " onClick={() => router.visit(route('organizer.events.index'))}>
                                            See all events
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <button
                                onClick={toogleMenuBtn}
                                type="button"
                                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                                id="topnav-hamburger-icon">
                                <span className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                            {/* <SearchOption /> */}

                        </div>
                        {/* <div style={{ width: '800px' }}>
                            <div className="d-flex flex-row" >
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link menu-link"
                                            href="/">
                                            <i className="bx bxs-dashboard"></i> <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link menu-link"
                                            href="/">
                                            <i className="bx bxs-dashboard"></i> <span>Content</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link menu-link"
                                            href="/">
                                            <i className="bx bxs-dashboard"></i> <span>Engagement</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

                        <div className="d-flex align-items-center">
                            <Dropdown show={search} onClick={toogleSearch} className="d-md-none topbar-head-dropdown header-item">
                                <Dropdown.Toggle type="button" as="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                                    <i className="bx bx-search fs-22"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-lg dropdown-menu-end p-0">
                                    <Form className="p-3">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search ..."
                                                    aria-label="Recipient's username" />
                                                <button className="btn btn-primary" type="submit"><i
                                                    className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </Form>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* LanguageDropdown */}
                            <LanguageDropdown />

                            {/* WebAppsDropdown */}
                            <WebAppsDropdown />

                            {/* MyCartDropdwon */}
                            <MyCartDropdown />

                            {/* FullScreenDropdown */}
                            <FullScreenDropdown />

                            {/* Dark/Light Mode set */}
                            <LightDark
                                layoutMode={layoutModeType}
                                onChangeLayoutMode={onChangeLayoutMode}
                            />

                            {/* NotificationDropdown */}
                            <NotificationDropdown />

                            {/* ProfileDropdown */}
                            <OrganizerProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
