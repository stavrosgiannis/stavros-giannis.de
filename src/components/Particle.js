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
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      phase: Math.random() * Math.PI * 2,
      drift: 0.2 + Math.random() * 0.8,
    }));
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
    };

    const draw = (timestamp) => {
      const deltaSeconds = lastTimestamp
        ? Math.min((timestamp - lastTimestamp) / 1000, 0.1)
        : 0;

      lastTimestamp = timestamp;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#c770f0";

      particles.forEach((particle) => {
        particle.x = (particle.x + speed * particle.drift * deltaSeconds) % 1;

        const x = particle.x * width;
        const y = particle.y * height;
        const opacity = 0.12 + Math.abs(Math.sin(timestamp / 1000 + particle.phase)) * 0.38;

        context.globalAlpha = opacity;
        context.beginPath();
        context.arc(x, y, 1.4, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isMobile]);

  return <canvas id="tsparticles" ref={canvasRef} aria-hidden="true" />;
}

export default React.memo(Particle);
