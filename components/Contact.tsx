import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

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
            
            <div className="max-w-2xl mx-auto mt-16">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div className="form-field">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            placeholder="Your Name"
                            required
                            className="w-full bg-black/30 border border-[#2e2e2e] rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            placeholder="Your Email"
                            required
                            className="w-full bg-black/30 border border-[#2e2e2e] rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea 
                            name="message" 
                            id="message" 
                            rows={5}
                            placeholder="Tell us about your project..."
                            required
                            className="w-full bg-black/30 border border-[#2e2e2e] rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
                        ></textarea>
                    </div>
                    <div className="form-field text-center">
                        <button 
                            type="submit"
                            className="group relative inline-flex items-center justify-center bg-white text-black font-bold py-4 px-10 rounded-full hover-target transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                        >
                            <span className="mr-2">Send Message</span>
                            <FaPaperPlane />
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-20 text-center text-white/60">
                <p>Or reach us directly at:</p>
                <a href="mailto:hello@webier.com" className="font-space-grotesk text-lg text-purple-400 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 mt-2">
                    <FaEnvelope />
                    <span>hello@webier.com</span>
                </a>
            </div>
        </section>
    );
};

export default Contact;
