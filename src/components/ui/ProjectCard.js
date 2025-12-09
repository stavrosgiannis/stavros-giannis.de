import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

/**
 * ProjectCard - Display a single project with image, description, and action buttons
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 * @param {string} props.project.title - Project title
 * @param {string} props.project.description - Project description
 * @param {string} props.project.image - Image filename
 * @param {string} props.project.github - GitHub link
 * @param {string} props.project.demo - Demo link
 * @returns {React.ReactElement}
 */
function ProjectCard({ project }) {
  const { title, description, image, github, demo, imageAlt = "Project" } = project;

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={image} alt={imageAlt} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {description}
        </Card.Text>
        <Button 
          variant="primary" 
          href={github} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <BsGithub /> &nbsp; GitHub
        </Button>

        {demo && (
          <Button
            variant="primary"
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp; Demo
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    github: PropTypes.string.isRequired,
    demo: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    featured: PropTypes.bool,
  }).isRequired,
};

export default React.memo(ProjectCard);
