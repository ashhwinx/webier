import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Interactive3DElement: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const structureRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const NUM_PARTICLES = 70;

    useEffect(() => {
        const container = containerRef.current;
        const structure = structureRef.current;
        const particlesContainer = particlesRef.current;
        if (!container || !structure || !particlesContainer) return;

        const ctx = gsap.context(() => {
            const ring1 = structure.querySelector('.ring-1');
            const ring2 = structure.querySelector('.ring-2');
            const core = structure.querySelector('.core');
            const particles = particlesContainer.children;
            const radius = 250;

            // Setup initial positions for particles
            gsap.set(particles, {
                x: () => gsap.utils.random(-radius, radius),
                y: () => gsap.utils.random(-radius, radius),
                z: () => gsap.utils.random(-radius, radius),
                scale: () => gsap.utils.random(0.2, 1),
            });

            // Entrance animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            });

            tl.fromTo(core, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'power3.out' });
            tl.fromTo([ring1, ring2], { scale: 0, autoAlpha: 0, rotate: -90 }, { scale: 1, autoAlpha: 1, rotate: 0, duration: 2, ease: 'power3.out', stagger: 0.2 }, "-=1.2");
            tl.fromTo(particles, { autoAlpha: 0 }, { autoAlpha: () => gsap.utils.random(0.3, 0.8), duration: 2, ease: 'power2.inOut', stagger: 0.03 }, "-=1.5");
            
            // Continuous animations
            gsap.to(ring1, { rotationY: -360, duration: 30, repeat: -1, ease: 'none' });
            gsap.to(ring2, { rotationX: 360, duration: 25, repeat: -1, ease: 'none' });
            gsap.to(core, { scale: 1.05, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            
            // Mouse move interaction
            const handleMouseMove = (e: MouseEvent) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotY = gsap.utils.mapRange(0, rect.width, -25, 25, x);
                const rotX = gsap.utils.mapRange(0, rect.height, 25, -25, y);

                gsap.to(structure, {
                    rotationX: rotX,
                    rotationY: rotY,
                    duration: 1.5,
                    ease: 'power1.out',
                });
            };
            
            const handleMouseLeave = () => {
                gsap.to(structure, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 2,
                    ease: 'elastic.out(1, 0.5)',
                });
            };

            const parentSection = container.closest('section');
            parentSection?.addEventListener('mousemove', handleMouseMove);
            parentSection?.addEventListener('mouseleave', handleMouseLeave);
            
            return () => {
                parentSection?.removeEventListener('mousemove', handleMouseMove);
                parentSection?.addEventListener('mouseleave', handleMouseLeave);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);
    
    const ringStyle: React.CSSProperties = {
        position: 'absolute',
        width: '400px',
        height: '400px',
        border: '1.5px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        transformStyle: 'preserve-3d',
    };

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center min-h-[500px] relative">
            <div ref={structureRef} className="relative" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
                <div ref={particlesRef} className="absolute inset-0" style={{transformStyle: 'preserve-3d'}}>
                    {[...Array(NUM_PARTICLES)].map((_, i) => (
                        <div key={i} className="particle absolute w-1 h-1 bg-white rounded-full" />
                    ))}
                </div>
                <div className="core absolute w-12 h-12 bg-white rounded-full blur-lg" style={{boxShadow: '0 0 40px 10px white'}} />
                <div className="ring-1" style={{...ringStyle, transform: 'rotateY(90deg)'}}></div>
                <div className="ring-2" style={{...ringStyle, transform: 'rotateX(90deg)'}}></div>
            </div>
        </div>
    );
};

export default Interactive3DElement;
