import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Stavros Giannis </span>
            from <span className="purple">Düsseldorf, Germany.</span>
            <br />
            I have a Bachelor's degree in Cyber Security Management (B.Sc.) from the University of Applied Sciences Niederrhein.
            <br />
            I'm currently working as a software engineer at KPMG Global.
            <br />
            <br />
          </p>
          
          <p style={{ color: "rgb(155 126 172)" }}>
            "Every wireless signal is a potential attack vector, waiting to be
            exploited by those with the right knowledge."{" "}
          </p>
          <footer className="blockquote-footer">Stavros Giannis</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
