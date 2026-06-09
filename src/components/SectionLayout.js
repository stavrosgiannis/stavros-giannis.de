import React from "react";
import { Container } from "react-bootstrap";
import { useScrollFade } from "../hooks/useScrollFade";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function SectionLayout({ children, className = "", id = "" }) {
  const [ref, revealClass] = useScrollFade();
  const revealContainerRef = useScrollReveal();

  return (
    <Container
      ref={ref}
      fluid
      className={`section ${className}${revealClass ? ` ${revealClass}` : ""}`}
      id={id}
    >
      <Container className="section-content" ref={revealContainerRef}>
        {children}
      </Container>
    </Container>
  );
}

export default React.memo(SectionLayout);
