import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Qualities from './components/Qualities';
import TechStack from './components/TechStack';
import Contact from './components/Contact';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AuroraBackground from './components/AuroraBackground';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Global reveal animations
    const ctx = gsap.context(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        gsap.fromTo(el,
          { y: 70, autoAlpha: 0, skewY: 3 }, // Refined skewY for a subtler effect
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.25,
            ease: 'power4.out',
            skewY: 0,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }, mainRef);
    
    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-black">
      <AuroraBackground />
      <div className="grain-overlay"></div>

      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Achievements />
        <Qualities />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
};

export default App;