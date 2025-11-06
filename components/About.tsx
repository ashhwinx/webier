import React, { useEffect, useRef } from 'react';
import Interactive3DElement from './Interactive3DElement';
import { gsap } from 'gsap';

const founders = [
    {
        name: 'Harshit',
        role: 'Co-Founder & Creative Developer',
        quote: 'We don’t just write code; we compose digital experiences. Every line has a purpose, every interaction tells a part of the story.'
    },
    {
        name: 'Ashwin',
        role: 'Co-Founder & Lead Strategist',
        quote: 'Our goal is to find the perfect synergy between a brilliant idea and flawless execution. That’s where the magic happens.'
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
            gsap.fromTo(sectionRef.current?.querySelectorAll('.founder-card'),
                { y: 50, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none reverse',
                    }
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