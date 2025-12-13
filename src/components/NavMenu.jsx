import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { IoClose } from 'react-icons/io5'
import { FaInstagram, FaLinkedin, FaYoutube, FaDiscord } from 'react-icons/fa'

const NavMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null)
  const linksRef = useRef(null)
  const subLinksRef = useRef(null)
  const imageRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const menu = menuRef.current
    const links = linksRef.current
    const subLinks = subLinksRef.current
    const image = imageRef.current
    const footer = footerRef.current

    if (isOpen) {
      // Open animation
      gsap.set(menu, { display: 'flex' })
      
      const tl = gsap.timeline()
      
      tl.to(menu, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      .fromTo(
        links.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.1'
      )
      .fromTo(
        subLinks.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .fromTo(
        image,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .fromTo(
        footer,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      )
    } else {
      // Close animation
      gsap.to(menu, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' })
        },
      })
    }
  }, [isOpen])

  const mainLinks = [
    { name: 'Home', path: '/', isHash: false },
    { name: 'About', path: '#about', isHash: true },
    { name: 'Projects', path: '#projects', isHash: true },
    { name: 'Services', path: '#services', isHash: true },
    { name: 'Blogs', path: '#blog', isHash: true },
    { name: 'Contact Us', path: '#contact', isHash: true }
  ]
  const subMenuLinks = ['Design Agency', 'Link Two', 'Link Three', 'Link Four', 'Link Five']

  const handleLinkClick = (link) => {
    if (link.isHash) {
      // For hash links, smooth scroll to section
      const element = document.querySelector(link.path)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md hidden opacity-0"
      style={{ display: 'none' }}
    >
      <div className="container mx-auto h-full px-6 md:px-12 py-6">
        {/* Close Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="text-4xl text-text-dark hover:text-primary-orange transition-colors"
          >
            <IoClose />
          </button>
        </div>

        {/* Menu Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 h-[calc(100%-150px)]">
          {/* Main Navigation */}
          <div ref={linksRef} className="flex flex-col justify-center space-y-4">
            {mainLinks.map((link, index) => (
              <div key={index} className="group relative flex items-center">
                {link.isHash ? (
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link)
                    }}
                    className="text-xl md:text-2xl lg:text-[24px] font-medium text-text-dark opacity-40 hover:opacity-100 hover:scale-110 hover:translate-x-6 origin-left transition-all duration-300"
                    style={{ 
                      fontFamily: 'Inter Variable, Inter, sans-serif',
                      lineHeight: '120%',
                      letterSpacing: '-0.04em'
                    }}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link)}
                    className="text-xl md:text-2xl lg:text-[24px] font-medium text-text-dark opacity-40 hover:opacity-100 hover:scale-110 hover:translate-x-6 origin-left transition-all duration-300"
                    style={{ 
                      fontFamily: 'Inter Variable, Inter, sans-serif',
                      lineHeight: '120%',
                      letterSpacing: '-0.04em'
                    }}
                  >
                    {link.name}
                  </Link>
                )}
                {/* Horizontal line on right - appears on hover */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-0 bg-primary-orange group-hover:w-24 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Sub Links */}
          <div ref={subLinksRef} className="flex flex-col justify-center space-y-3">
            {subMenuLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                onClick={onClose}
                className="text-lg text-gray-600 hover:text-primary-orange transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Image */}
          <div ref={imageRef} className="hidden md:flex items-center justify-center">
            <div className="w-full h-96 rounded-2xl overflow-hidden">
              <img
                src="/images/NavMenuImage.svg"
                alt="Fashion"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="absolute bottom-0 left-0 right-0 bg-primary-orange px-6 md:px-12 py-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Follow Us</span>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-white text-2xl hover:scale-110 transition-transform"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white text-2xl hover:scale-110 transition-transform"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-white text-2xl hover:scale-110 transition-transform"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="text-white text-2xl hover:scale-110 transition-transform"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavMenu
