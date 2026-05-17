import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import OptimizedImage from "../OptimizedImage";
import { SectionLayout } from "../../components/layout";
import { usePortfolio } from "../../context/PortfolioContext";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  const { portfolio } = usePortfolio();

  return (
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
                <b className="purple">
                  {" "}
                  {portfolio.introFrontend}
                </b>
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
  );
}

export default React.memo(Home2);