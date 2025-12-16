import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const testimonials = [
  {
    stars: "https://c.animaapp.com/mj6xytezddxCqE/img/stars.svg",
    quote:
      'Working with this agency was seamless. They understood our vision instantly and delivered designs that elevated our entire brand."',
    avatar: "https://c.animaapp.com/mj6xytezddxCqE/img/avatar-image.png",
    name: "Darlene Robertson",
    title: "President of Sales",
  },
  {
    stars: "https://c.animaapp.com/mj6xytezddxCqE/img/stars.svg",
    quote:
      '"The team combines creativity with strategy. Their UI/UX work improved our user engagement and made our product feel truly premium."',
    avatar: "https://c.animaapp.com/mj6xytezddxCqE/img/avatar-image-1.png",
    name: "Bessie Cooper",
    title: "Marketing Coordinator",
  },
  {
    stars: "https://c.animaapp.com/mj6xytezddxCqE/img/stars.svg",
    quote:
      '"Professional, responsive, and highly skilled. Every deliverable exceeded our expectations — from wireframes to final visuals."',
    avatar: "https://c.animaapp.com/mj6xytezddxCqE/img/avatar-image-2.png",
    name: "Savannah Nguyen",
    title: "UI/UX Designer",
  },
  {
    stars: "https://c.animaapp.com/mj6xytezddxCqE/img/stars.svg",
    quote:
      '"They transformed our ideas into a modern, functional design system. The process was smooth, and the results were outstanding."',
    avatar: "https://c.animaapp.com/mj6xytezddxCqE/img/avatar-image-3.png",
    name: "Ronald Richards",
    title: "Web Designer",
  },
]

export const TestimonialSection = () => {
  const cardsContainerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const container = cardsContainerRef.current
    const track = trackRef.current

    if (!container || !track) return

    // Create horizontal draggable scroll
    const draggableInstance = Draggable.create(track, {
      type: "x",
      edgeResistance: 0.65,
      bounds: {
        minX: -(track.scrollWidth - container.offsetWidth),
        maxX: 0
      },
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
      throwProps: true,
      onDrag: function() {
        // Smooth drag behavior
      }
    })[0]

    // Cleanup
    return () => {
      draggableInstance.kill()
    }
  }, [])

  return (
    <section className="flex flex-col w-full items-start gap-16 px-[75px] py-[120px] bg-bg-light dark:bg-bg-dark overflow-hidden transition-colors duration-300">
      <header className="max-w-[850px] gap-8 flex flex-col items-start">
        <div className="max-w-[850px] gap-3 flex flex-col items-start">
          <div className="flex flex-col items-start gap-3 w-full">
            <div className="flex flex-col items-start justify-center gap-3.5 w-full">
              <h2 className="font-normal">
                <span
                  className="font-medium text-text-dark dark:text-text-light"
                  style={{
                    fontFamily: 'Inter Variable, Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '72px',
                    lineHeight: '120%',
                    letterSpacing: '-0.04em'
                  }}
                >
                  Why top entrepreneurs
                  <br />
                </span>
                <span
                  className="text-text-dark dark:text-text-light"
                  style={{
                    fontFamily: 'Libre Caslon Text, serif',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: '72px',
                    lineHeight: '120%',
                    letterSpacing: '-0.04em',
                    fontVariant: 'normal'
                  }}
                >
                  <em>trust</em> our agency.
                </span>
              </h2>
              <p
                className="w-fit text-gray-700 dark:text-text-secondary text-lg leading-[28.8px]"
                style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 400 }}
              >
                We don't just make things look good. We design solutions that scale businesses.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={cardsContainerRef}
        className="relative w-full overflow-hidden"
      >
        <div
          ref={trackRef}
          className="inline-flex items-start justify-start gap-[30px] cursor-grab active:cursor-grabbing"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col min-w-[445px] items-start p-[30px] bg-gray-100 dark:bg-gray-800 rounded-lg select-none transition-colors duration-300"
              style={{
                width: '445px',
                height: '463.89px',
                gap: '100px'
              }}
            >
            <div className="flex flex-col gap-[100px] w-full">
              <img
                className="flex-[0_0_auto] w-[120px]"
                alt="Stars"
                src={testimonial.stars}
                draggable="false"
              />
              <p
                className="text-text-dark dark:text-text-light text-xl tracking-[0] leading-8"
                style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 400 }}
              >
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-5 w-full">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                    draggable="false"
                  />
                </div>
                <div className="inline-flex flex-col items-start gap-0.5">
                  <h3
                    className="text-text-dark dark:text-text-light text-2xl tracking-[-0.96px] leading-[28.8px]"
                    style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 500 }}
                  >
                    {testimonial.name}
                  </h3>
                  <p
                    className="text-gray-700 dark:text-text-secondary text-base leading-[25.6px]"
                    style={{ fontFamily: 'Inter Variable, Inter, sans-serif', fontWeight: 400 }}
                  >
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
