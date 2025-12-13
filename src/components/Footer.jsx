import { motion } from 'framer-motion'
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const CONTACT_EMAIL = 'hello@info.com'

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Project', href: '/projects' },
      { name: 'Service', href: '/services' },
      { name: 'Values', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    support: [
      { name: 'Style Guide', href: '#' },
      { name: 'License', href: '#' },
      { name: 'Changelog', href: '#' },
      { name: 'Link Nine', href: '#' },
      { name: 'Link Ten', href: '#' }
    ],
    social: [
      { name: 'Instagram', icon: FaInstagram, href: '#' },
      { name: 'LinkedIn', icon: FaLinkedinIn, href: '#' },
      { name: 'Youtube', icon: FaYoutube, href: '#' }
    ]
  }

  return (
    <footer className="overflow-hidden">
      {/* Section 1: CTA Section - Orange Background */}
      <div className="bg-primary-orange text-white">
        <div className="container mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
              GOT AN IDEA?
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif italic mb-8">
              LET'S TALK
            </h3>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              We create design experiences that transform businesses and delight users. 
              Let's build something extraordinary together.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 2: Actual Footer - Light Background */}
      <div className="bg-white dark:bg-bg-dark text-text-dark dark:text-text-light transition-colors duration-300">
        <div className="container mx-auto px-6 md:px-12 py-16 md:py-20">
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-text-dark dark:text-text-light">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-text-dark dark:text-text-light hover:text-primary-orange transition-colors text-base"
                      data-cursor-text="View"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-text-dark dark:text-text-light">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-text-dark dark:text-text-light hover:text-primary-orange transition-colors text-base"
                      data-cursor-text="View"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-text-dark dark:text-text-light">Social</h4>
              <ul className="space-y-3">
                {footerLinks.social.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      className="flex items-center gap-3 text-text-dark dark:text-text-light hover:text-primary-orange transition-colors text-base"
                      data-cursor-text={social.name}
                    >
                      <social.icon className="text-xl" />
                      <span>{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:text-right"
            >
              <a 
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark dark:text-text-light hover:text-primary-orange transition-colors inline-block"
                data-cursor-text="Click to Email"
              >
                {CONTACT_EMAIL}
              </a>
            </motion.div>
          </div>

          {/* Large Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold text-text-dark dark:text-text-light">
              Doptic
            </h2>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-300 dark:border-gray-700 pt-8"
          >
            <p className="text-text-dark dark:text-text-light text-sm md:text-base">
              Copyright © {new Date().getFullYear()} Doptic – Where designs meet the future.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
