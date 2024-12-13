import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProjectList() {
  return (
    <ul>
      <li>
        <Link href="/projects/calculator">
          <Image src="/images/projects/calculator.png" width={100} height={100} alt="calculator" />
          <div>
            <p>Chat GPT랑 사업하기</p>
          </div>
        </Link>
      </li>
      <li>
        <Link href="/projects/calculator">
          <Image src="/images/projects/calculator.png" width={100} height={100} alt="calculator" />
          <div>
            <p>React 계산기</p>
          </div>
        </Link>
      </li>
      <li>
        <Link href="/projects/calculator">
          <Image src="/images/projects/calculator.png" width={100} height={100} alt="calculator" />
          <div>
            <p>React 계산기</p>
          </div>
        </Link>
      </li>
      <li>
        <Link href="/projects/calculator">
          <Image src="/images/projects/calculator.png" width={100} height={100} alt="calculator" />
          <div>
            <p>React 계산기</p>
          </div>
        </Link>
      </li>
    </ul>
  )
}
