import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'
import CircularBadge from './CircularBadge'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const heroRef = useRef(null)
    const [displayedText, setDisplayedText] = useState('')
    const fullText = 'An agency defining style and digital culture.'

    // The main ScrollTrigger logic is within this effect
    useEffect(() => {
        // A single gsap.context to manage all animations and ensure proper cleanup
        let ctx = gsap.context(() => {

            // Reset text state (important for re-runs during development/hot-reload)
            setDisplayedText('')

            // --- Initial Load Animation (Typewriter Effect) ---
            gsap.set(['#hero-bottom-left', '#hero-image-container', '#hero-circular-badge', '#scroll-down-icon'],
                { opacity: 0, x: 0 })

            let tlInitial = gsap.timeline();

            const textObj = { value: 0 }
            const firstPart = 'An agency defining style and '
            const secondPart = 'digital culture.'

            tlInitial.to(textObj, {
                value: firstPart.length, duration: firstPart.length * 0.05,
                onUpdate: function() { setDisplayedText(fullText.slice(0, Math.floor(textObj.value))) },
                ease: 'none'
            })
            .to(textObj, {
                value: fullText.length, duration: secondPart.length * 0.1,
                onUpdate: function() { setDisplayedText(fullText.slice(0, Math.floor(textObj.value))) },
                ease: 'power1.inOut',
            })
            .fromTo('#hero-bottom-left',
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 2, ease: 'power3.out' },
                '-=0.5'
            )
            .fromTo('#hero-image-container',
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 2, ease: 'power3.out' },
                '<0.5' 
            )
            // Fade in the badge after initial animation
            .fromTo('#hero-circular-badge',
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
                '>-1'
            )
            // Fade in the scroll-down icon
            .fromTo('#scroll-down-icon',
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
                '<0.2'
            );

            // Continuous rotation for scroll-down icon
            gsap.to('#scroll-down-icon', {
                rotation: 360,
                duration: 8,
                ease: 'none',
                repeat: -1
            });


            // --- Scroll Trigger Animation (Responsive Logic) ---
            let mm = gsap.matchMedia();

            // Desktop (Large screens, e.g., > 1024px)
            mm.add("(min-width: 1024px)", () => {
                const bottomRow = document.querySelector('#hero-bottom');
                const topText = document.querySelector('#hero-top');
                const innerImageDiv = document.querySelector('#hero-image-container .image-container');
                
                if (!bottomRow || !topText || !innerImageDiv) {
                    console.error("Missing required elements for desktop animation.");
                    return;
                }

                // --- Calculation for Scale and Movement ---
                const innerRect = innerImageDiv.getBoundingClientRect();

                // Calculate the scale needed to cover the full viewport
                const targetScaleX = window.innerWidth / innerRect.width;
                const targetScaleY = window.innerHeight / innerRect.height;
                const targetScale = Math.max(targetScaleX, targetScaleY); // Scale to cover viewport

                // Calculate scaled dimensions
                const scaledWidth = innerRect.width * targetScale;
                const scaledHeight = innerRect.height * targetScale;

                // Current center of the image
                const currentCenterX = innerRect.left + innerRect.width / 2;
                const currentCenterY = innerRect.top + innerRect.height / 2;

                // Target: image left edge at 30px from screen left, top at 60px from top
                const targetLeft = 30;
                const targetTop = 60;

                // Calculate the center position after scaling to maintain the 30px left gap
                const targetCenterX = targetLeft + scaledWidth / 2;
                const targetCenterY = targetTop + scaledHeight / 2;

                // Calculate how much to move
                const targetX = targetCenterX - currentCenterX;
                const targetY = targetCenterY - currentCenterY;

                // Text movement
                const moveUpDistanceTop = -topText.offsetHeight - 50;
                const moveLeftDistanceBottom = -(bottomRow.getBoundingClientRect().width + 100);

                // Two-phase animation: Phase 1 = scaling, Phase 2 = hold then auto-scroll to next
                const SCALE_DURATION = window.innerHeight * 1.2; // Time for scaling animation
                const HOLD_DURATION = window.innerHeight * 0.3;   // Brief hold after scaling
                const TOTAL_DURATION = SCALE_DURATION + HOLD_DURATION;

                let tlDesktop = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: `+=${TOTAL_DURATION}`,
                        pin: true,
                        scrub: 0.8,
                        pinSpacing: false, // Next section slides in automatically
                        anticipatePin: 1,
                        markers: true,
                    }
                });

                // --- Phase 1: Texts fade, image scales (40% of timeline) ---
                tlDesktop
                    // Ensure bottom-left starts at full opacity
                    .set('#hero-bottom-left', { opacity: 1 }, 0)

                    // 1. Move top text and badge (fade out)
                    .to('#hero-top', {
                        y: moveUpDistanceTop,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, 0)
                    // 2. Bottom-left text moves off-screen to the left, stays visible
                    .to('#hero-bottom-left', {
                        x: moveLeftDistanceBottom,
                        opacity: 1, // Keep visible while moving off-screen
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, 0)
                    .to('#hero-circular-badge', {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, 0)
                    .to('#scroll-down-icon', {
                        y: moveUpDistanceTop,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, 0)

                    // 3. Image transformation - scale from center while moving to final position
                    .set(innerImageDiv, {
                        transformOrigin: 'center center' // Scale from center while translating
                    }, 0)

                    .to(innerImageDiv, {
                        scale: targetScale,
                        x: targetX,
                        y: targetY,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    }, 0)

                    // --- Phase 2: Hold the scaled image (60% of timeline) ---
                    // Empty tween to create hold time before next section appears
                    .to({}, { duration: 0.5 }, 0.5);
            });

            // Mobile/Tablet (Small screens, e.g., < 1024px)
            mm.add("(max-width: 1023px)", () => {

                const box = document.querySelector('#hero-image-container');
                if (!box) return;

                const rect = box.getBoundingClientRect();
                const targetCenterY = (window.innerHeight / 2);
                const centerX = (window.innerWidth / 2) - (rect.left + rect.width / 2);
                const centerY = targetCenterY - (rect.top + rect.height / 2);

                const SCROLL_DISTANCE = window.innerHeight * 1.2; 

                let tlMobile = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: `+=${SCROLL_DISTANCE}`,
                        pin: true,
                        scrub: 1,
                        markers: false
                    }
                });

                // Move image to center (Phase 1)
                tlMobile.to('#hero-image-container', {
                    x: centerX,
                    y: centerY,
                    duration: 0.5,
                    ease: 'power1.in'
                }, 0);

                // Texts and image fade out and move up (Phase 2)
                tlMobile
                    .to('#hero-top', {
                        opacity: 0,
                        y: -window.innerHeight * 0.3,
                        duration: 0.5,
                        ease: 'power1.in'
                    }, 0.5) 

                    .to('#hero-bottom-left', {
                        opacity: 0,
                        y: -window.innerHeight * 0.3,
                        duration: 0.5,
                        ease: 'power1.in'
                    }, 0.5)

                    .to('#hero-image-container', {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.5,
                        ease: 'power1.out'
                    }, 1.0) 

                    .to('#hero-circular-badge', {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.5,
                        ease: 'power1.out',
                    }, 1.0)

                    .to('#scroll-down-icon', {
                        opacity: 0,
                        y: -window.innerHeight * 0.3,
                        duration: 0.5,
                        ease: 'power1.out',
                    }, 1.0);
            });
            
            ScrollTrigger.refresh(true);

        }, heroRef); // <- scope the context to the heroRef element

        return () => {
            // Use the context's revert method for cleanup
            ctx.revert(); 
        }
    }, []) // Empty dependency array means this runs only on mount

    return (
        <section
            ref={heroRef}
            id="hero-section"
            className="w-full bg-bg-light dark:bg-bg-dark pt-[60px] sm:pt-[90px] lg:pt-[120px] pb-20 px-[20px] md:px-[30px] lg:px-[40px] relative min-h-screen transition-colors duration-300"
            // REMOVED: overflow-hidden to allow the scaled image to cover the screen
        >
            <div className="w-full">
                {/* Top Row - Typewriter Text */}
                <div id="hero-top" className="mb-6 md:mb-14 will-change-transform relative" style={{ minHeight: '330px' }}>
                    {/* Scroll Down Icon - Positioned beside the text */}
                    <div
                        id="scroll-down-icon"
                        className="absolute top-0 right-0 pointer-events-none will-change-transform"
                        style={{ zIndex: 1000 }}
                    >
                        <img
                            src="/logos/scrolldown.svg"
                            alt="Scroll down"
                            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                        />
                    </div>

                    <h1 id="hero-headline"
                        className="text-[#0e0e0e] dark:text-[#e2e2e2]
                                    text-4xl md:text-6xl lg:text-5xl xl:text-[128px]"
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
                                        data-word={word}
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

                {/* Bottom Row - Split into Left and Right */}
                <div id="hero-bottom" className="flex flex-col lg:flex-row gap-12 items-start ">
                    {/* Bottom Left - Text and Button */}
                    <div id="hero-bottom-left" className="w-full lg:w-1/2 will-change-transform">
                        <p id="hero-subtext"
                            className="text-base md:text-xl text-gray-700 dark:text-[#e2e2e2b2] mb-8 max-w-xl"
                            style={{
                                fontFamily: 'Inter Variable, Inter, sans-serif',
                                fontWeight: 400,
                                lineHeight: '150%'
                            }}>
                            We create clean designs that turn visitors into paying clients. You
                            get a professional look that makes selling your services very easy.
                        </p>
                        <div id="hero-cta">
                            <MagneticButton className="bg-primary-orange text-white px-8 py-4 full text-lg font-medium hover:bg-opacity-90 transition-all"
                                style={{
                                    fontFamily: 'Inter Variable, Inter, sans-serif',
                                    fontWeight: 500
                                }}>
                                View Our Work
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Bottom Right - Image */}
                    <div id="hero-bottom-right" className="w-full lg:w-1/2 flex justify-end items-center">
                        <div
                            id="hero-image-container"
                            className="relative w-full max-w-lg lg:max-w-[630px] aspect-video will-change-transform"
                        >
                            <div className="image-container overflow-hidden shadow-2xl w-full h-full">
                                <img
                                    src="/images/homepageImage.svg"
                                    alt="Agency work showcase"
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