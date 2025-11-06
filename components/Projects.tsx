import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'E-commerce Platform',
        description: 'A full-stack Shopify alternative built with React, Node.js, and Stripe for seamless online shopping experiences.',
        tags: ['React', 'Node.js', 'Stripe', 'UI/UX'],
    },
    {
        title: 'Interactive Portfolio',
        description: 'A personal portfolio website featuring complex animations and transitions using GSAP and Three.js for a captivating user experience.',
        tags: ['GSAP', 'Three.js', 'React', 'Motion Design'],
    },
    {
        title: 'Brand Identity Redesign',
        description: 'Complete rebranding for a tech startup, including logo design, style guide, and marketing materials to establish a strong market presence.',
        tags: ['Branding', 'Figma', 'Strategy'],
    },
     {
        title: 'Data Visualization Dashboard',
        description: 'An analytics dashboard for a SaaS company, providing real-time data insights through interactive charts and graphs built with D3.js.',
        tags: ['React', 'D3.js', 'Data Viz', 'UI/UX'],
    },
    {
        title: 'Mobile Banking App',
        description: 'A secure and user-friendly mobile application for a new digital bank, designed with a focus on accessibility and intuitive navigation.',
        tags: ['React Native', 'UI/UX Design', 'Fintech'],
    },
    {
        title: 'AI-Powered Content Generator',
        description: 'A web tool that leverages generative AI to create marketing copy, blog posts, and social media updates, with a clean and simple interface.',
        tags: ['AI/ML', 'Next.js', 'API Integration'],
    }
];

const ProjectCard: React.FC<{ title: string; description: string; tags: string[] }> = ({ title, description, tags }) => {
    return (
        <div className="project-card group relative bg-[#1a1a1a]/50 border border-[#2e2e2e] rounded-xl overflow-hidden transition-all duration-500 hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            <div className="h-56 bg-[#0a0a0a] flex items-center justify-center p-4">
                <div className="w-full h-full border-2 border-dashed border-[#2e2e2e] rounded-lg flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#2e2e2e] group-hover:text-purple-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>
            </div>
            <div className="p-6 bg-[#1a1a1a]/50">
                <h3 className="font-space-grotesk text-xl font-bold">{title}</h3>
                <p className="mt-2 text-white/70 text-sm leading-relaxed h-16">{description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs bg-[#2e2e2e] text-white/80 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};


const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current?.querySelectorAll('.project-card'),
                { y: 60, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    stagger: 0.1,
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
        <section ref={sectionRef} id="projects" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center mb-16 reveal-on-scroll">
                    Selected Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
