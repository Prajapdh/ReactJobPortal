import Hero from '../components/Hero'
import HeroCards from '../components/HomeCards'
import JobListings from '../components/JobListings'
import ViewAllJobs from '../components/ViewAllJobs'

const HomePage = () => {
  return (
    <>
        <Hero />
        <HeroCards />
        <JobListings isHome={true} />
        <ViewAllJobs />
    </>
  )
}

export default HomePage
