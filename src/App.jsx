import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import NavMenu from './components/NavMenu'
import ScrollToTop from './components/ScrollToTop'
import Footer, { CallToActionSection } from './components/Footer'

// Import pages using the index.js files
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import BlogPage from './pages/BlogPage'
import NotFound from './pages/NotfoundPage'
import ProjectDetails from './pages/Projectdetails01'
import TeamPage from './pages/TeamPage'
import FaqSection from './pages/HomePage/sections/Faq'
import DesignTeam from './pages/TeamDesignPage'
import BlogStandard02 from './pages/BlogStandard'
import BlogGrid01 from './pages/BlogPage'
import BlogPost01 from './pages/BlogPost'
import Contact01 from './pages/ContactPage'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <div className="main-content">
        <Navbar onMenuClick={toggleMenu} menuOpen={isMenuOpen} />
        <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/design_team" element={<DesignTeam />} />
            <Route path="/projects/project_details_01" element={<ProjectDetails />} />
            <Route path="/projects/project_details_02" element={<ProjectDetails />} />
            <Route path="/projects/project_details_03" element={<ProjectDetails />} />
            <Route path="/projects/project_details_04" element={<ProjectDetails />} />
            <Route path="/blog" element={<BlogGrid01 />} />
            <Route path="/blogstandard02" element={<BlogStandard02 />} />
            <Route path="/blogpost01" element={<BlogPost01 />} />
            <Route path="/contact01" element={<Contact01 />} />
            <Route path="/not_found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <CallToActionSection />
        <Footer />
      </div>
    </>
  )
}

export default App