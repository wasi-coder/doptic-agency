"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger for the scroll animations
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const teamMembers = [
  {
    id: 1,
    name: "Bessie Cooper",
    role: "UI/UX Designer",
    image: "/images/aboutpage/teamimage1.svg",
    isFirst: true,
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Lead Developer",
    image: "/images/aboutpage/teamimage2.svg",
  },
  {
    id: 3,
    name: "Sarah Anderson",
    role: "Product Manager",
    image: "/images/aboutpage/teamimage3.svg",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Creative Director",
    image: "/images/aboutpage/teamimage4.svg",
  },
]

export default function AboutTeams() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Alternating Entrance Animation (Over and Under)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromUnder = i % 2 === 0; // Even cards from bottom, Odd from top
        
        gsap.fromTo(card, 
          { 
            y: fromUnder ? 120 : -120, 
            opacity: 0 
          }, 
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              end: "top center",
              scrub: 1.5,
            }
          }
        );

        // 2. Individual Hover Scale Effect
        const image = card.querySelector("img");
        card.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.05, duration: 0.8, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.8, ease: "power2.out" });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-bg-light dark:bg-bg-dark py-24 relative min-h-screen transition-colors duration-300 font-['Inter_Variable']"
    >
      {/* Wrapper div matches AboutHero side padding */}
      <div className="max-w-full mx-auto px-[20px] md:px-[30px] lg:px-[60px]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-zinc-300 pb-12">
          <div className="max-w-[800px]">
            <h1 className="text-[#1A1A1A] dark:text-white" style={{
              fontWeight: 500,
              fontSize: '72px',
              lineHeight: '120%',
              letterSpacing: '-4%'
            }}>
              The Creative Minds
            </h1>
            <h2 className="text-[#1A1A1A] dark:text-white" style={{
              fontFamily: 'Libre Caslon Text, serif',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: '72px',
              lineHeight: '120%',
              letterSpacing: '-4%'
            }}>
              Behind the Magic
            </h2>
            
            <p className="mt-8 text-zinc-600 dark:text-zinc-400" style={{
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              maxWidth: '600px'
            }}>
              We are strategists, designers, and engineers who refuse to settle for "good enough." 
              Our diverse perspectives converge to create singular, powerful solutions.
            </p>
          </div>

          <button className="mt-8 md:mt-0 px-8 py-3 border border-zinc-400 text-sm uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
            View All
          </button>
        </div>

        {/* Team Grid: items-end ensures all images align at the bottom line */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-end" 
          style={{ gap: '24px' }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group overflow-hidden bg-zinc-300 transition-opacity duration-200"
              style={{
                width: member.isFirst ? '520px' : '226.66667px',
                height: '520px',
                opacity: 1
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Interaction Overlay (Orange Label) */}
              <div className={`absolute bottom-0 left-0 w-full transition-transform duration-500 ease-in-out 
                ${member.isFirst ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
                <div className="bg-[#FF4D2A] p-5 text-white flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium leading-none">{member.name}</p>
                    <p className="text-[10px] uppercase tracking-widest mt-1 opacity-80">{member.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}