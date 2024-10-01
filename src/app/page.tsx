import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <section className="flex container">
        <h2>안녕하세요. 5년차 프론트엔드 개발자 안수경입니다</h2>
        <p></p>
      </section>
      <section className="flex container">
        <div>
          <h3>Latest Posts</h3>
          <Link href="/blog">Detail</Link>
        </div>
      </section>
    </div>
  );
}
