import { useEffect, useRef } from 'react'
import ThemeToggle from './ThemeToggle'
import Button from './MagneticButton'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext' // Added this to handle line colors

const Navbar = ({ onMenuClick, menuOpen }) => {
  const { theme } = useTheme()
  const navRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  // 1. Core Logic: Initial Load and Scroll Behavior
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight

      // If menu is open, don't hide the navbar on scroll
      if (menuOpen) return;

      if (currentScrollY > heroHeight * 0.8) {
        gsap.to(nav, { y: -100, duration: 0.4, ease: 'power2.inOut' })
      } else {
        gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.inOut' })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  // 2. Logic Change: Hamburger to X Animation
  useEffect(() => {
    if (menuOpen) {
      // Transform to X
      gsap.to(line1Ref.current, { rotation: 45, y: 4, duration: 0.4, ease: "power2.inOut" })
      gsap.to(line2Ref.current, { rotation: -45, y: -4, duration: 0.4, ease: "power2.inOut" })
    } else {
      // Transform back to Hamburger
      gsap.to(line1Ref.current, { rotation: 0, y: 0, duration: 0.4, ease: "power2.inOut" })
      gsap.to(line2Ref.current, { rotation: 0, y: 0, duration: 0.4, ease: "power2.inOut" })
    }
  }, [menuOpen])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] bg-transparent backdrop-blur-sm"
    >
      <div className="w-full max-w-full h-[80px] mx-auto px-[20px] md:px-[30px] lg:px-[60px]">
        <div className="flex justify-between items-center h-full">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <img 
              src={theme === 'dark' ? "/logos/doptic_logo_dark.svg" : "/logos/doptic_logo_light.svg"} 
              alt="Doptic Logo"
              className="w-[96px] h-[96px]"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-[20px]">
            <ThemeToggle />
            
            <div className="hidden lg:block">
              <Button
                text="Menu"
                fill_background_color="#ff4920"
                onClick={onMenuClick}
                magnetic={true}
              />
            </div>

            {/* Animated Hamburger/X Button */}
            <button 
              onClick={onMenuClick}
              className="group flex flex-col items-center justify-center w-8 h-8 gap-[6px] cursor-pointer z-[110]"
              aria-label="Toggle menu"
            >
              <div 
                ref={line1Ref}
                className={`w-7 h-[2px] transition-colors duration-300 ${
                    menuOpen ? (theme === 'dark' ? 'bg-white' : 'bg-black') : (theme === 'dark' ? 'bg-white' : 'bg-black')
                }`}
              />
              <div 
                ref={line2Ref}
                className={`w-7 h-[2px] transition-colors duration-300 ${
                    menuOpen ? (theme === 'dark' ? 'bg-white' : 'bg-black') : (theme === 'dark' ? 'bg-white' : 'bg-black')
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar