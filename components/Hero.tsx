import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const letters = "WEBIER".split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Glowing arcs animation
      tl.fromTo(
        ".glow-arc",
        { scale: 0.5, opacity: 0, rotate: -45 },
        { scale: 1, opacity: 1, rotate: 0, duration: 2, ease: "power3.out", stagger: 0.2 }
      );

      // Letters animation
      tl.fromTo(
        ".hero-letter",
        { opacity: 0, y: 0, scale: 0.5 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)", stagger: 0.1 },
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
        { strokeDashoffset: gsap.getProperty(".constellation-line", "strokeDasharray") },
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.1 },
        "-=2"
      );

      tl.fromTo(
        ".constellation-dot",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(2)", stagger: 0.05 },
        "-=1.5"
      );

      // Continuous rotation
      gsap.to(".glow-arc-1", { rotate: "+=360", duration: 80, repeat: -1, ease: "none" });
      gsap.to(".glow-arc-2", { rotate: "-=360", duration: 60, repeat: -1, ease: "none" });
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

        gsap.to(".parallax-layer-1", { x: -xPercent * 10, y: -yPercent * 10, duration: 1, ease: "power2.out" });
        // gsap.to(".parallax-layer-2", { x: -xPercent * 20, y: -yPercent * 20, duration: 1, ease: "power2.out" });
        gsap.to(".parallax-layer-3", { x: xPercent * 15, y: yPercent * 15, duration: 1, ease: "power2.out" });
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
      <circle cx="10" cy="80" r="2" fill="white" className="constellation-dot" filter="url(#glow)" />
      <circle cx="80" cy="20" r="2" fill="white" className="constellation-dot" filter="url(#glow)" />
      <circle cx="150" cy="100" r="3" fill="white" className="constellation-dot" filter="url(#glow)" />
      <circle cx="80" cy="180" r="2" fill="white" className="constellation-dot" filter="url(#glow)" />
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
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vh] opacity-50 scale-x-[-1]">
          <Constellation />
        </div>
      </div>

      {/* Glowing arcs + WEBIER inside center */}
      <div className="parallax-layer-3 relative flex items-center justify-center pointer-events-none z-10 translate-y-[-3%] sm:translate-y-[-2%] md:translate-y-[-1%]">
        <div className="relative w-[60vmin] sm:w-[65vmin] md:w-[70vmin] h-[60vmin] sm:h-[65vmin] md:h-[70vmin] flex items-center justify-center">
          {/* Arcs */}
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

          {/* WEBIER text centered */}
          <div className="absolute flex items-center justify-center">
            {letters.map((letter, index) => {
              const angle = -65 + index * 26;
              return (
                <span
                  key={index}
                  className="hero-letter absolute font-space-grotesk font-bold text-4xl sm:text-6xl md:text-8xl text-white"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-23vmin) rotate(${-angle}deg)`,
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
        <button className="mt-2 sm:mt-8 bg-white text-black font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full hover-target transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          Start a Project
        </button>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/60">
          Let's create something unforgettable.
        </p>
      </div>
    </section>
  );
};

export default Hero;
