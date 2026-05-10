import React, { useMemo } from "react";
import Particles from "react-tsparticles";
import { useMobileDetect } from "../hooks/useMobileDetect";
import { PARTICLE_CONFIG } from "../utils/constants";

function Particle() {
  const isMobile = useMobileDetect();

  const particlesParams = useMemo(
    () => ({
      particles: {
        number: {
          value: isMobile ? PARTICLE_CONFIG.MOBILE_COUNT : PARTICLE_CONFIG.DESKTOP_COUNT,
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
          speed: isMobile ? PARTICLE_CONFIG.MOBILE_SPEED : PARTICLE_CONFIG.DESKTOP_SPEED,
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
