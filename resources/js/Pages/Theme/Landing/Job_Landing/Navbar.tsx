import React, { useEffect, useState } from "react";
import Scrollspy from "react-scrollspy";
import {
  Collapse,
  Container,
  NavbarToggle,
  NavLink,
} from "react-bootstrap";
import LogoDark from "../../../../../../../../images/logo-dark.png";
import LogoLight from "../../../../../../../../images/logo-light.png";
import { Link } from "@inertiajs/react";
const Navbar = () => {
  const [isOpenMenu, setisOpenMenu] = useState<boolean>(false);
  const [navClass, setnavClass] = useState<any>("");


  const toggle = () => setisOpenMenu(!isOpenMenu);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass(" is-sticky");
    } else {
      setnavClass("");
    }
  };

  const [activeLink, setActiveLink] = useState<any>();
  useEffect(() => {
    const activation = (event: any) => {
      const target: any = event.target;
      if (target) {
        target.classList.add('active');
        setActiveLink(target);
        if (activeLink && activeLink !== target) {
          activeLink.classList.remove('active');
        }
      }
    };
    const defaultLink: any = document.querySelector('.navbar li.a.active');
    if (defaultLink) {
      defaultLink?.classList.add("active")
      setActiveLink(defaultLink)
    }
    const links = document.querySelectorAll('.navbar a');
    links.forEach((link) => {
      link.addEventListener('click', activation);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', activation);
      });
    };
  }, [activeLink]);

  return (
    <React.Fragment>
      <nav
        className={
          "navbar navbar-expand-lg navbar-landing fixed-top job-navbar" +
          navClass
        }
        id="navbar"
      >
        <Container fluid className="custom-container">
          <Link className="navbar-brand" href="/dashboard">
            <img
              src={LogoDark}
              className="card-logo card-logo-dark"
              alt="logo dark"
              height="17"
            />
            <img
              src={LogoLight}
              className="card-logo card-logo-light"
              alt="logo light"
              height="17"
            />
          </Link>
          <NavbarToggle
            onClick={toggle}
            className="navbar-toggler py-0 fs-20 text-body"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </NavbarToggle>

          <Collapse className="navbar-collapse" in={isOpenMenu}>
            <>
              <Scrollspy
                offset={-18}
                items={[
                  "hero",
                  "process",
                  "categories",
                  "findJob",
                  "candidates",
                  "blog",
                ]}
                currentClassName="active"
                className="navbar-nav mx-auto mt-2 mt-lg-0"
                id="navbar-example"
              >
                <li className="nav-item">
                  <NavLink className="fw-semibold fs-15" href="#hero">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="fw-semibold fs-15" href="#process">
                    Process
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="fw-semibold fs-15" href="#categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="fw-semibold fs-15" href="#findJob">
                    Find Jobs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="fw-semibold fs-15" href="#candidates">
                    Candidates
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="fw-semibold fs-15" href="#blog">
                    Blog
                  </NavLink>
                </li>
              </Scrollspy>

              <div>
                <Link href="/auth-signin-basic" className="btn btn-soft-primary">
                  <i className="ri-user-3-line align-bottom me-1"></i> Login &
                  Register
                </Link>
              </div>
            </>

          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
