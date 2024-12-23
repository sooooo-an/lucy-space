import { SKILLS } from '@data/skills'
import React from 'react'

export default function Skill() {
  return (
    <ul className="mt-10 flex flex-wrap justify-center gap-4 md:w-1/2">
      {SKILLS.map((skill) => (
        <li key={skill} className="rounded-3xl border border-primary px-4 py-2">
          {skill}
        </li>
      ))}
    </ul>
  )
}
