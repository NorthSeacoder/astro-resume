import { ExternalLink, Github, Code, GitBranch, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, useInView, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/i18n";
import { Project as BaseProject, PortfolioProject as BasePortfolioProject } from "@/types/resume";
import { throttle } from "lodash";
import useMediaQuery from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

// 技术关联图
interface TechNode {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

interface TechEdge {
  source: string;
  target: string;
  label?: string;
}

// 技术关联定义
interface TechRelation {
  id: string;
  source: string;
  target: string;
  strength: number;
}

// 项目卡片的属性定义
interface ProjectCardProps {
  project: Project;
  index: number;
}

// 扩展PortfolioProject接口以添加所需的其他属性
interface Project extends BasePortfolioProject {
  related?: number[];  // 使用项目ID数组表示相关项目
  imageUrl?: string;
  techEvolution?: {
    nodes: TechNode[];
    edges: TechEdge[];
  };
}

// 代码装饰元素
const CodeDecoration: React.FC = () => (
  <div className="absolute top-4 right-4 opacity-5 dark:opacity-10 text-xs font-mono text-slate-800 dark:text-slate-200 pointer-events-none transform rotate-6 code-decoration">
    {`<Project
  title="Amazing"
  tech={[TS, React]}
  animated={true}
/>`}
  </div>
);

// 技术演进组件
const TechEvolution = ({ steps }: { steps: string[] }) => {
  const { t } = useLanguage();
  return (
    <div className="mt-4 pt-4 border-t border-slate-200/30 dark:border-slate-700/50">
      <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
        {t('projects.evolution')}
      </h5>
      <div className="flex flex-wrap items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <Badge 
              variant="outline" 
              className={cn(
                "border-slate-200 dark:border-slate-600/50",
                index === 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 dark:border-emerald-800/50' : '',
                index === steps.length - 1 ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 dark:border-blue-800/50' : '',
                index !== 0 && index !== steps.length - 1 ? 'text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/80 dark:border-slate-700/80' : ''
              )}
            >
              {step}
            </Badge>
            {index < steps.length - 1 && (
              <ArrowRight size={14} className="mx-2 text-slate-400 dark:text-slate-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 技术关联组件 - 使用关联项目配置
const TechRelations = ({ relatedIds, allProjects }: { relatedIds?: number[], allProjects: Project[] }) => {
  const { t } = useLanguage();
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // 使用预先配置的关联项目ID
    if (relatedIds && relatedIds.length > 0) {
      const related = allProjects.filter(project => 
        relatedIds.includes(Number(project.id))
      ).slice(0, 3); // 最多显示3个相关项目
      
      setRelatedProjects(related);
    } else {
      setRelatedProjects([]);
    }
  }, [relatedIds, allProjects]);
  
  if (relatedProjects.length === 0) return null;
  
  return (
    <div className="mt-4 pt-4 border-t border-slate-200/30 dark:border-slate-700/50">
      <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {t('projects.related')}
      </h5>
      <div className="flex flex-wrap gap-2">
        {relatedProjects.map(project => (
          <Badge 
            key={project.id}
            variant="outline"
            className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600/80 flex items-center gap-1 px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <GitBranch size={12} className="text-blue-500 dark:text-blue-400 opacity-70" />
            <span className="truncate max-w-[120px]">{project.title}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { t, language, getResumeData } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [techRelations, setTechRelations] = useState<TechRelation[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 提高检测灵敏度，使项目更早出现
  const inView = useInView(containerRef, { 
    once: true, 
    amount: 0.15,
    margin: "0px 0px -10% 0px" 
  });
  
  // 动态计算延迟时间，尽量减少延迟
  const getDelayTime = (index: number) => {
    const isMobile = window.innerWidth < 768;
    // 大幅减少延迟时间，移动端延迟更短
    return isMobile ? Math.min(index * 0.03, 0.06) : Math.min(index * 0.05, 0.1);
  };
  
  // 加载简历数据
  const resumeData = getResumeData();
  
  // 使用简历数据中的项目数据
  useEffect(() => {
    // 使用resumeData中的portfolioProjects
    if (resumeData.portfolioProjects && resumeData.portfolioProjects.length > 0) {
      // 将PortfolioProject转换为组件内部的Project接口
      const portfolioProjects = resumeData.portfolioProjects.map(project => ({
        id: project.id,
        title: project.title || t(`projects.items.${project.id}.title`),
        description: project.description || t(`projects.items.${project.id}.description`),
        image: project.image || "/placeholder.svg",
        technologies: project.technologies || [],
        techIds: project.techIds || [],
        liveLink: project.liveLink,
        repoLink: project.repoLink,
        featured: project.featured,
        evolution: project.evolution,
        related: project.related // 添加关联项目ID数组
      }));
      
      setProjects(portfolioProjects);
    } else {
      // 如果没有portfolioProjects数据，使用默认数据
      setProjects([
        {
          id: 1,
          title: t('projects.items.1.title'),
          description: t('projects.items.1.description'),
          image: "/placeholder.svg",
          technologies: ["React", "Node.js", "MongoDB", "Express"],
          techIds: ["react", "nodejs", "mongodb", "express"],
          liveLink: "https://example.com/project1",
          repoLink: "https://github.com/yourusername/project1",
          featured: true,
          evolution: ["jQuery", "React Class Components", "React Hooks"],
          related: []
        },
        {
          id: 2,
          title: t('projects.items.2.title'),
          description: t('projects.items.2.description'),
          image: "/placeholder.svg",
          technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
          techIds: ["vue", "firebase", "tailwind"],
          liveLink: "https://example.com/project2",
          repoLink: "https://github.com/yourusername/project2",
          evolution: ["Vue 2", "Vue 3", "Composition API"],
          related: []
        },
        {
          id: 3,
          title: t('projects.items.3.title'),
          description: t('projects.items.3.description'),
          image: "/placeholder.svg",
          technologies: ["Angular", "TypeScript", "Sass", "Django"],
          techIds: ["angular", "typescript", "sass", "django"],
          liveLink: "https://example.com/project3",
          repoLink: "https://github.com/yourusername/project3",
          evolution: ["Angular.js", "Angular 2+", "Angular Material"],
          related: []
        }
      ]);
    }
  }, [language, t, resumeData]);

  // 优化的 ProjectCard 组件
  const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");
    
    // 优化视图检测，更早开始渲染
    const cardInView = useInView(cardRef, { 
      once: true, 
      amount: 0.1,
      margin: "-25% 0px" // 大幅增加检测范围，使卡片在接近视口时就开始渲染
    });
    
    // 减少动画延迟时间
    const animationDelay = isMobile 
      ? Math.min(index * 0.02, 0.04) // 移动设备极短的延迟
      : Math.min(index * 0.04, 0.08); // 桌面设备更短的延迟
    
    // Mouse movement handling for card tilt effect (only on desktop)
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // 减小变换效果的强度，提高性能
    const rotateX = useTransform(y, [-100, 100], [1, -1]); // 减小倾斜角度
    const rotateY = useTransform(x, [-100, 100], [-1, 1]);

    // 使用useCallback并添加节流，减少事件处理开销
    const handleMouseMove = useCallback(
      throttle((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isMobile) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Calculate center point
        const centerX = rect.left + width / 2;
        const centerY = rect.top + height / 2;
        
        // Calculate distance from center
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // 减小移动敏感度，降低变换强度
        x.set(mouseX * 0.3);
        y.set(mouseY * 0.3);
      }, 16), // 约60fps的节流
    [isMobile, x, y]);

    // Reset values when mouse leaves - 优化过渡效果
    const handleMouseLeave = useCallback(() => {
      // 使用 animate 方法实现平滑过渡回初始位置
      animate(x, 0, { duration: 0.2, type: "tween" });
      animate(y, 0, { duration: 0.2, type: "tween" });
    }, [x, y]);

    // 使用useInView的同时加入性能优化逻辑
    const shouldApplyEffects = cardInView && !isMobile;

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={cardInView 
          ? { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", delay: animationDelay } }
          : { opacity: 0, y: 20 }
        }
        className={cn(
          "group h-full w-full overflow-hidden rounded-2xl transition-all",
          project.featured 
            ? "shadow-md shadow-blue-900/10 dark:shadow-blue-500/5" 
            : "shadow-md shadow-slate-200 dark:shadow-slate-700/20",
          "relative"
        )}
        style={{
          // 简化变换效果，只在非移动设备上启用，减轻渲染负担
          transform: shouldApplyEffects 
            ? `perspective(1000px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg) scale3d(1.01, 1.01, 1.01)` 
            : "none",
          transition: "transform 0.2s ease-out",
        }}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
      >
        <Card 
          className={cn(
            "h-full flex flex-col rounded-2xl relative",
            "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900",
            "backdrop-blur-sm transition-all duration-300",
            project.featured 
              ? "ring-1 ring-blue-500/20 dark:ring-blue-500/30 border border-slate-100 dark:border-blue-800/30" 
              : "border border-slate-100 dark:border-slate-700/50",
            "hover:shadow-lg dark:hover:shadow-slate-700/30"
          )}
        >
          {/* 特色项目标记 - 更简洁的风格 */}
          {project.featured && (
            <div className="absolute top-3 right-3 z-20">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap">
                {t('projects.featured')}
              </div>
            </div>
          )}
          
          {/* 图片部分 */}
          <div className="h-48 overflow-hidden relative border-b border-slate-100 dark:border-slate-700/60">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-indigo-200/30 dark:from-blue-950/30 dark:to-indigo-950/30 z-0"></div>
            <picture>
              <img 
                src={project.image} 
                alt={project.title} 
                width="600"
                height="192"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </picture>
          </div>
          
          {/* 内容部分 */}
          <div className="flex-grow p-5 flex flex-col">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm flex-grow">
              {project.description}
            </p>
            
            {/* 技术标签 */}
            <div className="mt-4 flex flex-wrap gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">
                {t('projects.technologies')}:
              </span>
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700">
                  {tech}
                </Badge>
              ))}
            </div>
            
            {/* 技术栈演进历史 */}
            {project.evolution && project.evolution.length > 0 && (
              <TechEvolution steps={project.evolution} />
            )}
            
            {/* 技术栈关联项目 */}
            <TechRelations relatedIds={project.related} allProjects={projects} />
            
            {/* 操作按钮 */}
            <div className="flex gap-2 mt-4">
              {project.liveLink && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 items-center justify-center gap-1 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  asChild
                >
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-umami-event="project-view"
                    data-umami-event-project={project.title}
                  >
                    <ExternalLink size={14} />
                    <span>{t('projects.actions.view')}</span>
                  </a>
                </Button>
              )}
              {project.repoLink && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 items-center justify-center gap-1 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  asChild
                >
                  <a 
                    href={project.repoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-umami-event="project-code"
                    data-umami-event-project={project.title}
                  >
                    <Github size={14} />
                    <span>{t('projects.actions.code')}</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          {/* 代码装饰 */}
          <CodeDecoration />
          
          {/* 装饰元素 */}
          <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-blue-400/10 rounded-full blur-xl opacity-70 pointer-events-none"></div>
          <div className="absolute -top-5 -left-5 w-20 h-20 bg-indigo-400/10 rounded-full blur-xl opacity-70 pointer-events-none"></div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{t('projects.title')}</h2>
        <Separator className="flex-grow ml-6 bg-slate-200/70 dark:bg-slate-700/70" />
      </div>
      
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
