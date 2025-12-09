import React, { useMemo, useState, useEffect } from "react";
import Particles from "react-tsparticles";

function Particle() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particlesParams = useMemo(
    () => ({
      particles: {
        number: {
          value: isMobile ? 30 : 60,
          density: {
            enable: true,
            value_area: isMobile ? 1200 : 800,
          },
        },
        line_linked: {
          enable: false,
          opacity: 0.03,
        },
        move: {
          direction: "right",
          speed: isMobile ? 0.02 : 0.05,
        },
        size: {
          value: 1,
        },
        opacity: {
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.05,
          },
        },
      },
      interactivity: {
        events: {
          onclick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          push: {
            particles_nb: 1,
          },
        },
      },
      retina_detect: true,
    }),
    [isMobile]
  );

  return <Particles id="tsparticles" params={particlesParams} />;
}

export default React.memo(Particle);
