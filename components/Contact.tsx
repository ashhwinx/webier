import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // <-- 1. Imported WhatsApp Icon
import { IconContext } from "react-icons"; // <-- ADD THIS
// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------
// CONSTELLATION COMPONENT
// ------------------------------------------------------------------
const Constellation = () => (
  <svg width="100%" height="100%" className="absolute inset-0">
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M10 80 L 80 20 L 150 100 L 80 180 Z"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="0.5"
      fill="none"
      className="constellation-line"
      strokeDasharray="350"
    />
    <path
      d="M80 20 L 80 180"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="0.5"
      fill="none"
      className="constellation-line"
      strokeDasharray="160"
    />
    <circle
      cx="10"
      cy="80"
      r="2"
      fill="white"
      className="constellation-dot"
      filter="url(#glow)"
    />
    <circle
      cx="80"
      cy="20"
      r="2"
      fill="white"
      className="constellation-dot"
      filter="url(#glow)"
    />
    <circle
      cx="150"
      cy="100"
      r="3"
      fill="white"
      className="constellation-dot"
      filter="url(#glow)"
    />
    <circle
      cx="80"
      cy="180"
      r="2"
      fill="white"
      className="constellation-dot"
      filter="url(#glow)"
    />
  </svg>
);
// ------------------------------------------------------------------

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Constellations
      gsap.fromTo(
        ".constellation-line",
        {
          strokeDashoffset: gsap.getProperty(
            ".constellation-line",
            "strokeDasharray"
          ),
        },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".constellation-dot",
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: "back.out(2)",
          stagger: 0.05,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Animate Title
      gsap.fromTo(
        ".contact-title-reveal",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate Info Cards (staggering list)
      gsap.fromTo(
        ".info-card",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15, // Stagger each card in the list
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const otherInfo = [
    {
      icon: <Mail className="text-purple-400" size={30} />,
      title: "Email Us",
      info: "webierwebdev@gmail.com",
      href: "mailto:webierwebdev@gmail.com",
    },
    {
      icon: <Phone className="text-blue-400" size={30} />,
      title: "Call Us",
      info: "+91 94607 01877 / +91 94140 41181",
      href: "tel:+919460701877",
    },
    {
      icon: <Instagram className="text-pink-400" size={30} />,
      title: "Instagram",
      info: "@webier.in",
      href: "https://www.instagram.com/webier.in/",
    },
    {
      icon: <MapPin className="text-red-400" size={30} />,
      title: "Visit Us",
      info: "Udaipur, Rajasthan, India",
      href: "#",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 px-4 relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      {/* Background Constellations */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vh] opacity-50">
          <Constellation />
        </div>
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vh] opacity-50 scale-x-[-1]">
          <Constellation />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold contact-title-reveal">
            Let's Build Together
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto contact-title-reveal">
            Have a project in mind? We'd love to hear from you. The fastest way
            to get in touch is via WhatsApp.
          </p>
        </div>

        {/* --- 2. New Asymmetrical Grid Layout --- */}
        <div
          ref={infoRef}
          className="max-w-6xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* --- Left Column: Large WhatsApp Card --- */}
          <motion.div
            className="info-card h-full flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white/5 border border-white/10
                       transition-all duration-300 ease-out
                       hover:border-green-400/80 hover:shadow-[0_0_35px_rgba(74,222,128,0.5)] hover:-translate-y-2"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <IconContext.Provider value={{ className: "text-green-400" }}>
                  <FaWhatsapp size={40} />
                </IconContext.Provider>
                <h3 className="text-3xl font-semibold text-white">
                  Chat on WhatsApp
                </h3>
              </div>
              <p className="text-lg text-white/70 leading-relaxed">
                Get instant responses to your queries! Chat with us directly for
                quick project discussions, quotes, and support.
              </p>
              <div className="mt-6 space-y-4">
                <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white">
                    Quick Project Quotes
                  </h4>
                  <p className="text-white/60 text-sm">
                    Send your requirements and get a free quote.
                  </p>
                </div>
                <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white">24/7 Support</h4>
                  <p className="text-white/60 text-sm">
                    We're just a message away.
                  </p>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/+918209965066?text=Hi! I'm interested in your web development services."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full 
                         transform transition-all duration-300 ease-out hover:scale-105 
                         flex items-center justify-center gap-3"
            >
              <FaWhatsapp size={22} />
              Start WhatsApp Chat
            </a>
          </motion.div>

          {/* --- Right Column: Stacked List of Other Cards --- */}
          <div className="flex flex-col gap-6">
            {otherInfo.map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="info-card flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 h-full
                           transition-all duration-300 ease-out
                           hover:border-purple-400 hover:shadow-[0_0_30px_rgba(192,132,252,0.5)] hover:-translate-y-1"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex-shrink-0 p-3 bg-white/5 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-base text-white/70">{item.info}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
