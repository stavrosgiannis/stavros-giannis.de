import React from "react";
import { Row, Col } from "react-bootstrap";
import { usePortfolio } from "../context/PortfolioContext";
import SectionLayout from "../components/layout/SectionLayout";
import ProjectCard from "../components/ui/ProjectCard";
import chatify from "../Assets/Projects/chatify.png";

/**
 * Projects Page - Displays portfolio projects
 * Data-driven approach using context
 */
function Projects() {
  const { projects } = usePortfolio();

  // Map project data with actual image paths
  const projectsWithImages = projects.map((project) => ({
    ...project,
    image: chatify, // Dynamically resolve image paths
  }));

  return (
    <SectionLayout className="project-section" id="projects">
      <h1 className="project-heading">
        My Recent <strong className="purple">Works</strong>
      </h1>
      <p>Here are a few projects I've worked on recently.</p>
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        {projectsWithImages.map((project) => (
          <Col md={4} className="project-card" key={project.id}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </SectionLayout>
  );
}

export default React.memo(Projects);
