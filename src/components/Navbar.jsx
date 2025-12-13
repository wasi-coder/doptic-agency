import { useEffect, useRef } from 'react'
import MagneticButton from './MagneticButton'
import ThemeToggle from './ThemeToggle'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Navbar = ({ onMenuClick }) => {
  const navRef = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Initial animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    // Scroll animation
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight

      if (currentScrollY > heroHeight * 0.5) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide navbar
          gsap.to(nav, {
            y: -100,
            duration: 0.4,
            ease: 'power2.inOut',
          })
        } else {
          // Scrolling up - show navbar
          gsap.to(nav, {
            y: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          })
        }
      } else {
        // In hero section - always visible
        gsap.to(nav, {
          y: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        })
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
    >
      {/* Container with same padding as Hero section */}
      <div className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        {/* Logo - Left aligned */}
        <div className="flex items-center h-full">
          <img 
            src="/logos/doptic_logo_light.svg" 
            alt="Doptic Logo" 
            className="h-8 md:h-10 lg:h-12 dark:hidden"
            loading="eager"
            decoding="async"
          />
          <img 
            src="/logos/doptic_logo_dark.svg" 
            alt="Doptic Logo" 
            className="h-8 md:h-10 lg:h-12 hidden dark:block"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Menu & Hamburger - Right aligned */}
        <div className="flex items-center gap-4 h-full">
          <ThemeToggle />
          <div className="flex items-center gap-3 h-full">
            <MagneticButton
              onClick={onMenuClick}
              className="bg-primary-orange text-white px-6 py-3 rounded flex items-center gap-2 font-medium hover:bg-opacity-90 transition-all"
            >
              <span>Menu</span>
            </MagneticButton>
            <div className="flex flex-col justify-center gap-[5px]">
              <span className="w-12 h-0.5 bg-text-dark dark:bg-white"></span>
              <span className="w-8 h-0.5 bg-text-dark dark:bg-white"></span>
              <span className="w-4 h-0.5 bg-text-dark dark:bg-white"></span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar