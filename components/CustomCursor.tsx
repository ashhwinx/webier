
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white/30 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out flex items-center justify-center"
      style={{
        transform: `scale(${isHovering ? 2.5 : 1})`,
      }}
    >
        <div className={`w-1.5 h-1.5 bg-white rounded-full transition-transform duration-300 ${isHovering ? 'scale-0' : 'scale-100'}`}></div>
    </div>
  );
};

export default CustomCursor;
