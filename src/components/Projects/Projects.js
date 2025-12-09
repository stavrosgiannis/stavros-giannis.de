import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePortfolio } from "../../context/PortfolioContext";
import { SectionLayout } from "../../components/layout";
import ProjectCard from "./ProjectCards";
import chatify from "../../Assets/Projects/chatify.png";

/**
 * Projects component - Displays featured projects
 * NOTE: This component is deprecated. Use src/pages/Projects.js instead for full project list
 * This component shows a single featured project as a demo
 */
function Projects() {
  const { projects } = usePortfolio();

  return (
    <SectionLayout className="project-section" showParticles={true}>
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p>Here are a few projects I've worked on recently.</p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.slice(0, 1).map((project) => (
            <Col md={4} className="project-card" key={project.id}>
              <ProjectCard
                imgPath={chatify}
                isBlog={project.isBlog || false}
                title={project.title}
                description={project.description}
                ghLink={project.github}
                demoLink={project.demo}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </SectionLayout>
  );
}

export default React.memo(Projects);
