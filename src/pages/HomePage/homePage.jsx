import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Services from './sections/Services'
import Reviews from './sections/Reviews'
import Blog from './sections/Blog'
import FaqSection from './sections/Faq'
import { CallToActionSection } from '../../components/Footer'
import Footer from '../../components/Footer'

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Reviews />
      <FaqSection />
      <Blog />
      <CallToActionSection />
      <Footer />
    </>
  )
}

export default Home