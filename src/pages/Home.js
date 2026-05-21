import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import OptimizedImage from "../components/OptimizedImage";
import SectionLayout from "../components/SectionLayout";
import TypewriterText from "../components/TypewriterText";
import { usePortfolio } from "../context/PortfolioContext";
import myImg from "../Assets/avatar.svg";

function Home() {
  const { portfolio } = usePortfolio();

  return (
    <>
      <SectionLayout className="home-section" id="home" showParticles={true}>
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-label="Wave">
                  👋🏻
                </span>
              </h1>
              <h2 className="heading-name">
                I'M
                <strong className="main-name"> {portfolio.name}</strong>
              </h2>
              <div className="home-typewriter">
                <TypewriterText strings={portfolio.typewriterRoles} deleteSpeed={50} />
              </div>
            </Col>
            <Col md={5} className="home-hero-img">
              <img
                src="/home-main.svg"
                alt="home pic"
                loading="eager"
                fetchpriority="high"
                className="img-fluid"
                width="450"
                height="450"
              />
            </Col>
          </Row>
        </Container>
      </SectionLayout>

      <SectionLayout className="home-about-section" id="about" showParticles={false}>
        <Container>
          <Row>
            <Col md={8} className="home-about-description">
              <h2>
                LET ME <span className="purple"> INTRODUCE </span> MYSELF
              </h2>
              <p className="home-about-body">
                I'm a software engineer with a strong foundation in
                cybersecurity, passionate about building secure and scalable
                solutions.
                <br />
                <br />I work primarily with
                <i>
                  <b className="purple"> {portfolio.introPrimary} </b>
                </i>
                and enjoy tackling challenges across the full stack.
                <br />
                <br />
                My interests span
                <i>
                  <b className="purple">{portfolio.introInterests} </b>
                </i>
                — areas where I'm constantly exploring new ideas and
                technologies.
                <br />
                <br />
                On the frontend, I specialize in
                <i>
                  <b className="purple"> {portfolio.introFrontend}</b>
                </i>
                &nbsp;building intuitive interfaces backed by robust .NET
                architectures.
              </p>
            </Col>
            <Col md={4} className="myAvtar">
              <Tilt>
                <OptimizedImage
                  src={myImg}
                  alt="avatar"
                  loading="lazy"
                  className="img-fluid"
                  width="300"
                  height="300"
                />
              </Tilt>
            </Col>
          </Row>
        </Container>
      </SectionLayout>
    </>
  );
}

export default React.memo(Home);
