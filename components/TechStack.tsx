import React, { useEffect, useRef } from 'react';
import { FaReact, FaNodeJs, FaShopify, FaFigma } from 'react-icons/fa';
import { SiGreensock } from "react-icons/si";
import { gsap } from 'gsap';

const tech = [
  { name: 'React', icon: <FaReact size={40} /> },
  { name: 'GSAP', icon: <SiGreensock size={40} /> },
  { name: 'Figma', icon: <FaFigma size={40} /> },
  { name: 'Shopify', icon: <FaShopify size={40} /> },
  { name: 'Node.js', icon: <FaNodeJs size={40} /> },
  { name: 'React', icon: <FaReact size={40} /> },
  { name: 'GSAP', icon: <SiGreensock size={40} /> },
  { name: 'Figma', icon: <FaFigma size={40} /> },
  { name: 'Shopify', icon: <FaShopify size={40} /> },
  { name: 'Node.js', icon: <FaNodeJs size={40} /> },
];


const TechStack: React.FC = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeTween = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const marquee = marqueeRef.current;
            if (!marquee) return;
            const items = marquee.children;
            const itemWidth = items[0].getBoundingClientRect().width;
            const totalWidth = itemWidth * items.length;

            gsap.set(marquee, { x: 0 });

            marqueeTween.current = gsap.to(marquee, {
                x: `-=${totalWidth / 2}`,
                duration: 40,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2))
                }
            });

            marquee.addEventListener('mouseenter', () => marqueeTween.current?.pause());
            marquee.addEventListener('mouseleave', () => marqueeTween.current?.play());
            
        }, marqueeRef);

        return () => ctx.revert();
    }, []);

  return (
    <section id="stack" className="py-20 overflow-hidden relative">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center mb-12 reveal-on-scroll">Our Toolkit</h2>
        <div className="w-full whitespace-nowrap">
            <div ref={marqueeRef} className="flex">
                {tech.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 mx-8 flex-shrink-0">
                        {item.icon}
                        <span className="text-2xl font-light">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent"></div>
    </section>
  );
};

export default TechStack;
