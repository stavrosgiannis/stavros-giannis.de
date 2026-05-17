import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiPostman,
  SiVisualstudio,
  SiWindows11,
  SiLinux,
} from "react-icons/si";
import { usePortfolio } from "../../context/PortfolioContext";

const iconMap = {
  SiWindows11,
  SiLinux,
  SiVisualstudio,
  SiPostman,
};

function Toolstack() {
  const { tools } = usePortfolio();

  const toolItems = useMemo(
    () =>
      tools
        .filter(({ icon }) => iconMap[icon])
        .map(({ name, icon }) => {
          const IconComponent = iconMap[icon];
          return (
            <Col xs={4} md={2} className="tech-icons" key={name}>
              <IconComponent />
            </Col>
          );
        }),
    [tools]
  );

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {toolItems}
    </Row>
  );
}

export default React.memo(Toolstack);
