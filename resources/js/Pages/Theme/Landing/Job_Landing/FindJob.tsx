import React from "react";
import {
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { findJob } from "../../../../common/data/jobLanding";
import img1 from "../../../../../images/companies/img-1.png";
import img5 from "../../../../../images/companies/img-5.png";
import img2 from "../../../../../images/companies/img-2.png";
import img7 from "../../../../../images/companies/img-7.png";
import img8 from "../../../../../images/companies/img-8.png";
import { Link } from "@inertiajs/react";

const FindJob = () => {
  return (
    <React.Fragment>
      <section className="section" id="findJob">
        <Container>
          <Row className="justify-content-center">
            <Col className="col-lg-7">
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-bold text-capitalize lh-base">
                  Find Your <span className="text-primary">Career</span> You
                  Deserve it
                </h1>
                <p className="text-muted">
                  Post a job to tell us about your project. We'll quickly match you with the right freelancers.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {findJob.map((item, key) => (
              <Col className="col-lg-6" key={key}>
                <Card className="shadow-lg">
                  <Card.Body>
                    <div className="d-flex">
                      <div className="avatar-sm">
                      <div className="avatar-title bg-warning-subtle rounded">
                          <img
                            src={item.company}
                            alt=""
                            className="avatar-xxs"
                          />
                        </div>
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <Link href="#!">
                          <h5>{item.lable}</h5>
                        </Link>
                        <ul className="list-inline text-muted mb-3">
                          <li className="list-inline-item">
                            <i className="ri-building-line align-bottom me-1"></i>{" "}
                            {item.name}
                          </li>
                          <li className="list-inline-item">
                            <i className="ri-map-pin-2-line align-bottom me-1"></i>{" "}
                            {item.location}
                          </li>
                          <li className="list-inline-item">
                            <i className="ri-money-dollar-circle-line align-bottom me-1"></i>{" "}
                            {item.salary}
                          </li>
                        </ul>
                        <div className="hstack gap-2">
                          <span className={"badge bg-" + item.s1[1]+"-subtle text-"+item.s1[1]}>
                            {item.s1[0]}
                          </span>
                          <span className={"badge bg-" + item.s2[1]+"-subtle text-"+item.s2[1]}>
                            {item.s2[0]}
                          </span>
                          {item.s3 ? (
                            <span className={"badge bg-" + item.s3[1]+"-subtle text-"+item.s3[1]}>
                              {item.s3[0]}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-ghost-primary btn-icon custom-toggle"
                          data-bs-toggle="button"
                        >
                          <span className="icon-on">
                            <i className="ri-bookmark-line"></i>
                          </span>
                          <span className="icon-off">
                            <i className="ri-bookmark-fill"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            <div className="col-lg-12">
              <div className="text-center mt-4">
                <Link href="#!" className="btn btn-ghost-primary">
                  View More Jobs{" "}
                  <i className="ri-arrow-right-line align-bottom"></i>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </section>
      <section className="section">
        <Container>
          <Row className="align-items-center gy-4">
            <Col className="col-lg-6 order-2 order-lg-1">
              <div className="text-muted mt-5 mt-lg-0">
                <h5 className="fs-12 text-uppercase text-secondary fw-semibold">
                  Hot Featured Company
                </h5>
                <h1 className="mb-3 fw-bold text-capitalize lh-base">
                  Get <span className="text-primary">10,000+</span> Featured
                  Companies
                </h1>
                <p className="ff-secondary mb-2">
                  The demand for content writing services is growing. This is
                  because content is required in almost every industry.{" "}
                  <b>
                    Many companies have discovered how effective content
                    marketing is.
                  </b>{" "}
                  This is Link major reason for this increase in demand.
                </p>
                <p className="mb-4 ff-secondary">
                  A Content Writer is Link professional who writes
                  informative and engaging articles to help brands showcase
                  their products.
                </p>

                <div className="mt-4">
                  <Link href="index.html" className="btn btn-primary">
                    View More Companies{" "}
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
            <Col className="col-lg-4 col-sm-7 col-10 ms-lg-auto mx-auto order-1 order-lg-2">
              <div>
                <Card className="shadow-lg">
                  <Card.Body>
                    <button
                      type="button"
                      className="btn btn-icon btn-soft-primary float-end"
                      data-bs-toggle="button"
                      aria-pressed="true"
                    >
                      <i className="mdi mdi-cards-heart fs-16"></i>
                    </button>
                    <div className="avatar-sm mb-4">
                      <div className="avatar-title bg-secondary-subtle rounded">
                        <img src={img1} alt="" className="avatar-xxs" />
                      </div>
                    </div>
                    <Link href="#!">
                      <h5>New Web designer</h5>
                    </Link>
                    <p className="text-muted">Themesbrand</p>

                    <div className="d-flex gap-4 mb-3">
                      <div>
                        <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                        Escondido,California
                      </div>

                      <div>
                        <i className="ri-time-line text-primary me-1 align-bottom"></i>{" "}
                        3 min ago
                      </div>
                    </div>

                    <p className="text-muted">
                      As NavLink Product Designer, you will work within NavLink
                      Product Delivery Team fused with UX, engineering, product
                      and data talent.
                    </p>

                    <div className="hstack gap-2">
                      <span className="badge bg-success-subtle text-success">
                        Full Time
                      </span>
                      <span className="badge bg-primary-subtle text-primary">
                        Freelance
                      </span>
                      <span className="badge bg-danger-subtle text-danger">Urgent</span>
                    </div>

                    <div className="mt-4 hstack gap-2">
                      <Link href="#!" className="btn btn-soft-primary w-100">
                        Apply Job
                      </Link>
                      <Link href="#!" className="btn btn-soft-success w-100">
                        Overview
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
                <Card className="shadow-lg mb-0 features-company-widgets rounded-3 card-bg-fill bg-info">
                  <Card.Body>
                    <h5 className="text-white fs-16 mb-4">
                      10,000+ Featured Companies
                    </h5>

                    <div className="d-flex gap-1">
                      <Link href="#!" id="abc">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-brent">Brent Gonzalez</Tooltip>}
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title bg-light bg-opacity-25 rounded-circle">
                            <img src={img5} alt="" height="15" />
                          </div>
                        </div>
                      </OverlayTrigger>
                      </Link>
                      <Link href="#!" id="abs">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-brent">Brent Gonzalez</Tooltip>}
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title bg-light bg-opacity-25 rounded-circle">
                            <img src={img2} alt="" height="15" />
                          </div>
                        </div>
                      </OverlayTrigger>
                      </Link>
                      <Link href="#!" id="brent">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-brent">Brent Gonzalez</Tooltip>}
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title bg-light bg-opacity-25 rounded-circle">
                            <img src={img8} alt="" height="15" />
                          </div>
                        </div>
                      </OverlayTrigger>
                      </Link>
                      <Link href="#!" id="ellen">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-brent">Ellen Smith</Tooltip>}
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title bg-light bg-opacity-25 rounded-circle">
                            <img src={img7} alt="" height="15" />
                          </div>
                        </div>
                      </OverlayTrigger>
                      </Link>
                      <Link href="#!" id="more">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-brent">More Appliances</Tooltip>}
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title fs-11 rounded-circle bg-light bg-opacity-25 text-white">
                            1k+
                          </div>
                        </div>
                      </OverlayTrigger>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default FindJob;
