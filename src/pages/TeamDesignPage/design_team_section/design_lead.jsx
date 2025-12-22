import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

// Font Constants
const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

const PortfolioPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-in", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-bg-light dark:bg-bg-dark min-h-screen text-[#1A1A1A] pt-[75px] selection:bg-[#FF4D29] selection:text-white"
      style={{ fontFamily: FONT_INTER }}
    >
      
      {/* Wrapper with specific max-width logic */}
      <div className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-16">
        
        {/* Header Section */}
        <header className="mb-20 animate-in">
          <h1 className="flex flex-wrap lg:flex-nowrap items-baseline lg:whitespace-nowrap tracking-[-0.04em] leading-[120%]">
            <span 
              className="text-[64px] md:text-[128px] font-medium mr-[0.2em]"
              style={{ fontFamily: FONT_INTER }}
            >
              Meet our
            </span>
            <span 
              className="text-[52px] md:text-[104px] italic font-normal"
              style={{ fontFamily: FONT_CASLON }}
            >
              Design Lead
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-gray-600 leading-relaxed font-normal">
            We're a group of creative thinkers, developers, and designers dedicated to turning your vision into impact.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Image & Socials */}
          <div className="lg:col-span-5 animate-in">
            <div className="aspect-[4/5] bg-gray-300 overflow-hidden mb-10 shadow-sm">
              <img 
                src="\images\teamspage\design lead.svg" 
                alt="Liam Carter" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 hover:scale-100"
              />
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-[32px] font-medium mb-6 tracking-tight">Follow</h3>
                <div className="flex gap-4 items-center">
                  <a href="#" className="p-2 bg-black rounded-lg text-white hover:bg-[#FF4D29] transition-all duration-300">
                    <Instagram size={24} strokeWidth={2.5} />
                  </a>
                  <a href="#" className="p-2 bg-black rounded-lg text-white hover:bg-[#FF4D29] transition-all duration-300">
                    <Linkedin size={24} fill="currentColor" strokeWidth={0} />
                  </a>
                  <a href="#" className="p-2 bg-black rounded-lg text-white hover:bg-[#FF4D29] transition-all duration-300">
                    <Youtube size={24} fill="currentColor" strokeWidth={0} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-[32px] font-medium mb-6 tracking-tight">Portfolio</h3>
                <div className="flex flex-wrap gap-3">
                  {['Dribbble', 'Behance', 'Artstation'].map(site => (
                    <span key={site} className="px-5 py-2 bg-white border border-gray-200 text-sm font-medium hover:border-black cursor-default transition-colors">
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Form */}
          <div className="lg:col-span-7 space-y-14 animate-in">
            <section>
              <h2 className="text-4xl font-bold tracking-tight mb-2">Liam Carter</h2>
              <p className="text-[#FF4D29] mb-8 uppercase tracking-[0.2em] text-xs font-bold">Lead Product Designer</p>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed max-w-2xl">
                <p>
                  Liam believes that great design is invisible. With a background in cognitive psychology and visual arts, 
                  he approaches every project with a user-first mentality. He doesn't just make things look good; 
                  he ensures they work seamlessly, reducing friction between the user and their goals.
                </p>
                <p>
                  Before joining Doptic, Liam led design sprints for Series B startups in San Francisco and New York. 
                  He specializes in complex SaaS interfaces and scalable design systems.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-bold mb-4 border-b border-gray-400 pb-2">Skill</h3>
                <p className="text-gray-700">
                  User Interface (UI), User Experience (UX), Design Systems, Webflow Development.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 border-b border-gray-400 pb-2">Experience</h3>
                <p className="text-gray-700">
                  Over 8 years of experience defining product strategies for high-growth tech companies.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-6">Responsibilities</h3>
              <ul className="space-y-4">
                {['Leading high-level design strategy', 'Overseeing user research and testing', 'Mentoring the junior design team'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-[#FF4D29] rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact Form */}
            <section className="pt-6 border-t border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Enter your name" className="bg-white/50 border border-transparent p-4 outline-none focus:bg-white focus:border-black transition-all" />
                <input type="email" placeholder="Enter your email" className="bg-white/50 border border-transparent p-4 outline-none focus:bg-white focus:border-black transition-all" />
              </div>
              <textarea placeholder="Enter your message" rows="4" className="w-full bg-white/50 border border-transparent p-4 mb-8 outline-none focus:bg-white focus:border-black transition-all"></textarea>
              <button className="bg-[#FF4D29] text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-black transition-all duration-300">
                Let's Contact
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;