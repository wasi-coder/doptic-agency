import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BlogPostIntroduction = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // GSAP Animation: Reveal items one by one
    const tl = gsap.timeline();
    tl.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center p-4">
      {/* The "Paper" Container: 
        Maintains 1440x2012 aspect ratio while fitting within viewport 
      */}
      <div 
        ref={containerRef}
        className="w-full max-w-[1440px] aspect-[1440/2012] bg-[#E5E5E5] shadow-2xl overflow-y-auto px-[10%] py-[8%] text-[#1A1A1A]"
      >
        <div ref={contentRef} className="flex flex-col gap-8">
          
          <h1 className="text-6xl font-medium tracking-tighter">Introduction</h1>

          <div className="flex flex-col gap-6 text-[18px] leading-[160%] font-normal">
            <p>
              Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.
            </p>
            <p>
              Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
            </p>
          </div>

          {/* Image Placeholder with your specific aspect ratio from the previous turn */}
          <div className="w-full aspect-[164/75] bg-[#D9D9D9] flex items-center justify-center relative overflow-hidden">
             <div className="w-20 h-20 opacity-20">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
             </div>
             <span className="absolute bottom-[-2rem] left-0 text-sm text-gray-500 italic pt-2">
                Image caption goes here
             </span>
          </div>

          <div className="mt-4">
            {/* Styled Section: 24px Inter Medium */}
            <h2 className="font-['Inter'] font-medium text-[24px] leading-[120%] tracking-[-4%] mb-6">
              Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
            </h2>

            <p className="text-[18px] leading-[160%] mb-8">
              Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
            </p>

            {/* Quote Section: 18px Inter Italic */}
            <blockquote className="border-l-2 border-black pl-8 my-10 font-['Inter'] italic text-[18px] leading-[160%] font-normal">
              "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus."
            </blockquote>

            <p className="text-[18px] leading-[160%] mb-12">
              Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.
            </p>
          </div>

          <h1 className="text-6xl font-medium tracking-tighter">Conclusion</h1>

          <div className="flex flex-col gap-6 text-[18px] leading-[160%] font-normal">
            <p>Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.</p>
            <p>Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.</p>
            <p>Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostIntroduction;