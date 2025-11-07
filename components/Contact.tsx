import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { motion } from "framer-motion";
import { MessageSquare, Mail, Phone, MapPin } from "lucide-react";

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current?.querySelectorAll('.form-field'),
                { y: 50, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current?.querySelector('form'),
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    };

    return (
        <section ref={sectionRef} id="contact" className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold reveal-on-scroll">
                    Let's Build Together
                </h2>
                <p className="mt-4 text-white/70 max-w-2xl mx-auto reveal-on-scroll">
                    Have a project in mind or just want to say hello? We'd love to hear from you.
                    Fill out the form below or send us an email.
                </p>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16">
            <div className="min-h-screen  flex items-center justify-center px-6 py-20">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* WhatsApp Card */}
        <motion.div
          className="rounded-2xl bg-gradient-to-br from-green-900 to-green-800 p-8 text-white shadow-2xl flex flex-col justify-between"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <div>
            <div className="flex items-center mb-4">
              <MessageSquare className="text-green-400 mr-3" size={26} />
              <h2 className="text-xl font-bold">Chat with us on WhatsApp</h2>
            </div>

            <p className="text-green-100 mb-6 leading-relaxed">
              Get instant responses to your queries! Chat with us directly on
              WhatsApp for quick project discussions, quotes, and support.
            </p>

            <div className="space-y-4">
              <div className="bg-green-800/50 rounded-lg p-4 border border-green-600/30">
                <h4 className="text-green-200 font-semibold mb-1">
                  Quick Project Quote
                </h4>
                <p className="text-green-100 text-sm">
                  Send us your project requirements and get a free quote within
                  24 hours.
                </p>
              </div>

              <div className="bg-green-800/50 rounded-lg p-4 border border-green-600/30">
                <h4 className="text-green-200 font-semibold mb-1">
                  24/7 Support
                </h4>
                <p className="text-green-100 text-sm">
                  Need help with your existing website? We’re just a message
                  away.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="https://wa.me/+919460701877?text=Hi! I'm interested in your web development services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <MessageSquare
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              Start WhatsApp Chat
            </a>
            <p className="text-green-200 text-sm text-center mt-3">
              Click the button above to start a conversation with us on WhatsApp
            </p>
          </div>
        </motion.div>

        {/* Right Section (Info + Guarantee) */}
        <div className="flex flex-col gap-6">
          {[
            {
              icon: <Mail className="text-green-400" size={22} />,
              title: "Email Us",
              info: "webierwebdev@gmail.com",
            },
            {
              icon: <Phone className="text-blue-400" size={22} />,
              title: "Call Us",
              info: "+91 94607 01877 / +91 94140 41181",
            },
            {
              icon: <MapPin className="text-purple-400" size={22} />,
              title: "Visit Us",
              info: "Udaipur, Rajasthan, India",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-[#0f172a] p-6 text-white border border-white/5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 + 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.03, rotate: 0.5 }}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.info}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="rounded-2xl  bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 border border-green-600/20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-white mb-1">
              Quick Response Guarantee
            </h3>
            <p className="text-gray-300 text-sm">
              We typically respond to all inquiries within 24 hours. For urgent
              projects, feel free to call us directly.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
            </div>

            <div className="mt-20 text-center text-white/60">
                <p>Or reach us directly at:</p>
                <a href="mailto:hello@webier.com" className="font-space-grotesk text-lg text-purple-400 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 mt-2">
                    <FaEnvelope />
                    <span>webierwebdev@gmail.com</span>
                </a>
            </div>
        </section>
    );
};

export default Contact;
