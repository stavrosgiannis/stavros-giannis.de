import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import SectionLayout from "../../components/SectionLayout";
import { usePortfolio } from "../../context/PortfolioContext";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";

function About() {
  const { portfolio } = usePortfolio();

  return (
    <SectionLayout className="about-section" id="about">
      <Container>
        <Row className="about-row">
          <Col md={7} className="about-content">
            <p className="pixel-kicker">PLAYER PROFILE</p>
            <h1>
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Card className="quote-card-view">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p style={{ textAlign: "justify" }}>
                    Hi Everyone, I am{" "}
                    <span className="purple">{portfolio.name} </span>
                    from <span className="purple">{portfolio.location}</span>
                    <br />
                    I have a{" "}
                    <span className="purple">{portfolio.education.degree}</span>{" "}
                    in{" "}
                    <span className="purple">{portfolio.education.field}</span>{" "}
                    from{" "}
                    <span className="purple">
                      {portfolio.education.university}
                    </span>
                    <br />
                    I'm currently {portfolio.currentRole}
                    <br />
                    <br />
                  </p>
                  <p style={{ color: "rgb(155 126 172)" }}>
                    "{portfolio.tagline}"{" "}
                  </p>
                  <footer className="blockquote-footer">{portfolio.name}</footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} className="about-img">
            <div className="stats-panel pixel-frame">
              <p className="pixel-kicker">CHARACTER STATS</p>
              <dl>
                <dt>CLASS</dt>
                <dd>{portfolio.title}</dd>
                <dt>BASE</dt>
                <dd>{portfolio.location}</dd>
                <dt>EDUCATION</dt>
                <dd>{portfolio.education.degree}</dd>
                <dt>FOCUS</dt>
                <dd>{portfolio.education.field}</dd>
                <dt>GUILD</dt>
                <dd>{portfolio.currentRole}</dd>
              </dl>
            </div>
          </Col>
        </Row>

        <p className="pixel-kicker section-label">SKILL TREE</p>
        <h2 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h2>
        <Techstack />

        <p className="pixel-kicker section-label">INVENTORY</p>
        <h2 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h2>
        <Toolstack />

      </Container>
    </SectionLayout>
  );
}

export default React.memo(About);
