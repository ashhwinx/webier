import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const navLinks = [
  { name: 'About', id: '#about' },
  { name: 'Services', id: '#services' },
  { name: 'Projects', id: '#projects' },
  { name: 'Achievements', id: '#achievements' },
  { name: 'Qualities', id: '#qualities' },
  { name: 'Contact', id: '#contact' },
];

const Header: React.FC = () => {
    const headerRef = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Initial header fade-in animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.5 });
        }, headerRef);
        return () => ctx.revert();
    }, []);

    const scrollToSection = (id: string, index: number) => {
        setActiveIndex(index);
        setHoveredIndex(null); // Clear hover state on click to lock the pill
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: id, offsetY: 70 },
            ease: 'power3.inOut'
        });
    };

    // Effect for handling pill movement based on hover and active index
    useEffect(() => {
        const pill = pillRef.current;
        const items = itemRefs.current.filter(el => el !== null) as HTMLLIElement[];
        if (!pill || items.length === 0) return;

        const targetIndex = hoveredIndex ?? activeIndex;
        const targetItem = targetIndex !== null ? items[targetIndex] : null;

        if (!targetItem) {
            gsap.to(pill, { scaleX: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
            return;
        }

        const { offsetLeft, offsetWidth } = targetItem;
        gsap.to(pill, {
            x: offsetLeft,
            width: offsetWidth,
            scaleX: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power3.inOut'
        });

    }, [activeIndex, hoveredIndex]);

    // Effect for setting active index based on scroll position
    useEffect(() => {
        const triggers: ScrollTrigger[] = [];
        
        navLinks.forEach((link, index) => {
            const section = document.querySelector(link.id);
            if (!section) return;
            
            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onToggle: self => {
                    if (self.isActive) {
                        setActiveIndex(index);
                    }
                },
            });
            triggers.push(trigger);
        });

        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            const heroTrigger = ScrollTrigger.create({
                trigger: heroSection,
                start: 'top top',
                end: 'bottom center',
                onToggle: self => {
                    if (self.isActive) {
                        setActiveIndex(null);
                    }
                }
            });
            triggers.push(heroTrigger);
        }

        return () => {
            triggers.forEach(trigger => trigger.kill());
        };

    }, []);

    return (
        <header ref={headerRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <nav 
                ref={navRef} 
                className="relative bg-black/40 backdrop-blur-md border border-[#2e2e2e] rounded-full px-2 py-2 flex items-center"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <div 
                    ref={pillRef} 
                    className="absolute top-[4px] left-0 h-[calc(100%-8px)] bg-white rounded-full z-0 opacity-0"
                    style={{ transformOrigin: 'center center' }}
                ></div>
                <ul className="relative z-10 flex items-center">
                    {navLinks.map((link, index) => (
                        <li 
                            key={link.id} 
                            ref={el => { itemRefs.current[index] = el; }} 
                            className="px-4 py-1.5 cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                        >
                            <button
                                onClick={() => scrollToSection(link.id, index)}
                                className={`relative text-sm font-light whitespace-nowrap transition-colors duration-200 ${
                                    (activeIndex === index || hoveredIndex === index) ? 'text-black' : 'text-white'
                                }`}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;