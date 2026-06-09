import React, { useEffect, useRef } from "react";
import { useMobileDetect } from "../hooks/useMobileDetect";
import { PARTICLE_CONFIG } from "../utils/constants";

function Particle() {
  const isMobile = useMobileDetect();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || typeof canvas.getContext !== "function") {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    const particleCount = isMobile
      ? PARTICLE_CONFIG.MOBILE_COUNT
      : PARTICLE_CONFIG.DESKTOP_COUNT;
    const speed = isMobile
      ? PARTICLE_CONFIG.MOBILE_SPEED
      : PARTICLE_CONFIG.DESKTOP_SPEED;
    const particles = Array.from({ length: particleCount }, () => {
      const sizeRoll = Math.random();
      const colorRoll = Math.random();

      return {
        x: Math.random(),
        y: Math.random(),
        phase: Math.random() * Math.PI * 2,
        drift: 0.2 + Math.random() * 0.8,
        size: sizeRoll > 0.96 ? 4 : sizeRoll > 0.8 ? 3 : 2,
        color:
          colorRoll > 0.85
            ? "#f4c96b"
            : colorRoll > 0.68
              ? "#a78bfa"
              : "#9dd9d2",
      };
    });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let lastTimestamp = 0;

    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (reduceMotion) {
        draw(0, false);
      }
    };

    const draw = (timestamp, shouldAnimate = true) => {
      const deltaSeconds = lastTimestamp
        ? Math.min((timestamp - lastTimestamp) / 1000, 0.1)
        : 0;

      lastTimestamp = timestamp;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (shouldAnimate) {
          particle.x = (particle.x + speed * particle.drift * deltaSeconds) % 1;
        }

        const x = Math.floor(particle.x * width);
        const y = Math.floor(particle.y * height);
        const opacity = shouldAnimate
          ? 0.16 + Math.abs(Math.sin(timestamp / 1000 + particle.phase)) * 0.44
          : 0.3;

        context.fillStyle = particle.color;
        context.globalAlpha = opacity;
        context.fillRect(x, y, particle.size, particle.size);
      });

      context.globalAlpha = 1;
      if (shouldAnimate) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    if (!reduceMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isMobile]);

  return <canvas id="tsparticles" ref={canvasRef} aria-hidden="true" />;
}

export default React.memo(Particle);
