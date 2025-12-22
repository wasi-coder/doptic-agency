import React from 'react'

import ProjectDetails01Hero from './projectdetails01section/projectdetails01hero.jsx'
import ProjectDetails01Section from './projectdetails01section/projectdetails01_part1.jsx'
import VisualStrategySection from './projectdetails01section/projectdetails01_part2.jsx'
import ImpactSection from './projectdetails01section/projectdetails01_part3.jsx'
import NextProjectPage from './projectdetails01section/projectdetails01nextproject.jsx'


const ProjectDetails= () => {
  return (
    <>
      <ProjectDetails01Hero />
      <ProjectDetails01Section />
      <VisualStrategySection />
      <ImpactSection />
      <NextProjectPage />
    </>
  )
}

export default ProjectDetails
