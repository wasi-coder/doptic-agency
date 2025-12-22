import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OfficeLocations = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  
  // Data for locations
  const locations = [
    {
      id: 'sydney',
      city: 'Sydney',
      address: '123 Sample St, Sydney NSW 2000 AU',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 'newyork',
      city: 'New York',
      address: '123 Sample St, New York NY 10000 USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 'london',
      city: 'London',
      address: '61 Union Street, Dunstable, England',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
    }
  ];

  const [activeId, setActiveId] = useState(locations[0].id);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Setup ScrollTriggers for each text block
      locations.forEach((loc) => {
        ScrollTrigger.create({
          trigger: `#loc-${loc.id}`,
          start: "top center+=100", // Activates when text hits slightly below center
          end: "bottom center+=100",
          onEnter: () => setActiveId(loc.id),
          onEnterBack: () => setActiveId(loc.id),
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Effect to animate image when activeId changes
  React.useEffect(() => {
    if (mapRef.current) {
      gsap.fromTo(mapRef.current, 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeId]);

  // Get active image URL
  const activeImage = locations.find(l => l.id === activeId)?.image;

  return (
    <div className="bg-bg-light dark:bg-bg-dark font-sans text-black min-h-screen">
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Libre+Caslon+Text:ital,wght@0,400;1,400&display=swap');
        `}
      </style>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-16"
      >
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <h1 className="flex flex-wrap items-baseline gap-3 mb-6">
            <span className="font-['Inter'] font-semibold text-5xl md:text-[64px] tracking-tight">
              Our office
            </span>
            <span className="font-['Libre_Caslon_Text'] italic font-normal text-5xl md:text-[64px]">
              Locations
            </span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
            Getting started is made simple and transparent right from day one. We guide you through every step with us.
          </p>
        </div>

        {/* Scroll Interaction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative items-start">
          
          {/* LEFT COLUMN: Scrollable Text List */}
          {/* We add large gaps so scrolling triggers the changes naturally */}
          <div className="md:col-span-4 flex flex-col pb-[20vh]"> 
            {locations.map((loc, index) => {
              const isActive = activeId === loc.id;
              
              return (
                <div 
                  key={loc.id}
                  id={`loc-${loc.id}`}
                  className={`
                    flex flex-col justify-center
                    transition-all duration-500 py-4 mb-[10vh] min-h-[20vh]
                    ${isActive ? 'pl-6 border-l-4 border-[#FF4422]' : 'pl-0 border-l-4 border-transparent opacity-30'}
                  `}
                >
                  <h3 className={`
                    text-3xl md:text-4xl font-['Inter'] tracking-tight mb-2
                    ${isActive ? 'text-black font-medium' : 'text-gray-500'}
                  `}>
                    {loc.city}
                  </h3>
                  
                  <p className="text-gray-600 text-sm md:text-base">
                    {loc.address}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Sticky Image */}
          {/* sticky top-10 keeps it pinned while you scroll the left side */}
          <div className="hidden md:block md:col-span-8 h-[600px] sticky top-10">
             <div className="w-full h-full overflow-hidden bg-gray-200 relative">
                <img 
                  ref={mapRef}
                  src={activeImage} 
                  alt="Office Location Map"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OfficeLocations;