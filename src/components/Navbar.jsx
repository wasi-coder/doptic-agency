import { useEffect, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Button from './MagneticButton'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Navbar = ({ onMenuClick }) => {
  const navRef = useRef(null)
  const lastScrollY = useRef(0)
  const [menuOpen, setMenuOpen] = useState(false)

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
      {/* Container */}
      <div className=" border w-full max-w-full h-[80px] mx-auto  px-[20px] md:px-[30px] lg:px-[60px]">
        <div className="flex justify-between items-center h-full py-[10px] sm:py-[15px] lg:py-[10px]">
          
          {/* Logo Section - With Dark/Light Mode Support */}
          <div className="flex items-center gap-[4px]">
            <img 
              src="/logos/doptic_logo_light.svg" 
              alt="Doptic Logo Icon"
              className="w-[96px] h-[96px] dark:hidden"
              loading="eager"
              decoding="async"
            />
            <img 
              src="/logos/doptic_logo_dark.svg" 
              alt="Doptic Logo Icon"
              className="w-[96px] h-[96px] hidden dark:block"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Desktop Navigation - Theme Toggle + Button + Hamburger */}
          <div className="hidden lg:flex items-center gap-[20px]">
            <ThemeToggle />
            <Button
              text="Menu"
              text_font_size="16"
              text_font_family="Inter Variable"
              text_font_weight="400"
              text_line_height="20px"
              text_text_align="left"
              text_color="#ffffff"
              fill_background_color="#ff4920"
              padding="8px 20px"
              layout_width="auto"
              border_border_radius="12px"
              onClick={onMenuClick}
              magnetic={true}
            />
            <button 
              onClick={onMenuClick}
              className="cursor-pointer"
              aria-label="Open menu"
            >
               <img 
                src="/images/hamburg.svg" 
                alt="Menu icon"
                className="w-[30px] h-[12px] dark:hidden"
              />
              <img 
                src="/images/hamburgdark.svg" 
                alt="Menu icon"
                className="w-[30px] h-[12px] hiddden dark:block"
              />
            </button>
          </div>

          {/* Mobile - Theme Toggle + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button 
              className="p-2" 
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img 
                src="/images/hamburg.svg" 
                alt="Menu icon"
                className="w-[30px] h-[12px] dark:hidden"
              />
              <img 
                src="/images/hamburgdark.svg" 
                alt="Menu icon"
                className="w-[30px] h-[12px] hiddden dark:block"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:hidden pb-4`}>
          <div className="flex flex-col gap-4">
            <MagneticButton
              text="Menu"
              text_font_size="16"
              text_font_family="Inter Variable"
              text_font_weight="400"
              text_line_height="20px"
              text_text_align="center"
              text_color="#ffffff"
              fill_background_color="#ff4920"
              padding="12px 24px"
              layout_width="100%"
              border_border_radius="12px"
              onClick={onMenuClick}
              magnetic={true}
            />
          </div>
        </nav>
      </div>
    </nav>
  )
}

export default Navbar
