import React, { useEffect, useRef } from 'react';
import Interactive3DElement from './Interactive3DElement';
import { gsap } from 'gsap';

const founders = [
    {
        name: 'Harshit',
        role: 'Co-Founder & Creative Developer',
        quote: 'I don’t just build websites  I build moments that glitch your brain (in a good way). Pixels? I make them dance. Code? That’s just my paintbrush'
    },
    {
        name: 'Ashwin',
        role: 'Co-Founder & Lead Strategist',
        quote: 'I’m the blueprint guy. I turn chaos into clean flow. Ideas come messy  I make them move like they were always meant to.'
    }
];

const FounderCard: React.FC<{ name: string; role: string; quote: string; }> = ({ name, role, quote }) => (
    <div className="founder-card group relative bg-[#1a1a1a]/50 border border-[#2e2e2e] rounded-xl p-6 transition-all duration-300 hover:border-white/40 backdrop-blur-sm">
        <div className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{background: 'radial-gradient(300px at center, rgba(255, 255, 255, 0.08), transparent)'}}></div>
        <div className="relative">
            <h3 className="font-space-grotesk text-2xl font-bold">{name}</h3>
            <p className="text-purple-400 text-sm mt-1">{role}</p>
            <p className="mt-4 text-white/70 italic">"{quote}"</p>
        </div>
    </div>
);

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.founder-card',
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 95%', // triggers almost immediately when section enters
              toggleActions: 'play none none none',
              once: true, // plays only once
            },
          }
        );
      }, sectionRef);
    
      return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} id="about" className="min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="flex flex-col gap-8">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold reveal-on-scroll">
              Meet the Founders
          </h2>
          {founders.map((founder, index) => (
              <FounderCard key={index} {...founder} />
          ))}
        </div>
        
        <div className="h-full flex justify-center items-center perspective-[1000px]">
          <Interactive3DElement />
        </div>
      </div>
    </section>
  );
};

export default About;