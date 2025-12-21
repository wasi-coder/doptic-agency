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
            <Route path="/projects/project_01" element={<ProjectsPage />} />
            <Route path="/projects/project_02" element={<ProjectsPage />} />
            <Route path="/projects/project_03" element={<ProjectsPage />} />
            <Route path="/projects/project_04" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
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