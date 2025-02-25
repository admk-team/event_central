import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "../../../images/logo-sm.png";
import logoDark from "../../../images/logo-dark.png";
import logoLight from "../../../images/logo-light.png";

//Import Components
import VerticalLayout from "./VerticalLayouts";
import { Button, Container, Dropdown } from "react-bootstrap";
import { Link, router, usePage } from "@inertiajs/react";
import HorizontalLayout from "./HorizontalLayout";
import TwoColumnLayout from "./TwoColumnLayout";
import { Label } from "@headlessui/react";
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

  const { currentEvent } = usePage().props;
  if (!currentEvent || currentEvent === null) {
    router.visit(route('organizer.events.index'));
  }

  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        <Dropdown className="navbar-brand-box my-3">
          <Dropdown.Toggle as="button" className="btn d-flex align-items-center p-1" id="dropdown.MenuButton">
            <div className="d-flex align-items-center ">
              <img src="https://media.istockphoto.com/id/1408255024/photo/developers-discussing-programming-code.jpg?s=2048x2048&w=is&k=20&c=FX-R-szUMTh0dbG5yUVKgnijyNxa2KFFpbjUj-PaK4g=" alt="event" className="img-fluid rounded-circle avatar-sm" />
              <div className="fs-6 fw-semibold ms-2 text-start">
                <span className="d-block">{currentEvent.name}</span>
                <span className="d-block fw-normal text-muted">{currentEvent.created_at_date}</span>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-75">
            <Dropdown.Item className="p-2 px-4">
              <Link href={route('organizer.events.index')}>See all events</Link>
            </Dropdown.Item>
            {/* <Dropdown.Item className="p-2 px-4">
              <Button className="btn btn-primary w-100">Add Event</Button>
            </Dropdown.Item> */}
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
