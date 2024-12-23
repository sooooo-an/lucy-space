import React from 'react'
import Image from 'next/image'

export default function Profile() {
  return (
    <>
      <Image
        src="/images/profile.jpeg"
        alt="profile"
        width={300}
        height={800}
        className="rounded-lg"
      />
      <h2 className="my-2 text-xl font-bold">5년차 프론트엔드 개발자 안수경입니다.</h2>
      <ul className="mt-2 text-center">
        <li className="mb-2">
          <h3 className="text-lg font-semibold">
            저는 코드를 작성할 때 유연성을 가장 중요하게 생각합니다.
          </h3>
          <span className="text-text-secondary">
            모듈화를 통해 추후 새로운 기능 추가 시 기존 코드에 영향을 최소화합니다.
          </span>
        </li>
        <li className="mb-2">
          <h3 className="text-lg font-semibold">
            혼자만의 성장이 아니라 함께 성장하기 위해 노력합니다.
          </h3>
          <span className="block text-text-secondary">
            팀 내 스터디를 건의하고, 스터디한 내용을 공유합니다.
          </span>
          <span className="text-text-secondary">
            타입스크립트 공부 내용을 공유하여 팀원들의 타입스크립트 이해도를 향상시킨 경험이
            있습니다.
          </span>
        </li>
        <li className="mb-1">
          <h3 className="text-lg font-semibold">프로젝트 종료 후 스스로 회고를 통해 성장합니다.</h3>
          <span className="text-text-secondary">
            프로젝트를 문서로 정리하여 팀 내 발표하는 시간을 갖습니다
          </span>
        </li>
      </ul>
    </>
  )
}
