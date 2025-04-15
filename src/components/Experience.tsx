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
interface ExperienceItem {
  id: string | number;
  title: string;
  period?: string;
  company?: string;
  position?: string;
  location?: string; 
  type?: string;
  summary?: string;
  achievements: Achievement[];
}

// 公司信息
interface Company {
  id: string | number;
  name: string;
  position: string;
  location: string;
  period: string;
  description?: string;
  items: ExperienceItem[];
}

// 适配数据函数 - 将原始数据转换为新格式
const adaptData = (originalData: any): Company[] => {
  return originalData.map((company: any) => {
    const items: ExperienceItem[] = [];
    // 处理模块
    if (company.modules && company.modules.length > 0) {
      company.modules.forEach((module: any) => {
        if (module.children && module.children.length > 0) {
          module.children.forEach((project: any) => {
            const achievements: Achievement[] = [];
            // 处理STAR分析
            if (project.stars && project.stars.length > 0) {
              project.stars.forEach((star: any) => {
                achievements.push({
                  id: star.id,
                  title: star.title,
                  situation: star.situation,
                  task: star.task,
                  action: star.action,
                  result: star.result
                });
              });
            }
            // 添加子项目
            if (project.children && project.children.length > 0) {
              project.children.forEach((subproject: any) => {
                const subAchievements: Achievement[] = [];
                if (subproject.stars && subproject.stars.length > 0) {
                  subproject.stars.forEach((star: any) => {
                    subAchievements.push({
                      id: star.id,
                      title: star.title,
                      situation: star.situation,
                      task: star.task,
                      action: star.action,
                      result: star.result
                    });
                  });
                }
                items.push({
                  id: subproject.id,
                  title: subproject.name || subproject.title || '',
                  period: subproject.period,
                  position: subproject.position || project.position || company.position,
                  type: `${project.name} · ${module.title}`,
                  summary: subproject.background,
                  achievements: subAchievements
                });
              });
            } else {
              // 添加项目本身
              items.push({
                id: project.id,
                title: project.name || project.title || '',
                period: project.period,
                position: project.position || company.position,
                type: module.title,
                summary: project.background,
                achievements: achievements
              });
            }
          });
        }
      });
    } else if (company.projects && company.projects.length > 0) {
      // 处理直接项目
      company.projects.forEach((project: any) => {
        const achievements: Achievement[] = [];
        if (project.stars && project.stars.length > 0) {
          project.stars.forEach((star: any) => {
            achievements.push({
              id: star.id,
              title: star.title,
              situation: star.situation,
              task: star.task,
              action: star.action,
              result: star.result
            });
          });
        } else if (project.star) {
          achievements.push({
            id: `star-${project.id}`,
            title: project.star.title || "成就",
            situation: project.star.situation,
            task: project.star.task,
            action: project.star.action,
            result: project.star.result
          });
        }
        items.push({
          id: project.id,
          title: project.name || '',
          period: project.period,
          position: project.position || company.position,
          summary: project.background,
          achievements: achievements
        });
      });
    }
    return {
      id: company.id,
      name: company.company,
      position: company.position,
      location: company.location,
      period: company.period,
      description: company.description,
      items: items
    };
  });
};

const Experience = () => {
  const { t, getResumeData } = useLanguage();
  const [companies, setCompanies] = useState<Company[]>([]);
  const resumeData = getResumeData();
  useEffect(() => {
    if (resumeData.experiences && resumeData.experiences.length > 0) {
      setCompanies(adaptData(resumeData.experiences));
      console.log(adaptData(resumeData.experiences));
    } else {
      setCompanies([]);
    }
  }, [resumeData]);
  return (
    <div>
      <div className="flex items-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
          {t('experience.title')}
        </h2>
        <Separator className="flex-grow ml-6 dark:bg-slate-700" />
      </div>
      <div className="space-y-6">
        {companies.map(company => (
          <CompanySection key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Experience; 