export type SocialIcon = 'github' | 'linkedin' | 'email' | 'resume'

export type SocialLink = {
  label: string
  href: string
  icon: SocialIcon
}

export type ProjectImage = {
  /** Path under `public/` (e.g. `/trailtalk.png`). */
  src: string
  alt?: string
}

export type Project = {
  title: string
  description: string
  tags: string[]
  /** Live site — globe icon in the title row. */
  liveUrl?: string
  /** Repository — GitHub icon in the title row. */
  repoUrl?: string
  /** YouTube watch URL — YouTube icon in the title row; embed shown under the description when set. */
  videoUrl?: string
  /** Screenshots under the description (preferred for multiple). */
  images?: ProjectImage[]
  /** Single screenshot — still supported; use `images` for more than one. */
  imageSrc?: string
  imageAlt?: string
}

export type ExperienceEntry = {
  role: string
  organization: string
  /** e.g. "Jan 2024 — Present" or "Summer 2023" */
  period: string
  location?: string
  bullets: string[]
  /** Company site — icon under the date, same row as org/location. */
  link?: { href: string; label: string; iconSrc: string }
}

export type SiteConfig = {
  name: string
  tagline: string
  intro: string
  /**
   * Optional portrait or illustration beside the hero on large screens.
   * Paths are under `public/` (e.g. `/portrait.jpg` → file `public/portrait.jpg`).
   */
  heroMedia?: { src: string; alt: string }
  about: string[]
  experience: ExperienceEntry[]
  projects: Project[]
  social: SocialLink[]
  /** Shown near contact / footer */
  location: string
}

