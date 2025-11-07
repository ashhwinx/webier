import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaAward, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: <FaRocket size={32} className="text-purple-400" />,
    value: "30+",
    label: "Projects Launched",
  },
  {
    icon: <FaUsers size={32} className="text-purple-400" />,
    value: "98%",
    label: "Client Satisfaction",
  },
  {
    icon: <FaAward size={32} className="text-purple-400" />,
    value: "3+",
    label: "Years Experience",
  },
  {
    icon: <FaLightbulb size={32} className="text-purple-400" />,
    value: "99%",
    label: "Uptime Guarantee",
  },
];

const AchievementCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({
  icon,
  value,
  label,
}) => {
  const valueRef = useRef<HTMLHeadingElement>(null);
  const isNumeric = !isNaN(parseFloat(value));

  useEffect(() => {
    const el = valueRef.current;
    if (!el || !isNumeric) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: numericValue,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          let text = Math.ceil(counter.val).toLocaleString();
          if (value.includes("+")) text += "+";
          if (value.includes("%")) text += "%";
          el.textContent = text;
        },
      });
    }, valueRef);

    return () => ctx.revert();
  }, [value, isNumeric]);

  return (
    <div className="achievement-card text-center p-8 bg-[#1a1a1a]/40 border border-transparent rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-[#1a1a1a]/70 hover:-translate-y-2">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3
        ref={valueRef}
        className="font-space-grotesk text-5xl md:text-6xl font-bold text-white"
      >
        {isNumeric ? `0${value.includes("%") ? "%" : ""}` : value}
      </h3>
      <p className="mt-2 text-white/70 text-sm md:text-base">{label}</p>
    </div>
  );
};

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".achievement-card"),
        { y: 60, autoAlpha: 0, scale: 0.9 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="achievements" className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Milestones & Recognition
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} {...achievement} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
