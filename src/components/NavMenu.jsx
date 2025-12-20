import { useState, useRef, useEffect } from "react"
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

  const menuContainerRef = useRef(null)
  const contentRef = useRef(null)
  const middleSectionRef = useRef(null)
  const imageRef = useRef(null)
  const leftNavRef = useRef(null)
  const underlineRef = useRef(null)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact Us", path: "/contact" }
  ]
  
  const middleItems = ["Link Two", "Link Three", "Link Four", "Link Five"]

  // Slide Down/Up Entrance logic
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuContainerRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "expo.inOut"
      })
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.4 }
      )
    } else {
      gsap.to(menuContainerRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "expo.inOut"
      })
    }
  }, [isOpen])

  const handleNavItemClick = (item, index) => {
    setActiveNavItem(item.name)

    // Fade out menu internal content
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: "power2.in"
    })

    // Delay the exit to let the fade finish
    setTimeout(() => {
      onClose(); // This slides the curtain back up

      // Wait for curtain to be near the top before navigation and reload
      setTimeout(() => {
        navigate(item.path);
        
        // Final Reload
        setTimeout(() => {
          window.location.reload();
        }, 50);
      }, 750); 
    }, 350); 
  }

  // Hover logic for Middle/Image sections
  const handleLeftNavHover = (isHovering) => {
    if (isMiddleVisible || !middleSectionRef.current) return
    if (isHovering) {
      gsap.to(middleSectionRef.current, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" })
    } else {
      gsap.to(middleSectionRef.current, { opacity: 0, x: -20, duration: 0.3, ease: "power2.in" })
    }
  }

  return (
    <div 
      ref={menuContainerRef}
      className={`fixed inset-0 transform -translate-y-full ${theme === 'dark' ? "bg-bg-dark" : "bg-bg-light"} z-[90] overflow-hidden transition-colors duration-300`}
    >
      <div ref={contentRef} className="relative h-full flex flex-col pt-[80px]">
        <div className="flex-1 px-[20px] md:px-[30px] lg:px-[60px] py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          
          {/* Left Nav */}
          <div ref={leftNavRef} className="space-y-6 relative" onMouseEnter={() => handleLeftNavHover(true)} onMouseLeave={() => handleLeftNavHover(false)}>
            <div ref={underlineRef} className={`absolute left-0 w-24 h-0.5 ${theme === 'dark' ? "bg-text-light" : "bg-text-dark"} transition-opacity ${activeNavItem ? "opacity-100" : "opacity-0"}`} />
            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  id={`nav-${index}`}
                  onClick={() => handleNavItemClick(item, index)}
                  className={`block text-xl md:text-2xl lg:text-3xl text-left transition-colors ${
                    activeNavItem === item.name
                      ? (theme === 'dark' ? "text-text-light" : "text-text-dark")
                      : (theme === 'dark' ? "text-gray-400 hover:text-text-light" : "text-gray-500 hover:text-text-dark")
                  }`}
                  style={{ fontFamily: 'Inter Variable, sans-serif', fontWeight: activeNavItem === item.name ? 500 : 400 }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Middle Section */}
          <div ref={middleSectionRef} className="space-y-6">
            <h3 className={`text-lg font-medium ${theme === 'dark' ? "text-text-light" : "text-text-dark"}`}>Design Agency</h3>
            <nav className="space-y-3">
              {middleItems.map((item) => (
                <button key={item} className={`block text-base text-left transition-colors ${theme === 'dark' ? "text-gray-400" : "text-gray-500"}`}>{item}</button>
              ))}
            </nav>
          </div>

          {/* Right Image Container */}
          <div ref={imageRef} className="flex items-start justify-center md:justify-end">
            <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img src="/images/homepageImage.svg" alt="Featured" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-primary-orange px-[20px] md:px-[30px] lg:px-[60px] py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {["Instagram", "LinkedIn", "Youtube", "Discord"].map((link) => (
              <a key={link} href="#" className="text-white hover:underline text-sm font-normal">{link}</a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}