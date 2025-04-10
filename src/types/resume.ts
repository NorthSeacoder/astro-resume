export interface Skill {
  name: string;
  level: string;
  description: string;
  percentage: number;
  keywords: string[];
}

export interface SkillCategory {
  id: number;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface Project {
  id: number;
  name: string;
  period: string;
  background: string;
  star: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
  projects: Project[];
}

export interface Education {
  id: number;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface About {
  bio: string;
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    happyClients: number;
  };
}

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  techIds: string[];
  liveLink?: string;
  repoLink?: string;
  featured?: boolean;
  evolution?: string[];
}

export interface ResumeData {
  about: About;
  skills: Skills;
  experiences: Experience[];
  education: Education[];
  portfolioProjects?: PortfolioProject[];
} 