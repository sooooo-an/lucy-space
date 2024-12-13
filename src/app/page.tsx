import RecentPostBox from '@/components/main/RecentPostBox'

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex basis-2/3">
        <article className="basis-3/5">My schedule</article>
        <div className="flex basis-2/5 flex-col">
          <section className="flex basis-1/3">
            <article className="basis-1/2">Spotify</article>
            <article className="basis-1/2">Ato</article>
          </section>
          <article className="basis-2/3">
            <RecentPostBox />
          </article>
        </div>
      </section>
      <section className="flex basis-1/3">
        <article className="flex basis-3/5">Github</article>
        <article className="basis-2/5">Graph</article>
      </section>
    </div>
  )
}
