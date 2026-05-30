import React from "react";
import { Container } from "react-bootstrap";
import { useScrollFade } from "../hooks/useScrollFade";

export function SectionLayout({ children, className = "", id = "" }) {
  const [ref, revealClass] = useScrollFade();

  return (
    <Container
      ref={ref}
      fluid
      className={`section ${className}${revealClass ? ` ${revealClass}` : ""}`}
      id={id}
    >
      <Container className="section-content">{children}</Container>
    </Container>
  );
}

export default React.memo(SectionLayout);
