import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import { Card, Col, Container, Row, Modal, Button } from "react-bootstrap";
import moment from "moment";
import "../../../css/badge.css";

interface BadgeDetail {
  achieved_points?: number;
  completed_at?: string | null;
  created_at?: string | null;
}

interface Badge {
  id: number;
  title: string;
  icon: string;
  points: number;
  milestone: number;
  details?: BadgeDetail;
}

interface Props {
  data: {
    badges: Badge[];
    total_points: number;
    current_month_points: number;
    referral_link: string;
  };
}

const Index = ({ data }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(data.referral_link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <>
      <Head title="Badges" />
      <section className="section-bg">
        <Container>
          <h1 className="heading mt-3">My Achievements</h1>

          <Row className="gap-4 mb-5 justify-content-center">
            {[
              {
                title: "Total Points",
                value: data.total_points,
                icon: "bx bxs-medal",
                bgColor: "#0052cc",
                gradient: "linear-gradient(145deg, #0052cc, #00b7eb)",
              },
              {
                title: `${currentMonth} Points`,
                value: data.current_month_points,
                icon: "bx bxs-medal",
                bgColor: "#007bff",
                gradient: "linear-gradient(145deg, #007bff, #00c4b4)",
              },
              {
                title: "Referral Link",
                value: "Share Now",
                icon: "bx bx-share",
                bgColor: "#00b7eb",
                gradient: "linear-gradient(145deg, #00b7eb, #28a745)",
                onClick: () => setShowModal(true),
              },
            ].map((item, index) => (
              <Col key={index} xxl={3} xl={4} md={6}>
                <Card
                  className="custom-card"
                  onClick={item.onClick}
                  style={{ cursor: item.onClick ? "pointer" : "default", background: item.gradient }}
                >
                  <Card.Body className="p-4 d-flex align-items-center">
                    <div className="me-3">
                      <span
                        className="avatar avatar-md p-3"
                        style={{ backgroundColor: item.bgColor, borderRadius: "50%" }}
                      >
                        <i className={`${item.icon} text-white`} style={{ fontSize: "2rem", color: "#fff" }}></i>
                      </span>
                    </div>
                    <div className="flex-fill">
                      <h5 className="fw-semibold mb-1 text-white" style={{ fontSize: "1.5rem" }}>
                        {item.value}
                      </h5>
                      <p className="mb-0 fs-6 text-white opacity-80">{item.title}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Modal centered show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Share Your Referral Link</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <p className="mb-4 text-truncate fs-6 bg-light p-3 rounded" style={{ wordBreak: "break-all" }}>
                {data.referral_link}
              </p>
              <Button
                className={`btn-copy btn-primary ${copied ? "copied" : ""}`}
                onClick={copyReferralLink}
              >
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </Modal.Body>
          </Modal>

          <Row className="g-4 justify-content-center">
            {data.badges.length > 0 ? (
              data.badges.map((badge) => {
                const achieved = badge.details?.achieved_points ?? 0;
                const remaining = Math.max(0, badge.milestone - achieved);
                const isCompleted = !!badge.details?.completed_at;
                const progress = (achieved / badge.milestone) * 100;
              

                return (
                  <Col key={badge.id} xs={12} sm={6} md={4} lg={3}>
                    <div className={`badge-card ${isCompleted ? "active" : "inactive"}`}>
                      <div className="card-img-top d-flex justify-content-center align-items-center p-4">
                        <div className="icon-container">
                          <svg className="progress-ring" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="50" />
                            <circle
                              className="progress"
                              cx="60"
                              cy="60"
                              r="50"
                            />
                          </svg>
                          <img
                            src={`/storage/${badge.icon}`}
                            alt="Badge Icon"
                            style={{ width: "80px", height: "80px", objectFit: "contain", position: "relative", zIndex: 1 }}
                          />
                        </div>
                      </div>
                      <div className="badge-details p-4">
                        <div className="badge-title text-center mb-3">
                           <span
                              className="incomplete-badge"
                              style={{ color: "#1a1a1a", fontWeight: 600, fontSize: "0.9rem" }}
                            >
                              {badge.title ?? "N/A"}
                            </span>
                        </div>
                        <Row className="fs-6 text-center">
                          <Col xs={6}>
                            <p className="mb-1">
                              Points:
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                              Achieved:
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                              <span className="fw-medium">{badge.points}</span>
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                             <span className="fw-medium">{achieved}</span>
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                              Remaining:
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                              Milestone:
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                              <span className="fw-medium">{remaining}</span>
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                               <span className="fw-medium">{badge.milestone}</span>
                            </p>
                          </Col>
                        </Row>
                        <div className="text-center mt-3">
                          {isCompleted ? (
                            <>
                              <span
                                className="completed-badge d-block mb-1"
                                style={{ color: "#00b7eb", fontWeight: 600, fontSize: "1rem" }}
                              >
                                Achieved!
                              </span>
                              <span
                                className="completed-badge"
                                style={{ color: "#6c757d", fontSize: "0.85rem" }}
                              >
                                {" "}{moment(badge.details?.completed_at).format("DD MMM YYYY")}{" "}
                              </span>
                            </>
                          ) : (
                            <span
                              className="incomplete-badge"
                              style={{ color: "#ff8c00", fontWeight: 600, fontSize: "1rem" }}
                            >
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <div className="no-badges">
                No badges available at the moment. Please check back later.!
              </div>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

Index.layout = (page: any) => <Layout children={page} />;

export default Index;