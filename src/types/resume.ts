export type Language = 'en' | 'zh';

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

export interface Star {
  id?: string;
  title?: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

// 定义子项目类型
export interface SubProject {
  id: string;
  name: string;
  type: string;
  background?: string;
  position?: string;
  stars?: Star[];
}

// 定义项目类型
export interface Project {
  id: string | number;
  name: string;
  period: string;
  position?: string;
  type?: string;
  background?: string;
  stars?: Star[];
  children?: (SubProject | any)[];
}

// 定义模块类型
export interface Module {
  id: string;
  title: string;
  type: string;
  children: Project[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
  projects?: any[];
  modules?: Module[];
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
    yearsExperience: number|string;
    projectsCompleted: number;
    happyClients: number;
    yearsDescription?: string;
    projectsDescription?: string;
    clientsDescription?: string;
  };
  keyPoints?: string[];
  summary?: string;
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
  related?: number[];
}

export interface Personal {
  name: string;
  city: string;
  email: string;
  mobile: string;
  wechat: string;
}

export interface ResumeData {
  about: About;
  skills: Skills;
  experiences: Experience[];
  education: Education[];
  portfolioProjects?: PortfolioProject[];
  personal: Personal;
} 