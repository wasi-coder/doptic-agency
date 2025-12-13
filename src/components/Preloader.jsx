import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0)
  const preloaderRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Counter animation
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Animate text
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
    }

    return () => clearInterval(counterInterval)
  }, [])

  useEffect(() => {
    if (counter === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete()
        },
      })

      tl.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }).to(
        preloaderRef.current,
        {
          y: '-100%',
          duration: 0.8,
          ease: 'power3.inOut',
        },
        '-=0.3'
      )
    }
  }, [counter, onComplete])

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] bg-bg-light flex flex-col items-center justify-center"
    >
      <div ref={textRef} className="text-center mb-8">
        <h1 className="text-6xl md:text-8xl font-bold text-text-dark mb-4">
          <span className="inline-block">D</span>
          <span className="inline-block">o</span>
          <span className="inline-block">p</span>
          <span className="inline-block">t</span>
          <span className="inline-block">i</span>
          <span className="inline-block">c</span>
        </h1>
      </div>
      <div className="text-4xl md:text-6xl font-bold text-primary-orange">
        {counter}%
      </div>
    </div>
  )
}

export default Preloader
