import React from 'react'

const AboutHero = () => {
  return (
    <section className="w-full bg-bg-light dark:bg-bg-dark pt-[60px] sm:pt-[90px] lg:pt-[120px] pb-20 relative min-h-screen transition-colors duration-300">
      <div className="max-w-full mx-auto px-[20px] md:px-[30px] lg:px-[60px]">
        <h1 className="text-[#0e0e0e] dark:text-white text-6xl md:text-7xl lg:text-8xl font-bold mb-12">
          About Us
        </h1>

        <div className="w-full">
          <img
            src="/images/aboutpage/AboutPageHeroImage.svg"
            alt="Team members collaborating"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutHero
