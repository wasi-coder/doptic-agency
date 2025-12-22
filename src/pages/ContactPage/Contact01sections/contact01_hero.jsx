import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RequestQuote = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const footerRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: '',
    description: '',
    message: '',
    terms: false
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });

      tl.from(".anim-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      tl.from(".anim-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.6");

      tl.from(formRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");

      tl.from(footerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Updated input classes for dark mode visibility
  const inputClasses = "w-full bg-[#E5E5E5]/50 dark:bg-white/10 border border-gray-300 dark:border-gray-700 px-4 py-3 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white";
  
  // Updated label classes to turn white/light gray in dark mode
  const labelClasses = "block text-xs font-medium text-gray-600 dark:text-gray-300 mb-2 ml-1";

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-black dark:text-white pb-20 pt-20 transition-colors duration-300">
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Libre+Caslon+Text:ital,wght@0,400;1,400&display=swap');
        `}
      </style>

      <div 
        ref={containerRef}
        className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-16"
      >
        
        {/* Header Section */}
        <div className="text-center mb-24 w-full ">
        <h1 className="anim-title flex flex-col md:flex-row justify-center items-center md:items-baseline md:gap-6">
            {/* "Request a" - Inter, 500, 128px, 120% leading, -4% tracking */}
            <span 
                className="text-black dark:text-white"
                style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(48px, 8vw, 128px)', // Responsive scaling
                lineHeight: '120%',
                letterSpacing: '-4%',
                textAlign: 'center'
                }}
            >
                Request a
            </span>
            
            {/* "quote." - Libre Caslon Text, 400, Italic, 104px, 120% leading, -4% tracking */}
            <span 
                className="text-black dark:text-white"
                style={{
                fontFamily: "'Libre Caslon Text', serif",
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 6.5vw, 104px)', // Responsive scaling
                lineHeight: '120%',
                letterSpacing: '-4%',
                textAlign: 'center'
                }}
            >
                quote.
            </span>
            </h1>
          <p className="anim-subtitle text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Share your renovation dreams with us through this form and get a free consultation that turns your vision into a clear, actionable plan.
          </p>
        </div>

        {/* Form Section */}
        <div ref={formRef} className="max-w-4xl mx-auto mb-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClasses}>First name</label>
              <input type="text" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Last name</label>
              <input type="text" className={inputClasses} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClasses}>Email</label>
              <input type="email" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Phone number</label>
              <input type="tel" className={inputClasses} />
            </div>
          </div>

          <div className="mb-8">
            <label className={labelClasses}>Choose a topic</label>
            <div className="relative">
              <select className={`${inputClasses} appearance-none cursor-pointer`}>
                <option className="dark:bg-bg-dark">Select one...</option>
                <option className="dark:bg-bg-dark">Renovation</option>
                <option className="dark:bg-bg-dark">New Build</option>
                <option className="dark:bg-bg-dark">Consultation</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium text-black dark:text-white mb-4">Which best describes you?</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
              {['First choice', 'Second choice', 'Third choice', 'Fourth choice', 'Fifth choice', 'Other'].map((option, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="description" className="peer appearance-none w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 checked:border-black dark:checked:border-white transition-colors" />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-black dark:bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm group-hover:text-black dark:group-hover:text-white transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClasses}>Message</label>
            <textarea 
              rows="6" 
              className={`${inputClasses} resize-none`}
              placeholder="Type your message..."
            ></textarea>
          </div>

          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-black dark:bg-white/10 focus:ring-0" />
              <span className="text-gray-500 dark:text-gray-400 text-sm">I accept the Terms</span>
            </label>
          </div>

          <button className="w-full bg-[#FF4422] text-white font-medium py-4  hover:bg-[#E03311] transition-colors duration-300 shadow-sm">
            Submit
          </button>

        </div>

        {/* Footer Info Cards */}
        <div ref={footerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="border border-gray-200/60 dark:border-gray-800 bg-[#Eaeaea] dark:bg-white/5 p-8 rounded-lg flex flex-col items-center text-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-700 dark:text-gray-200">
              <Mail size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-black dark:text-white">Email</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">info@dopslc.com</p>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-200/60 dark:border-gray-800 bg-[#Eaeaea] dark:bg-white/5 p-8 rounded-lg flex flex-col items-center text-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-700 dark:text-gray-200">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-black dark:text-white">Live Chat</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">+1 (555) 000-0000</p>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-200/60 dark:border-gray-800 bg-[#Eaeaea] dark:bg-white/5 p-8 rounded-lg flex flex-col items-center text-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-700 dark:text-gray-200">
              <Phone size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-black dark:text-white">Phone</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">81 Union Street, Dunstable, England</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RequestQuote;