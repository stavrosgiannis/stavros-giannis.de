import React, { useEffect, useMemo, useState } from "react";

function TypewriterText({
  strings = [],
  autoStart = true,
  loop = true,
  deleteSpeed = 50,
}) {
  const roles = useMemo(() => strings.filter(Boolean), [strings]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!autoStart || roles.length === 0) {
      return undefined;
    }

    const currentRole = roles[roleIndex] || "";
    const isComplete = characterCount === currentRole.length;
    const isEmpty = characterCount === 0;
    const delay = isComplete && !isDeleting ? 1500 : isDeleting ? deleteSpeed : 120;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setRoleIndex((currentIndex) => {
          const nextIndex = currentIndex + 1;
          return loop ? nextIndex % roles.length : Math.min(nextIndex, roles.length - 1);
        });
        return;
      }

      setCharacterCount((currentCount) => currentCount + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [autoStart, characterCount, deleteSpeed, isDeleting, loop, roleIndex, roles]);

  const visibleText = roles[roleIndex]?.slice(0, characterCount) || "";

  return (
    <div className="Typewriter">
      <span className="Typewriter__wrapper">{visibleText}</span>
      <span className="Typewriter__cursor">|</span>
    </div>
  );
}

export default React.memo(TypewriterText);
