import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionLayout from "../components/SectionLayout";
import TypewriterText from "../components/TypewriterText";
import { usePortfolio } from "../context/PortfolioContext";
import pixelAvatar from "../Assets/pixel-developer-avatar.png";

function Home() {
  const { portfolio } = usePortfolio();

  return (
    <>
      <SectionLayout className="home-section" id="home">
        <Container className="home-content">
          <Row className="hero-layout">
            <Col md={7} className="home-header">
              <p className="pixel-kicker">PLAYER ONE // ONLINE</p>
              <h1 className="heading">
                Welcome, traveler <span className="pixel-spark">*</span>
              </h1>
              <h2 className="heading-name">
                I'M{" "}
                <strong className="main-name"> {portfolio.name}</strong>
              </h2>
              <div className="home-typewriter">
                <TypewriterText strings={portfolio.typewriterRoles} deleteSpeed={50} />
              </div>
              <div className="hero-status">
                <span>CLASS</span>
                <strong>{portfolio.title}</strong>
                <span>BASE</span>
                <strong>{portfolio.location}</strong>
              </div>
            </Col>
            <Col md={5} className="home-hero-img">
              <div className="pixel-frame hero-art-frame">
                <img
                  src="/pixel-night-coding-room.png"
                  alt="Pixel art coding room at night"
                  loading="eager"
                  fetchpriority="high"
                  className="img-fluid pixel-art"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </SectionLayout>

      <SectionLayout className="home-about-section">
        <Container>
          <Row>
            <Col md={8} className="home-about-description">
              <p className="pixel-kicker">PLAYER PROFILE</p>
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
              <div className="pixel-frame avatar-frame">
                <img
                  src={pixelAvatar}
                  alt="Pixel art developer avatar"
                  loading="lazy"
                  className="img-fluid pixel-art"
                  width="300"
                  height="300"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </SectionLayout>
    </>
  );
}

export default React.memo(Home);
