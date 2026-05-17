import React from "react";
import Typewriter from "typewriter-effect";
import { usePortfolio } from "../../context/PortfolioContext";

function Type() {
  const { portfolio } = usePortfolio();

  return (
    <Typewriter
      options={{
        strings: portfolio.typewriterRoles,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default React.memo(Type);
