export interface ResumeProject {
  name: string;
  period: string;
  techStack: string[];
  background: string;
  achievements: string[];
  role: string;
}

export interface ResumeExperience {
  company: string;
  period: string;
  role: string;
  projects: ResumeProject[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
  period: string;
}

export interface ResumeSkillCategory {
  category: string;
  details: string;
}

export interface ResumeSkills {
  overview: string[];
  professional: ResumeSkillCategory[];
}

export interface ResumeHeader {
  name: string;
  title: string;
  location: string;
}

export interface ResumeContact {
  email: string;
  phone: string;
  linkedin: string;
}

export interface ResumeContentLanguage {
  header: ResumeHeader;
  contact: ResumeContact;
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkills;
}

export interface ResumeContent {
  en: ResumeContentLanguage;
  zh: ResumeContentLanguage;
}

export interface ResumeData {
  languages: string[];
  content: ResumeContent;
} 