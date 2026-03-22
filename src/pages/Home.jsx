import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import Particles from '../components/Particles'

function Home() {
  return (
    <PageTransition>
      <Particles />
      <Hero />
    </PageTransition>
  )
}

export default Home
