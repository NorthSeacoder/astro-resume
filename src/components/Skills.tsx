import { useRef, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { Code, BrainCircuit, Zap } from "lucide-react";
import { Skill, SkillCategory as BaseSkillCategory } from "@/types/resume";

// 定义技能水平类型 
type ProficiencyLevel = "Expert" | "Advanced" | "Proficient" | "Intermediate" | "Beginner";

// 扩展SkillCategory接口以使用React.ReactNode作为icon类型
interface SkillCategory extends Omit<BaseSkillCategory, 'icon'> {
  icon: React.ReactNode;
}

// Map proficiency levels to percentages
const proficiencyToPercentage: Record<ProficiencyLevel, number> = {
  "Expert": 95,
  "Advanced": 85,
  "Proficient": 75,
  "Intermediate": 60,
  "Beginner": 40
};

// SkillCard component that handles individual skill items with animations
const SkillCard = ({ 
  skill, 
  delay, 
  inView 
}: { 
  skill: Skill, 
  delay: number,
  inView: boolean
}) => {
  const { t } = useLanguage();
  
  // Translate proficiency level using i18n
  const getLocalizedLevel = (level?: string) => {
    if (!level) return "";
    return t(`skills.levels.${level.toLowerCase()}`);
  };

  // 验证技能等级是否为有效的ProficiencyLevel值
  const isValidLevel = (level?: string): level is ProficiencyLevel => {
    if (!level) return false;
    return ['Expert', 'Advanced', 'Proficient', 'Intermediate', 'Beginner'].includes(level);
  };
  
  // 获取安全的样式，如果level无效则使用默认值
  const getColorStyles = (level?: string) => {
    if (isValidLevel(level)) {
      return proficiencyColors[level];
    }
    return {
      bg: "badge-secondary",
      progressColor: "bg-primary"
    };
  };

  const colorStyles = getColorStyles(skill.level);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        delay: delay * 0.1, 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group"
    >
      <div className="mb-3 flex justify-between items-start">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-base font-medium text-heading group-hover:text-primary transition-colors">
              {skill.name}
            </h4>
            {skill.level && (
              <span className={`${colorStyles.bg} transition-opacity group-hover:opacity-100`}>
                {getLocalizedLevel(skill.level)}
              </span>
            )}
          </div>
          {skill.description && (
            <p className="text-caption max-w-md">{skill.description}</p>
          )}
        </div>
        {skill.percentage && (
          <div className="text-sm font-medium text-muted-foreground ml-4 w-12 text-right">
            {skill.percentage}%
          </div>
        )}
      </div>
      
      <div className="skill-progress-container">
        <motion.div 
          className={`skill-progress-bar ${skill.level ? colorStyles.progressColor : "bg-primary"}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: "easeOut" }}
        />
      </div>
      
      {/* Keywords display */}
      {skill.keywords && skill.keywords.length > 0 && (
        <div className="skill-cloud mt-3">
          {skill.keywords.map((keyword, idx) => (
            <span key={idx} className="skill-tag">
              {keyword}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Color mapping for proficiency levels
const proficiencyColors: Record<ProficiencyLevel, { bg: string, progressColor: string }> = {
  "Expert": { bg: "badge-accent", progressColor: "bg-green-500" },
  "Advanced": { bg: "badge-primary", progressColor: "bg-primary" },
  "Proficient": { bg: "badge-secondary", progressColor: "bg-blue-500" },
  "Intermediate": { bg: "badge-secondary", progressColor: "bg-yellow-500" },
  "Beginner": { bg: "badge-secondary", progressColor: "bg-gray-500" }
};

// 代码装饰组件
const CodeDecoration = () => (
  <div className="absolute -top-6 -right-6 opacity-5 dark:opacity-10 pointer-events-none">
    <div className="text-xs font-mono text-slate-800 dark:text-slate-200 transform rotate-12">
      <div>{'function Skills() {'}</div>
      <div className="pl-4">{'const expertise = "fullstack";'}</div>
      <div className="pl-4">{'const experience = 10+'}</div>
      <div>{'}'}</div>
    </div>
  </div>
);

const Skills = () => {
  const { t, language, getResumeData } = useLanguage();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  
  // 获取简历数据
  const resumeData = getResumeData();

  // 根据图标名称映射成组件
  const getIconByName = (iconName: string) => {
    if (!iconName) {
      console.warn('图标名称为空');
      return <Code size={24} className="text-blue-600 dark:text-blue-400" />;
    }
    
    try {
      switch(iconName) {
        case 'Code':
          return <Code size={24} className="text-blue-600 dark:text-blue-400" />;
        case 'BrainCircuit':
          return <BrainCircuit size={24} className="text-purple-600 dark:text-purple-400" />;
        case 'Zap':
          return <Zap size={24} className="text-amber-600 dark:text-amber-400" />;
        default:
          console.warn(`未知的图标名称: ${iconName}`);
          return <Code size={24} className="text-blue-600 dark:text-blue-400" />;
      }
    } catch (error) {
      console.error(`处理图标时出错: ${error}`);
      return <Code size={24} className="text-blue-600 dark:text-blue-400" />;
    }
  };
  
  // 更新技能类别，添加多语言支持
  useEffect(() => {
    try {
      if (resumeData?.skills?.categories) {
        console.log('成功获取技能类别数据:', resumeData.skills.categories.length);
        
        // 直接使用JSON中定义的分类，只需添加图标组件
        const mappedCategories = resumeData.skills.categories.map(category => {
          try {
            return {
              ...category,
              icon: getIconByName(category.icon || ''),
              name: category.name || t('skills.category.unknown') // 使用默认值
            };
          } catch (err) {
            console.error(`处理技能类别时出错: ${err}`, category);
            // 返回一个安全的默认类别，确保UI不会崩溃
            return {
              id: category.id || 0,
              name: category.name || t('skills.category.unknown'),
              icon: <Code size={24} className="text-blue-600 dark:text-blue-400" />,
              skills: [] // 空技能列表
            };
          }
        });
        
        setSkillCategories(mappedCategories);
      } else {
        console.warn('技能类别数据不可用');
        setSkillCategories([]); // 设置为空数组，避免错误
      }
    } catch (error) {
      console.error('处理技能数据时出错:', error);
      setSkillCategories([]); // 设置为空数组，避免错误
    }
  }, [t, language, resumeData]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <div ref={containerRef} className="resume-section">
      <div className="resume-header">
        <h2 className="resume-title">
          {t('skills.title')}
        </h2>
        <div className="resume-divider"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => {
          const categoryRef = useRef<HTMLDivElement>(null);
          const categoryInView = useInView(categoryRef, { once: false, amount: 0.2 });
          
          return (
            <motion.div
              key={category.id}
              ref={categoryRef}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.6, 
                delay: categoryIndex * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="h-full"
            >
              <div className="card-elevated h-full p-6">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="contact-icon">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-heading">{category.name}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, index) => (
                      <SkillCard 
                        key={skill.name} 
                        skill={skill} 
                        delay={index} 
                        inView={categoryInView}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
