export interface CVData {
  id?: string
  name: string
  title: string
  email: string
  phone: string
  linkedin: string
  address: string
  about: string
  skills: string[]
  experiences: Experience[]
  projects: Project[]
  education: Education[]
  certifications: string[]
  updated_at?: string
}

export interface Experience {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
}

export interface Project {
  title: string
  period: string
  description: string
  bullets: string[]
  link?: string
}

export interface Education {
  degree: string
  institution: string
  period: string
  location: string
  link?: string
}
