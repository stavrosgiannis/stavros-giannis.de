import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePortfolio } from "../../context/PortfolioContext";
import { SectionLayout } from "../../components/layout";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  const { portfolio } = usePortfolio();

  return (
    <>
      <SectionLayout className="home-section" id="home" showParticles={true}>
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> {portfolio.name}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={`${process.env.PUBLIC_URL}/home-main.svg`}
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
      <Home2 />
    </>
  );
}

export default React.memo(Home);