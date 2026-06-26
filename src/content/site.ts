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
    "Currently doing AI/ML research and full stack development at Cal Poly Pomona Enterprises.",
  heroMedia: { src: '/headshot.PNG', alt: 'Portrait of Thanh Dang' },
  about: [
    `I recently graduated from Cal Poly Pomona with a Bachelor of Science in Computer Science.`,
  ],
  experience: [
    {
      role: 'AI/ML Researcher & Full Stack Developer',
      organization: 'CPP Enterprises',
      location: 'Pomona, CA',
      period: 'May 2025 - Present',
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
      title: 'Mobility Scooter Web App',
      description:
        `The Mobility Scooter Web App (MSWA) is an open source clinical web app funded by the National Science Foundation (NFS). 
        Its purpose is to enable clinicians and researchers to upload and analyze videos of patients operating mobility scooters. `,
      tags: ['React', 'NestJS', 'Redis', 'TypeScript', 'Python', 'Ray', 'Kafka', 'PostgreSQL', 'Docker', 'YOLO', 'WhisperX', 'Pytorch','Gemma'],
      repoUrl: 'https://github.com/Mobility-Scooter-Project/mobility-scooter-web-app/tree/develop',
      images: [{ src: '/mswa.jpg', alt: 'Mobility Scooter Web App'},],
    },
    {
      title: 'Trailtalk',
      description:
        `Trailtalk is a social media platform centered around national parks where people share experiences, discover new spots, and connect with like-minded adventurers. 
        It features both mobile and web interfaces, with a map view of all national parks in the US, dedicated map pages, and message system.`,
      tags: ['React', 'TypeScript', 'MapLibre', 'Firebase', 'Tailwind CSS'],
      liveUrl: 'https://evergreen-industries.web.app/',
      images: [{ src: '/trailtalk.png', alt: 'Trailtalk'}, { src: '/trailtalk_map.png', alt: 'Trailtalk national parks map'}],
    },
    {
      title: 'Carbon Closet',
      description:
        `Carbon Closet is a gamified e-commerce website that makes buying, selling, and donating secondhand clothing simple and rewarding. 
        Users earn tokens and unlock rewards for shopping sustainably. Won 3rd out of 60 teams at the Cal Poly Pomona Hackathon (BroncoHacks) 2025.`,
      tags: ['Next.js', 'React', 'JavaScript', 'Tailwind CSS', 'Firebase', 'ShadCN', 'Docker'],
      repoUrl: 'https://github.com/uuriah/LeBroncoHacks',
      images: [{ src: '/carboncloset.png', alt: 'Carbon Closet'},],
    },
    {
      title: 'Recyclable or Not Bot',
      description:
        `Recyclable or Not Bot is a computer vision web app that classifies recyclable and non-recyclable items using Ultralytics YOLO object detection model. 
        Its purpose is to promote eco-friendly waste disposal. Awarded best sustainability track at the UC Riverside Hackathon (Rosehack) 2025.`,
      tags: ['Python', 'Flask', 'OpenCV', 'Ultralytics YOLO', 'React', 'JavaScript', 'CSS'],
      repoUrl: 'https://github.com/joshmre/computer-vision-webapp',
      videoUrl: 'https://www.youtube.com/watch?v=oJyRTPOPXxo',
    },
    {
      title: 'Icebreak',
      description:
        `Icebreak is SEA’s mobile platform to connect school organizations with their members. 
        Icebreak aims to be the central hub for members to remain updated on current organization events.`,
      tags: ['JavaScript', 'React Native', 'Express.js', 'PostgreSQL'],
      repoUrl: 'https://github.com/cppsea/icebreak',
      liveUrl: 'https://cppsea.com/projects/icebreak/',
      images: [{ src: '/icebreak.png', alt: 'Icebreak'},],
    },
    {
      title: 'BroncoDirectMe',
      description:
        `BroncoDirectMe is an extension for Chrome and other Chromium-based browsers that enhances the BroncoDirect website. 
        This extension’s purpose is to make it easier for Cal Poly Pomona students to make an informed decision when registering for classes.`,
      tags: ['TypeScript', 'CSS', 'React', 'Express.js', 'MySQL'],
      repoUrl: 'https://github.com/BroncoDirectMe',
      liveUrl: 'https://broncodirect.me/',
      images: [{ src: '/broncodirectme.png', alt: 'BroncoDirectMe'},],
    },
    {
      title: 'LetMesh',
      description:
        `LetMesh is an open-source project that aims to provide students with a unique opportunity to gain mentorship, practice collaborative skills, 
        and familiarize themselves with modern technologies and software methodologies. `,
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
