import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import OptimizedImage from "../OptimizedImage";

function ProjectCards({ imgPath, title, description, ghLink, demoLink, isBlog }) {
  return (
    <Card className="project-card-view">
      <div style={{ width: "100%", overflow: "hidden", backgroundColor: "#f5f5f5" }}>
        <OptimizedImage
          src={imgPath}
          alt={title}
          loading="lazy"
          className="card-img-top"
          width="100%"
          height="200"
          style={{ objectFit: "cover", display: "block" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {description}
        </Card.Text>
        <Button variant="primary" href={ghLink} target="_blank" rel="noopener noreferrer">
          <BsGithub /> &nbsp;
          {isBlog ? "Blog" : "GitHub"}
        </Button>

        {!isBlog && demoLink && (
          <Button
            variant="primary"
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp;
            Demo
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

ProjectCards.propTypes = {
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ghLink: PropTypes.string.isRequired,
  demoLink: PropTypes.string,
  isBlog: PropTypes.bool,
};

ProjectCards.defaultProps = {
  isBlog: false,
  demoLink: null,
};

export default React.memo(ProjectCards);
