import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const awards = [
  { date: "08 Mar 2024", title: "Web Excellence", subtitle: "Pitti Uomo & Greenpeace", desc: "For pushing the boundaries of user interface design in the Fintech sector.", image: "https://picsum.photos/400/300?random=1" },
  { date: "03 Feb 2025", title: "Awwwards Nominee", subtitle: "Site of the Day", desc: "Recognized for outstanding creativity and front-end development performance.", image: "https://picsum.photos/400/300?random=2" },
  { date: "10 May 2025", title: "Global Agency Awards", subtitle: "Top B2B Agency", desc: "Honored for driving measurable growth and lead generation for enterprise clients.", image: "https://picsum.photos/400/300?random=3" },
  { date: "22 Sep 2025", title: "The Drum Awards", subtitle: "Digital Innovation", desc: "Celebrated for our proprietary approach to headless CMS architecture.", image: "https://picsum.photos/400/300?random=4" }
];

const AwardsSection = () => {
  const [activeImage, setActiveImage] = useState(awards[0].image);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  
  // To track mouse velocity for the tilt
  const mouseX = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    
    // Calculate tilt based on movement direction
    const deltaX = clientX - mouseX.current;
    mouseX.current = clientX;
    const tilt = gsap.utils.clamp(-20, 20, deltaX * 0.8);

    gsap.to(imageRef.current, {
      x: clientX,
      y: clientY - 120, // Position a bit above the cursor
      rotation: tilt,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  const handleMouseEnter = (img) => {
    // "Blooming" effect: shrink, swap, then pop out
    const tl = gsap.timeline();
    
    tl.to(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      onComplete: () => setActiveImage(img)
    })
    .to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { 
      scale: 0, 
      opacity: 0, 
      duration: 0.3 
    });
  };

  return (
    <section 
      ref={containerRef}
      className="w-full bg-bg-light dark:bg-bg-dark py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Image */}
      <div
        ref={imageRef}
        className="fixed top-0 left-0 pointer-events-none z-50 w-72 h-52 opacity-0 scale-0 origin-center"
        style={{ marginLeft: '-144px', marginTop: '-104px' }}
      >
        <img
          src={activeImage}
          alt="Preview"
          className="w-full h-full object-cover shadow-2xl rounded-lg border-4 border-white"
        />
      </div>

      <div className="max-w-full mx-auto px-[20px] md:px-[30px] lg:px-[60px]">
        <div className="mb-16 relative z-10">
          <h2 className="text-[#0e0e0e] dark:text-white" style={{ 
            fontSize: '72px', 
            fontWeight: '500', 
            lineHeight: '120%', 
            letterSpacing: '-0.04em',
            fontFamily: '"Inter Variable", sans-serif'
            }}>
            Awards &{' '}
            <span 
                className="italic" 
                style={{ 
                fontFamily: '"Libre Caslon Text", serif',
                fontWeight: '400',
                fontStyle: 'italic'
                // size, line-height, and tracking are inherited from parent
                }}
            >
                Accolades
            </span>
            </h2>
        </div>

        <div className="border-t border-black/10">
          {awards.map((award, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(award.image)}
              onMouseLeave={handleMouseLeave}
              className="group relative grid grid-cols-12 py-12 border-b border-black/10 items-center cursor-none overflow-hidden"
            >
              {/* Orange Background Slide Effect */}
              <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

              {/* Content (Z-index ensures it stays above the orange bg) */}
              <div className="relative z-10 col-span-2 text-sm font-medium group-hover:text-white transition-colors duration-300">
                <span className="block text-2xl">{award.date.split(' ')[0]}</span>
                <span className="opacity-60 uppercase text-xs">{award.date.split(' ').slice(1).join(' ')}</span>
              </div>

              <div className="relative z-10 col-span-4 group-hover:text-white transition-colors duration-300">
                <h3 className="text-3xl font-semibold tracking-tight uppercase">
                  {award.title}
                </h3>
                <p className="opacity-60 text-sm mt-1">{award.subtitle}</p>
              </div>

              <div className="relative z-10 col-span-6 group-hover:text-white transition-colors duration-300">
                <p className="text-sm max-w-md opacity-80">
                  {award.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;