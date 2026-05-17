import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionLayout from "./SectionLayout";

export function HomeSkeleton() {
  return (
    <>
      <SectionLayout className="home-section" id="home" showParticles={true}>
        <Container className="home-content">
          <Row style={{ alignItems: "center", paddingTop: "100px", paddingBottom: "60px" }}>
            <Col md={7}>
              <div className="skeleton-shimmer sk-heading" />
              <div className="skeleton-shimmer sk-heading" style={{ width: "80%" }} />
              <div className="skeleton-shimmer sk-text" style={{ width: "55%", marginTop: "1rem" }} />
            </Col>
            <Col md={5} className="d-flex justify-content-center">
              <div className="skeleton-shimmer sk-image" style={{ maxWidth: "350px" }} />
            </Col>
          </Row>
        </Container>
      </SectionLayout>
      <SectionLayout className="home-about-section" showParticles={false}>
        <Container style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <Row>
            <Col md={8}>
              <div className="skeleton-shimmer sk-heading" style={{ width: "70%" }} />
              <div className="skeleton-shimmer sk-text" />
              <div className="skeleton-shimmer sk-text" />
              <div className="skeleton-shimmer sk-text" style={{ width: "85%" }} />
              <div className="skeleton-shimmer sk-text" style={{ width: "70%" }} />
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <div className="skeleton-shimmer sk-avatar" />
            </Col>
          </Row>
        </Container>
      </SectionLayout>
    </>
  );
}

export function AboutSkeleton() {
  return (
    <SectionLayout className="about-section" showParticles={true}>
      <Container>
        <Row style={{ paddingBottom: "20px" }}>
          <Col md={7}>
            <div className="skeleton-shimmer sk-heading" />
            <div
              className="skeleton-shimmer"
              style={{ height: "180px", borderRadius: "8px" }}
            />
          </Col>
          <Col md={5}>
            <div className="skeleton-shimmer sk-image" />
          </Col>
        </Row>

        <div
          className="skeleton-shimmer sk-heading"
          style={{ width: "40%", margin: "2rem 0 1rem" }}
        />
        <Row>
          {Array.from({ length: 11 }).map((_, i) => (
            <Col xs={4} md={2} key={i} className="mb-3 d-flex justify-content-center">
              <div className="skeleton-shimmer sk-icon" />
            </Col>
          ))}
        </Row>

        <div
          className="skeleton-shimmer sk-heading"
          style={{ width: "30%", margin: "2rem 0 1rem" }}
        />
        <Row>
          {Array.from({ length: 4 }).map((_, i) => (
            <Col xs={4} md={2} key={i} className="mb-3 d-flex justify-content-center">
              <div className="skeleton-shimmer sk-icon" />
            </Col>
          ))}
        </Row>

        <div
          className="skeleton-shimmer sk-heading"
          style={{ width: "25%", margin: "2rem 0 1rem" }}
        />
        <div
          className="skeleton-shimmer"
          style={{ height: "150px", width: "100%", borderRadius: "8px", marginBottom: "2rem" }}
        />
      </Container>
    </SectionLayout>
  );
}

export function ProjectsSkeleton() {
  return (
    <SectionLayout className="project-section" showParticles={true}>
      <Container style={{ paddingTop: "80px" }}>
        <div
          className="skeleton-shimmer sk-heading"
          style={{ width: "40%", margin: "0 auto 1rem" }}
        />
        <div
          className="skeleton-shimmer sk-text"
          style={{ width: "60%", margin: "0 auto 2rem" }}
        />
        <Row style={{ justifyContent: "center" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Col md={4} key={i} className="mb-4">
              <div className="skeleton-shimmer sk-card-img" />
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(22,27,34,0.7)",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <div
                  className="skeleton-shimmer sk-text"
                  style={{ width: "65%", marginBottom: "0.75rem" }}
                />
                <div className="skeleton-shimmer sk-text" />
                <div className="skeleton-shimmer sk-text" />
                <div
                  className="skeleton-shimmer sk-text"
                  style={{ width: "80%", marginBottom: "1rem" }}
                />
                <div className="skeleton-shimmer sk-btn" />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </SectionLayout>
  );
}

export function ResumeSkeleton() {
  return (
    <SectionLayout className="resume-section" showParticles={true}>
      <Container style={{ paddingTop: "80px", paddingBottom: "40px" }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div
              className="skeleton-shimmer"
              style={{ height: "70vh", maxWidth: "550px", margin: "0 auto", borderRadius: "4px" }}
            />
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: "1.5rem" }}>
          <div className="skeleton-shimmer sk-btn" />
        </Row>
      </Container>
    </SectionLayout>
  );
}
