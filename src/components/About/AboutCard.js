import React from "react";
import Card from "react-bootstrap/Card";
import { usePortfolio } from "../../context/PortfolioContext";

/**
 * About card component
 * Displays personal information and quote from context
 */
function AboutCard() {
  const { portfolio } = usePortfolio();

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">{portfolio.name} </span>
            from <span className="purple">{portfolio.location}</span>
            <br />
            {portfolio.education}
            <br />
            {portfolio.currentRole}
            <br />
            <br />
          </p>
          
          <p style={{ color: "rgb(155 126 172)" }}>
            "Every wireless signal is a potential attack vector, waiting to be
            exploited by those with the right knowledge."{" "}
          </p>
          <footer className="blockquote-footer">{portfolio.name}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default React.memo(AboutCard);
