import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import { Card, Col, Container, Row, Modal, Button } from "react-bootstrap";

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

// CSS styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
  }

  .section-bg {
    background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="20" fill="rgba(0,123,255,0.05)" /%3E%3C/svg%3E'), linear-gradient(120deg, #e9f0ff 0%, #f6f9ff 100%);
    min-height: 100vh;
    padding: 4rem 1rem;
    animation: fadeIn 1s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .heading {
    font-size: 3rem;
    font-weight: 700;
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 2.5rem;
    background: linear-gradient(to right, #0052cc, #00b7eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: slideIn 0.8s ease-out;
  }

  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .custom-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
  }

  .custom-card:hover {
    transform: translateY(-8px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .avatar:hover {
    transform: scale(1.15) rotate(10deg);
  }

  .badge-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
    position: relative;
    overflow: hidden;
    animation: cardFadeIn 0.5s ease-out;
  }

  @keyframes cardFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .badge-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
  }

  .badge-card.active {
    opacity: 1;
  }

  .badge-card.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid #00b7eb;
    border-radius: 16px;
    animation: glow 2s infinite ease-in-out;
  }

  @keyframes glow {
    0% { box-shadow: 0 0 8px #00b7eb; }
    50% { box-shadow: 0 0 16px #00b7eb; }
    100% { box-shadow: 0 0 8px #00b7eb; }
  }

  .badge-card.inactive {
    opacity: 0.6;
  }

  .badge-card.inactive:hover {
    opacity: 0.8;
  }

  .icon-container {
    position: relative;
    display: inline-block;
  }

  .icon-container img {
    transition: transform 0.3s ease;
  }

  .icon-container:hover img {
    transform: scale(1.1);
  }

  .progress-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
  }

  .progress-ring circle {
    fill: none;
    stroke: #e9ecef;
    stroke-width: 8;
  }

  .progress-ring .progress {
    stroke: #00b7eb;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;
  }

  .badge-details {
    background: #f8f9fa;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    transition: background 0.3s ease;
  }

  .badge-details:hover {
    background: #f0f4ff;
  }

  .modal-content {
    border-radius: 16px;
    border: none;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: zoomIn 0.3s ease;
  }

  @keyframes zoomIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .modal-header {
    background: linear-gradient(to right, #0052cc, #00b7eb);
    border-bottom: none;
    color: #fff;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  .btn-copy {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .btn-copy::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
  }

  .btn-copy:hover::after {
    width: 200px;
    height: 200px;
  }

  .btn-copy.copied {
    background: #00b7eb;
    transform: scale(1.05);
  }

  .no-badges {
    font-size: 1.3rem;
    color: #6c757d;
    background: rgba(255, 255, 255, 0.9);
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    text-align: center;
    animation: fadeIn 0.5s ease;
  }
`;

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
      <style>{styles}</style>
      <section className="section-bg">
        <Container>
          <h1 className="heading">Your Achievements</h1>

          <Row className="gap-4 mb-5 justify-content-center">
            {[
              {
                title: "Total Points",
                value: data.total_points,
                icon: "dx dx-star",
                bgColor: "#0052cc",
                gradient: "linear-gradient(145deg, #0052cc, #00b7eb)",
              },
              {
                title: `${currentMonth} Points`,
                value: data.current_month_points,
                icon: "dx dx-star",
                bgColor: "#007bff",
                gradient: "linear-gradient(145deg, #007bff, #00c4b4)",
              },
              {
                title: "Referral Link",
                value: "Share Now",
                icon: "dx dx-share",
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
                        <i className={item.icon} style={{ color: "#fff" }}></i>
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
                const remaining = badge.milestone - achieved;
                const isCompleted = !!badge.details?.completed_at;
                const progress = (achieved / badge.milestone) * 100;
                const circumference = 2 * Math.PI * 50; // For SVG progress ring
                const offset = circumference - (progress / 100) * circumference;

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
                              style={{
                                strokeDasharray: circumference,
                                strokeDashoffset: offset,
                                transform: "rotate(-90deg)",
                                transformOrigin: "50% 50%",
                              }}
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
                        <div
                          className="badge-title text-center mb-3"
                          style={{ fontWeight: 600, fontSize: "1.3rem", color: "#1a1a1a" }}
                        >
                          {badge.title ?? "N/A"}
                        </div>
                        <Row className="fs-6 text-center">
                          <Col xs={6}>
                            <p className="mb-1">
                              Points: <span className="fw-medium">{badge.points}</span>
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                              Achieved: <span className="fw-medium">{achieved}</span>
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                              Remaining: <span className="fw-medium">{remaining}</span>
                            </p>
                          </Col>
                          <Col xs={6}>
                            <p className="mb-1">
                              Milestone: <span className="fw-medium">{badge.milestone}</span>
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
                                Completed on: {new Date(badge.details.completed_at!).toLocaleDateString()}
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
                No badges available at the moment. Start earning now!
              </div>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

Index.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Index;