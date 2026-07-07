import React from "react";
import { Row, Col } from "react-bootstrap";
import { usePortfolio } from "../context/PortfolioContext";
import SectionLayout from "../components/SectionLayout";
import ProjectCard from "../components/ui/ProjectCard";

// Only images referenced by PROJECTS_DATA get bundled — adding a project
// is now a one-file edit (projects.data.js + drop the file in Assets/Projects/).
const PROJECT_IMAGES = import.meta.glob("../Assets/Projects/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const resolveProjectImage = (filename) => {
  const entry = Object.entries(PROJECT_IMAGES).find(([path]) => path.endsWith(`/${filename}`));
  return entry?.[1];
};

/**
 * Projects Page - Displays portfolio projects
 * Data-driven approach using context
 */
function Projects() {
  const { projects } = usePortfolio();

  const projectsWithImages = projects.map((project) => ({
    ...project,
    image: resolveProjectImage(project.image),
  }));

  return (
    <SectionLayout className="project-section" id="projects">
      <p className="pixel-kicker section-label">QUEST LOG</p>
      <h1 className="project-heading">
        My Recent <strong className="purple">Works</strong>
      </h1>
      <p>Here are a few projects I've worked on recently.</p>
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        {projectsWithImages.map((project) => (
          <Col md={4} className="project-card" key={project.id} data-reveal="pixel">
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </SectionLayout>
  );
}

export default React.memo(Projects);
