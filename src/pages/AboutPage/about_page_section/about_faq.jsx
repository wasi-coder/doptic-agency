import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

// --- Data Definition ---
const faqItems = [
  {
    id: "item-1",
    question: "What services does your agency provide?",
    answer:
      "We offer full design solutions including UI/UX design, website design, branding, product design, and creative direction. Nunc ut sem vitae risus tristique posuere.",
    defaultOpen: true,
  },
  {
    id: "item-2",
    question: "How long does a typical project take?",
    answer: "Project timelines typically range from 4 to 12 weeks, depending on the scope and complexity. We define detailed milestones in our initial planning phase.",
    defaultOpen: false,
  },
  {
    id: "item-3",
    question: "Do you work with startups as well as established companies?",
    answer: "Absolutely. We tailor our process and pricing to fit the unique needs of both agile startups looking for rapid iteration and established enterprises seeking comprehensive solutions.",
    defaultOpen: false,
  },
  {
    id: "item-4",
    question: "What is your design process like?",
    answer: "Our process includes Discovery & Strategy, Wireframing & Prototyping, Visual Design, Testing & Refinement, and Final Handoff. We maintain close communication throughout every stage.",
    defaultOpen: false,
  },
  {
    id: "item-5",
    question: "Can you help with development after the design is complete?",
    answer: "While we specialize in design, we have strong partnerships with trusted development teams and can manage the handover or oversee the development phase to ensure pixel-perfect implementation.",
    defaultOpen: false,
  },
];
// (Note: I filled in the empty answers for completeness)

// --- Component Definition ---
export const AboutFaq = ()=> {
  return (
    <section className=" border flex flex-col w-full items-start gap-16 px-[75px] py-[120px] bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <header className="max-w-[768px] gap-3 flex flex-col items-start opacity-1 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
        <h2 className="w-full [font-family:'Inter_Variable-Medium',Helvetica] font-normal text-transparent text-7xl leading-[72px]">
          <span className="font-medium text-text-dark dark:text-text-light tracking-[-2.07px] leading-[86.4px]">
            Got Questions?
            <br />
            We&apos;ve{" "}
          </span>
          <span className="[font-family:'Libre_Caslon_Text',Helvetica] italic text-text-dark dark:text-text-light tracking-[-2.07px] leading-[86.4px]">
            Got Answers
          </span>
        </h2>
        <p className="w-full text-gray-700 dark:text-text-secondary text-lg leading-[28.8px] [font-family:'Inter_Variable-Regular',Helvetica] font-normal tracking-[0]">
          Getting started is made simple and transparent right from day one. We
          guide you through every step with us.
        </p>
      </header>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full opacity-1 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]"
      >
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-gray-300 dark:border-gray-700 px-[30px]"
          >
            <AccordionTrigger className="py-[30px] gap-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="flex-1 text-left [font-family:'Inter_Variable-Medium',Helvetica] font-medium text-text-dark dark:text-text-light text-[32px] tracking-[-1.28px] leading-[38.4px]">
                {item.question}
              </span>
            </AccordionTrigger>
            {item.answer && (
              <AccordionContent className="pt-0 pb-[30px]">
                <p className="text-gray-700 dark:text-text-secondary text-xl leading-8 [font-family:'Inter_Variable-Regular',Helvetica] font-normal tracking-[0]">
                  {item.answer}
                </p>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default AboutFaq;