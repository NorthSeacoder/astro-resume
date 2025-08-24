import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/i18n";
import { useState, useEffect } from "react";
import CompanySection from "./experience/CompanySection";

// 简化数据结构，扁平化设计

// 成就/STAR分析点
interface Achievement {
  id: string | number;
  title?: string;
  description?: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
}

// 工作经历项目
interface Experience {
  id: string | number;
  title: string;
  period?: string;
  position?: string;
  summary?: string;
  achievements: Achievement[];
}

// 公司信息
interface ExperienceCompany {
  id: string | number;
  company: string;
  position: string;
  location: string;
  period: string;
  description?: string;
  items: Experience[];
}

const Experience = () => {
  const { t, getResumeData } = useLanguage();
  const [companies, setCompanies] = useState<ExperienceCompany[]>([]);
  const resumeData = getResumeData();
  useEffect(() => {
    if (resumeData.experiences && resumeData.experiences.length > 0) {
      setCompanies(resumeData.experiences as ExperienceCompany[]);
    } else {
      setCompanies([]);
    }
  }, [resumeData]);
  return (
    <div className="resume-section">
      <div className="resume-header">
        <h2 className="resume-title">
          {t('experience.title')}
        </h2>
        <div className="resume-divider"></div>
      </div>
      
      <div className="experience-timeline">
        {companies.map(company => (
          <CompanySection key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Experience; 