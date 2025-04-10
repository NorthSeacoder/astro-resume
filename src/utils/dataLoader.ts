import translationsZh from '../data/translations.zh.json';
import translationsEn from '../data/translations.en.json';
import resumeZh from '../data/resume/zh.json';
import resumeEn from '../data/resume/en.json';
import { ResumeData } from '../types/resume';

export type Language = 'zh' | 'en';

export const getTranslations = (lang: Language) => {
  return lang === 'zh' ? translationsZh.translations : translationsEn.translations;
};

export const getResumeData = (lang: Language): ResumeData => {
  return lang === 'zh' ? resumeZh : resumeEn;
};

export const getAboutData = (lang: Language) => {
  return getResumeData(lang).about;
};

export const getSkillsData = (lang: Language) => {
  return getResumeData(lang).skills;
};

export const getExperiencesData = (lang: Language) => {
  return getResumeData(lang).experiences;
};

export const getEducationData = (lang: Language) => {
  return getResumeData(lang).education;
}; 