import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";

/**
 * SectionLayout - Wrapper for page sections with optional particle background
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.id - Section ID for navigation
 * @param {boolean} props.showParticles - Show particle background (default: true)
 * @returns {React.ReactElement}
 */
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
