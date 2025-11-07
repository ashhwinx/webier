import React, { useEffect, useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaShopify,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPython,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiGreensock,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiTypescript,
  SiTailwindcss,
  SiVercel,
  SiFirebase,
  SiFramer,
  SiCanva,
  SiPostman,
} from "react-icons/si";
import { gsap } from "gsap";
import { TbBrandThreejs } from "react-icons/tb";

const tech = [
  { name: "React", icon: <FaReact size={60} /> },
  { name: "Next.js", icon: <SiNextdotjs size={60} /> },
  { name: "Node.js", icon: <FaNodeJs size={60} /> },
  { name: "Express.js", icon: <SiExpress size={60} /> },
  { name: "MongoDB", icon: <SiMongodb size={60} /> },
  { name: "Firebase", icon: <SiFirebase size={60} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={60} /> },
  { name: "JavaScript", icon: <FaJsSquare size={60} /> },
  { name: "TypeScript", icon: <SiTypescript size={60} /> },
  { name: "HTML5", icon: <FaHtml5 size={60} /> },
  { name: "CSS3", icon: <FaCss3Alt size={60} /> },
  { name: "GSAP", icon: <SiGreensock size={60} /> },
  { name: "Three.js", icon: <TbBrandThreejs size={60} /> },

  { name: "Shopify", icon: <FaShopify size={60} /> },
  { name: "Figma", icon: <FaFigma size={60} /> },
  { name: "Framer Motion", icon: <SiFramer size={60} /> },

  { name: "Canva", icon: <SiCanva size={60} /> },

  { name: "Python", icon: <FaPython size={60} /> },
  { name: "Git", icon: <FaGitAlt size={60} /> },
  { name: "GitHub", icon: <FaGithub size={60} /> },
  { name: "Postman", icon: <SiPostman size={60} /> },

  { name: "Vercel", icon: <SiVercel size={60} /> },
];

const TechStack: React.FC = () => {
  // Refs for both marquees
  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);
  const marqueeLeftTween = useRef<gsap.core.Tween | null>(null);
  const marqueeRightTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Marquee 1 (Scrolls Left) ---
      const marqueeLeft = marqueeLeftRef.current;
      if (marqueeLeft) {
        const singleSetWidth = marqueeLeft.scrollWidth / 2;

        marqueeLeftTween.current = gsap.fromTo(
          marqueeLeft,
          { x: 0 },
          {
            x: -singleSetWidth,
            duration: 120, // --- SPEED CHANGED (WAS 80) ---
            ease: "none",
            repeat: -1,
          }
        );
        marqueeLeft.addEventListener("mouseenter", () =>
          marqueeLeftTween.current?.pause()
        );
        marqueeLeft.addEventListener("mouseleave", () =>
          marqueeLeftTween.current?.play()
        );
      }

      // --- Marquee 2 (Scrolls Right) ---
      const marqueeRight = marqueeRightRef.current;
      if (marqueeRight) {
        const singleSetWidth = marqueeRight.scrollWidth / 2;
        gsap.set(marqueeRight, { x: -singleSetWidth });

        marqueeRightTween.current = gsap.fromTo(
          marqueeRight,
          { x: -singleSetWidth },
          {
            x: 0,
            duration: 120, // --- SPEED CHANGED (WAS 80) ---
            ease: "none",
            repeat: -1,
          }
        );
        marqueeRight.addEventListener("mouseenter", () =>
          marqueeRightTween.current?.pause()
        );
        marqueeRight.addEventListener("mouseleave", () =>
          marqueeRightTween.current?.play()
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" className="py-20 overflow-hidden relative">
      <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center mb-16 reveal-on-scroll">
        Our Toolkit
      </h2>

      {/* Marquee 1 (Left-scrolling) */}
      <div className="w-full whitespace-nowrap mb-8">
        <div ref={marqueeLeftRef} className="flex">
          {tech.map((item, index) => (
            <div
              key={`left-1-${index}`}
              className="flex items-center space-x-4 mx-12 flex-shrink-0"
            >
              {item.icon}
              <span className="text-4xl font-light">{item.name}</span>
            </div>
          ))}
          {tech.map((item, index) => (
            <div
              key={`left-2-${index}`}
              className="flex items-center space-x-4 mx-12 flex-shrink-0"
            >
              {item.icon}
              <span className="text-4xl font-light">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee 2 (Right-scrolling) */}
      <div className="w-full whitespace-nowrap">
        <div ref={marqueeRightRef} className="flex">
          {tech.map((item, index) => (
            <div
              key={`right-1-${index}`}
              className="flex items-center space-x-4 mx-12 flex-shrink-0"
            >
              {item.icon}
              <span className="text-4xl font-light">{item.name}</span>
            </div>
          ))}
          {tech.map((item, index) => (
            <div
              key={`right-2-${index}`}
              className="flex items-center space-x-4 mx-12 flex-shrink-0"
            >
              {item.icon}
              <span className="text-4xl font-light">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fades on edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default TechStack;
