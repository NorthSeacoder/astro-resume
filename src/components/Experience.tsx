import { Briefcase, Calendar, ChevronUp, ChevronDown, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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

// 成就项组件 - 显示单个成就或STAR分析
const AchievementItem = ({ item }: { item: Achievement }) => {
  const [expanded, setExpanded] = useState(false);

  // 检查是否为STAR格式
  const isStarFormat = item.situation && item.task && item.action && item.result;
  
  return (
    <div className="mt-2 pl-3 border-l border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => isStarFormat && setExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
            <Star size={10} />
          </span>
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {item.title}
          </h5>
        </div>
        
        {isStarFormat && (
          <span className="text-slate-400 text-xs flex items-center">
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
        )}
      </div>

      {/* 如果有简单描述，直接显示 */}
      {item.description && (
        <p className="text-xs text-slate-600 dark:text-slate-400 ml-6 mt-1">{item.description}</p>
      )}

      {/* 如果是STAR格式且已展开，显示STAR分析 */}
      <AnimatePresence>
        {isStarFormat && expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden ml-6 mt-2 space-y-2"
          >
            <div className="text-xs bg-blue-50/50 dark:bg-blue-900/20 text-slate-700 dark:text-slate-300 p-2 rounded-sm border-l-2 border-blue-300 dark:border-blue-700">
              <span className="font-medium text-blue-600 dark:text-blue-400">情境：</span> {item.situation}
            </div>
            <div className="text-xs bg-amber-50/50 dark:bg-amber-900/20 text-slate-700 dark:text-slate-300 p-2 rounded-sm border-l-2 border-amber-300 dark:border-amber-700">
              <span className="font-medium text-amber-600 dark:text-amber-400">任务：</span> {item.task}
            </div>
            <div className="text-xs bg-emerald-50/50 dark:bg-emerald-900/20 text-slate-700 dark:text-slate-300 p-2 rounded-sm border-l-2 border-emerald-300 dark:border-emerald-700">
              <span className="font-medium text-emerald-600 dark:text-emerald-400">行动：</span> {item.action}
            </div>
            <div className="text-xs bg-purple-50/50 dark:bg-purple-900/20 text-slate-700 dark:text-slate-300 p-2 rounded-sm border-l-2 border-purple-300 dark:border-purple-700">
              <span className="font-medium text-purple-600 dark:text-purple-400">结果：</span> {item.result}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 经验项目组件 - 显示单个项目
const ExperienceItemComponent = ({ item }: { item: ExperienceItem }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="timeline-item">
      <div className="flex flex-col">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(prev => !prev)}>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-medium text-slate-800 dark:text-slate-200">
              {item.title}
              {item.type && (
                <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">· {item.type}</span>
              )}
            </h4>
          </div>
          
          <div className="flex items-center gap-2">
            {item.period && (
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <Calendar size={12} className="mr-1" />
                <span>{item.period}</span>
              </div>
            )}
            
            {item.achievements.length > 0 && (
              <span className="text-slate-400 transition-colors">
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {item.position && (
            <span className="text-xs font-medium px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              {item.position}
            </span>
          )}
          
          {/* 项目简介 */}
          {item.summary && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 w-full">
              {item.summary}
            </p>
          )}
        </div>
        
        {/* 成就展开区域 */}
        <AnimatePresence>
          {expanded && item.achievements.length > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2"
            >
              <div className="pl-0 space-y-1">
                {item.achievements.map(achievement => (
                  <AchievementItem key={achievement.id} item={achievement} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// 公司组件 - 显示单个公司的所有项目
const CompanySection = ({ company }: { company: Company }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="company-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100/80 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800 flex-shrink-0">
            <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{company.position}</h3>
            <div className="flex flex-wrap items-center gap-1 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 text-sm">{company.name}</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-600 dark:text-slate-300 text-sm">{company.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{company.period}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="px-2 py-1 h-auto text-slate-600 dark:text-slate-300"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
      </div>
      
      {company.description && (
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          {company.description}
        </p>
      )}
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="timeline-container pl-4">
              <div className="space-y-6">
                {company.items.map(item => (
                  <ExperienceItemComponent key={item.id} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 适配数据函数 - 将原始数据转换为新格式
const adaptData = (originalData: any): Company[] => {
  return originalData.map((company: any) => {
    const items: ExperienceItem[] = [];
    
    // 处理模块
    if (company.modules && company.modules.length > 0) {
      company.modules.forEach((module: any) => {
        // 将模块添加为一个大项目
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
                // 子项目的STAR
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

// 主经验组件
const Experience = () => {
  const { t, getResumeData } = useLanguage();
  const resumeData = getResumeData();
  
  // 适配数据为新格式
  const companies = adaptData(resumeData.experiences);
  
  return (
    <div className="content-spacing">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{t('experience.title')}</h2>
        <Separator className="flex-grow ml-6 dark:bg-slate-700" />
      </div>
      
      <style>
      {`
        .timeline-container {
          position: relative;
        }
        .timeline-container::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 1px;
          background: #e2e8f0;
          z-index: 0;
        }
        .dark .timeline-container::before {
          background: #334155;
        }
        
        .timeline-item {
          position: relative;
          padding-left: 20px;
          margin-bottom: 24px;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          top: 6px;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbd5e1;
          border: 1px solid #94a3b8;
          z-index: 1;
        }
        .dark .timeline-item::before {
          background: #475569;
          border: 1px solid #64748b;
        }
      `}
      </style>
      
      <div className="space-y-12">
        {companies.map(company => (
          <CompanySection key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Experience; 