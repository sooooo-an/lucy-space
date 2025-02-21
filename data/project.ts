export type Project = {
  thumbnail: string
  name: string
  desc: string[]
  links: {
    github: string
    url: string
    path: string
  }
}

const DIXIT: Project = {
  thumbnail: '/images/portfolio/dixit-game.png',
  name: 'Mystic Story',
  desc: [
    '나의 목소리로 이야기를 만들고',
    '카드로 상상력을 펼쳐보세요!',
    '보드게임 Dixit에서 영감을 받아 AI 기반',
    '스토리 분석을 결합한 스토리텔링 게임입니다',
  ],
  links: {
    github: 'https://github.com/sooooo-an/dixit-game',
    url: 'https://dixit-game-five.vercel.app/',
    path: '/projects/dixit-game',
  },
}

const LUCY_SPACE: Project = {
  thumbnail: '/images/portfolio/tech-blog.png',
  name: 'LUCY.SPACE.',
  desc: ['포트폴리오 & 개발블로그'],
  links: {
    github: 'https://github.com/sooooo-an/lucy-space',
    url: 'https://lucy-an.space/',
    path: '/projects/tech-blog',
  },
}

const AIRY: Project = {
  thumbnail: '/images/portfolio/airy.png',
  name: 'Airy',
  desc: [
    '손글씨로 작성한',
    '다이어리를 사진으로 찍으면',
    '일정 내용을 자동으로 인식하여',
    '디지털 캘린더에 등록합니다',
  ],
  links: {
    github: 'https://github.com/sooooo-an/airy',
    url: 'https://dixit-game-five.vercel.app/',
    path: '/projects/airy',
  },
}

export const FF: Project = {
  thumbnail: '/images/portfolio/dixit-game.png',
  name: '',
  desc: [
    '나의 목소리로 이야기를 만들고',
    '카드로 상상력을 펼쳐보세요!',
    '보드게임 Dixit에서 영감을 받아 AI 기반',
    '스토리 분석을 결합한 스토리텔링 게임입니다',
  ],
  links: {
    github: 'https://github.com/sooooo-an/dixit-game',
    url: 'https://dixit-game-five.vercel.app/',
    path: '/projects/dixit-game',
  },
}

export const PROJECTS = [AIRY, LUCY_SPACE, DIXIT]
