import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { gsap } from 'gsap';
import { useTheme } from '../../../context/ThemeContext'; // Ensure this path is correct

const PricingSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".animate-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Pricing Card Animation (Slide from left)
      gsap.from(".animate-card", {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      });

      // Features Animation (Slide from right)
      gsap.from(".animate-feature", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.6,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [theme]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#e2e2e2] dark:bg-bg-dark transition-colors duration-300 overflow-hidden min-h-screen flex items-center px-[20px] md:px-[30px] lg:px-[60px] py-20"
      id="pricing"
    >
      <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 w-full h-full justify-center">
        
        {/* Header Section - Matches ServicesHero alignment */}
        <div className="flex flex-col relative z-[100] items-start gap-1 md:gap-2 w-full max-w-full shrink-0 animate-header">
          <div className="font-medium text-[#0e0e0e] dark:text-text-light text-xs md:text-sm lg:text-base tracking-[2px] leading-[20px] uppercase">
            PRICING
          </div>

          <h2 className="font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-tight">
            <span className="font-medium text-[#0e0e0e] dark:text-text-light">
              Simple, Transparent{" "}
            </span>
            <span className="font-serif italic text-[#0e0e0e] dark:text-text-light">
              Pricing Plan
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mt-2 leading-relaxed">
            A pricing plan is a business strategy for setting product/service costs, 
            balancing profitability with market competitiveness by considering costs, 
            customer value, and competitor pricing.
          </p>
        </div>

        {/* Pricing Content - Matches the gap logic of the Hero */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-10 xl:gap-12 w-full max-w-full relative mt-8">
          
          {/* LEFT - Pricing Card */}
          <div className="animate-card w-full lg:flex-1 bg-bg-light dark:bg-[#1a1a1a] p-8 md:p-10 rounded-sm shadow-sm border border-gray-100 dark:border-white/10 transition-colors">
            <div className="flex justify-between items-baseline mb-8 border-b border-gray-300 dark:border-white/10 pb-6">
              <h3 className="text-2xl font-semibold dark:text-text-light">Growth Retainer</h3>
              <div className="text-right">
                <span className="text-4xl font-bold dark:text-text-light">$1199</span>
                <span className="text-gray-500 dark:text-gray-400 text-lg">/mo</span>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <h4 className="text-xl font-bold dark:text-text-light">Design That Drives Business.</h4>
              <ul className="space-y-4">
                {[
                  "Dedicated Design Time",
                  "Priority Support",
                  "Weekly Strategy Calls",
                  "UI, UX, and Branding",
                  "Front-end Development"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-5 h-5 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full bg-[#ff4d29] hover:bg-[#e64525] text-white font-bold py-4 transition-colors rounded-sm mb-4">
              Get Started Today
            </button>
            <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-1">
               <span className="w-4 h-4 rounded-full border border-gray-300 inline-flex items-center justify-center text-[10px]">✓</span>
               7-day money-back guarantee.
            </p>
          </div>

          {/* RIGHT - Detailed Features */}
          <div className="w-full lg:flex-1 space-y-12 py-4">
            {[
              {
                title: "Cheaper than a full-time hire",
                desc: "A senior designer in the US costs $100k+ plus benefits. With us, you get senior-level talent for half the cost and zero HR headaches."
              },
              {
                title: "Ultra-fast turnaround",
                desc: "Don't wait weeks for a draft. We deliver design updates one by one every 24-48 hours, keeping your momentum high."
              },
              {
                title: "Total flexibility",
                desc: "Don't have enough work for a whole month? Pause your subscription and bank your remaining days for when you need them later."
              }
            ].map((feature, i) => (
              <div key={i} className="animate-feature flex items-start gap-4 group">
                <div className="mt-1 bg-gray-400 dark:bg-gray-600 p-1 rounded-full text-white">
                  <Check size={14} strokeWidth={4} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 dark:text-text-light">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}

            <button className="animate-feature w-full border border-solid border-[#0e0e0e66] dark:border-gray-500 hover:bg-[#0e0e0e0d] dark:hover:bg-gray-800 transition-colors bg-transparent dark:text-text-light py-4 font-semibold rounded-[12px]">
              Contact us for Custom Scopes
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PricingSection;