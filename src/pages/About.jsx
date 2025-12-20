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

  const FONT_INTER = 'Inter Variable, sans-serif'
  const FONT_CASLON = 'Libre Caslon Text, serif'

useEffect(() => {
    const statement = statementRef.current
    const image = imageRef.current
    const marquee = marqueeRef.current
    const marqueeInner = marqueeInnerRef.current

    // Using gsap.context for organized cleanup
    let ctx = gsap.context(() => {
        const PIN_DURATION = 750
        const images = ['#about-img-1', '#about-img-2', '#about-img-3']
        const fadeDuration = 0.5

        // 1. Statement Fade-In Animation
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
                },
            }
        )

        // 2. Image Parallax
        gsap.to(image, {
            y: -50,
            scrollTrigger: {
                trigger: aboutRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        })

        // 3. Marquee Auto-Scroll (captured within ctx, so ctx.revert() will kill it)
        gsap.to(marqueeInner, { // Removed 'const autoScroll =' as it's not strictly necessary with ctx.revert()
            xPercent: -50,
            duration: 30,
            ease: 'none',
            repeat: -1,
        })

        // 4. Marquee Scroll-Triggered Positioning (Pinning and Horizontal Move)
        ScrollTrigger.create({
            trigger: aboutRef.current,
            start: 'top top',
            end: `+=${PIN_DURATION}`,
            pin: true,
            scrub: 1,
            pinSpacing: true, // Ensure proper spacing so next section doesn't overlap
            onUpdate: self => {
                // Horizontal parallax for the entire marquee container
                const xPos = gsap.utils.interpolate(-100, 100, self.progress)
                gsap.set(marquee, { x: `${xPos}vw` })
            },
        })

        // 5. Auto Image Cross-Fade Timeline (changes every 1 second)
        gsap.timeline({
            repeat: -1,
            repeatDelay: 0
        })
        .to(images[0], { opacity: 0, duration: fadeDuration }, 1)
        .to(images[1], { opacity: 1, duration: fadeDuration }, 1)
        .to(images[2], { opacity: 0, duration: fadeDuration }, 2)
        .to(images[0], { opacity: 1, duration: fadeDuration }, 2)
        .to(images[2], { opacity: 0, duration: fadeDuration }, 3)
        .to(images[1], { opacity: 1, duration: fadeDuration }, 3)

    }, aboutRef)

    // FIX APPLIED HERE: The cleanup function now correctly calls ctx.revert()
    return () => {
        // This line ensures all animations (including autoScroll) and ScrollTriggers
        // created within the context are properly killed when the component unmounts.
        ctx.revert() 
    }
}, [])

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-bg-light dark:bg-bg-dark px-6 py-20 transition-colors duration-300"
    >
      {/* Marquee */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 rotate-[5deg]">
        <div ref={marqueeRef} style={{ width: '200%' }}>
          <div
            ref={marqueeInnerRef}
            className="flex w-[200%] whitespace-nowrap bg-[#FF4920] py-6"
          >
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="mx-8 text-[48px] font-normal text-white"
                style={{ fontFamily: 'Italiana, serif' }}
              >
                About us •
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center">
        {/* Headline */}
        <div className="mb-14 max-w-[900px] text-center">
          <h2
            ref={statementRef}
            className="text-[48px] font-medium leading-[1.2] text-text-dark dark:text-text-light"
            style={{ fontFamily: FONT_INTER }}
          >
            Turning ambitious ideas into high-impact digital reality{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: FONT_CASLON }}
            >
              through expert craft
            </span>
            , clarity, and collaboration.
          </h2>
        </div>

        {/* Image – MID SIZE APPLIED TO ALL SCREENS */}
        <div ref={imageRef} className="relative z-20">
          <div className="relative w-[260px] aspect-[410/520] overflow-hidden rounded-2xl shadow-2xl">
            <img
              id="about-img-1"
              src="/images/aboutusimage1.svg"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 1 }}
            />
            <img
              id="about-img-2"
              src="/images/aboutusimage2.svg"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0 }}
            />
            <img
              id="about-img-3"
              src="/images/aboutusimage1.svg"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-lime-500/20" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
