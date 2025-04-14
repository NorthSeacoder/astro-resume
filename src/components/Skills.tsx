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
      bg: "bg-gray-100",
      text: "text-gray-800",
      darkBg: "dark:bg-gray-900/30",
      darkText: "dark:text-gray-400",
      progressColor: "bg-blue-500 dark:bg-blue-500"
    };
  };

  const colorStyles = getColorStyles(skill.level);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        delay: delay * 0.1, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="mb-5 group"
    >
      <div className="mb-2 flex justify-between items-center">
        <div className="flex flex-col flex-grow">
          <div className="flex items-center">
            <div className="text-base font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{skill.name}</div>
            {skill.level && (
              <Badge className={`${colorStyles.bg} ${colorStyles.text} ${colorStyles.darkBg} ${colorStyles.darkText} border-0 ml-2 opacity-90 group-hover:opacity-100 transition-opacity`}>
                {getLocalizedLevel(skill.level)}
              </Badge>
            )}
          </div>
          {skill.description && (
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md">{skill.description}</div>
          )}
        </div>
        {skill.percentage && (
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-2 w-10 text-right">
            {skill.percentage}%
          </div>
        )}
      </div>
      <Progress 
        value={skill.percentage} 
        className="h-2 bg-slate-200/50 dark:bg-slate-700/30 backdrop-blur-sm group-hover:shadow-md transition-shadow duration-300"
        indicatorClassName={skill.level ? colorStyles.progressColor : "bg-blue-500"}
        animated={true}
        inView={inView}
      />
      
      {/* Keywords display */}
      {skill.keywords && skill.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {skill.keywords.map((keyword, idx) => (
            <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
              {keyword}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Color mapping for proficiency levels
const proficiencyColors: Record<ProficiencyLevel, { bg: string, text: string, darkBg: string, darkText: string, progressColor: string }> = {
  "Expert": { 
    bg: "bg-emerald-100", 
    text: "text-emerald-800",
    darkBg: "dark:bg-emerald-900/30",
    darkText: "dark:text-emerald-400",
    progressColor: "bg-emerald-500 dark:bg-emerald-500"
  },
  "Advanced": { 
    bg: "bg-blue-100", 
    text: "text-blue-800",
    darkBg: "dark:bg-blue-900/30",
    darkText: "dark:text-blue-400",
    progressColor: "bg-blue-500 dark:bg-blue-500"
  },
  "Proficient": { 
    bg: "bg-violet-100", 
    text: "text-violet-800",
    darkBg: "dark:bg-violet-900/30",
    darkText: "dark:text-violet-400",
    progressColor: "bg-violet-500 dark:bg-violet-500"
  },
  "Intermediate": { 
    bg: "bg-amber-100", 
    text: "text-amber-800",
    darkBg: "dark:bg-amber-900/30",
    darkText: "dark:text-amber-400",
    progressColor: "bg-amber-500 dark:bg-amber-500"
  },
  "Beginner": { 
    bg: "bg-gray-100", 
    text: "text-gray-800",
    darkBg: "dark:bg-gray-900/30",
    darkText: "dark:text-gray-400",
    progressColor: "bg-gray-500 dark:bg-gray-500"
  }
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
    <div ref={containerRef}>
      <div className="flex items-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
          {t('skills.title')}
        </h2>
        <Separator className="flex-grow ml-6 dark:bg-slate-700" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <Card className="relative p-6 shadow-lg dark:bg-slate-800/80 dark:border-slate-700 transition-all duration-300 h-full bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-xl overflow-hidden hover:shadow-xl">
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100/80 dark:bg-slate-700/30 mr-4 border border-slate-200/50 dark:border-slate-600/30 shadow-sm">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{category.name}</h3>
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
                
                {/* Decorative code pattern */}
                <CodeDecoration />
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400/5 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-violet-400/5 dark:bg-violet-500/10 rounded-full blur-2xl pointer-events-none"></div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
