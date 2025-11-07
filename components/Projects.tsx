import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Furnicraft — Where Comfort Meets Craft.',
    description:
      'Modern furniture design with warm tones and minimal elegance for everyday comfort.',
    tags: ['React', 'Node.js', 'UI/UX', 'Design'],
    image: '/furnicraft.png',
    link: 'https://furnicraft-alpha.vercel.app/', 
  },
  {
    title: 'Birthday Wiser — Wish Smarter. Celebrate Louder.',
    description:
      'A fun site to send birthday wishes with photos, letters, and memories — all in one place.',
    tags: ['React', 'GSAP', 'Animations', 'UI/UX'],
    image: '/birthday.png',
    link: 'https://vaishnavi-birthday-wheat.vercel.app/',
  },
  {
    title: 'Aurelle — Define Your Style.',
    description:
      'Premium fashion store with a sleek Gen-Z aesthetic and editorial-style visuals.',
    tags: ['React', 'Figma', 'UI/UX', 'E-Commerce'],
    image: '/aurelle.png',
    link: 'https://aurelle.vercel.app/',
  },
  {
    title: 'Aurum — Crafted in Stone.',
    description:
      'Luxury marble website with clean whites, gold hints, and subtle 3D elegance.',
    tags: ['Next.js', 'Three.js', '3D Design', 'Luxury'],
    image: '/aurum.png',
    link: 'https://aurum-zeta.vercel.app/',
  },
  {
    title: 'Fitverse — Fuel Your Grind.',
    description:
      '3D-animated gym store built in black & orange for the ultimate fitness vibe.',
    tags: ['Three.js', 'React', '3D Design', 'Motion'],
    image: '/fitverse.png',
    link: 'https://fitverse-theta.vercel.app/',
  },
  {
    title: 'Habi Space — Where Luxury Finds Its Space.',
    description:
      'Real-estate website with creamy tones and 3D mini buildings for a premium look.',
    tags: ['React', '3D', 'UI/UX', 'Real Estate'],
    image: '/habi.png',
    link: 'https://habi-space.vercel.app/',
  },
];

const ProjectCard = ({ title, description, tags, image, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="project-card relative bg-[#1a1a1a]/50 border border-[#2e2e2e] rounded-xl overflow-hidden transition-all duration-500 hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        <div className="h-56 bg-[#0a0a0a] flex items-center justify-center p-4">
          <div className="w-full h-full p-2 rounded border-2 border-dashed border-[#2e2e2e] rounded-lg flex items-center justify-center">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
        <div className="p-6 bg-[#1a1a1a]/50">
          <h3 className="font-space-grotesk text-xl font-bold">{title}</h3>
          <p className="mt-2 text-white/70 text-sm leading-relaxed h-16">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#2e2e2e] text-white/80 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center mb-16">
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
