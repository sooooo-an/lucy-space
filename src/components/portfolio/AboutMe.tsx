import SectionLayout from '@/layouts/SectionLayout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutMe() {
  return (
    <SectionLayout title="About Me" bgColor="bg-section-1">
      <div className="flex flex-col items-center justify-around lg:flex-row-reverse">
        <Image
          src={'/images/portfolio/about-me.webp'}
          alt="avatar"
          width={400}
          height={400}
          className="h-auto w-auto"
          priority
        />
        <div className="mt-10 basis-1/2 lg:mt-0">
          <h3 className="pb-4 text-2xl font-semibold">
            안녕하세요.
            <br /> 5년차 프론트엔드 개발자 안수경입니다
          </h3>
          <p>
            사용자 중심 사고를 바탕으로 성장하기 위해 노력합니다 <br />
            저는 코드에서는 동료 개발자가, 서비스에서는 최종 사용자가 더 편리해지도록 끊임없이
            고민합니다
          </p>

          <div className="flex pt-10">
            <Link
              className="block rounded-[5rem] bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
              href="/about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
