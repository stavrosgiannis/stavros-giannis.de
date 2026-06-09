import React, { useEffect, useRef } from "react";

const QUANT_STEPS = 48;

function ScrollProgressBar() {
  const fillRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return undefined;

    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      const stepped = Math.round(progress * QUANT_STEPS) / QUANT_STEPS;
      fill.style.width = `${stepped * 100}%`;
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="quest-progress" aria-hidden="true">
      <div className="quest-progress__fill" ref={fillRef} />
    </div>
  );
}

export default React.memo(ScrollProgressBar);
