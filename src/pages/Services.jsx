import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef(null)
  const fillRef = useRef(null)
  const slidesRef = useRef([])
  const itemsRef = useRef([])

  const services = [
    { name: "UI/UX Design", image: "/images/servicesimage1.svg" },
    { name: "Custom Web Development", image: "/images/servicesimage2.svg" },
    { name: "Motion Graphic Design", image: "/images/servicesimage3.svg" },
    { name: "Mobile App Design", image: "/images/servicesimage4.svg" },
    { name: "Ecommerce Store Design", image: "/images/servicesimage1.svg" },
    { name: "Digital Growth Strategy", image: "/images/servicesimage2.svg" },
    { name: "Landing Design", image: "/images/servicesimage3.svg" }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const listItems = itemsRef.current
      const slides = slidesRef.current

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + listItems.length * 60 + "%",
          pin: true,
          scrub: 0.5,
        },
      })

      // Fill bar animation - starts with 1/length height
      gsap.set(fillRef.current, {
        scaleY: 1 / listItems.length,
        transformOrigin: "top",
      })

      // Set initial states for all items
      listItems.forEach((item, i) => {
        if (i === 0) {
          // First item starts active and popped out
          gsap.set(item, { 
            color: "rgb(255, 107, 74)", // primary-orange color
            filter: "blur(0px)", 
            opacity: 1,
            scale: 1.05,
            x: 10,
            zIndex: 10
          })
          gsap.set(slides[i], { autoAlpha: 1 })
        } else {
          // Other items start inactive and pushed back
          gsap.set(item, { 
            color: "rgba(156, 163, 175, 0.5)", // gray color
            filter: "blur(2px)", 
            opacity: 0.4,
            scale: 0.95,
            x: 0,
            zIndex: 1
          })
          gsap.set(slides[i], { autoAlpha: 0 })
        }
      })

      listItems.forEach((item, i) => {
        const prevItem = listItems[i - 1]

        if (prevItem) {
          // Activate current item with pop-out effect
          tl.to(item, { 
            color: "rgb(255, 107, 74)", // primary-orange
            filter: "blur(0px)", 
            opacity: 1,
            scale: 1.05,
            x: 10,
            zIndex: 10,
            duration: 0.3,
            ease: "power2.out"
          }, 0.5 * i)
            .to(slides[i], { autoAlpha: 1, duration: 0.3 }, "<")
            // Deactivate previous item - push it back
            .to(prevItem, { 
              color: "rgba(156, 163, 175, 0.5)", 
              filter: "blur(2px)", 
              opacity: 0.4,
              scale: 0.95,
              x: 0,
              zIndex: 1,
              duration: 0.3,
              ease: "power2.out"
            }, "<")
            .to(slides[i - 1], { autoAlpha: 0, duration: 0.3 }, "<")
        }
      })

      // Animate progress bar fill
      tl.to(fillRef.current, {
        scaleY: 1,
        ease: "none",
        duration: tl.duration(),
      }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="h-screen bg-bg-light dark:bg-bg-dark flex items-center transition-colors duration-300 overflow-hidden"
      id="services"
    >
      <div className="w-full h-full flex flex-col lg:flex-row items-center">
        {/* Header - Above on mobile, integrated on desktop */}
        <div className="lg:hidden px-6 md:px-12 py-8">
          <p className="text-sm uppercase tracking-widest text-primary-orange mb-4 font-semibold">
            SERVICE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light leading-tight">
            We make your <span className="font-serif italic">complex ideas</span> simple and beautiful.
          </h2>
        </div>

        {/* LEFT - Service List */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:pl-20 lg:pr-8">
          {/* Header for desktop */}
          <div className="hidden lg:block mb-8">
            <p className="text-sm uppercase tracking-widest text-primary-orange mb-4 font-semibold">
              SERVICE
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark dark:text-text-light leading-tight max-w-xl">
              We make your <span className="font-serif italic">complex ideas</span> simple and beautiful.
            </h2>
          </div>

          <ul className="space-y-0">
            {services.map((service, i) => (
              <li 
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="relative py-3 md:py-4 border-b border-gray-300 dark:border-gray-700 cursor-pointer transition-all origin-left"
                style={{ willChange: 'transform, filter, opacity' }}
              >
                <div className="flex items-center">
                  {/* Active indicator line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-orange opacity-0" 
                       style={{ opacity: i === 0 ? 1 : 0 }} />
                  
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {service.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Line - Hidden on mobile */}
        <div className="hidden lg:flex w-1 bg-gray-300 dark:bg-gray-700 relative self-center h-[50vh] max-h-[400px]">
          <div 
            ref={fillRef} 
            className="absolute w-full bg-primary-orange top-0"
            style={{ height: '100%' }}
          />
        </div>

        {/* RIGHT - Images */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-[70vh] max-h-[500px] flex items-center justify-center px-6 md:px-12 lg:px-8">
          <div className="relative w-full h-full max-w-lg">
            {services.map((service, i) => (
              <div
                key={i}
                ref={(el) => (slidesRef.current[i] = el)}
                className="absolute inset-0 opacity-0 invisible flex items-center justify-center"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-xl">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={500}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
