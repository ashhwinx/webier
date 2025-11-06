import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPencilRuler, FaCode, FaUsers, FaRocket } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const qualities = [
    { icon: <FaPencilRuler size={30} />, title: 'Pixel-Perfect Design' },
    { icon: <FaCode size={30} />, title: 'Performant Code' },
    { icon: <FaUsers size={30} />, title: 'User-Centric Approach' },
    { icon: <FaRocket size={30} />, title: 'Strategic Execution' },
];

const skills = [
    { name: 'UI/UX Design', percentage: 95 },
    { name: 'Frontend Development', percentage: 98 },
    { name: 'Motion Graphics', percentage: 85 },
    { name: 'Backend Development', percentage: 80 },
    { name: 'Brand Strategy', percentage: 90 },
    { name: 'SEO & Performance', percentage: 88 },
];

const QualityPillar: React.FC<{ icon: React.ReactNode; title: string; }> = ({ icon, title }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = gsap.utils.mapRange(0, rect.height, -15, 15, y);
            const rotateY = gsap.utils.mapRange(0, rect.width, 15, -15, x);
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.7,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
             card.removeEventListener('mousemove', handleMouseMove);
             card.removeEventListener('mouseleave', handleMouseLeave);
        }
    }, []);

    return (
        <div ref={cardRef} className="quality-pillar flex flex-col items-center gap-4 p-6 bg-[#1a1a1a]/40 border border-[#2e2e2e] rounded-full w-48 h-48 justify-center text-center transition-all duration-300 hover:bg-[#1a1a1a]/80 hover:border-white/30" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
            <div className="text-purple-400" style={{ transform: 'translateZ(20px)' }}>{icon}</div>
            <h3 className="font-space-grotesk text-md font-bold" style={{ transform: 'translateZ(20px)' }}>{title}</h3>
        </div>
    );
};


const SkillBar: React.FC<{ name: string; percentage: number; }> = ({ name, percentage }) => {
    const barRef = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        const num = numRef.current;
        if (!bar || !num) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });

            tl.fromTo(bar, { width: '0%' }, { width: `${percentage}%`, duration: 2, ease: 'power3.out' });
            
            const counter = { val: 0 };
            tl.to(counter, {
                val: percentage,
                duration: 2,
                ease: 'power3.out',
                onUpdate: () => {
                    num.textContent = `${Math.ceil(counter.val)}%`;
                }
            }, 0);
        }, barRef);
        return () => ctx.revert();
    }, [percentage]);

    return (
        <div className="skill-bar-wrapper w-full">
            <div className="flex justify-between items-center mb-1">
                <span className="text-white/80 text-sm">{name}</span>
                <span ref={numRef} className="font-space-grotesk text-sm font-semibold">0%</span>
            </div>
            <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#2e2e2e]">
                <div ref={barRef} className="h-full bg-white rounded-full" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}></div>
            </div>
        </div>
    );
};

const Qualities: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
             gsap.fromTo(sectionRef.current?.querySelectorAll('.quality-pillar'),
                { y: 50, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current?.querySelector('.pillars-container'),
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="qualities" className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold reveal-on-scroll">
                        Approach & Skills
                    </h2>
                    <p className="mt-4 text-white/70 max-w-2xl mx-auto reveal-on-scroll">
                        We combine aesthetic design with robust engineering to build digital products that are not only beautiful but also performant and user-friendly. Our process is transparent, collaborative, and tailored to your success.
                    </p>
                </div>

                <div className="pillars-container mt-20 flex flex-wrap justify-center gap-8">
                    {qualities.map((q, i) => <QualityPillar key={i} {...q} />)}
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    {skills.map((s, i) => <SkillBar key={i} {...s} />)}
                </div>
            </div>
        </section>
    );
};

export default Qualities;