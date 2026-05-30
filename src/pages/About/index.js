import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
            <p className="pixel-kicker">CAREER QUESTS</p>
            <h1>
              Professional <strong className="purple">EXPERIENCE</strong>
            </h1>
            <div className="career-timeline">
              {portfolio.experience.map((experience) => (
                <article className="career-quest" key={`${experience.company}-${experience.role}`}>
                  <span className="career-marker" aria-hidden="true" />
                  <div className="career-quest-panel">
                    <span className="career-status">{experience.status}</span>
                    <h2>{experience.role}</h2>
                    <p className="career-company">{experience.company}</p>
                    <p className="career-meta">
                      <span>{experience.period}</span>
                      <span>{experience.location}</span>
                    </p>
                    {experience.project && (
                      <div className="career-project">
                        <h3>{experience.project}</h3>
                        <p>{experience.summary}</p>
                      </div>
                    )}
                    <ul className="career-highlights">
                      {experience.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Col>
          <Col md={5} className="about-img">
            <div className="stats-panel pixel-frame">
              <p className="pixel-kicker">CAREER STATS</p>
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
