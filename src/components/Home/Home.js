import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePortfolio } from "../../context/PortfolioContext";
import { SectionLayout } from "../../components/layout";
import homeLogo from "../../Assets/home-main.svg";
import Home2 from "./Home2";
import Type from "./Type";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
              <LazyLoadImage
                src={homeLogo}
                alt="home pic"
                effect="blur"
                className="img-fluid"
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