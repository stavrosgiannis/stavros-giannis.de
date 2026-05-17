import React from "react";
import { Container } from "react-bootstrap";
import Particle from "./Particle";

export function SectionLayout({
  children,
  className = "",
  id = "",
  showParticles = true,
}) {
  return (
    <Container fluid className={`section ${className}`} id={id}>
      {showParticles && <Particle />}
      <Container>{children}</Container>
    </Container>
  );
}

export default React.memo(SectionLayout);
