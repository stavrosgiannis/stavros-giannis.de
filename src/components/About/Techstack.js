import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiNodejs,
  DiMongodb,
  DiPython,
  DiAngularSimple,
} from "react-icons/di";
import {
  SiRedis,
  SiFirebase,
  SiPostgresql,
  SiDotnet,
  SiTypescript,
  SiCsharp,
} from "react-icons/si";

const iconMap = {
  CgCPlusPlus,
  SiCsharp,
  SiTypescript,
  DiPython,
  DiNodejs,
  DiAngularSimple,
  DiMongodb,
  SiDotnet,
  SiFirebase,
  SiRedis,
  SiPostgresql,
};

const techStack = [
  "CgCPlusPlus",
  "SiCsharp",
  "SiTypescript",
  "DiPython",
  "DiNodejs",
  "DiAngularSimple",
  "DiMongodb",
  "SiDotnet",
  "SiFirebase",
  "SiRedis",
  "SiPostgresql",
  "DiPython",
];

function Techstack() {
  const techItems = useMemo(
    () =>
      techStack.map((tech, index) => {
        const IconComponent = iconMap[tech];
        return (
          <Col xs={4} md={2} className="tech-icons" key={index}>
            <IconComponent />
          </Col>
        );
      }),
    []
  );

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {techItems}
    </Row>
  );
}

export default React.memo(Techstack);
