import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'

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
      //subtitle: 'A bold new identity',
      description: 'We transformed a local label into a global brand. Our strategic design increased conversion rates and customer loyalty instantly.',
      image: '/images/projectsimage1.svg',
      tags: ['PRODUCTION', 'LONDON', 'FASHION']
    },
    {
      id: 2,
      label: 'PROJECT 02',
      title: 'Halo Masterpiece',
      //subtitle: 'Gaming meets art',
      description: 'A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.',
      image: '/images/projectsimage2.svg',
      tags: ['DIGITAL', 'GAMING', 'INTERACTIVE']
    },
    {
      id: 3,
      label: 'PROJECT 03',
      title: 'Future of Mobility',
     // subtitle: 'Innovation in motion',
      description: 'A property management app for Nesto that automates tenant requests and streamlines maintenance workflows.',
      image: '/images/projectsimage3.png',
      tags: ['AUTOMOTIVE', 'DESIGN', 'SUSTAINABILITY']
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
            className="min-w-full h-full flex items-center px-6 md:px-12"
          >
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                  <div className="text-sm font-bold text-primary-orange tracking-widest mb-6 uppercase">
                    {project.label}
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-italiana font-normal mb-2 leading-tight text-text-dark dark:text-text-light">
                    {project.titleHighlight ? (
                      <>
                        {project.title}<br />
                        <span className="font-serif italic">{project.titleHighlight}</span>
                      </>
                    ) : (
                      project.title
                    )}
                  </h2>
                  {project.subtitle && (
                    <p className="text-xl md:text-2xl mb-6 text-gray-600 dark:text-text-secondary">
                      {project.subtitle}
                    </p>
                  )}
                  <p className="text-lg md:text-xl text-gray-700 dark:text-text-secondary mb-8 max-w-xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gray-200 dark:bg-bg-secondary-dark text-sm font-semibold text-text-dark dark:text-text-light rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Content - Image */}
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[400px] lg:h-[600px] object-cover"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={600}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar and Counter */}
      <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <MagneticButton className="bg-primary-orange text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all">
              View All Projects
            </MagneticButton>
            <div className="text-2xl font-bold text-text-dark dark:text-text-light">
              {currentSlide}/{projects.length}
            </div>
          </div>
          <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-primary-orange transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
