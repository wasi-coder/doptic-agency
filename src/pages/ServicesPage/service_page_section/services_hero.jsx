import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../../context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const ServicesHero = () => {
  const { theme } = useTheme()
  const sectionRef = useRef(null)
  const listContainerRef = useRef(null)
  const slidesRef = useRef([])
  const itemsRef = useRef([])

  const services = [
    { name: "UI/UX Design", image: "/images/servicesimage1.svg" },
    { name: "Custom Web Development", image: "/images/servicesimage2.svg" },
    { name: "Motion Graphic Design", image: "/images/servicesimage3.svg" },
    { name: "Mobile App Design", image: "/images/servicesimage4.svg" },
    { name: "Ecommerce Store Design", image: "/images/servicesimage1.svg" },
    { name: "Digital Growth Strategy", image: "/images/servicesimage2.svg" },
    { name: "Banding Design", image: "/images/servicesimage3.svg" }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const listItems = itemsRef.current
      const slides = slidesRef.current
      const activeColor = theme === 'dark' ? "rgb(226, 226, 226)" : "rgb(14, 14, 14)"

      gsap.set(slides, {
        zIndex: (i, target, targets) => targets.length - i
      })

      listItems.forEach((item) => {
        const textDiv = item.querySelector('.service-text')
        const orangeBar = item.querySelector('.orange-bar')

        gsap.set(textDiv, {
          color: "rgba(192, 192, 192, 1)",
          fontWeight: 400,
          fontSize: "1em"
        })

        gsap.set(orangeBar, {
          backgroundColor: "rgba(192, 192, 192, 1)",
          transformOrigin: "left center"
        })
      })

      gsap.set(slides, { height: "100%" })

      slides.forEach((slide, i) => {
        if (i < slides.length - 1) {
          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => "top -" + (window.innerHeight * (i + 0.5)),
              end: () => "+=" + window.innerHeight,
              scrub: true,
              invalidateOnRefresh: true,
            }
          }).to(slide, { height: 0 })
        }
      })

      listItems.forEach((item, i) => {
        const textDiv = item.querySelector('.service-text')
        const orangeBar = item.querySelector('.orange-bar')

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => "top -" + (window.innerHeight * i),
            end: () => "+=" + window.innerHeight,
            scrub: true,
            invalidateOnRefresh: true,
          }
        })
        .to(textDiv, {
          duration: 0.33,
          color: activeColor,
          fontWeight: 500,
          fontSize: "2.15em",
          ease: "power2.out"
        })
        .to(orangeBar, {
          duration: 0.33,
          backgroundColor: "#FF6B35",
        }, 0)
        .to(textDiv, {
          duration: 0.33,
          color: "rgba(192, 192, 192, 1)",
          fontWeight: 400,
          fontSize: "1.75em",
          ease: "power2.in"
        }, 0.66)
        .to(orangeBar, {
          duration: 0.33,
          backgroundColor: "rgba(192, 192, 192, 1)",
        }, 0.66)
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => "+=" + (listItems.length * window.innerHeight * 0.8),
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [theme])

  return (
    <section
      ref={sectionRef}
      className="bg-bg-light dark:bg-bg-dark  transition-colors duration-300 overflow-hidden h-screen flex items-center px-[20px] md:px-[30px] lg:px-[60px] pt-26 pb-8"
      id="services"
    >
      <div className="flex flex-col items-center gap-2 md:gap-4 lg:gap-6 w-full h-full py-2 md:py-4 lg:py-6 justify-center">
        
        {/* Header Section - Now matches Navbar horizontal span */}
        <div className="flex flex-col relative z-[100] items-start gap-1 md:gap-2 w-full max-w-full shrink-0">
          <div className="font-medium text-[#0e0e0e] dark:text-text-light text-xs md:text-sm lg:text-base tracking-[2px] leading-[20px] uppercase">
            SERVICE
          </div>

          <h2 className="font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-tight">
            <span className="font-medium text-[#0e0e0e] dark:text-text-light">
              We make your{" "}
            </span>
            <span className="font-serif italic text-[#0e0e0e] dark:text-text-light">
              complex ideas{" "}
            </span>
            <span className="font-medium text-[#0e0e0e] dark:text-text-light">
              simple <br />and beautiful.
            </span>
          </h2>
        </div>

        {/* Services List and Image Container */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-10 xl:gap-12 w-full max-w-full relative flex-1">
          
          {/* LEFT - Service List */}
          <div className="relative w-full lg:flex-1 h-full flex items-start justify-center overflow-hidden">
            <div
              ref={listContainerRef}
              className="flex flex-col w-full items-start relative z-10 py-4"
            >
              {services.map((service, i) => (
                <div
                  key={i}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className="flex flex-col items-start py-3 md:py-4 lg:py-5 w-full service-item relative"
                  style={{ willChange: 'transform, color, opacity' }}
                >
                  <div className="service-border w-full relative pb-2">
                    <div className="service-text transition-all duration-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight relative z-10">
                      {service.name}
                    </div>
                    <div className="orange-bar absolute bottom-0 left-0 w-full h-[2px]" style={{ transformOrigin: 'left center', backgroundColor: 'rgba(192, 192, 192, 1)' }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradients */}
            <div className="hidden lg:block dark:lg:hidden absolute top-0 left-0 w-full h-full pointer-events-none z-20"
                 style={{ background: 'linear-gradient(180deg, rgba(226,226,226,1) 0%, rgba(226,226,226,0) 12%, rgba(226,226,226,0) 88%, rgba(226,226,226,1) 100%)' }}
            />
            <div className="hidden dark:lg:block absolute top-0 left-0 w-full h-full pointer-events-none z-20"
                 style={{ background: 'linear-gradient(180deg, rgba(14,14,14,1) 0%, rgba(14,14,14,0) 12%, rgba(14,14,14,0) 88%, rgba(14,14,14,1) 100%)' }}
            />
          </div>

          {/* RIGHT - Images and Button */}
          <div className="flex flex-col items-center lg:items-end justify-center gap-6 md:gap-8 w-full lg:w-auto">
            <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] overflow-hidden">
              {services.map((service, i) => (
                <div
                  key={i}
                  ref={(el) => (slidesRef.current[i] = el)}
                  className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center overflow-hidden"
                  style={{ willChange: 'height' }}
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Button aligned to the right, matching Navbar Menu button side */}
            <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-solid border-[#0e0e0e66] dark:border-gray-500 hover:bg-[#0e0e0e0d] dark:hover:bg-gray-800 transition-colors bg-[#e2e2e2] dark:bg-bg-dark rounded-[12px]">
              <div className="font-medium text-[#0e0e0e] dark:text-text-light text-sm md:text-base leading-[24px] whitespace-nowrap">
                View All Services
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesHero