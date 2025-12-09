import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with programming and I have at least learnt
              something, I think… 🤷‍♂️
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple"> C# .NET, Typescript and Python. </b>
              </i>
              <br />
              <br />
              My field of Interest's are building new&nbsp;
              <i>
                <b className="purple">Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                AI, Cybersecurity, and Blockchain.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              using <b className="purple">C#</b> and
              <i>
                <b className="purple">
                  {" "}
                  .NET
                </b>
              </i>
              &nbsp; with a focus on frontend technologies like
              <i>
                <b className="purple"> WPF, ASP.NET, Angular, and TypeScript.</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <LazyLoadImage 
                src={myImg} 
                alt="avatar"
                className="img-fluid"
                effect="blur"
              />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default React.memo(Home2);