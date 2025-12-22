import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../../../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const heroRef = useRef(null)
    const bottomRowRef = useRef(null)
    const topTextRef = useRef(null)
    const imageContainerRef = useRef(null)
    const innerImageRef = useRef(null)
    const bottomLeftRef = useRef(null)
    const badgeRef = useRef(null)
    const scrollIconRef = useRef(null)
    
    const [displayedText, setDisplayedText] = useState('')
    const fullText = 'An agency defining style and digital culture.'

    useEffect(() => {
        if (!heroRef.current) return

        let ctx = gsap.context(() => {
            setDisplayedText('')

            // =========================================
            // 1. Initial Load Animation
            // =========================================
            gsap.set([bottomLeftRef.current, imageContainerRef.current, badgeRef.current, scrollIconRef.current],
                { opacity: 0, x: 0 })

            let tlInitial = gsap.timeline()
            const textObj = { value: 0 }
            const firstPart = 'An agency defining style and '
            const secondPart = 'digital culture.'

            tlInitial.to(textObj, {
                value: firstPart.length, 
                duration: firstPart.length * 0.05,
                onUpdate: () => setDisplayedText(fullText.slice(0, Math.floor(textObj.value))),
                ease: 'none'
            })
            .to(textObj, {
                value: fullText.length, 
                duration: secondPart.length * 0.1,
                onUpdate: () => setDisplayedText(fullText.slice(0, Math.floor(textObj.value))),
                ease: 'power1.inOut',
            })
            .fromTo(bottomLeftRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 2, ease: 'power3.out' }, '-=0.5')
            .fromTo(imageContainerRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 2, ease: 'power3.out' }, '<0.5')
            .fromTo(badgeRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '>-1')
            .fromTo(scrollIconRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '<0.2')

            gsap.to(scrollIconRef.current, {
                rotation: 360,
                duration: 8,
                ease: 'none',
                repeat: -1
            })

            // =========================================
            // 2. Scroll Trigger Animation
            // =========================================
            let mm = gsap.matchMedia()

            // --- DESKTOP ---
            mm.add("(min-width: 1024px)", () => {
                if (!bottomRowRef.current || !topTextRef.current || !innerImageRef.current) return

                const innerRect = innerImageRef.current.getBoundingClientRect()

                // --- CALCULATION FOR EXACT 30px GAP ---
                // 1. Determine Target Width (Screen - 30px Left - 30px Right = 60px total)
                const targetWidth = window.innerWidth - 260
                
                // 2. Determine Scale Factor
                const targetScale = targetWidth / innerRect.width

                // 3. Determine Translation (X) to Center the Image
                const currentCenterX = innerRect.left + innerRect.width / 2
                const screenCenterX = window.innerWidth / 2
                const moveX = screenCenterX - currentCenterX

                // 4. Determine Translation (Y) to hit Top 50px
                const finalHeight = innerRect.height * targetScale
                const targetCenterY = 50 + (finalHeight / 2)
                const currentCenterY = innerRect.top + innerRect.height / 2
                const moveY = targetCenterY - currentCenterY

                // --- MOVEMENT FOR TEXT ---
                // Move text UP out of view (Fast speed)
                const moveUpDistance = -window.innerHeight * 1.2

                let tlDesktop = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: `+=${window.innerHeight * 1.5}`, // Increased slightly for smoother scroll
                        pin: true, 
                        scrub: 1, 
                        anticipatePin: 1,
                    }
                })

                tlDesktop
                    // Move Top Text UP (Duration 0.4 = Fast)
                    .to(topTextRef.current, {
                        y: moveUpDistance,
                        duration: 0.7,
                        ease: 'power1.in'
                    }, 0)
                    
                    // NOTE: Removed scrollIconRef animation so it stays still

                    // Move Bottom Left Text UP (Duration 0.4 = Fast)
                    .to(bottomLeftRef.current, {
                        y: moveUpDistance,
                        duration: 0.7,
                        ease: 'power1.in'
                    }, 0)

                    // Scale & Move Image (Duration 1.0 = Slower/Normal)
                    .set(innerImageRef.current, { transformOrigin: 'center center' }, 0)
                    .to(innerImageRef.current, {
                        scale: targetScale,
                        x: moveX,
                        y: moveY,
                        duration: 1,
                        ease: 'power1.inOut',
                    }, 0)
            })

            // --- MOBILE ---
            mm.add("(max-width: 1023px)", () => {
                if (!imageContainerRef.current) return
                
                const rect = imageContainerRef.current.getBoundingClientRect()
                const centerX = (window.innerWidth / 2) - (rect.left + rect.width / 2)
                const centerY = (window.innerHeight / 2) - (rect.top + rect.height / 2)
                
                let tlMobile = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: `+=${window.innerHeight}`,
                        pin: true,
                        scrub: 1
                    }
                })
                
                tlMobile.to(imageContainerRef.current, { x: centerX, y: centerY, duration: 0.5 })
                .to([topTextRef.current, bottomLeftRef.current], { opacity: 0, y: -100, duration: 0.5 }, 0.5)
            })

            ScrollTrigger.refresh(true)
        }, heroRef)

        return () => {
            ctx.revert()
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section
            ref={heroRef}
            id="hero-section"
            className="w-full bg-bg-light dark:bg-bg-dark pt-[60px] sm:pt-[90px] lg:pt-[120px] pb-20 px-[20px] md:px-[30px] lg:px-[40px] relative min-h-screen transition-colors duration-300 overflow-hidden"
        >
            {/* Added 'relative' wrapper to position icon correctly independent of text */}
            <div className="w-full relative">
                
                {/* --- FIXED: MOVED ICON OUTSIDE TOP TEXT --- */}
                {/* This allows it to stay still while the text moves up */}
                <div 
                    ref={scrollIconRef} 
                    className="absolute top-0 right-0 pointer-events-none will-change-transform" 
                    style={{ zIndex: 1000 }}
                >
                    <img src="/logos/award.svg" alt="Scroll down" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
                </div>

                {/* Top Row */}
                <div ref={topTextRef} className="mb-6 md:mb-14 will-change-transform relative" style={{ minHeight: '330px' }}>
                    <h1 className="text-[#0e0e0e] dark:text-[#e2e2e2] text-4xl md:text-6xl lg:text-5xl xl:text-[128px]"
                        style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 500, lineHeight: '120%', letterSpacing: '-0.04em' }}>
                        {displayedText.split(' ').map((word, index) => {
                            const isLastPart = word.includes('digital') || word.includes('culture')
                            const shouldBreak = word.includes('style')
                            return (
                                <span key={index}>
                                    {shouldBreak && <br className="lg:block" />}
                                    <span className={isLastPart ? 'font-serif italic' : ''}
                                        style={isLastPart ? { fontFamily: 'Libre Caslon Text, serif', fontWeight: 400, fontSize: '0.8em', fontStyle: 'italic', letterSpacing: '-0.04em', lineHeight: '120%' } 
                                        : { fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 500, fontSize: 'inherit', letterSpacing: '-0.04em', lineHeight: '120%' }}>
                                        {word}{' '}
                                    </span>
                                </span>
                            )
                        })}
                    </h1>
                </div>

                {/* Bottom Row */}
                <div ref={bottomRowRef} className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Bottom Left */}
                    <div ref={bottomLeftRef} className="w-full lg:w-1/2 will-change-transform">
                        <p className="text-base md:text-xl text-gray-700 dark:text-[#e2e2e2b2] mb-8 max-w-xl" style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 400, lineHeight: '150%' }}>
                            We create clean designs that turn visitors into paying clients. You
                            get a professional look that makes selling your services very easy.
                        </p>
                        <div>
                            <MagneticButton className="bg-primary-orange text-white px-8 py-4 text-lg font-medium hover:bg-opacity-90 transition-all"
                                style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 500 }}>
                                View Our Work
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Bottom Right - Image */}
                    <div className="w-full lg:w-1/2 flex justify-end items-center">
                        <div ref={imageContainerRef} className="relative w-full max-w-lg lg:max-w-[630px] aspect-video will-change-transform">
                            <div ref={innerImageRef} className="image-container overflow-hidden shadow-2xl w-full h-full">
                                <img src="/images/homepageImage.svg" alt="Agency work showcase" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={badgeRef}></div>
            </div>
        </section>
    )
}

export default Hero