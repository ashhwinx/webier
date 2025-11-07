import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------------
// CONSTELLATION COMPONENT (Copied from your Hero file for background)
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

      // Animate Info Cards
      gsap.fromTo(
        ".info-card",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: <MessageSquare className="text-green-400" size={32} />, // Increased size
      title: "WhatsApp",
      info: "Chat with us directly",
      href: "https://wa.me/+918209965066?text=Hi! I'm interested in your web development services.",
    },
    {
      icon: <Mail className="text-purple-400" size={32} />, // Increased size
      title: "Email Us",
      info: "webierwebdev@gmail.com",
      href: "mailto:webierwebdev@gmail.com",
    },
    {
      icon: <Phone className="text-blue-400" size={32} />, // Increased size
      title: "Call Us",
      info: "+91 94607 01877 / +91 94140 41181",
      href: "tel:+919460701877", // Links to the first number
    },
    {
      icon: <MapPin className="text-red-400" size={32} />, // Increased size
      title: "Visit Us",
      info: "Udaipur, Rajasthan, India",
      href: "#", // Add a Google Maps link here if you want
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
        <div className="absolute top-[10%] left-[5%] w-[30vw] h-[30vh] opacity-50">
          <Constellation />
        </div>
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vh] opacity-50 scale-x-[-1]">
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
            Have a project in mind or just want to say hello? Get in touch
            directly via any of the methods below.
          </p>
        </div>

        <div
          ref={infoRef}
          // --- UPDATED GRID ---
          // Increased max-width and gap
          className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {contactInfo.map((item) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              // --- UPDATED CARD STYLES ---
              // Increased padding, gap, rounding, and hover effects
              className="info-card flex flex-col items-start gap-5 p-10 rounded-2xl bg-white/5 border border-white/10 h-full
                         transition-all duration-300 ease-out
                         hover:border-purple-400 hover:shadow-[0_0_30px_rgba(192,132,252,0.5)] hover:-translate-y-2"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-2xl font-semibold text-white">
                  {" "}
                  {/* Increased text size */}
                  {item.title}
                </h4>
                <p className="text-lg text-white/70">{item.info}</p>{" "}
                {/* Increased text size */}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
