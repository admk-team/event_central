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
      <section className="section-bg py-5 mt-5 mb-5">
        <Container>
          <h1 className="heading text-center mb-5">🎖️ My Achievements</h1>

          <Row className="gap-4 mb-5 justify-content-center">
            {[
              {
                title: "Total Points",
                value: data.total_points,
                icon: "bx bxs-star",
                gradient: "linear-gradient(135deg, #ff6a00, #ee0979)",
              },
              {
                title: `${currentMonth} Points`,
                value: data.current_month_points,
                icon: "bx bxs-trophy",
                gradient: "linear-gradient(135deg, #1dd1a1, #10ac84)",
              },
              {
                title: "Referral Link",
                value: "Share Now",
                icon: "bx bx-link",
                gradient: "linear-gradient(135deg, #00b7eb, #0052cc)",
                onClick: () => setShowModal(true),
              },
            ].map((item, index) => (
              <Col key={index} xxl={3} xl={4} md={6}>
                <Card
                  className="custom-card"
                  onClick={item.onClick}
                  style={{
                    background: item.gradient,
                    cursor: item.onClick ? "pointer" : "default",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Card.Body className="p-4 d-flex align-items-center">
                    <div className="me-3">
                      <span className="badge-icon">
                        <i className={`${item.icon} text-white fs-3`}></i>
                      </span>
                    </div>
                    <div className="flex-fill">
                      <h5 className="fw-bold mb-1 text-white">{item.value}</h5>
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
              <p className="referral-box">{data.referral_link}</p>
              <Button className={`btn-copy ${copied ? "copied" : ""}`} onClick={copyReferralLink}>
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
                const progress = Math.min(100, (achieved / badge.milestone) * 100);

                return (
                  <Col key={badge.id} xs={12} sm={6} md={4} lg={3}>
                    <div
                      className={`badge-card ${isCompleted ? "active" : "opacity-50"}`}
                      style={{ transition: "opacity 0.4s ease" }}
                    >
                      <div className="icon-container">
                        <svg className="progress-ring" viewBox="0 0 120 120">
                          <circle className="track" cx="60" cy="60" r="50" />
                          <circle
                            className="progress"
                            cx="60"
                            cy="60"
                            r="50"
                            style={{
                              strokeDasharray: "314",
                              strokeDashoffset: 314 - (314 * progress) / 100,
                            }}
                          />
                        </svg>
                        <img
                          src={`/storage/${badge.icon}`}
                          alt="Badge"
                          className="badge-image"
                        />
                      </div>
                      <div className="badge-details text-center">
                        <h5 className="fw-bold">{badge.title}</h5>
                        <div className="points-breakdown">
                          <p><strong>Points:</strong> {badge.points}</p>
                          <p><strong>Achieved:</strong> {achieved}</p>
                          <p><strong>Remaining:</strong> {remaining}</p>
                          <p><strong>Milestone:</strong> {badge.milestone}</p>
                        </div>
                        <div className="badge-status mt-2">
                          {isCompleted ? (
                            <>
                              <span className="status complete">🏆 Achieved</span>
                              <br />
                              <small className="text-muted">
                                {moment(badge.details?.completed_at).format("DD MMM YYYY")}
                              </small>
                            </>
                          ) : (
                            <span className="status in-progress">🔥 In Progress</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <div className="no-badges text-center mt-5">No badges available yet. Come back soon!</div>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
