import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SectionLayout from "../../components/SectionLayout";
import { usePortfolio } from "../../context/PortfolioContext";
import Github from "./Github";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import laptopImg from "../../Assets/about.png";

function About() {
  const { portfolio } = usePortfolio();

  return (
    <SectionLayout className="about-section" showParticles={true}>
      <Container>
        <Row className="about-row">
          <Col md={7} className="about-content">
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
            <LazyLoadImage
              src={laptopImg}
              alt="about"
              className="img-fluid"
              effect="blur"
            />
          </Col>
        </Row>

        <h2 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h2>
        <Techstack />

        <h2 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h2>
        <Toolstack />

        <Github />
      </Container>
    </SectionLayout>
  );
}

export default React.memo(About);
