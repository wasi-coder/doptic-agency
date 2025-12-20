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
            // Reset text state
            setDisplayedText('')

            // Initial Load Animation (Typewriter Effect)
            gsap.set([bottomLeftRef.current, imageContainerRef.current, badgeRef.current, scrollIconRef.current],
                { opacity: 0, x: 0 })

            let tlInitial = gsap.timeline()

            const textObj = { value: 0 }
            const firstPart = 'An agency defining style and '
            const secondPart = 'digital culture.'

            tlInitial.to(textObj, {
                value: firstPart.length, 
                duration: firstPart.length * 0.05,
                onUpdate: function() { 
                    setDisplayedText(fullText.slice(0, Math.floor(textObj.value))) 
                },
                ease: 'none'
            })
            .to(textObj, {
                value: fullText.length, 
                duration: secondPart.length * 0.1,
                onUpdate: function() { 
                    setDisplayedText(fullText.slice(0, Math.floor(textObj.value))) 
                },
                ease: 'power1.inOut',
            })
            .fromTo(bottomLeftRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 2, ease: 'power3.out' },
                '-=0.5'
            )
            .fromTo(imageContainerRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 2, ease: 'power3.out' },
                '<0.5' 
            )
            .fromTo(badgeRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
                '>-1'
            )
            .fromTo(scrollIconRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
                '<0.2'
            )

            // Continuous rotation for scroll-down icon
            gsap.to(scrollIconRef.current, {
                rotation: 360,
                duration: 8,
                ease: 'none',
                repeat: -1
            })

            // Scroll Trigger Animation (Responsive Logic)
            let mm = gsap.matchMedia()

            // Desktop
            mm.add("(min-width: 1024px)", () => {
                if (!bottomRowRef.current || !topTextRef.current || !innerImageRef.current) {
                    console.error("Missing required elements for desktop animation")
                    return
                }

                const innerRect = innerImageRef.current.getBoundingClientRect()

                const targetScaleX = window.innerWidth / innerRect.width
                const targetScaleY = window.innerHeight / innerRect.height
                const targetScale = Math.max(targetScaleX, targetScaleY)

                const scaledWidth = innerRect.width * targetScale
                const scaledHeight = innerRect.height * targetScale

                const currentCenterX = innerRect.left + innerRect.width / 2
                const currentCenterY = innerRect.top + innerRect.height / 2

                const targetLeft = 30
                const targetTop = 60

                const targetCenterX = targetLeft + scaledWidth / 2
                const targetCenterY = targetTop + scaledHeight / 2

                const targetX = targetCenterX - currentCenterX
                const targetY = targetCenterY - currentCenterY

                const moveUpDistanceTop = -topTextRef.current.offsetHeight - 50
                const moveLeftDistanceBottom = -(bottomRowRef.current.getBoundingClientRect().width + 100)

                const SCALE_DURATION = window.innerHeight * 1.2
                const HOLD_DURATION = window.innerHeight * 0.3
                const TOTAL_DURATION = SCALE_DURATION + HOLD_DURATION

                let tlDesktop = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: `+=${TOTAL_DURATION}`,
                        pin: true,
                        scrub: 0.8,
                        pinSpacing: false,
                        anticipatePin: 1,
                        markers: false, // CHANGED: Set to false to prevent DOM manipulation issues
                    }
                })

                tlDesktop
                    .set(bottomLeftRef.current, { opacity: 1 }, 0)
                    .to(topTextRef.current, {
                        y: moveUpDistanceTop,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, 0)
                    .to(bottomLeftRef.current, {
                        x: moveLeftDistanceBottom,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, 0)
                    .to(badgeRef.current, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, 0)
                    .to(scrollIconRef.current, {
                        y: moveUpDistanceTop,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, 0)
                    .set(innerImageRef.current, {
                        transformOrigin: 'center center'
                    }, 0)
                    .to(innerImageRef.current, {
                        scale: targetScale,
                        x: targetX,
                        y: targetY,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    }, 0)
                    .to({}, { duration: 0.5 }, 0.5)
            })

            // Mobile/Tablet
            mm.add("(max-width: 1023px)", () => {
                if (!imageContainerRef.current) return

                const rect = imageContainerRef.current.getBoundingClientRect()
                const targetCenterY = (window.innerHeight / 2)
                const centerX = (window.innerWidth / 2) - (rect.left + rect.width / 2)
                const centerY = targetCenterY - (rect.top + rect.height / 2)

                const SCROLL_DISTANCE = window.innerHeight * 1.2

                let tlMobile = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: `+=${SCROLL_DISTANCE}`,
                        pin: true,
                        scrub: 1,
                        markers: false
                    }
                })

                tlMobile.to(imageContainerRef.current, {
                    x: centerX,
                    y: centerY,
                    duration: 0.5,
                    ease: 'power1.in'
                }, 0)

                tlMobile
                    .to(topTextRef.current, {
                        opacity: 0,
                        y: -window.innerHeight * 0.3,
                        duration: 0.5,
                        ease: 'power1.in'
                    }, 0.5)
                    .to(bottomLeftRef.current, {
                        opacity: 0,
                        y: -window.innerHeight * 0.3,
                        duration: 0.5,
                        ease: 'power1.in'
                    }, 0.5)
                    .to(imageContainerRef.current, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.5,
                        ease: 'power1.out'
                    }, 1.0)
                    .to(badgeRef.current, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.5,
                        ease: 'power1.out',
                    }, 1.0)
                    .to(scrollIconRef.current, {
                        opacity: 0,
                        y: -window.innerHeight * 0.3,
                        duration: 0.5,
                        ease: 'power1.out',
                    }, 1.0)
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
            className="w-full bg-bg-light dark:bg-bg-dark pt-[60px] sm:pt-[90px] lg:pt-[120px] pb-20 px-[20px] md:px-[30px] lg:px-[40px] relative min-h-screen transition-colors duration-300"
        >
            <div className="w-full">
                {/* Top Row */}
                <div ref={topTextRef} className="mb-6 md:mb-14 will-change-transform relative" style={{ minHeight: '330px' }}>
                    {/* Scroll Down Icon */}
                    <div
                        ref={scrollIconRef}
                        className="absolute top-0 right-0 pointer-events-none will-change-transform"
                        style={{ zIndex: 1000 }}
                    >
                        <img
                            src="/logos/scrolldown.svg"
                            alt="Scroll down"
                            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                        />
                    </div>

                    <h1 className="text-[#0e0e0e] dark:text-[#e2e2e2] text-4xl md:text-6xl lg:text-5xl xl:text-[128px]"
                        style={{
                            fontFamily: 'Inter Variable, Inter, sans-serif',
                            fontWeight: 500,
                            lineHeight: '120%',
                            letterSpacing: '-0.04em'
                        }}>
                        {displayedText.split(' ').map((word, index) => {
                            const isLastPart = word.includes('digital') || word.includes('culture')
                            const shouldBreak = word.includes('style')
                            return (
                                <span key={index}>
                                    {shouldBreak && <br className="lg:block" />}
                                    <span
                                        className={isLastPart ? 'font-serif italic' : ''}
                                        style={isLastPart ? {
                                            fontFamily: 'Libre Caslon Text, serif',
                                            fontWeight: 400,
                                            fontSize: '0.8em',
                                            fontStyle: 'italic',
                                            letterSpacing: '-0.04em',
                                            lineHeight: '120%'
                                        } : {
                                            fontFamily: 'Inter Variable, Inter, sans-serif',
                                            fontWeight: 500,
                                            fontSize: 'inherit',
                                            letterSpacing: '-0.04em',
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

                {/* Bottom Row */}
                <div ref={bottomRowRef} className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Bottom Left */}
                    <div ref={bottomLeftRef} className="w-full lg:w-1/2 will-change-transform">
                        <p className="text-base md:text-xl text-gray-700 dark:text-[#e2e2e2b2] mb-8 max-w-xl"
                            style={{
                                fontFamily: 'Inter Variable, Inter, sans-serif',
                                fontWeight: 400,
                                lineHeight: '150%'
                            }}>
                            We create clean designs that turn visitors into paying clients. You
                            get a professional look that makes selling your services very easy.
                        </p>
                        <div>
                            <MagneticButton 
                                className="bg-primary-orange text-white px-8 py-4 text-lg font-medium hover:bg-opacity-90 transition-all"
                                style={{
                                    fontFamily: 'Inter Variable, Inter, sans-serif',
                                    fontWeight: 500
                                }}>
                                View Our Work
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Bottom Right - Image */}
                    <div className="w-full lg:w-1/2 flex justify-end items-center">
                        <div
                            ref={imageContainerRef}
                            className="relative w-full max-w-lg lg:max-w-[630px] aspect-video will-change-transform"
                        >
                            <div ref={innerImageRef} className="image-container overflow-hidden shadow-2xl w-full h-full">
                                <img
                                    src="/images/homepageImage.svg"
                                    alt="Agency work showcase"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Circular Badge - Add ref */}
                <div ref={badgeRef}>
                    {/* Your CircularBadge component if you have one */}
                </div>
            </div>
        </section>
    )
}

export default Hero