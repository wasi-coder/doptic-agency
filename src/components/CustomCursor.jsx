import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    const cursorXSetter = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3",
    })
    const cursorYSetter = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3",
    })

    const followerXSetter = gsap.quickTo(follower, "x", {
      duration: 0.6,
      ease: "power3",
    })
    const followerYSetter = gsap.quickTo(follower, "y", {
      duration: 0.6,
      ease: "power3",
    })

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY

      cursorXSetter(x)
      cursorYSetter(y)
      followerXSetter(x)
      followerYSetter(y)
    }

    // Hover effects for interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(follower, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 bg-orange-500 dark:bg-text-light rounded-full z-[9999] dark:mix-blend-difference"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
      <div 
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 border-2 border-orange-500 dark:border-text-light rounded-full z-[9999] dark:mix-blend-difference"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
    </>
  )
}

export default CustomCursor