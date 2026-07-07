import React from "react";
import { Container } from "react-bootstrap";

export function SectionLayout({ children, className = "", id = "" }) {
  return (
    <Container fluid className={`section ${className}`} id={id}>
      <Container className="section-content">{children}</Container>
    </Container>
  );
}

export default React.memo(SectionLayout);
