import React from 'react'
import about_hero from './about_page_section/about_hero'  
import AboutHero from './about_page_section/about_hero'
import AboutBanner from './about_page_section/about_banner'
import AboutPartner from './about_page_section/about_partner'
import AboutAwards from './about_page_section/about_awards'
import AboutFaq from './about_page_section/about_faq'
import AboutTeams from './about_page_section/about_teams'

const AboutPage = () => {
  return (
    <>
     <AboutHero/>
     <AboutBanner/>
     <AboutPartner/>
      <AboutTeams/>
     <AboutAwards/>
     <AboutFaq/>
     
      
    </>
  )
}

export default AboutPage