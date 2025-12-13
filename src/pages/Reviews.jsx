import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const Reviews = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Darlene Robertson',
      title: 'President of Sales',
      avatar: '/images/Avatar Image1.svg',
      rating: 5,
      quote: 'Working with this agency transformed our brand presence. Their attention to detail and creative approach exceeded all expectations.'
    },
    {
      id: 2,
      name: 'Bessie Cooper',
      title: 'Marketing Coordinator',
      avatar: '/images/Avatar Image2.svg',
      rating: 5,
      quote: 'The team delivered beyond what we imagined. Our website is now a powerful tool that converts visitors into customers.'
    },
    {
      id: 3,
      name: 'Savannah Nguyen',
      title: 'UI/UX Designer',
      avatar: '/images/Avatar Image3.png',
      rating: 5,
      quote: 'Exceptional service and results. They truly understand how to blend aesthetics with functionality to drive business growth.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section
      className="min-h-screen bg-bg-light dark:bg-bg-dark py-20 px-6 md:px-12 transition-colors duration-300"
      id="reviews"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-dark dark:text-text-light leading-tight">
            Why top entrepreneurs <span className="font-serif italic">trust</span> our agency.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-text-secondary">
            We don't just make things look good. We design solutions that scale businesses.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white dark:bg-bg-secondary-dark rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-primary-orange text-xl" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-gray-700 dark:text-text-secondary mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={56}
                  height={56}
                  srcSet={`${testimonial.avatar}?w=56 1x, ${testimonial.avatar}?w=112 2x`}
                />
                <div>
                  <h4 className="font-semibold text-text-dark dark:text-text-light">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-text-secondary">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
