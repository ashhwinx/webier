import React, { useEffect, useRef } from 'react';
import { FaCode, FaPalette, FaBullhorn, FaMagic ,FaMobileAlt ,FaShoppingBag } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
      icon: <FaCode size={32} className="text-purple-400" />,
      title: 'Web Development',
      description:
        'We craft lightning-fast, responsive, and scalable web experiences that don’t just function  they flow. From slick portfolios to full-scale platforms, we turn ideas into digital reality.',
    },
    {
        icon: <FaMobileAlt size={32} className="text-purple-400" />,
        title: 'App Development',
        description:
          'From sleek prototypes to full-blown mobile apps, we build experiences that feel native, perform fast, and look fire on every screen.',
      },
    {
      icon: <FaPalette size={32} className="text-purple-400" />,
      title: 'UI/UX Design',
      description:
        'Design isn’t just how it looks  it’s how it feels. We blend aesthetics with logic to create clean, intuitive, and scroll-stopping user experiences.',
    },
    {
        icon: <FaShoppingBag size={32} className="text-purple-400" />,
        title: 'Shopify Development',
        description:
          'Your brand, your vibe powered by Shopify. We create stunning, conversion-optimized stores that make selling online feel effortless and aesthetic.',
      },
    {
      icon: <FaBullhorn size={32} className="text-purple-400" />,
      title: 'Brand Identity & Strategy',
      description:
        'Your brand deserves a vibe, not just a logo. We help you define your tone, visuals, and presence  so your audience doesn’t just notice you, they remember you.',
    },
    {
      icon: <FaMagic size={32} className="text-purple-400" />,
      title: 'Motion & Interaction Design',
      description:
        'Static is boring. We bring pixels to life with smooth motion, smart transitions, and immersive 3D moments powered by GSAP and Three.js.',
    },
   
  
  ];
  

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="service-card group relative bg-[#1a1a1a]/50 border border-[#2e2e2e] rounded-xl p-8 transition-all duration-300 hover:border-white/40 hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="mb-4">{icon}</div>
        <h3 className="font-space-grotesk text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-white/70 leading-relaxed">{description}</p>
      </div>
      <div
        className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px at top left, rgba(192, 132, 252, 0.15), transparent 80%)',
        }}
      ></div>
    </div>
  );
};

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%', // triggers quickly as soon as visible
            toggleActions: 'play none none none',
            once: true, // plays only once
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center mb-16">
          Our Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
