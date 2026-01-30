import React from 'react'
import Hero from '../../sections/Hero/Hero'
import Metrics from '../../sections/Metrics/Metrics'
import Services from '../../sections/Services/Services'
import CaseStudies from '../../sections/CaseStudies/CaseStudies'
import Process from '../../sections/Process/Process'
import CTASection from '../../sections/CTA/CTASection'

const Home = () => {
    return (
        <main>
            <Hero />
            <Metrics />
            <Services />
            <CaseStudies />
            <Process />
            <CTASection />
        </main>
    )
}

export default Home
