import React from "react";

// --- START: CallToActionSection Component ---

export const CallToActionSection = ()=> {
  return (
    <section className="flex flex-col w-full items-center gap-20 px-[75px] py-[200px] bg-[#ff4920]">
      <div className="flex flex-col items-center gap-3.5 relative w-full">
        <h2 className="w-fit font-normal text-transparent text-9xl text-center leading-[128px] relative mt-[-1.00px] [font-family:'Inter_Variable-Medium',Helvetica] translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:200ms]">
          <span className="font-medium text-[#0e0e0e] tracking-[-6.55px] leading-[153.6px]">
            GOT AN IDEA?
            <br />
          </span>

          <span className="[font-family:'Libre_Caslon_Text',Helvetica] italic text-[#0e0e0e] tracking-[-6.55px] leading-[153.6px]">
            LET&#39;S TALK
          </span>
        </h2>

        <p className="text-[#0e0e0e] text-lg text-center leading-[28.8px] relative [font-family:'Inter_Variable-Regular',Helvetica] font-normal tracking-[0] max-w-full translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:400ms]">
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



export const FooterSection = ()=> {
  return (
    <footer className="w-full items-center gap-16 pt-[120px] pb-5 px-[75px] bg-[#e2e2e2] flex flex-col relative">
     
      <div className="grid grid-cols-10 w-full">

        <div className="flex items-start gap-8 flex-1 col-span-4">
          <nav className="items-start gap-4 flex-1 flex flex-col">
            <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-[#0e0e0e] text-2xl tracking-[-0.96px] leading-[28.8px]">
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
                    className="flex-1 [font-family:'Inter_Variable-Regular',Helvetica] font-normal text-[#0e0e0eb2] text-base tracking-[0] leading-[25.6px] hover:text-[#0e0e0e] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="items-start gap-4 flex-1 flex flex-col">
            <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-[#0e0e0e] text-2xl tracking-[-0.96px] leading-[28.8px]">
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
                    className="flex-1 [font-family:'Inter_Variable-Regular',Helvetica] font-normal text-[#0e0e0eb2] text-base tracking-[0] leading-[25.6px] hover:text-[#0e0e0e] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="items-start gap-4 flex-1 flex flex-col">
            <h3 className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-[#0e0e0e] text-2xl tracking-[-0.96px] leading-[28.8px]">
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
                    className="[font-family:'Inter_Variable-Regular',Helvetica] font-normal text-[#0e0e0eb2] text-base tracking-[0] leading-[25.6px] whitespace-nowrap hover:text-[#0e0e0e] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="text-end gap-6 col-span-6">
          <a
            href="mailto:hello@info.com"
            className="self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-[#0e0e0e] text-[64px] text-right tracking-[-2.56px] leading-[76.8px] hover:opacity-70 transition-opacity"
          >
            hello@info.com
          </a>
        </div>

      </div>

        <h2 className="text-start self-stretch [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-[#0e0e0e] text-9xl tracking-[0] leading-[153.6px]">
          Doptic
        </h2>

        <div className="w-full items-center gap-5 flex flex-col">
          <div className="w-full max-w-[700px] h-px bg-[#0e0e0e1a]" />

          <div className="flex items-center justify-center gap-16 w-full mb-10">
            <p className="[font-family:'Inter_Variable-Regular',Helvetica] font-normal text-[#0e0e0eb2] text-base tracking-[0] leading-[25.6px] whitespace-nowrap">
              Copyright ©Doptic – Where designs meet the future.
            </p>
          </div>
        </div>
    
    </footer>
  );
};

// --- END: FooterSection Component ---

// --- NEW: Combined Component ---

/**
 * Renders the CallToActionSection followed by the FooterSection.
 * This component acts as the "merged" result you requested.
 */
export const PageBottom = () => {
  return (
    <>
      <CallToActionSection />
      <FooterSection />
    </>
  );
};



export default FooterSection