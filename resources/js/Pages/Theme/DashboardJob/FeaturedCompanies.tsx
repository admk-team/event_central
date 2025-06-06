import React from "react";
import { Card, Col, Table } from "react-bootstrap";
import { featuredCompany } from "../../../common/data/dashboardJobs";
import { Link } from "@inertiajs/react";

const FeaturedCompanies = () => {
  return (
    <React.Fragment>
      <Col xl={6}>
        <Card className="card-height-100">
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Featured Companies</h4>
            <div className="flex-shrink-0">
              <Link href="#" className="btn btn-soft-primary btn-sm">
                View All Companies{" "}
                <i className="ri-arrow-right-line align-bottom"></i>
              </Link>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="table-responsive table-card">
              <Table className="table table-centered table-hover align-middle table-nowrap mb-0">
                <tbody>
                  {featuredCompany.map((company, key) => (
                    <tr key={key}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-2 flex-shrink-0">
                            <div className={"avatar-title bg-" + company.bgColor + "-subtle rounded"}>
                              <img src={company.img} alt="" height="16" />
                            </div>
                          </div>
                          <h6 className="mb-0">{company.lable}</h6>
                        </div>
                      </td>
                      <td>
                        <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                        {company.city}
                      </td>
                      <td>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <Link href="#" className="link-secondary">
                              <i className="ri-facebook-fill"></i>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link href="#" className="link-danger">
                              <i className="ri-mail-line"></i>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link href="#" className="link-primary">
                              <i className="ri-global-line"></i>
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link href="#" className="link-info">
                              <i className="ri-twitter-line"></i>
                            </Link>
                          </li>
                        </ul>
                      </td>
                      <td>
                        <Link href="#" className="btn btn-link btn-sm">
                          View More{" "}
                          <i className="ri-arrow-right-line align-bottom"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="align-items-center mt-4 pt-2 justify-content-between d-flex">
              <div className="flex-shrink-0">
                <div className="text-muted">
                  Showing <span className="fw-semibold">5</span> of{" "}
                  <span className="fw-semibold">25</span> Results
                </div>
              </div>
              <ul className="pagination pagination-separated pagination-sm mb-0">
                <li className="page-item disabled">
                  <Link href="#" className="page-link">
                    ←
                  </Link>
                </li>
                <li className="page-item">
                  <Link href="#" className="page-link">
                    1
                  </Link>
                </li>
                <li className="page-item active">
                  <Link href="#" className="page-link">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link href="#" className="page-link">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link href="#" className="page-link">
                    →
                  </Link>
                </li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default FeaturedCompanies;
