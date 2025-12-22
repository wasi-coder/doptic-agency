import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const RelatedPosts = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  // Data matching the image provided
  const posts = [
    {
      id: 1,
      category: 'Design',
      readTime: '5 min read',
      title: 'The psychology of color in 2026',
      description: 'Discover how palette choices influence user trust and decision-making.',
      image: '/images/blogpage/blogimage1.svg', // Abstract interior
    },
    {
      id: 2,
      category: 'Tech',
      readTime: '5 min read',
      title: 'Why minimalism is evolving fast',
      description: 'Exploring the shift toward maximalism in modern interface design',
      image: '/images/blogpage/blogimage2.svg'
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 1. Animate Header Elements
      tl.from(".anim-header", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 2. Animate Cards
      tl.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Main Background
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-black">
      
      {/* Font Imports (Ideally place this in your index.css) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Libre+Caslon+Text:ital,wght@0,400;1,400&display=swap');
        `}
      </style>

      {/* Main Container with User Specified Constraints */}
      <div 
        ref={containerRef}
        className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-16"
      >
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-black/10 pb-12">
          <div className="max-w-3xl">
            {/* Title Typography */}
            <h2 className="anim-header flex flex-wrap items-baseline gap-3 mb-4">
              <span 
                className="font-['Inter'] font-medium text-5xl md:text-[72px] leading-[120%] tracking-[-0.04em]"
              >
                Related
              </span>
              <span 
                className="font-['Libre_Caslon_Text'] italic font-normal text-5xl md:text-[72px] leading-[120%] tracking-[-0.04em]"
              >
                posts
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="anim-header text-gray-600 text-lg md:text-xl max-w-lg">
              We share what we learn. Read our latest thoughts on the future of digital design.
            </p>
          </div>

          {/* View All Button */}
          <div className="anim-header mt-6 md:mt-2">
            <button className="border border-black px-8 py-3 text-lg hover:bg-black hover:text-white transition-colors duration-300">
              View All
            </button>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              ref={el => cardsRef.current[index] = el}
              className="group cursor-pointer"
            >
              {/* Image Wrapper */}
              <div className="overflow-hidden mb-6 h-[300px] md:h-[400px]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Meta Data */}
              <div className="flex justify-between items-center mb-3 text-sm font-medium">
                <span className="bg-[#E5D7D2] px-3 py-1 rounded-full text-black/80 uppercase text-xs tracking-wide">
                  {post.category}
                </span>
                <span className="text-gray-500">
                  {post.readTime}
                </span>
              </div>

              {/* Card Title */}
              <h3 className="text-3xl md:text-4xl font-semibold leading-tight mb-3 tracking-tight group-hover:underline decoration-1 underline-offset-4">
                {post.title}
              </h3>

              {/* Card Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {post.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RelatedPosts;