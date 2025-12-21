import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { useTheme } from '../context/ThemeContext'

export default function NavMenu({ isOpen, onClose }) {
  const { theme } = useTheme()
  const navigate = useNavigate()
  
  const [activeMenuKey, setActiveMenuKey] = useState("Home")
  const [isLocked, setIsLocked] = useState(false)

  const menuContainerRef = useRef(null)
  const contentRef = useRef(null)
  const middleSectionRef = useRef(null)
  const lineRef = useRef(null) 

  const navData = {
    "Home": { path: "/", subs: ["Home_01", "Home_02", "Home_03", "Home_04"] },
    "About": { path: "/about", subs: ["About_01", "About_02", "About_03", "About_04"] },
    "Projects": { path: "/projects", subs: ["Project_01", "Project_02", "Project_03", "Project_04"] },
    "Services": { path: "/services", subs: ["Service_01", "Service_02", "Service_03", "Service_04"] },
    "Blogs": { path: "/blog", subs: ["Blog_01", "Blog_02", "Blog_03", "Blog_04"] },
    "Team": { path: "/team", subs: ["Team_01", "Team_02", "Team_03", "Team_04"] },
    "Contact Us": { path: "/contact", subs: ["Email", "Location", "Inquiry"] }
  }

  const navItems = Object.keys(navData)

  const moveLine = (target) => {
    if (!target || !lineRef.current) return;

    const isMobile = window.innerWidth < 768;
    const { offsetTop, offsetHeight, offsetWidth } = target;

    if (isMobile) {
      // Underline logic for mobile
      gsap.to(lineRef.current, {
        y: offsetTop + offsetHeight + 4,
        x: 0,
        width: offsetWidth,
        height: "2px",
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out"
      });
    } else {
      // Horizontal "Connector" logic for Desktop
      // We position it exactly in the middle of the button height
      gsap.to(lineRef.current, {
        y: offsetTop + (offsetHeight / 2),
        x: offsetWidth + 20, // Moves it to the right of the text
        width: 80, // Length of the line between columns
        height: "1px", // Thinner line for a premium look
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        ease: "expo.out"
      });
    }
  }

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuContainerRef.current, { y: "0%", duration: 0.8, ease: "expo.inOut" })
      // Delay to ensure buttons are rendered before calculating line position
      setTimeout(() => {
        const firstBtn = document.getElementById(`nav-Home`);
        moveLine(firstBtn);
      }, 600);
    } else {
      gsap.to(menuContainerRef.current, { y: "-100%", duration: 0.8, ease: "expo.inOut" })
      setIsLocked(false)
      gsap.set(lineRef.current, { opacity: 0, scaleX: 0 }); // Reset line
    }
  }, [isOpen])

  const handleHover = (name, e) => {
    if (!isLocked) {
      setActiveMenuKey(name)
      moveLine(e.currentTarget)
    }
  }

  const handleMainItemClick = (name, e) => {
    setActiveMenuKey(name)
    setIsLocked(true)
    moveLine(e.currentTarget)
  }

  const handleSubLinkClick = (path) => {
    gsap.to(contentRef.current, { opacity: 0, y: -15, duration: 0.3 })
    setTimeout(() => {
      onClose()
      setTimeout(() => { navigate(path); window.location.reload(); }, 750)
    }, 350)
  }

  return (
    <div ref={menuContainerRef} className={`fixed inset-0 transform -translate-y-full ${theme === 'dark' ? "bg-bg-dark" : "bg-bg-light"} z-[90] overflow-hidden`}>
      <div ref={contentRef} className="relative h-full flex flex-col pt-[80px]">
        
        {/* The Grid Container - Position Relative so lineRef can move inside it */}
        <div className="flex-1 px-[20px] md:px-[60px] py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 relative">
          
          {/* 1st Column: Navigation */}
          <div className="relative flex flex-col items-start">
            
            {/* THE LINE: Single ref used for both mobile and desktop logic */}
            <div 
              ref={lineRef}
              className="absolute left-0 top-0 bg-primary-orange origin-left z-50 pointer-events-none opacity-0"
              style={{ width: '0px' }} 
            />

            <nav className="space-y-6 z-10">
              {navItems.map((name) => (
                <button
                  key={name}
                  id={`nav-${name}`}
                  onMouseEnter={(e) => handleHover(name, e)}
                  onClick={(e) => handleMainItemClick(name, e)}
                  className={`block text-2xl md:text-4xl lg:text-5xl text-left transition-all duration-500 ${
                    activeMenuKey === name
                      ? (theme === 'dark' ? "text-text-light" : "text-text-dark")
                      : (theme === 'dark' ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600")
                  }`}
                  style={{ fontFamily: 'Inter Variable, sans-serif', fontWeight: activeMenuKey === name ? 600 : 400 }}
                >
                  {name}
                </button>
              ))}
            </nav>
          </div>

          {/* 2nd Column: Categories */}
          <div ref={middleSectionRef} className="space-y-8 md:pl-10">
            <h3 className={`text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 ${theme === 'dark' ? "text-text-light" : "text-text-dark"}`}>
              {activeMenuKey} Categories
            </h3>
            <nav className="space-y-5">
              {navData[activeMenuKey].subs.map((sub) => (
                <button 
                  key={sub} 
                  onClick={() => handleSubLinkClick(navData[activeMenuKey].path)}
                  className={`block text-xl text-left transition-all hover:translate-x-3 duration-300 ${
                    theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </nav>
          </div>

          {/* 3rd Column: Featured Image */}
          <div className="hidden md:flex items-start justify-end">
            <div className="w-[320px] aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-sm overflow-hidden shadow-2xl">
              <img src="/images/homepageImage.svg" alt="Featured" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}