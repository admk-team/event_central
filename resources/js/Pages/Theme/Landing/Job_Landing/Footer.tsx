import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LogoLight from "../../../../../images/logo-white.png";
import { Link } from "@inertiajs/react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="custom-footer bg-dark py-5 position-relative">
        <Container>
          <Row>
            <Col className="col-lg-4 mt-4">
              <div>
                <div>
                  <img src={LogoLight} alt="logo light" height="17" />
                </div>
                <div className="mt-4 fs-13">
                  <p>Premium Multipurpose Admin & Dashboard Template</p>
                  <p>
                    You can build any type of web application like eCommerce,
                    CRM, CMS, Project management apps, Admin Panels, etc using
                    Velzon.
                  </p>
                  <ul className="list-inline mb-0 footer-social-link">
                    <li className="list-inline-item">
                      <Link href="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-facebook-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link href="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-github-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link href="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-linkedin-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link href="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-google-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link href="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-dribbble-line"></i>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col className="col-lg-7 ms-lg-auto">
              <Row>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Company</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list fs-16">
                      <li>
                        <Link href="/pages-profile">About Us</Link>
                      </li>
                      <li>
                        <Link href="/pages-gallery">Gallery</Link>
                      </li>
                      <li>
                        <Link href="/pages-team">Team</Link>
                      </li>
                      <li>
                        <Link href="/pages-pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link href="/pages-timeline">Timeline</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">For Jobs</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list fs-16">
                      <li>
                        <Link href="/apps-job-lists">Job List</Link>
                      </li>
                      <li>
                        <Link href="/apps-job-application">
                          application
                        </Link>
                      </li>
                      <li>
                        <Link href="/apps-job-new">New Job</Link>
                      </li>
                      <li>
                        <Link href="/apps-job-companies-lists">
                          Company List
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Support</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list fs-16">
                      <li>
                        <Link href="/pages-faqs">FAQ</Link>
                      </li>
                      <li>
                        <Link href="/pages-faqs">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="text-center text-sm-start align-items-center mt-5">
            <Col className="col-sm-6">
              <div>
                <p className="copy-rights mb-0">
                  {new Date().getFullYear()} ©
                  Velzon - Themesbrand
                </p>
              </div>
            </Col>
            <Col className="col-sm-6">
              <div className="text-sm-end mt-3 mt-sm-0">
                <ul className="list-inline mb-0 footer-list gap-4 fs-15">
                  <li className="list-inline-item">
                    <Link href="/pages-privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/pages-term-conditions">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/pages-privacy-policy">Security</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
