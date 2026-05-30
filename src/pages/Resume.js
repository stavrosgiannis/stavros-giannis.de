import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";
import SectionLayout from "../components/SectionLayout";
import pdf from "../Assets/Lebenslauf_Giannis_Stavros.pdf";

function Resume({ unlocked }) {
  return (
    <SectionLayout className="resume-section" id="resume">
      <p className="pixel-kicker section-label">ARCHIVE</p>
      {unlocked ? (
        <>
          <Row className="resume justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <iframe
                src={pdf}
                title="Curriculum Vitae"
                width="100%"
                style={{ height: "85vh", border: "none", borderRadius: "4px" }}
              />
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ marginTop: "1rem" }}>
            <Col xs="auto">
              <Button
                variant="primary"
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineDownload />
                &nbsp;Download CV
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="archive-gate justify-content-center">
          <Col xs="auto" style={{ textAlign: "center" }}>
            <p>
              Resume is protected. Use the Resume link in the navbar to access it.
            </p>
          </Col>
        </Row>
      )}
    </SectionLayout>
  );
}

export default React.memo(Resume);
