import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TeamSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const topRow = [
    { id: 1, name: "Bessie Cooper", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", customWidth: 'md:w-[520px]' },
    { id: 2, name: "Arlene McCoy", role: "Frontend Developer", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop", customWidth: 'md:w-[226.666px]' },
    { id: 3, name: "Devon Lane", role: "Project Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop", customWidth: 'md:w-[226.666px]' },
    { id: 4, name: "Courtney Henry", role: "Strategist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop", customWidth: 'md:w-[226.666px]' },
  ];

  const bottomRow = [
    { id: 5, name: "Tom Cook", role: "Backend Developer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "Whitney Hellings", role: "Product Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop" },
    { id: 7, name: "Jane Cooper", role: "Marketing", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" },
    { id: 8, name: "Robert Fox", role: "Director", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.3
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-bg-light dark:bg-bg-dark min-h-screen transition-colors duration-300 pt-12"
    >
      <div className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-16">
        
        {/* Header Section */}
        <header ref={headerRef} className="mb-16">
          <h1 className="text-5xl md:text-[80px] font-normal tracking-tight text-black dark:text-white mb-6 leading-none">
            Our talented <span className="italic font-serif font-light">team</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg text-base leading-relaxed">
            A multidisciplinary team of strategists, designers, and developers obsessed with quality.
          </p>
        </header>

        {/* Team Grid Container */}
        <div className="flex flex-col gap-[24px] mb-32">
          
          {/* Top Row: Responsive handling */}
          <div className="flex flex-col md:flex-row gap-[24px]">
            {topRow.map((member, index) => (
              <div 
                key={member.id}
                ref={el => cardsRef.current[index] = el}
                className={`relative group overflow-hidden cursor-pointer h-[400px] md:h-[520px] w-full shrink-0 ${member.customWidth}`}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-[#FF4D2A] p-5 flex justify-between items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                  <span className="text-white font-medium text-sm">{member.name}</span>
                  <span className="text-white/80 text-[10px] uppercase tracking-widest">{member.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: Responsive handling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-[24px]">
            {bottomRow.map((member, index) => (
              <div 
                key={member.id}
                ref={el => cardsRef.current[index + 4] = el}
                className="relative group overflow-hidden cursor-pointer h-[400px] md:h-[520px] w-full md:w-[300px] shrink-0"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-[#FF4D2A] p-5 flex justify-between items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                  <span className="text-white font-medium text-sm">{member.name}</span>
                  <span className="text-white/80 text-[10px] uppercase tracking-widest">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA Section */}
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-black dark:text-white mb-6 leading-tight">
            Can't find the right <br />
            <span className="italic font-serif font-light">position?</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base mb-10 leading-relaxed">
            We are always looking for exceptional talent. If you live in Figma and dream in code, we want to hear from you.
          </p>
          <button className="px-10 py-4 border border-gray-300 dark:border-gray-800 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
            Apply now
          </button>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;