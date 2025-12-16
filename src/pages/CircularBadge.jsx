import React from 'react';

const CircularBadge = () => {
  return (
    <div 
      id="hero-circular-badge" 
      className="relative w-[120px] sm:w-[140px] lg:w-[186px] h-[120px] sm:h-[140px] lg:h-[160px] px-[6px] sm:px-[8px] lg:px-[12px] opacity-0"
    >
      <div className="relative w-full h-full">
        {/* Background Circle */}
        <div className="absolute inset-0 w-[100px] sm:w-[120px] lg:w-[160px] h-[100px] sm:h-[120px] lg:h-[160px] bg-[#0e0e0e] rounded-full shadow-[0px_8px_16px_#00000005] mx-auto"></div>
        
        {/* Text Content - Highly specific styling is preserved */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-full h-full px-[5px] sm:px-[7px] lg:px-[10px]">
            {/* Left Side - COLATIC */}
            <div className="flex flex-col items-start text-[10px] sm:text-[12px] lg:text-[15px] text-[#e2e2e2] font-['Inter'] leading-[12px] sm:leading-[15px] lg:leading-[19px] text-center mr-1">
              <div className="flex items-end">
                <span className="self-end">C</span>
                <span className="mb-[6px] sm:mb-[8px] lg:mb-[10px] -ml-[2px] sm:-ml-[3px] lg:-ml-[4px]">O</span>
              </div>
              <span>L</span>
              <span className="self-center">A</span>
              <span>T</span>
              <div className="flex items-end">
                <span>I</span>
                <span className="mt-[6px] sm:mt-[8px] lg:mt-[12px] -ml-[1px] sm:-ml-[1px] lg:-ml-[2px]">G</span>
              </div>
            </div>

            {/* Center - Button and Text */}
            <div className="flex flex-col items-center gap-[4px] sm:gap-[6px] lg:gap-[8px] mt-[4px] sm:mt-[6px] lg:mt-[8px] -ml-[2px] sm:-ml-[3px] lg:-ml-[4px]">
              {/* Top Text - NFERENCE */}
              <div className="flex items-start text-[10px] sm:text-[12px] lg:text-[15px] text-[#e2e2e2] font-['Inter'] leading-[12px] sm:leading-[15px] lg:leading-[19px] text-center">
                <span className="self-center">N</span>
                <span>F</span>
                <span className="ml-[3px] sm:ml-[4px] lg:ml-[6px]">E</span>
                <span className="ml-[2px] sm:ml-[3px] lg:ml-[4px]">R</span>
                <span className="self-end">E</span>
              </div>
              
              {/* Orange Button (Note: This is NOT the main CTA) */}
              <button className="w-[40px] sm:w-[50px] lg:w-[70px] h-[40px] sm:h-[50px] lg:h-[70px] bg-[#ff4920] rounded-full p-[12px] sm:p-[15px] lg:p-[20px] flex items-center justify-center">
                <img 
                  src="/images/img_group_1.svg" 
                  alt="Conference icon"
                  className="w-full h-full object-contain"
                />
              </button>
              
              {/* Bottom Text - ID420 */}
              <div className="flex items-start text-[10px] sm:text-[12px] lg:text-[15px] text-[#e2e2e2] font-['Inter'] leading-[12px] sm:leading-[15px] lg:leading-[19px] text-center">
                <span>I</span>
                <span className="self-end">D</span>
                <span className="self-end ml-[3px] sm:ml-[4px] lg:ml-[6px]">4</span>
                <span className="self-center">2</span>
                <span className="mb-[4px] sm:mb-[6px] lg:mb-[8px]">0</span>
              </div>
            </div>

            {/* Right Side - NCE20F2 */}
            <div className="flex flex-col items-end text-[10px] sm:text-[12px] lg:text-[15px] text-[#e2e2e2] font-['Inter'] leading-[12px] sm:leading-[15px] lg:leading-[19px] text-center ml-1 -ml-[2px] sm:-ml-[3px] lg:-ml-[4px]">
              <span className="self-center">N</span>
              <span>C</span>
              <span>E</span>
              <div className="flex items-end">
                <span className="self-end">2</span>
                <div className="relative mb-[8px] sm:mb-[12px] lg:mb-[16px]">
                  <span>O</span>
                  <span className="absolute top-[8px] sm:top-[12px] lg:top-[17px] left-[-6px] sm:left-[-8px] lg:left-[0px]">F</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircularBadge;