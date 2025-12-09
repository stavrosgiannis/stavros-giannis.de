import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { SectionLayout } from "../../components/layout";
import pdf from "../../Assets/Lebenslauf_Giannis_Stavros.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * Resume/CV display component
 * Uses react-pdf to render PDF with responsive scaling
 * Optimized with useCallback and useMemo for performance
 */
function ResumeNew() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => setWidth(window.innerWidth), []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const scale = useMemo(() => (width > 786 ? 1.7 : 0.6), [width]);

  return (
    <SectionLayout className="resume-section" showParticles={true}>
      <Row className="resume">
        <Document file={pdf} className="d-flex justify-content-center">
          <Page pageNumber={1} scale={scale} />
        </Document>
      </Row>

      <Row style={{ justifyContent: "center", position: "relative" }}>
        <Button variant="primary" href={pdf} target="_blank" rel="noopener noreferrer">
          <AiOutlineDownload />
          &nbsp;Download CV
        </Button>
      </Row>
    </SectionLayout>
  );
}

export default React.memo(ResumeNew);
