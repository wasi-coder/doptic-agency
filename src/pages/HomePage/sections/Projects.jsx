import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../../../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const progressBarRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(1)

  const projects = [
    {
      id: 1,
      label: 'PROJECT 01',
      title: 'Redefining Urban',
      titleHighlight: 'Fashion',
      description: 'We transformed a local label into a global brand. Our strategic design increased conversion rates and customer loyalty instantly.',
      image: '/images/projectsimage1.svg',
      dimensions: '1290 Fill × 640 Hug'
    },
    {
      id: 2,
      label: 'PROJECT 02',
      title: 'Scaling Enterprise',
      titleHighlight: 'SaaS',
      description: 'A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.',
      image: '/images/projectsimage2.svg',
      dimensions: '1290 Fill × 640 Hug'
    },
    {
      id: 3,
      label: 'PROJECT 03',
      title: 'Modern Housing',
      titleHighlight: 'Solutions',
      description: 'A property management app for Nesto that automates tenant requests and streamlines maintenance workflows.',
      image: '/images/projectsimage3.svg',
      dimensions: '1290 Fill × 640 Hug'
    }
  ]

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    const progressBar = progressBarRef.current

    if (!track || !container || typeof window === 'undefined') return

    // Calculate total scrollable width
    const slideWidth = window.innerWidth
    const totalSlides = projects.length
    const totalWidth = slideWidth * (totalSlides - 1)

    const scrollTriggerInstance = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
        pin: true,
        scrub: 1,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress
          setProgress(prog)

          // Update current slide
          const slideProgress = prog * totalSlides
          const currentIndex = Math.min(Math.floor(slideProgress) + 1, totalSlides)
          setCurrentSlide(currentIndex)
        },
      }
    })

    return () => {
      scrollTriggerInstance.kill()
      scrollTriggerInstance.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      data-horizontal-scroll="true"
      className="h-screen overflow-hidden bg-bg-light dark:bg-bg-dark transition-colors duration-300 relative"
      id="projects"
    >
      <div ref={trackRef} className="flex h-full">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="min-w-full h-full flex items-center justify-center"
          >
            {/* Full Screen Container */}
            <div className="w-full h-full bg-bg-light dark:bg-bg-dark flex flex-col lg:flex-row px-8 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16">
              {/* Left Side - Text Content */}
              <div className="w-full lg:w-1/2 flex flex-col justify-start items-start pr-0 lg:pr-12">
                <span
                  className="text-xs md:text-sm uppercase tracking-wider text-text-dark dark:text-text-light mb-8"
                  style={{
                    fontFamily: 'Inter Variable, Inter, sans-serif',
                    fontWeight: 500
                  }}
                >
                  {project.label}
                </span>

                <h2
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-text-dark dark:text-text-light leading-tight mb-8"
                  style={{
                    fontFamily: 'Inter Variable, Inter, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {project.titleHighlight ? (
                    <>
                      {project.title}<br />
                      <span
                        style={{
                          fontFamily: 'Italiana, serif',
                          fontWeight: 400,
                          fontSize: '64px',
                          lineHeight: '120%',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {project.titleHighlight}
                      </span>
                    </>
                  ) : (
                    project.title
                  )}
                </h2>

                <p
                  className="text-base md:text-lg text-gray-700 dark:text-text-secondary max-w-md"
                  style={{
                    fontFamily: 'Inter Variable, Inter, sans-serif',
                    fontWeight: 400,
                    lineHeight: '160%'
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Right Side - Image */}
              <div className="w-full lg:w-1/2 flex items-start justify-start pt-0 lg:pt-0">
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar with Counter and Button - at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-bg-light dark:bg-bg-dark border-t border-gray-300 dark:border-gray-700">
        {/* Progress Bar - above the counter and button */}
        <div className="w-full h-1 bg-transparent">
          <div
            ref={progressBarRef}
            className="h-full transition-all duration-100"
            style={{
              width: `${progress * 100}%`,
              backgroundColor: 'rgba(14, 14, 14, 0.4)'
            }}
          />
        </div>

        <div className="px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
          {/* Counter */}
          <div
            className="text-xl md:text-2xl font-medium text-text-dark dark:text-text-light"
            style={{
              fontFamily: 'Inter Variable, Inter, sans-serif',
              fontWeight: 500
            }}
          >
            {currentSlide}/{projects.length}
          </div>

          {/* View All Button */}
          <MagneticButton
            className="bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light px-8 py-3  text-base font-medium hover:opacity-80 transition-all"
            style={{
              fontFamily: 'Inter Variable, Inter, sans-serif',
              fontWeight: 500,
              border: '1px solid rgba(14, 14, 14, 0.4)'
            }}
          >
            View All Project
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

export default Projects
