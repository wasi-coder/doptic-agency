import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    // Standard size constants
    const baseSize = 32; // The starting size of your circle

    // Quick setters for snappy movement
    const followerX = gsap.quickTo(follower, "x", { duration: 0.7, ease: "power3.out" })
    const followerY = gsap.quickTo(follower, "y", { duration: 0.7, ease: "power3.out" })
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power2.out" })
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power2.out" })

    const handleMouseMove = (e) => {
      cursorX(e.clientX)
      cursorY(e.clientY)
      followerX(e.clientX)
      followerY(e.clientY)
    }

    // --- Interaction Logic ---

    // 1. Text Hover: Enlarge to 1.8x the radius (Base 32px * 1.8 = ~58px)
    // We animate width/height instead of scale to keep edges smooth
    const onTextEnter = () => {
      gsap.to(follower, {
        width: baseSize * 10, 
        height: baseSize * 10,
        duration: 0.5,
        ease: "expo.out" // Smoother, more premium feel
      })
    }

    // 2. Image Hover: Glass Zoom
    const onImageEnter = () => {
      gsap.to(follower, {
        width: baseSize * 1.5,
        height: baseSize * 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(1px) saturate(180%)", 
        border: "1px solid rgba(255, 255, 255, 0.4)",
        mixBlendMode: "normal",
        duration: 0.6,
        ease: "expo.out"
      })
    }

    // 3. Reset
    const onLeave = () => {
      gsap.to(follower, {
        width: baseSize,
        height: baseSize,
        backgroundColor: "white",
        backdropFilter: "blur(0px)",
        border: "none",
        mixBlendMode: "difference",
        duration: 0.5,
        ease: "expo.out"
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span, li, a, button')
    const imageElements = document.querySelectorAll('img, .project-image')

    textElements.forEach(el => {
      el.addEventListener('mouseenter', onTextEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    imageElements.forEach(el => {
      el.addEventListener('mouseenter', onImageEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      textElements.forEach(el => {
        el.removeEventListener('mouseenter', onTextEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      imageElements.forEach(el => {
        el.removeEventListener('mouseenter', onImageEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Small Center Dot */}
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 bg-white mix-blend-difference rounded-full z-[10000]"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
      {/* Large Follower Circle */}
      <div 
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 bg-white mix-blend-difference rounded-full z-[9999] flex items-center justify-center"
        style={{ 
          transform: 'translate3d(-50%, -50%, 0)',
          // Optimization: force GPU rendering for smoothness
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased'
        }}
      />
    </>
  )
}

export default CustomCursor