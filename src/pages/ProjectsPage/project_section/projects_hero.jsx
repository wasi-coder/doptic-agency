import React from 'react';
import { useTheme } from '../../../context/ThemeContext'; // Ensure this matches your project structure

const LandingPage = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-[#e2e2e2] dark:bg-bg-dark min-h-screen transition-colors duration-300 font-sans overflow-x-hidden">
      
      {/* SECTION 1: TOP HEADER */}
      <section className="px-[20px] md:px-[30px] lg:px-[60px] pt-32 pb-20 border-b border-black/5 dark:border-white/5">
        <div className="flex flex-col items-end w-full max-w-full">
          {/* "Crafting Tomorrow's" - Inter Variable */}
          <h1 
            className="font-medium leading-[120%] tracking-[-0.04em] text-right text-[#0e0e0e] dark:text-text-light"
            style={{ 
              fontFamily: '"Inter Variable", sans-serif', 
              fontSize: 'clamp(40px, 8.8vw, 128px)' 
            }}
          >
            Crafting Tomorrow's
          </h1>
          
          {/* "Solutions, Today." - Libre Caslon Text */}
          <h1 
            className="italic leading-[120%] tracking-[-0.04em] text-right text-[#0e0e0e] dark:text-text-light"
            style={{ 
              fontFamily: '"Libre Caslon Text", serif', 
              fontSize: 'clamp(32px, 7.2vw, 104px)' 
            }}
          >
            Solutions, Today.
          </h1>
        </div>
      </section>

      {/* SECTION 2: PROJECT SHOWCASE */}
      <section className="px-[20px] md:px-[30px] lg:px-[60px] py-16">
        <div className="flex flex-col w-full max-w-full relative">
          
          {/* "Redefining Urban" - Inter Variable */}
          <h2 
            className="font-medium leading-[120%] tracking-[-0.04em] text-[#0e0e0e] dark:text-text-light"
            style={{ 
              fontFamily: '"Inter Variable", sans-serif', 
              fontSize: 'clamp(36px, 6.6vw, 96px)' 
            }}
          >
            Redefining Urban
          </h2>

          {/* "Fashion" - Italiana */}
          <h2 
            className="leading-[120%] tracking-[-0.02em] text-[#0e0e0e] dark:text-text-light mt-[-5px]"
            style={{ 
              fontFamily: '"Italiana", serif', 
              fontSize: 'clamp(28px, 4.4vw, 64px)' 
            }}
          >
            Fashion
          </h2>

          {/* Project Content Box */}
          <div className="relative w-full mt-10">
            
            {/* Background Project Number "01" */}
            <span 
              className="absolute left-[-10px] top-[-20px] md:top-[-40px] font-bold text-black/[0.1] dark:text-white/[0.3] select-none z-0"
              style={{ fontSize: 'clamp(100px, 20vw, 240px)' }}
            >
              01
            </span>
            
            {/* Content Wrapper with offset to reveal number and align under title */}
            <div className="ml-[20%] md:ml-[25%] w-[80%] md:w-[75%] flex flex-col">
              {/* Main Project Image */}
              <div className="relative z-10 w-full flex">
                <div className="w-full overflow-hidden rounded-[4px]">
                  <img 
                    src="/images/projectspage/projectimage1.svg" // Replace with your actual image path
                    alt="Redefining Urban Fashion"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Description Text */}
              <div className="w-full flex justify-start mt-6">
                <p className="text-left text-[#0e0e0e]/60 dark:text-text-light/60 text-[12px] md:text-[14px] w-full leading-relaxed">
                  We transformed a local label into a global brand. Our strategic design 
                  increased conversion rates and customer loyalty instantly.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;