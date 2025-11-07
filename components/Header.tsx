import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const navLinks = [
  { name: "About", id: "#about" },
  { name: "Services", id: "#services" },
  { name: "Projects", id: "#projects" },
  { name: "Achievements", id: "#achievements" },
  { name: "Qualities", id: "#qualities" },
  // 👇 Contact removed
];

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.9 }
    );
  }, []);

  const scrollToSection = (id: string, index: number) => {
    setActiveIndex(index);
    setVisibleIndex(index);
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: id, offsetY: 70 },
      ease: "power3.inOut",
    });
  };

  const movePill = (index: number | null) => {
    const pill = pillRef.current;
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!pill || items.length === 0) return;

    if (index === null) {
      gsap.to(pill, { opacity: 0, scaleX: 0.8, duration: 0.3 });
      return;
    }

    const target = items[index];
    const navRect = navRef.current?.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    if (!navRect) return;

    const PAD = 6;
    const left = targetRect.left - navRect.left - PAD;
    const width = targetRect.width + PAD * 2;

    gsap.to(pill, {
      x: left,
      width,
      opacity: 1,
      duration: 0.35,
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    movePill(visibleIndex);
  }, [visibleIndex]);

  useEffect(() => {
    const handleResize = () => movePill(visibleIndex ?? activeIndex);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [visibleIndex, activeIndex]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    navLinks.forEach((link, idx) => {
      const section = document.querySelector(link.id);
      if (!section) return;
      const trig = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(idx);
            setVisibleIndex(idx);
          }
        },
      });
      triggers.push(trig);
    });

    const hero = document.querySelector("#hero");
    if (hero) {
      const heroTrig = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(null);
            setVisibleIndex(null);
          }
        },
      });
      triggers.push(heroTrig);
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto"
    >
      <nav
        ref={navRef}
        className="relative bg-black/40 backdrop-blur-md border border-[#2e2e2e] rounded-full px-2  py-2 flex items-center justify-center  no-scrollbar max-w-screen"
        onMouseLeave={() => setVisibleIndex(activeIndex)}
      >
      
        <div
          ref={pillRef}
          className="absolute top-[5px] left-0 h-[calc(100%-10px)] ml-2 bg-white rounded-full z-0 opacity-0 pointer-events-none"
          style={{ transformOrigin: "left center", width: 0 }}
        ></div>

        {/* Nav items */}
        <ul className="relative z-10 flex items-center flex-nowrap space-x-1 sm:space-x-2">
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className="px-2 sm:px-3 py-1.5 cursor-pointer"
              onMouseEnter={() => setVisibleIndex(index)}
            >
              <button
                onClick={() => scrollToSection(link.id, index)}
                className={`relative font-medium whitespace-nowrap transition-colors duration-200 ${
                  visibleIndex === index ? "text-black" : "text-white"
                } text-xs sm:text-sm md:text-base`}
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
