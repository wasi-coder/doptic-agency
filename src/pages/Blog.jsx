import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Digital Design',
      description: 'Exploring emerging trends in web design and how AI is reshaping creative workflows.',
      category: 'Design',
      categoryColor: 'bg-purple-500',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80'
    },
    {
      id: 2,
      title: 'Building Immersive Web Experiences',
      description: 'How modern animation libraries are transforming user engagement and interaction.',
      category: 'Tech',
      categoryColor: 'bg-blue-500',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=80'
    },
    {
      id: 3,
      title: 'Color Psychology in Branding',
      description: 'Understanding how color choices influence user perception and brand identity.',
      category: 'Branding',
      categoryColor: 'bg-pink-500',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80'
    },
    {
      id: 4,
      title: 'Minimalism in Modern Design',
      description: 'Why less is more when it comes to creating elegant and effective digital products.',
      category: 'Design',
      categoryColor: 'bg-purple-500',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1524668951403-d44b28200ce0?w=800&q=80'
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
      id="blog"
    >
      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-dark dark:text-text-light">
            Insights from the <span className="text-italic-serif">studio</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-lg md:text-xl text-gray-700 dark:text-text-secondary max-w-2xl">
              We share what we learn. Read our latest thoughts on the future of digital design.
            </p>
            <MagneticButton className="bg-text-dark dark:bg-text-light text-white dark:text-text-dark px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all">
              View All
            </MagneticButton>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={300}
                  srcSet={`${post.image}&w=400 400w, ${post.image}&w=800 800w`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className={`${post.categoryColor} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                    {post.category}
                  </span>
                </div>
                {/* Read Time */}
                <div className="absolute bottom-4 right-4">
                  <span className="bg-white dark:bg-bg-secondary-dark text-text-dark dark:text-text-light px-4 py-2 rounded-full text-sm font-semibold">
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-text-dark dark:text-text-light group-hover:text-primary-orange transition-colors">
                {post.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-text-secondary">
                {post.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Blog
