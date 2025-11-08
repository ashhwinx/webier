import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// --- NEW FAUX 3D CURVE COMPONENT ---
// This component will create the illusion of glowing 3D curves.
const Faux3DCurve: React.FC<{
  startAngle: number; // Angle where the curve starts (0-360)
  arcLength: number; // How long the arc is in degrees
  radiusOffset: number; // How far from the center the curve is positioned
  direction: "clockwise" | "counter-clockwise"; // Direction of animation
  className?: string; // Additional classes for styling
  numDots?: number; // Number of dots in the curve
  animationDuration?: number; // Duration of animation
}> = ({
  startAngle,
  arcLength,
  radiusOffset,
  direction,
  className = "",
  numDots = 8,
  animationDuration = 3,
}) => {
  const curveRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const curveElement = curveRef.current;
    if (!curveElement) return;

    // Calculate positions for dots along the arc
    gsap.set(dotRefs.current, {
      position: "absolute",
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
    });

    const ctx = gsap.context(() => {
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const angle = startAngle + (arcLength / (numDots - 1)) * i;
        const radian = (angle * Math.PI) / 180;

        // Calculate a slight z-offset to create a 3D feel
        const zOffset = Math.sin((i / (numDots - 1)) * Math.PI) * 10; // Arc from 0 to 10 back to 0

        gsap.set(dot, {
          x:
            Math.cos(radian) * (180 + radiusOffset) +
            (direction === "clockwise" ? i * 0.5 : -i * 0.5),
          y:
            Math.sin(radian) * (180 + radiusOffset) +
            (direction === "clockwise" ? i * 0.5 : -i * 0.5),
          z: zOffset, // Apply Z-offset for faux 3D
          opacity: 0.2 + Math.random() * 0.4, // Random initial opacity
          scale: 0.5 + Math.random() * 0.5, // Random initial scale
        });

        // Animate movement along the curve
        gsap.to(dot, {
          rotation: direction === "clockwise" ? "+=360" : "-=360",
          x:
            Math.cos(radian) * (180 + radiusOffset) +
            (direction === "clockwise" ? "+=10" : "-=10"), // Slight movement
          y:
            Math.sin(radian) * (180 + radiusOffset) +
            (direction === "clockwise" ? "+=10" : "-=10"), // Slight movement
          opacity: 0.4,
          duration: animationDuration,
          repeat: -1,
          ease: "power1.inOut",
          yoyo: true,
          delay:
            i *
            (animationDuration / numDots) *
            (direction === "clockwise" ? 1 : -1), // Staggered animation
        });

        // Animate pulsating glow
        gsap.to(dot, {
          boxShadow: `0 0 10px 2px rgba(255,255,255,0.7)`,
          backgroundColor: "white",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2, // Randomize pulse start
        });
      });
    }, curveRef); // Use curveRef for GSAP context

    return () => ctx.revert();
  }, [
    startAngle,
    arcLength,
    radiusOffset,
    direction,
    numDots,
    animationDuration,
  ]);

  return (
    <div ref={curveRef} className={`absolute inset-0 ${className}`}>
      {[...Array(numDots)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotRefs.current[i] = el)}
          className="w-1 h-1 bg-white rounded-full opacity-50 absolute"
          style={{
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
          }}
        />
      ))}
    </div>
  );
};
// --- END OF NEW COMPONENT ---

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const letters = "WEBIER".split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Glowing arcs animation (back to simple scaling for div rings)
      tl.fromTo(
        ".glow-arc",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out", stagger: 0.2 }
      );

      // Letters animation
      tl.fromTo(
        ".hero-letter",
        { opacity: 0, y: 0, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        "-=1.5"
      );

      // Tagline + button animation
      tl.fromTo(
        ".hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
        "-=0.8"
      );

      // Constellation animation
      tl.fromTo(
        ".constellation-line",
        {
          strokeDashoffset: gsap.getProperty(
            ".constellation-line",
            "strokeDasharray"
          ),
        },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          stagger: 0.1,
        },
        "-=2"
      );

      tl.fromTo(
        ".constellation-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(2)",
          stagger: 0.05,
        },
        "-=1.5"
      );

      // --- CONTINUOUS ROTATION FOR DIV RINGS (REVERTED) ---
      gsap.to(".glow-arc-1", {
        rotate: "+=360",
        duration: 80,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".glow-arc-2", {
        rotate: "-=360",
        duration: 60,
        repeat: -1,
        ease: "none",
      });
      // --- END REVERTED ANIMATION ---

      gsap.to(".constellation-dot", {
        scale: 1.3,
        opacity: 0.7,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: (index) => index * 0.15,
      });

      // 🌀 Parallax movement — only for desktop
      const parallaxHandler = (e: MouseEvent) => {
        if (window.innerWidth < 768) return; // disable on mobile
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(".parallax-layer-1", {
          x: -xPercent * 10,
          y: -yPercent * 10,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(".parallax-layer-3", {
          x: xPercent * 15,
          y: yPercent * 15,
          duration: 1,
          ease: "power2.out",
        });
        // --- ADDED PARALLAX FOR NEW CURVES ---
        gsap.to(".faux-curve-layer", {
          x: -xPercent * 5,
          y: -yPercent * 5,
          duration: 1,
          ease: "power2.out",
        });
        // --- END ADDED PARALLAX ---
      };

      window.addEventListener("mousemove", parallaxHandler);
      return () => window.removeEventListener("mousemove", parallaxHandler);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const Constellation = () => (
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M10 80 L 80 20 L 150 100 L 80 180 Z"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.5"
        fill="none"
        className="constellation-line"
        strokeDasharray="350"
      />
      <path
        d="M80 20 L 80 180"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.5"
        fill="none"
        className="constellation-line"
        strokeDasharray="160"
      />
      <circle
        cx="10"
        cy="80"
        r="2"
        fill="white"
        className="constellation-dot"
        filter="url(#glow)"
      />
      <circle
        cx="80"
        cy="20"
        r="2"
        fill="white"
        className="constellation-dot"
        filter="url(#glow)"
      />
      <circle
        cx="150"
        cy="100"
        r="3"
        fill="white"
        className="constellation-dot"
        filter="url(#glow)"
      />
      <circle
        cx="80"
        cy="180"
        r="2"
        fill="white"
        className="constellation-dot"
        filter="url(#glow)"
      />
    </svg>
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-[80px] sm:pt-[100px] md:pt-[120px]"
    >
      {/* Constellations - Background layer */}
      <div className="parallax-layer-0 absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
        <div className="absolute top-[50%] left-[5%] w-[30vw] h-[30vh] opacity-50">
          <Constellation />
        </div>
        <div className="absolute bottom-[10%] right-[5%] w-[3w] h-[30vh] opacity-50 scale-x-[-1]">
          <Constellation />
        </div>
      </div>

      {/* Glowing arcs + WEBIER inside center */}
      <div className="parallax-layer-3 relative flex items-center justify-center pointer-events-none z-10 translate-y-[-3%] sm:translate-y-[-2%] md:translate-y-[-1%]">
        <div className="relative w-[60vmin] sm:w-[65vmin] md:w-[70vmin] h-[60vmin] sm:h-[65vmin] md:h-[70vmin] flex items-center justify-center">
          {/* --- ORIGINAL DIV RINGS (REVERTED) --- */}
          <div
            className="glow-arc glow-arc-1 absolute inset-0 rounded-full border-[2px] border-white/80"
            style={{
              boxShadow:
                "0 0 80px 20px rgba(255, 255, 255, 0.2), inset 0 0 80px 20px rgba(255, 255, 255, 0.1)",
            }}
          ></div>
          <div
            className="glow-arc glow-arc-2 absolute inset-[18%] rounded-full border-[1px] border-white/50 opacity-70"
            style={{ boxShadow: "0 0 60px 10px rgba(255, 255, 255, 0.15)" }}
          ></div>
          {/* --- END ORIGINAL DIV RINGS --- */}

          {/* --- NEW FAUX 3D CURVES ADDED --- */}
          {/* Placing 4 curves to connect inner and outer rings */}
          <Faux3DCurve
            startAngle={-10}
            arcLength={80}
            radiusOffset={-50} // Adjust radiusOffset to place curves between the rings
            direction="clockwise"
            className="faux-curve-layer"
            numDots={10}
            animationDuration={4}
          />
          <Faux3DCurve
            startAngle={90}
            arcLength={80}
            radiusOffset={-50}
            direction="counter-clockwise"
            className="faux-curve-layer"
            numDots={10}
            animationDuration={4.5}
          />
          <Faux3DCurve
            startAngle={180}
            arcLength={80}
            radiusOffset={-50}
            direction="clockwise"
            className="faux-curve-layer"
            numDots={10}
            animationDuration={3.8}
          />
          <Faux3DCurve
            startAngle={270}
            arcLength={80}
            radiusOffset={-50}
            direction="counter-clockwise"
            className="faux-curve-layer"
            numDots={10}
            animationDuration={4.2}
          />
          {/* --- END NEW FAUX 3D CURVES --- */}

          {/* WEBIER text centered */}
          <div className="absolute flex items-center justify-center">
            {letters.map((letter, index) => {
              const angles = [-36, -20, -5, 8, 21, 36];
              const angle = angles[index];

              return (
                <span
                  key={index}
                  className="hero-letter absolute font-space-grotesk font-bold text-4xl sm:text-6xl md:text-8xl text-white"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-40vmin) rotate(${-angle}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tagline + Button below circle */}
      <div className="hero-content parallax-layer-1 relative z-20 flex flex-col items-center ">
        <p className="text-base sm:text-xl md:text-2xl text-white/90 tracking-wider">
          WEB EXPERIENCES, PERFECTED.
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=%2B918209965066&text=Hi%21+I%27m+interested+in+your+web+development+services.&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 sm:mt-8 bg-white text-black font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full hover-target transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        >
          Start a Project
        </a>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/60">
          Let's create something unforgettable.
        </p>
      </div>
    </section>
  );
};

export default Hero;
