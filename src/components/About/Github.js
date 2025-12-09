import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import { usePortfolio } from "../../context/PortfolioContext";

/**
 * GitHub contribution calendar component
 * Displays user's GitHub activity using react-github-calendar
 */
function Github() {
  const { socials } = usePortfolio();
  const githubUsername = socials.github?.split("/").pop() || "stavrosgiannis";

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      <GitHubCalendar
        username={githubUsername}
        blockSize={15}
        blockMargin={5}
        color="#c084f5"
        fontSize={16}
      />
    </Row>
  );
}

export default React.memo(Github);
