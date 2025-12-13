import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const aboutRef = useRef(null)
  const statementRef = useRef(null)
  const imageRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeInnerRef = useRef(null)

  useEffect(() => {
    const statement = statementRef.current
    const image = imageRef.current
    const marquee = marqueeRef.current
    const marqueeInner = marqueeInnerRef.current

    // Statement reveal animation
    gsap.fromTo(
      statement,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statement,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Image parallax
    gsap.to(image, {
      y: -50,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // Continuous auto-scroll animation for the text (independent of scroll)
    const autoScroll = gsap.to(marqueeInner, {
      xPercent: -50,
      duration: 20,
      ease: 'none',
      repeat: -1,
    })

    // Marquee container scroll-controlled animation
    // Container moves from left to right with scroll
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: 'top top',
      end: '+=2000', // Pin for 2000px - ends when marquee reaches right edge
      pin: true,
      pinSpacing: true,
      scrub: 1, // Smooth scrubbing tied directly to scroll
      onUpdate: (self) => {
        // Move container from -100vw to 100vw based on progress (0 to 1)
        const xPos = gsap.utils.interpolate(-100, 100, self.progress)
        gsap.set(marquee, { x: `${xPos}vw` })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      autoScroll.kill()
    }
  }, [])

  return (
    <section
      ref={aboutRef}
      className="min-h-screen bg-black py-20 px-6 md:px-12 relative overflow-hidden"
      id="about"
    >
      {/* Single Diagonal Marquee - container moves with scroll, text always animates */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 rotate-[5deg] overflow-visible pointer-events-none will-change-transform">
        <div
          ref={marqueeRef}
          className="will-change-transform"
          style={{ width: '200%' }}
        >
          <div
            ref={marqueeInnerRef}
            className="flex whitespace-nowrap bg-primary-orange py-6"
            style={{ width: '200%' }}
          >
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-5xl lg:text-[64px] font-normal text-white mx-8"
                style={{ 
                  fontFamily: 'Italiana, serif',
                  lineHeight: '120%',
                  letterSpacing: '-0.02em'
                }}
              >
                About us •
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Main headline - ABOVE the image with transparent effect */}
        <div className="max-w-4xl text-center relative z-20 mix-blend-difference">
          <p
            ref={statementRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6 drop-shadow-lg"
          >
            Igniting creativity through futuristic design,{' '}
            <span className="text-lime-400 italic font-serif">glowing</span>{' '}
            energy, and the pulse of innovation.
          </p>
        </div>

        {/* Centered Image */}
        <div ref={imageRef} className="relative mt-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:w-[410px] h-auto aspect-[410/520]">
            <img
              src="/images/aboutusimage1.svg"
              alt="VR Person"
              className="w-full h-full object-cover"
            />
            {/* Glowing halo effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-lime-500/20" />
          </div>
        </div>

        {/* Description text - BELOW the image */}
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mt-8 drop-shadow-md">
          Where imagination and technology collide in a bold, futuristic aesthetic. Our work blends neon glow, experimental design, and sharp creative strategy.
        </p>
      </div>
    </section>
  )
}

export default About