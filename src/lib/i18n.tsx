import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import resumeDataEn from '@/data/resumeData.en.json';
import resumeDataZh from '@/data/resumeData.zh.json';

// 定义语言类型
export type Language = 'en' | 'zh';

// 语言上下文接口
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getResumeData: () => any;
}

// 定义技能类型
export interface Skill {
  name: string;
  level?: string;
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

export interface ExperienceProject {
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
  projects: ExperienceProject[];
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
  translations: {
    [key: string]: any;
  };
  skills: {
    categories: SkillCategory[];
  };
  experiences: Experience[];
  education: Education[];
  portfolioProjects?: PortfolioProject[];
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 存储语言首选项到 localStorage
export const saveLanguage = (language: Language) => {
  try {
    localStorage.setItem('language', language);
  } catch (e) {
    console.error('Failed to save language preference', e);
  }
};

// 获取初始语言首选项
export const getInitialLanguage = (): Language => {
  try {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      return savedLanguage;
    }
    
    // 如果没有保存的语言首选项，则尝试使用浏览器语言
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('zh')) {
      return 'zh';
    }
    
    return 'en'; // 默认英语
  } catch (e) {
    return 'en'; // 默认英语
  }
};

// 简历数据映射
const resumeData = {
  en: resumeDataEn as ResumeData,
  zh: resumeDataZh as ResumeData
};

// 获取嵌套对象的值
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((acc, part) => {
    if (acc === undefined) return '';
    return acc[part];
  }, obj);
};

// 语言提供者组件
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  // 翻译函数
  const t = (key: string): string => {
    const currentData = resumeData[language] || resumeData.en;
    const translatedValue = getNestedValue(currentData.translations, key);
    return translatedValue || key;
  };

  // 获取简历数据函数
  const getResumeData = (): ResumeData => {
    return resumeData[language] || resumeData.en;
  };

  useEffect(() => {
    // 更新document的lang属性
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getResumeData }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 使用语言的自定义Hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};