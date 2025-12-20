import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'
import MagneticButton from './MagneticButton'

export default function NavMenu({ isOpen, onClose }) {
  const { theme } = useTheme()
  const navigate = useNavigate() 
  const [activeNavItem, setActiveNavItem] = useState(null)
  const [isMiddleVisible, setIsMiddleVisible] = useState(false)
  const [isImageVisible, setIsImageVisible] = useState(false)
  const [activeMiddleItem, setActiveMiddleItem] = useState(null)

  const middleSectionRef = useRef(null)
  const imageRef = useRef(null)
  const leftNavRef = useRef(null)
  const underlineRef = useRef(null)

  //const navItems = ["Home", "About", "Projects", "Services", "Blogs", "Contact Us"]
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact Us", path: "/contact" } // You'll need to create this page too
  ]
  
  const middleItems = ["Link Two", "Link Three", "Link Four", "Link Five"]

  useEffect(() => {
    if (middleSectionRef.current && imageRef.current) {
      gsap.set(middleSectionRef.current, { opacity: 0, x: -20 })
      gsap.set(imageRef.current, { opacity: 0, x: 20 })
    }
  }, [isOpen])

  const handleLeftNavHover = (isHovering) => {
    if (isMiddleVisible) return

    if (middleSectionRef.current) {
      if (isHovering) {
        gsap.to(middleSectionRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        })
      } else {
        gsap.to(middleSectionRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.3,
          ease: "power2.in",
        })
        if (imageRef.current && !isImageVisible) {
          gsap.to(imageRef.current, {
            opacity: 0,
            x: 20,
            duration: 0.3,
            ease: "power2.in",
          })
        }
      }
    }
  }

  const handleMiddleSectionHover = (isHovering) => {
    if (isImageVisible) return

    if (imageRef.current) {
      if (isHovering) {
        gsap.to(imageRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        })
      } else {
        gsap.to(imageRef.current, {
          opacity: 0,
          x: 20,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    }
  }

  const handleNavItemClick = (item, index) => {
    setActiveNavItem(item.name)

    navigate(item.path)
    onClose()

    setIsMiddleVisible(true)

    if (middleSectionRef.current) {
      gsap.to(middleSectionRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    if (underlineRef.current) {
      const targetElement = document.getElementById(`nav-${index}`)
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect()
        const parentRect = leftNavRef.current?.getBoundingClientRect()
        if (parentRect) {
          const top = rect.top - parentRect.top
          gsap.to(underlineRef.current, {
            y: top,
            duration: 0.5,
            ease: "power3.out",
          })
        }
      }
    }
  }

  const handleMiddleItemClick = (item) => {
    setActiveMiddleItem(item)
    setIsImageVisible(true)

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? "bg-bg-dark" : "bg-bg-light"} z-50 overflow-hidden transition-colors duration-300`}>
      {/* Orange decorative border */}
      <div className="absolute top-0 left-0 right-0 h-2 " />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r" />
      <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b " />
      <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-b " />

      <div className="relative h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-2">
            <img
              src="/logos/doptic_logo_light.svg"
              alt="Doptic Logo"
              className="w-[96px] h-[96px] dark:hidden"
            />
            <img
              src="/logos/doptic_logo_dark.svg"
              alt="Doptic Logo"
              className="w-[96px] h-[96px] hidden dark:block"
            />
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton
              className="bg-primary-orange hover:bg-[#e64a2e] text-white font-normal px-6 py-2 "
              onClick={onClose}
            >
              Menu
            </MagneticButton>
            <button
              onClick={onClose}
              className={`w-10 h-10 flex items-center justify-center rounded ${theme === 'dark' ? "hover:bg-gray-800" : "hover:bg-gray-200"} transition-colors`}
              aria-label="Close menu"
            >
              <X className={`w-6 h-6 ${theme === 'dark' ? "text-text-light" : "text-text-dark"}`} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 px-6 md:px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* Left Navigation */}
          <div
            ref={leftNavRef}
            className="space-y-6 relative"
            onMouseEnter={() => handleLeftNavHover(true)}
            onMouseLeave={() => handleLeftNavHover(false)}
          >
            <div
              ref={underlineRef}
              className={`absolute left-0 w-24 h-0.5 ${theme === 'dark' ? "bg-text-light" : "bg-text-dark"} transition-opacity ${activeNavItem ? "opacity-100" : "opacity-0"}`}
              style={{ top: 0 }}
            />

            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  id={`nav-${index}`}
                  onClick={() => handleNavItemClick(item, index)}
                  className={`block text-xl md:text-2xl lg:text-3xl text-left transition-colors ${
                    activeNavItem === item.name
                      ? theme === 'dark'
                        ? "text-text-light"
                        : "text-text-dark"
                      : theme === 'dark'
                        ? "text-gray-400 hover:text-text-light"
                        : "text-gray-500 hover:text-text-dark"
                  }`}
                  style={{
                    fontFamily: 'Inter Variable, Inter, sans-serif',
                    fontWeight: activeNavItem === item.name ? 500 : 400
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Middle Section */}
          <div
            ref={middleSectionRef}
            className="space-y-6"
            onMouseEnter={() => handleMiddleSectionHover(true)}
            onMouseLeave={() => handleMiddleSectionHover(false)}
          >
            <h3
              className={`text-lg font-normal ${theme === 'dark' ? "text-text-light" : "text-text-dark"}`}
              style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontWeight: 500
              }}
            >
              Design Agency
            </h3>
            <nav className="space-y-3">
              {middleItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleMiddleItemClick(item)}
                  className={`block text-base text-left transition-colors ${
                    activeMiddleItem === item
                      ? theme === 'dark'
                        ? "text-text-light"
                        : "text-text-dark"
                      : theme === 'dark'
                        ? "text-gray-400 hover:text-text-light"
                        : "text-gray-500 hover:text-text-dark"
                  }`}
                  style={{
                    fontFamily: 'Inter Variable, Inter, sans-serif',
                    fontWeight: 400
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="flex items-start justify-center md:justify-end">
            <div className="w-[400px] h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden shadow-lg transition-colors duration-300">
              <img
                src="/images/homepageImage.svg"
                alt="Featured"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-primary-orange px-6 md:px-12 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <a
              href="#"
              className="text-white hover:underline text-sm font-normal transition-opacity hover:opacity-80"
              style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-white hover:underline text-sm font-normal transition-opacity hover:opacity-80"
              style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontWeight: 400
              }}
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-white hover:underline text-sm font-normal transition-opacity hover:opacity-80"
              style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Youtube
            </a>
            <a
              href="#"
              className="text-white hover:underline text-sm font-normal transition-opacity hover:opacity-80"
              style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Discord
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