export const site: SiteConfig = {
  name: 'Thanh Dang',
  tagline:
    'Software Engineer',
  /** Short intro under the hero headline */
  intro:
    "",
  heroMedia: { src: '/headshot.PNG', alt: 'Portrait of Thanh Dang' },
  about: [
    `I recently graduated from Cal Poly Pomona with a Bachelor of Science in Computer Science. Interested in applied ML/AI engineering`,
  ],
  experience: [
    {
      role: 'AI/ML Researcher & Full Stack Developer',
      organization: 'CPP Enterprises',
      location: 'Pomona, CA',
      period: 'May 2025 - October 2026',
      bullets: [
      ],
      link: {
        label: 'CPP Enterprises website',
        href: 'https://cppenterprises.org/',
        iconSrc: '/cppe.png',
      },
    },
    {
      role: 'Undergraduate Research Assistant',
      organization: 'Cal Poly Pomona',
      location: 'Pomona, CA',
      period: 'October 2024 - May 2025',
      bullets: [
      ],
      link: {
        label: 'Cal Poly Pomona website',
        href: 'https://www.cpp.edu/',
        iconSrc: '/cpp.png',
      },
    },
    {
      role: 'Code Coach',
      organization: 'theCoderSchool',
      location: 'Cerritos, CA',
      period: 'January 2024 - February 2025',
      bullets: [
      ],
      link: {
        label: 'theCoderSchool website',
        href: 'https://www.thecoderschool.com/',
        iconSrc: '/tcc.png',
      },
    },
    {
      role: 'Frontend Developer',
      organization: 'Software Engineer Association',
      location: 'Pomona, CA',
      period: 'August 2023 - May 2024',
      bullets: [
      ],
      link: {
        label: 'SEA website',
        href: 'https://cppsea.com/',
        iconSrc: '/sea.png',
      },
    },
  ],
  projects: [
    {
      title: `Upper-body Movement Asymmetry Analysis with Latent Space Representation for 
      Stroke Survivors During Powered Mobility`,
      description: `This paper presents a transformer-based latent representation model that learns bilateral upper-body 
      movement from pose keypoint sequences. Published at the IEEE International Conference on E-health Networking, Application & Services (HealthCom) 2026.`,
      tags: ['Python', 'PyTorch', 'Transformer'],
      repoUrl: 'https://github.com/Mobility-Scooter-Project/pose-asymmetry-analysis',
      liveUrl: 'https://par.nsf.gov/biblio/10713593',
      images: [{ src: '/msmodel.png', alt: 'Model Architecture'}],
    },
    {
      title: 'Mobility Scooter Web App',
      description:
        `The Mobility Scooter Web App (MSWA) is an open-source clinical web app funded by the National Science Foundation (NSF). It allows clinicians 
        and researchers to collaborate in managing and analyzing videos of patients operating mobility scooters. `,
      tags: ['TypeScript', 'React', 'NestJS', 'Redis', 'PostgreSQL', 'Python', 'Ray', 'Kafka', 'YOLO', 'WhisperX', 'PyTorch','Google Gemma', 'Docker'],
      repoUrl: 'https://github.com/Mobility-Scooter-Project/mobility-scooter-web-app/tree/develop',
      images: [{ src: '/mswa.jpg', alt: 'Mobility Scooter Web App'},],
    },
    {
      title: 'Trailtalk',
      description:
        `Trailtalk is a social media platform centered on national parks where users share experiences, discover new places, and connect with fellow adventurers. 
        It features an interactive map of all U.S. national parks, individual park pages with posts and ratings, user profiles, friend messaging, etc.`,
      tags: ['TypeScript', 'Tailwind CSS', 'React',  'MapLibre', 'Firebase'],
      liveUrl: 'https://evergreen-industries.web.app/',
      images: [{ src: '/trailtalk.png', alt: 'Trailtalk'}, { src: '/trailtalk_map.png', alt: 'Trailtalk national parks map'}],
    },
    {
      title: 'Carbon Closet',
      description:
        `Carbon Closet is a gamified e-commerce website that makes buying, selling, and donating secondhand clothing simple and rewarding. 
        Users earn tokens and unlock rewards for shopping sustainably. Won 3rd place among 60 teams at Cal Poly Pomona Hackathon (BroncoHacks) 2025.`,
      tags: ['JavaScript', 'Tailwind CSS', 'ShadCN', 'Next.js', 'React', 'Firebase', 'Docker', 'AWS'],
      repoUrl: 'https://github.com/uuriah/LeBroncoHacks',
      images: [{ src: '/carboncloset.png', alt: 'Carbon Closet'},],
    },
    {
      title: 'Recyclable or Not Bot',
      description:
        `Recyclable or Not Bot is a computer vision web app that classifies recyclable and non-recyclable items using Ultralytics YOLO object detection model. 
        Its purpose is to promote eco-friendly waste disposal. Awarded best sustainability track at UC Riverside Hackathon (Rosehack) 2025.`,
      tags: ['JavaScript', 'CSS', 'React', 'Python', 'Flask', 'OpenCV', 'YOLO'],
      repoUrl: 'https://github.com/joshmre/computer-vision-webapp',
      videoUrl: 'https://www.youtube.com/watch?v=oJyRTPOPXxo',
    },
    {
      title: 'Icebreak',
      description:
        `Icebreak is Cal Poly Pomona SEA’s mobile platform to connect school organizations with their members. 
        Icebreak aims to be the central hub for members to remain updated on current organization events.`,
      tags: ['JavaScript', 'React Native', 'Express.js', 'PostgreSQL'],
      repoUrl: 'https://github.com/cppsea/icebreak',
      liveUrl: 'https://cppsea.com/projects/icebreak/',
      images: [{ src: '/icebreak.png', alt: 'Icebreak'},],
    },
    {
      title: 'BroncoDirectMe',
      description:
        `BroncoDirectMe is a browser extension for Chrome and other Chromium-based browsers that enhances Cal Poly Pomona’s BroncoDirect website. 
        It displays professor ratings from RateMyProfessors directly within BroncoDirect, helping students during course registration.`,
      tags: ['TypeScript', 'CSS', 'React', 'Express.js', 'MySQL'],
      repoUrl: 'https://github.com/BroncoDirectMe',
      liveUrl: 'https://broncodirect.me/',
      images: [{ src: '/broncodirectme.png', alt: 'BroncoDirectMe'},],
    },
    {
      title: 'LetMesh',
      description:
        `LetMesh is a web application aims to match mentees with mentors based on preferences, career goals, and major, giving students the opportunity 
        to gain mentorship and advance their careers. `,
      tags: ['TypeScript', 'CSS', 'React', 'Python', 'Django'],
      repoUrl: 'https://github.com/LetsMesh',
      images: [{ src: '/mesh.png', alt: 'LetMesh'},],
    }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/tdang2180', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thanhdang1/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:tdang2180@gmail.com', icon: 'email' },
    { label: 'Resume', href: '/Dang_Thanh_Resume.pdf', icon: 'resume' },
  ],
  location: 'Los Angeles, CA',
}
