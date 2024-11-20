export type AboutType = {
  thumbnail: string;
  intro: string[];
  experience: ExperienceType[];
  contact: ContactType;
  skill: string[];
  detail: DetailType[];
  etc: string[];
};

export type DetailType = {
  title: string;
  role: string;
  date: string;
  description: string;
  stack: string[];
  member: string;
  whatIDid: string[];
};

export type ExperienceType = {
  title: string;
  date: string;
  list: string[];
};

export type ProjectType = {
  title: string;
  description: string;
  stack: string[];
  path: string;
  thumbnail: string;
};

export type ContactType = Partial<{
  email: string;
  github: string;
  linkedin: string;
  kakao: string;
  resume: string;
}>;
