import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { SectionLayout } from "../../components/layout";
import pdf from "../../Assets/Lebenslauf_Giannis_Stavros.pdf";
import { AiOutlineDownload } from "react-icons/ai";

function ResumeNew() {
  return (
    <SectionLayout className="resume-section" showParticles={true}>
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
          <Button variant="primary" href={pdf} target="_blank" rel="noopener noreferrer">
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Col>
      </Row>
    </SectionLayout>
  );
}

export default React.memo(ResumeNew);
