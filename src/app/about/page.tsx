import Contact from "@/components/about/Contact";
import Detail from "@/components/about/Detail";
import Etc from "@/components/about/Etc";
import Experience from "@/components/about/Experience";
import Intro from "@/components/about/Intro";
import Skills from "@/components/about/Skills";

import { getAbout } from "@/services/about";
import React from "react";

export default async function AboutPage() {
  const { intro, experience, skill, contact, detail, etc } = await getAbout();
  return (
    <div className="w-full py-14">
      <Contact contact={contact} />
      <Intro paragraph={intro} />
      <Skills skills={skill} />
      <Experience list={experience} />
      <Detail list={detail} />
      <Etc list={etc} />
    </div>
  );
}
