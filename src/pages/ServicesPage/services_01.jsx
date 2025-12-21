import React from 'react'
import ServicesHero from './service_page_section/services_hero'
import ServicesFaq from './service_page_section/services_faq'
import ServicePrices from './service_page_section/service_prices'

const ServicesPage = () => {
  return (
    <>
     <ServicesHero/>
     <ServicePrices/>
     <ServicesFaq/>
     
    </>
  )
}

export default ServicesPage