import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'An agency defining style and digital culture.'

  // Define Navbar Height: Use 70px (or adjust as necessary)
  const NAVBAR_HEIGHT = 70; 

  useEffect(() => {
    // 1. Kill any existing triggers/timelines
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    let tlInitial = gsap.timeline()
    let tlScroll = gsap.timeline()
    

    // --- Initial Load Animation (No Changes) ---
    
    // Reset text state
    setDisplayedText('')
    
    // Set initial states
    gsap.set(['#hero-bottom-left', '#hero-image-container'],
       { opacity: 0, x: 0 })
    
    // Typewriter effect for first part
    const textObj = { value: 0 }
    const firstPart = 'An agency defining style and '
    const secondPart = 'digital culture.'
  
    // Type first part
    tlInitial.to(textObj, {
      value: firstPart.length,
      duration: firstPart.length * 0.05,
      onUpdate: function() {
        setDisplayedText(fullText.slice(0, Math.floor(textObj.value)))
      },
      ease: 'none'
    })
    
    // Type "digital culture."
    .to(textObj, {
      value: fullText.length,
      duration: secondPart.length * 0.1,
      onUpdate: function() {
        setDisplayedText(fullText.slice(0, Math.floor(textObj.value)))
      },
      ease: 'power1.inOut',
    })
    
    // Bottom left text comes from right
    .fromTo('#hero-bottom-left', 
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2, ease: 'power3.out' },
      '-=0.5'
    )
    
    // Bottom right image comes from left
    .fromTo('#hero-image-container', 
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2, ease: 'power3.out' },
      '<'
    )

    // --- Scroll Trigger Animation (Responsive Calculations) ---

    const setupScrollAnimation = () => {
      const box = document.querySelector('#hero-image-container')
      if (!box) return;

      // Ensure the image container's latest dimensions are used
      const rect = box.getBoundingClientRect();
      
      // Calculate the NEW effective viewport height (Viewport minus Navbar Height)
      const effectiveViewportHeight = window.innerHeight - NAVBAR_HEIGHT;
      
      // 1. Calculate the offset to move the image's center to the center of the effective viewport
      const targetCenterY = (effectiveViewportHeight / 2) + NAVBAR_HEIGHT / 2;
      
      const centerX = (window.innerWidth / 2) - (rect.left + rect.width / 2);
      const centerY = targetCenterY - (rect.top + rect.height / 2);
      
      // 2. Calculate the NEW scale needed to cover the effective viewport
      const scaleX = window.innerWidth / rect.width;
      const scaleY = effectiveViewportHeight / rect.height;
      const targetScale = Math.max(scaleX, scaleY); 
      
      // Re-initialize the scroll timeline to apply new calculated values
      if (tlScroll) tlScroll.kill(); 
      tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top', 
          end: '+=2000',    
          pin: true,        
          scrub: 1,         
          markers: false    
        }
      })
      
      tlScroll
        // Phase 1: Move and Fade Texts Out
        .fromTo('#hero-bottom-left', 
          { x: 0, opacity: 1 },
          { x: '-100vw', opacity: 0, duration: 1.5, ease: 'power2.out' },
          0
        ) 
        
        .to('#hero-top', {
          y: -window.innerHeight / 2, 
          opacity: 0,
          duration: 1.5, 
          ease: 'power2.out'
        }, 0)
        
        // Phase 2: Center the Image 
        .to('#hero-image-container', {
          x: centerX - 10,
          y: centerY, 
          duration: 1.5
        }, 0.5) 

        // Phase 3: Scale the Image to Fill Screen
        .to('#hero-image-container', {
          scale: targetScale,
          duration: 1.5,
          transformOrigin: '50% 50%'
        }, 1)

      // Refresh ScrollTrigger to update all calculations
      ScrollTrigger.refresh();
    }
    
    // Run the setup when component mounts
    setupScrollAnimation();

    // Add event listener to re-calculate on resize with debounce and RAF
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Use requestAnimationFrame to ensure DOM has reflowed
        requestAnimationFrame(() => {
          setupScrollAnimation();
        });
      }, 100); // Debounce by 100ms
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      tlInitial.kill()
      if (tlScroll) tlScroll.kill()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="min-h-screen bg-bg-light dark:bg-bg-dark pt-32 pb-20 px-6 md:px-12 relative overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto">
        {/* Top Row - Typewriter Text */}
        <div id="hero-top" className="mb-16 md:mb-24" style={{ minHeight: '330px' }}>
          {/* RESPONSIVE HEADLINE:
            Text size is now controlled by Tailwind classes:
            text-4xl (mobile) -> md:text-6xl -> lg:text-7xl -> xl:text-[128px] 
          */}
          <h1 id="hero-headline" 
            className="leading-tight text-text-dark dark:text-text-light 
                       text-4xl md:text-6xl lg:text-7xl xl:text-[128px]" 
            style={{ letterSpacing: '-4%', lineHeight: '120%' }}>
            {displayedText.split(' ').map((word, index) => {
              const isLastPart = word.includes('digital') || word.includes('culture')
              return (
                <span key={index}>
                  {word.includes('digital') && <br className="lg:block" />}
                  <span 
                    data-word={word}
                    className={isLastPart ? 'font-serif italic' : ''}
                    // RESPONSIVE INLINE STYLES: 
                    // Use CSS variables or Tailwind for complex style variations if needed, 
                    // but keeping the font changes inline here for precision.
                    style={isLastPart ? {
                      fontFamily: 'Libre Caslon Text',
                      fontWeight: 400,
                      // Adjusted size for the italic part to scale with its non-italic counterpart
                      fontSize: '0.8em', 
                      fontStyle: 'italic',
                      letterSpacing: '-4%',
                      lineHeight: '120%'
                    } : {
                      fontFamily: 'Inter Variable',
                      fontWeight: 500,
                      // Use inherit size so it follows the h1's responsive classes
                      fontSize: 'inherit', 
                      letterSpacing: '-4%',
                      lineHeight: '120%'
                    }}
                  >
                    {word}{' '}
                  </span>
                </span>
              )
            })}
          </h1>
        </div>

        {/* Bottom Row - Split into Left and Right */}
        <div id="hero-bottom" className="flex flex-col lg:flex-row gap-12 items-start ">
          {/* Bottom Left - Text and Button */}
          <div id="hero-bottom-left" className="w-full lg:w-1/2 ">
            <p id="hero-subtext" className="text-base md:text-xl text-gray-700 dark:text-text-secondary mb-8 max-w-xl">
              We create clean designs that turn visitors into paying clients. You
              get a professional look that makes selling your services very easy.
            </p>
            <div id="hero-cta">
              <MagneticButton className="bg-primary-orange text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all">
                View Our Work
              </MagneticButton>
            </div>
          </div>

          {/* Bottom Right - Image */}
          <div id="hero-bottom-right" className="w-full lg:w-1/2 flex justify-end items-center">
            {/* RESPONSIVE IMAGE CONTAINER:
              Using Tailwind's aspect-ratio and max-width classes instead of fixed pixels.
            */}
            <div 
              id="hero-image-container" 
              className="relative w-full max-w-lg lg:max-w-[630px] aspect-video" 
              // Removed fixed pixel styles here
            >
              <div className="image-container rounded-3xl overflow-hidden shadow-2xl will-change-transform w-full h-full">
                <img
                  src="/images/homepageImage.svg"
                  alt="Conference Room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero