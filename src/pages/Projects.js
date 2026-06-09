import React from "react";
import { Row, Col } from "react-bootstrap";
import { usePortfolio } from "../context/PortfolioContext";
import SectionLayout from "../components/SectionLayout";
import ProjectCard from "../components/ui/ProjectCard";
import chatify from "../Assets/Projects/chatify.png";
import blog from "../Assets/Projects/blog.png";
import codeEditor from "../Assets/Projects/codeEditor.png";
import emotion from "../Assets/Projects/emotion.png";
import leaf from "../Assets/Projects/leaf.png";
import suicide from "../Assets/Projects/suicide.png";

const IMAGE_MAP = {
  "chatify.png": chatify,
  "blog.png": blog,
  "codeEditor.png": codeEditor,
  "emotion.png": emotion,
  "leaf.png": leaf,
  "suicide.png": suicide,
};

/**
 * Projects Page - Displays portfolio projects
 * Data-driven approach using context
 */
function Projects() {
  const { projects } = usePortfolio();

  const projectsWithImages = projects.map((project) => ({
    ...project,
    image: IMAGE_MAP[project.image] || chatify,
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
          <Col md={4} className="project-card" key={project.id} data-reveal>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </SectionLayout>
  );
}

export default React.memo(Projects);
