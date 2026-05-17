import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiNodejs,
  DiMongodb,
  DiPython,
  DiAngularSimple,
  DiJavascript1,
  DiJava,
  DiReact,
  DiGit,
} from "react-icons/di";
import {
  SiRedis,
  SiFirebase,
  SiPostgresql,
  SiDotnet,
  SiTypescript,
  SiCsharp,
  SiNextdotjs,
  SiSolidity,
} from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";
import { usePortfolio } from "../../context/PortfolioContext";

const iconMap = {
  CgCPlusPlus,
  SiCsharp,
  SiTypescript,
  DiPython,
  DiJavascript1,
  DiJava,
  DiNodejs,
  DiAngularSimple,
  DiReact,
  SiDotnet,
  SiNextdotjs,
  DiMongodb,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  DiGit,
  SiSolidity,
  TbBrandGolang,
};

function Techstack() {
  const { skills } = usePortfolio();

  const allSkills = useMemo(
    () => [
      ...skills.languages,
      ...skills.frameworks,
      ...skills.databases,
      ...skills.other,
    ],
    [skills]
  );

  const techItems = useMemo(
    () =>
      allSkills
        .filter(({ icon }) => iconMap[icon])
        .map(({ name, icon }) => {
          const IconComponent = iconMap[icon];
          return (
            <Col xs={4} md={2} className="tech-icons" key={name}>
              <IconComponent />
            </Col>
          );
        }),
    [allSkills]
  );

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {techItems}
    </Row>
  );
}

export default React.memo(Techstack);
