import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import OptimizedImage from "../OptimizedImage";
import { SectionLayout } from "../../components/layout";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

/**
 * Home introduction section
 * Displays personal introduction text and avatar image with tilt effect
 */
function Home2() {
  return (
    <SectionLayout className="home-about-section" id="about" showParticles={false}>
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a software engineer with a strong foundation in
              cybersecurity, passionate about building secure and scalable
              solutions.
              <br />
              <br />I work primarily with
              <i>
                <b className="purple"> C# .NET, TypeScript, and Python, </b>
              </i>
              and enjoy tackling challenges across the full stack.
              <br />
              <br />
              My interests span
              <i>
                <b className="purple">AI, Cybersecurity, and Blockchain </b>
              </i>
              — areas where I'm constantly exploring new ideas and
              technologies.
              <br />
              <br />
              On the frontend, I specialize in
              <i>
                <b className="purple">
                  {" "}
                  WPF, ASP.NET, Angular, and TypeScript,
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