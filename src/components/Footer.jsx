import React from "react";

// --- START: CallToActionSection Component ---

export const CallToActionSection = () => {
  return (
    <section className="flex flex-col w-full items-center gap-20 px-6 md:px-[75px] py-[100px] md:py-[200px] bg-[#ff4920] transition-colors duration-300">
      <div className="flex flex-col items-center gap-3.5 relative w-full">
        {/* Adjusted text size for mobile (text-5xl) to desktop (text-9xl) */}
        <h2 className="w-fit font-normal text-transparent text-5xl md:text-7xl lg:text-9xl text-center leading-tight md:leading-[128px] relative mt-[-1.00px] [font-family:'Inter_Variable-Medium',Helvetica] translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:200ms]">
          <span className="font-medium text-text-dark dark:text-text-light tracking-tighter md:tracking-[-6.55px] leading-tight md:leading-[153.6px]">
            GOT AN IDEA?
            <br />
          </span>

          <span className="[font-family:'Libre_Caslon_Text',Helvetica] italic text-text-dark dark:text-text-light tracking-tighter md:tracking-[-6.55px] leading-tight md:leading-[153.6px]">
            LET&#39;S TALK
          </span>
        </h2>

        <p className="text-text-dark dark:text-text-light text-base md:text-lg text-center leading-[28.8px] relative [font-family:'Inter_Variable-Regular',Helvetica] font-normal tracking-[0] max-w-full translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:400ms]">
          We craft design experiences that leave a lasting impression bold,
          purposeful, and deeply human.
        </p>
      </div>
    </section>
  );
};

// --- END: CallToActionSection Component ---

// --- START: FooterSection Component ---

const companyLinks = [
  { label: "About" },
  { label: "Project" },
  { label: "Service" },
  { label: "Values" },
  { label: "Contact" },
];

const supportLinks = [
  { label: "Style Guide" },
  { label: "License" },
  { label: "Changelog" },
  { label: "Link Nine" },
  { label: "Link Ten" },
];

const socialLinks = [
  {
    icon: "https://c.animaapp.com/mj6xytezddxCqE/img/scoials-cur-05.svg",
    label: "Instagram",
  },
  {
    icon: "https://c.animaapp.com/mj6xytezddxCqE/img/scoials-cur-03.svg",
    label: "LinkedIn",
  },
  {
    icon: "https://c.animaapp.com/mj6xytezddxCqE/img/icon---youtube.svg",
    label: "Youtube",
  },
];

export const FooterSection = () => {
  return (
    <footer className="w-full items-center gap-16 pt-[80px] md:pt-[120px] pb-5 px-6 md:px-[75px] bg-bg-light dark:bg-bg-dark flex flex-col relative">
      
      {/* Changed to Flex col on mobile, Grid on Large screens to prevent overlap */}
      <div className="flex flex-col lg:grid lg:grid-cols-10 w-full gap-10 lg:gap-0">
        
        {/* Navigation Links Area */}
        <div className="flex flex-wrap md:flex-nowrap items-start gap-8 flex-1 col-span-4 w-full">
          <nav className="items-start gap-4 flex-1 flex flex-col min-w-[120px]">
            <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-xl md:text-2xl tracking-[-0.96px] leading-[28.8px]">
              Company
            </h3>

            <ul className="items-start self-stretch w-full flex flex-col">
              {companyLinks.map((link, index) => (
                <li
                  key={index}
                  className="flex items-start px-0 py-2 self-stretch w-full"
                >
                  <a
                    href="#"
                    className="flex-1 [font-family:'Inter_Variable-Regular',Helvetica] font-normal text-gray-700 dark:text-text-secondary text-base tracking-[0] leading-[25.6px] hover:text-text-dark dark:text-text-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="items-start gap-4 flex-1 flex flex-col min-w-[120px]">
            <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-xl md:text-2xl tracking-[-0.96px] leading-[28.8px]">
              Support
            </h3>

            <ul className="flex flex-col items-start self-stretch w-full">
              {supportLinks.map((link, index) => (
                <li
                  key={index}
                  className="flex items-start px-0 py-2 self-stretch w-full"
                >
                  <a
                    href="#"
                    className="flex-1 [font-family:'Inter_Variable-Regular',Helvetica] font-normal text-gray-700 dark:text-text-secondary text-base tracking-[0] leading-[25.6px] hover:text-text-dark dark:text-text-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="items-start gap-4 flex-1 flex flex-col min-w-[120px]">
            <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-xl md:text-2xl tracking-[-0.96px] leading-[28.8px]">
              Social
            </h3>

            <ul className="flex flex-col items-start self-stretch w-full">
              {socialLinks.map((link, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 px-0 py-2 self-stretch w-full"
                >
                  <img className="w-6 h-6" alt={link.label} src={link.icon} />
                  <a
                    href="#"
                    className="[font-family:'Inter_Variable-Regular',Helvetica] font-normal text-gray-700 dark:text-text-secondary text-base tracking-[0] leading-[25.6px] whitespace-nowrap hover:text-text-dark dark:text-text-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Email Area: Adjusted text size responsiveness */}
        <div className="text-start lg:text-end gap-6 col-span-6 w-full">
          <a
            href="mailto:hello@info.com"
            className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light 
            text-4xl md:text-5xl lg:text-[64px] 
            text-left lg:text-right tracking-[-1px] lg:tracking-[-2.56px] leading-tight lg:leading-[76.8px] hover:opacity-70 transition-opacity break-all md:break-normal"
          >
            hello@info.com
          </a>
        </div>
      </div>

      {/* Footer Logo: Adjusted size responsiveness */}
      <h2 className="text-start self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-6xl md:text-8xl lg:text-9xl tracking-[0] leading-tight md:leading-[153.6px] mt-10 lg:mt-0">
        Doptic
      </h2>

      <div className="w-full items-center gap-5 flex flex-col">
        <div className="w-full max-w-[700px] h-px bg-[#0e0e0e1a]" />

        <div className="flex items-center justify-center gap-16 w-full mb-10 text-center">
          <p className="[font-family:'Inter_Variable-Regular',Helvetica] font-normal text-gray-700 dark:text-text-secondary text-sm md:text-base tracking-[0] leading-[25.6px] whitespace-normal md:whitespace-nowrap">
            Copyright ©Doptic – Where designs meet the future.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- END: FooterSection Component ---

// --- NEW: Combined Component ---

export const PageBottom = () => {
  return (
    <>
      <CallToActionSection />
      <FooterSection />
    </>
  );
};

export default FooterSection;