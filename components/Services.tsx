import React, { useEffect, useRef } from 'react';
import { FaCode, FaPalette, FaBullhorn, FaMagic } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: <FaCode size={32} className="text-purple-400" />,
        title: 'Web Development',
        description: 'We build fast, responsive, and scalable web applications using modern technologies. From e-commerce platforms to complex dashboards, we bring your ideas to life.'
    },
    {
        icon: <FaPalette size={32} className="text-purple-400" />,
        title: 'UI/UX Design',
        description: 'Our design process is centered around the user. We create intuitive, accessible, and beautiful interfaces that provide a seamless user experience.'
    },
    {
        icon: <FaBullhorn size={32} className="text-purple-400" />,
        title: 'Brand Identity & Strategy',
        description: 'We help you build a strong and memorable brand. Our services include logo design, style guides, and a cohesive strategy to make you stand out.'
    },
    {
        icon: <FaMagic size={32} className="text-purple-400" />,
        title: 'Motion & Interaction Design',
        description: 'We elevate user experiences with meaningful animations and interactions. Using tools like GSAP and Three.js, we create engaging digital stories.'
    }
];

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => {
    return (
        <div className="service-card group relative bg-[#1a1a1a]/50 border border-[#2e2e2e] rounded-xl p-8 transition-all duration-300 hover:border-white/40 hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="mb-4">{icon}</div>
                <h3 className="font-space-grotesk text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{description}</p>
            </div>
             <div className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{background: 'radial-gradient(400px at top left, rgba(192, 132, 252, 0.15), transparent 80%)'}}></div>
        </div>
    );
};

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current?.querySelectorAll('.service-card'),
                { y: 60, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center mb-16 reveal-on-scroll">
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
