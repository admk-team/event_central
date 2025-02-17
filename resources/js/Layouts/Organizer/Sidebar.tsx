import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "../../../images/logo-sm.png";
import logoDark from "../../../images/logo-dark.png";
import logoLight from "../../../images/logo-light.png";

//Import Components
import VerticalLayout from "./VerticalLayouts";
import { Button, Container, Dropdown } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import HorizontalLayout from "../Theme/HorizontalLayout";
import TwoColumnLayout from "../Theme/TwoColumnLayout";
import { Label } from "@headlessui/react";

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

  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        <Dropdown className="navbar-brand-box my-3">
          <Dropdown.Toggle as="button" className="btn d-flex align-items-center p-1" id="dropdown.MenuButton">
            <div className="d-flex align-items-center ">
              <img src="https://media.istockphoto.com/id/1408255024/photo/developers-discussing-programming-code.jpg?s=2048x2048&w=is&k=20&c=FX-R-szUMTh0dbG5yUVKgnijyNxa2KFFpbjUj-PaK4g=" alt="event" className="img-fluid rounded-circle avatar-sm" />
              <div className="fs-6 fw-semibold ms-2">
                <span className="d-block">Testing event</span>
                <span className="d-block fw-normal text-muted">12-01-2025</span>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-75">
            <Dropdown.Item className="p-3">
              <div className="d-flex align-items-center ">
                <img src="https://media.istockphoto.com/id/1408255024/photo/developers-discussing-programming-code.jpg?s=2048x2048&w=is&k=20&c=FX-R-szUMTh0dbG5yUVKgnijyNxa2KFFpbjUj-PaK4g=" alt="event" className="img-fluid rounded-circle avatar-xs" />
                <div className="fs-6 fw-semibold ms-2">
                  <span className="d-block">Testing event</span>
                  <span className="d-block fw-normal text-muted">12-01-2025</span>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="p-3">
              <Link href="#">See all events</Link>
            </Dropdown.Item>
            <Dropdown.Item className="p-2 px-4">
              <Button className="btn btn-primary w-100">Add Event</Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <div className="navbar-brand-box">
                    <Link href="/" className="logo logo-dark">
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
                    </Link>
                    <button
                        onClick={addEventListenerOnSmHoverMenu}
                        type="button"
                        className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                        id="vertical-hover"
                    >
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div> */}
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
