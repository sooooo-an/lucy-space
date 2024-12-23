import Profile from '@/components/Profile'
import Skill from '@/components/Skill'

export default function HomePage() {
  return (
    <section className="flex w-full flex-col items-center px-2 py-4">
      <Profile />
      <Skill />
    </section>
  )
}
