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

  // UPDATED: Each sub now has its own path
  const navData = {
    "Home": { 
      path: "/", 
      subs: [
        { label: "Home_01", path: "/" },
        { label: "Home_02", path: "/home-02" },
        { label: "Home_03", path: "/home-03" },
        { label: "Home_04", path: "/home-04" }
      ]
    },
    "About": { 
      path: "/about", 
      subs: [
        { label: "About_01", path: "/about" },
        { label: "About_02", path: "/about" },
        { label: "About_03", path: "/about" },
        { label: "About_04", path: "/about" }
      ]
    },
    "Projects": { 
      path: "/projects", 
      subs: [
        { label: "All Projects", path: "/projects/project_01" },
        { label: "Project Details_01", path: "/projects/project_details_01" },
        { label: "Project Details_02", path: "/projects/project_details_02" },
        { label: "Project Details_03", path: "/projects/project_details_03" }
      ]
    },
    "Services": { 
      path: "/services", 
      subs: [
        { label: "Service_01", path: "/services" },
        { label: "Service_02", path: "/services/development" },
        { label: "Service_03", path: "/services/design" },
        { label: "Service_04", path: "/services/support" }
      ]
    },
    "Blogs": { 
      path: "/blog", 
      subs: [
        { label: "Blog Grid_01", path: "/blog" },
        { label: "Blog Standard_02", path: "/blogstandard02" },
        { label: "Blog Post_01", path: "/blogpost01" },
        { label: "Blog_04", path: "/blog/categories" }
      ]
    },
    "Team": { 
      path: "/team", 
      subs: [
        { label: "Team_01", path: "/team" },
        { label: "Design team", path: "/design_team" },
        { label: "Team_02", path: "/team/departments" },
        { label: "Team_03", path: "/team/careers" }
      ]
    },
    "Contact Us": { 
      path: "/contact", 
      subs: [
        { label: "Contact_01", path: "/contact01" },
        { label: "Location", path: "/contact/location" },
        { label: "Inquiry", path: "/contact/inquiry" }
      ]
    }
  }

  const navItems = Object.keys(navData)

  const moveLine = (target) => {
    if (!target || !lineRef.current) return;

    const isMobile = window.innerWidth < 768;
    const { offsetTop, offsetHeight, offsetWidth } = target;

    if (isMobile) {
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
      gsap.to(lineRef.current, {
        y: offsetTop + (offsetHeight / 2),
        x: offsetWidth + 20,
        width: 280,
        height: "1px",
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
      setTimeout(() => {
        const firstBtn = document.getElementById(`nav-Home`);
        moveLine(firstBtn);
      }, 600);
    } else {
      gsap.to(menuContainerRef.current, { y: "-100%", duration: 0.8, ease: "expo.inOut" })
      setIsLocked(false)
      gsap.set(lineRef.current, { opacity: 0, scaleX: 0 });
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

  // UPDATED: Now accepts specific path for each sub
  const handleSubLinkClick = (path) => {
    // Validate path exists
    if (!path) {
      navigate('/not_found');
      onClose();
      return;
    }

    // Fade out animation
    gsap.to(contentRef.current, { opacity: 0, y: -15, duration: 0.3 })
    
    setTimeout(() => {
      onClose()
      setTimeout(() => { 
        navigate(path);// Navigate to specific sub path (no reload needed)
        window.location.reload();
      }, 750)
    }, 350)
  }

  return (
    <div ref={menuContainerRef} className={`fixed inset-0 transform -translate-y-full ${theme === 'dark' ? "bg-bg-dark" : "bg-bg-light"} z-[90] overflow-hidden`}>
      <div ref={contentRef} className="relative h-full flex flex-col pt-[80px]">
        
        <div className="flex-1 px-[20px] md:px-[60px] py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 relative">
          
          {/* 1st Column: Navigation */}
          <div className="relative flex flex-col items-start">
            
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

          {/* 2nd Column: Categories - UPDATED */}
          <div ref={middleSectionRef} className="space-y-8 md:pl-10">
            <h3 className={`text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 ${theme === 'dark' ? "text-text-light" : "text-text-dark"}`}>
              {activeMenuKey} Categories
            </h3>
            <nav className="space-y-5">
              {navData[activeMenuKey].subs.map((sub) => (
                <button 
                  key={sub.label} 
                  onClick={() => handleSubLinkClick(sub.path)}
                  className={`block text-xl text-left transition-all hover:translate-x-3 duration-300 ${
                    theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {sub.label}
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