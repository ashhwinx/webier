import React, { useEffect, useRef } from "react";
import Interactive3DElement from "./Interactive3DElement"; // <-- Import the new element
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------
// CONSTELLATION COMPONENT (Copied from other files for background)
// ------------------------------------------------------------------
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
    />
    <path
      d="M80 20 L 80 180"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="0.5"
      fill="none"
      className="constellation-line"
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

// ------------------------------------------------------------------
// FOUNDER INFO & CARD
// ------------------------------------------------------------------
const founders = [
  {
    name: "Harshit",
    role: "Co-Founder & Creative Developer",
    quote:
      "I don’t just build websites  I build moments that glitch your brain (in a good way). Pixels? I make them dance. Code? That’s just my paintbrush.",
    instagramHandle: "hr.shtt",
    instagramUrl: "https://www.instagram.com/hr.shtt/",
  },
  {
    name: "Ashwin",
    role: "Co-Founder & Lead Strategist",
    quote:
      "I’m the blueprint guy. I turn chaos into clean flow. Ideas come messy  I make them move like they were always meant to.",
    instagramHandle: "axshwiin",
    instagramUrl: "https://www.instagram.com/axshwiin/",
  },
];

const FounderCard: React.FC<{
  name: string;
  role: string;
  quote: string;
  instagramHandle: string;
  instagramUrl: string;
}> = ({ name, role, quote, instagramHandle, instagramUrl }) => (
  <div
    className="founder-card group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm
                    hover:border-purple-400/50 hover:shadow-[0_0_35px_rgba(192,132,252,0.4)] hover:-translate-y-1"
  >
    <div
      className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(400px at center, rgba(192, 132, 252, 0.15), transparent)",
      }}
    ></div>

    <div className="relative">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-space-grotesk text-3xl font-bold">{name}</h3>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white/50 transition-colors duration-300 hover:text-purple-400"
        >
          <Instagram size={18} />
          <span className="text-base font-light">{instagramHandle}</span>
        </a>
      </div>
      <p className="text-purple-400 text-lg">{role}</p>
      <p className="mt-4 text-white/80 text-base italic leading-relaxed">
        "{quote}"
      </p>
    </div>
  </div>
);

// ------------------------------------------------------------------
// MAIN ABOUT COMPONENT
// ------------------------------------------------------------------
const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-title",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".founder-card",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".founder-card",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate constellation lines
      gsap.fromTo(
        ".constellation-line",
        {
          strokeDashoffset: gsap.getProperty(
            ".constellation-line",
            "strokeDasharray"
          ),
        },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
          stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".constellation-dot",
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.5,
          ease: "back.out(2)",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden"
    >
      {/* Constellation Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vh] opacity-50">
          <Constellation />
        </div>
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vh] opacity-50 scale-x-[-1]">
          <Constellation />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        <div className="flex flex-col gap-8">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold about-title">
            Meet the Founders
          </h2>
          {founders.map((founder, index) => (
            <FounderCard key={index} {...founder} />
          ))}
        </div>

        <div className="h-full min-h-[500px] w-full flex justify-center items-center">
          <Interactive3DElement />
        </div>
      </div>
    </section>
  );
};

export default About;
