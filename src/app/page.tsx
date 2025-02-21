import Footer from '@/components/Footer'
import AboutMe from '@/components/portfolio/AboutMe'
import LatestPosts from '@/components/portfolio/LatestPosts'
import Projects from '@/components/portfolio/Projects'
import Visual from '@/components/portfolio/Visual'

export default function HomePage() {
  return (
    <>
      <main>
        <Visual />
        <AboutMe />
        <Projects />
        <LatestPosts />
      </main>
      <Footer />
    </>
  )
}
