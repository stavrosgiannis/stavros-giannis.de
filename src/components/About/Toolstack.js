import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiMacos,
  SiVisualstudio,
  SiWindows11,
  SiLinux,
} from "react-icons/si";

const iconMap = {
  SiWindows11,
  SiLinux,
  SiVisualstudio,
  SiPostman,
};

const toolStack = ["SiWindows11", "SiLinux", "SiVisualstudio", "SiPostman"];

function Toolstack() {
  const toolItems = useMemo(
    () =>
      toolStack.map((tool, index) => {
        const IconComponent = iconMap[tool];
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
      {toolItems}
    </Row>
  );
}

export default React.memo(Toolstack);
