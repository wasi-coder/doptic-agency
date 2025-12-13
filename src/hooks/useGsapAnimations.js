import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook for GSAP animations
 * Provides reusable animation utilities
 */
export const useGsapAnimations = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh()
  }, [])

  const fadeIn = (element, options = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 1,
        delay: options.delay || 0,
        ease: options.ease || 'power3.out',
        scrollTrigger: options.scrollTrigger,
      }
    )
  }

  const slideIn = (element, options = {}) => {
    const direction = options.direction || 'left'
    const xValue = direction === 'left' ? -100 : 100

    return gsap.fromTo(
      element,
      { opacity: 0, x: xValue },
      {
        opacity: 1,
        x: 0,
        duration: options.duration || 1,
        delay: options.delay || 0,
        ease: options.ease || 'power3.out',
        scrollTrigger: options.scrollTrigger,
      }
    )
  }

  const staggerAnimation = (elements, options = {}) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: options.stagger || 0.1,
        duration: options.duration || 0.8,
        delay: options.delay || 0,
        ease: options.ease || 'power3.out',
        scrollTrigger: options.scrollTrigger,
      }
    )
  }

  const parallax = (element, options = {}) => {
    return gsap.to(element, {
      y: options.distance || 100,
      scrollTrigger: {
        trigger: options.trigger || element,
        start: options.start || 'top bottom',
        end: options.end || 'bottom top',
        scrub: options.scrub !== undefined ? options.scrub : 1,
      },
    })
  }

  return {
    fadeIn,
    slideIn,
    staggerAnimation,
    parallax,
  }
}

export default useGsapAnimations
