import { ExternalLink, Github, Code, GitBranch, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Project as BaseProject, PortfolioProject as BasePortfolioProject } from "@/types/resume";

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

// 扩展PortfolioProject接口以添加所需的其他属性
interface Project extends BasePortfolioProject {
  related?: string[];
  imageUrl?: string;
  techEvolution?: {
    nodes: TechNode[];
    edges: TechEdge[];
  };
}

// 代码装饰元素
const CodeDecoration = () => (
  <div className="absolute top-4 right-4 opacity-5 dark:opacity-10 text-xs font-mono text-slate-800 dark:text-slate-200 pointer-events-none transform rotate-6 code-decoration">
    {`<Project
  title="Feature"
  tech={[JS, React]}
  responsive={true}
/>`}
  </div>
);

// 技术演进组件
const TechEvolution = ({ steps }: { steps: string[] }) => {
  const { t } = useLanguage();
  return (
    <div className="mt-4 pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
      <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
        {t('projects.evolution')}
      </h5>
      <div className="flex flex-wrap items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <Badge 
              variant="outline" 
              className={`${index === 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : ''} 
                        ${index === steps.length - 1 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : ''}`}
            >
              {step}
            </Badge>
            {index < steps.length - 1 && (
              <ArrowRight size={14} className="mx-2 text-slate-400 dark:text-slate-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 技术关联组件 - 简化版本
const TechRelations = ({ techIds, allProjects }: { techIds: string[], allProjects: Project[] }) => {
  const { t } = useLanguage();
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // 找出共享至少一个技术的其他项目
    const related = allProjects.filter(project => 
      project.techIds.some(tech => techIds.includes(tech)) && 
      !techIds.every(tech => project.techIds.includes(tech))
    ).slice(0, 3); // 最多显示3个相关项目
    
    setRelatedProjects(related);
  }, [techIds, allProjects]);
  
  if (relatedProjects.length === 0) return null;
  
  return (
    <div className="mt-4 pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
      <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {t('projects.related')}
      </h5>
      <div className="flex flex-wrap gap-2">
        {relatedProjects.map(project => (
          <Badge 
            key={project.id}
            variant="outline"
            className="bg-slate-50 dark:bg-slate-800 flex items-center gap-1 px-2 py-1"
          >
            <GitBranch size={12} className="opacity-70" />
            <span className="truncate max-w-[120px]">{project.title}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const { t, language, getResumeData } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.1 });
  
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
        evolution: project.evolution
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
          evolution: ["jQuery", "React Class Components", "React Hooks"]
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
          evolution: ["Vue 2", "Vue 3", "Composition API"]
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
          evolution: ["Angular.js", "Angular 2+", "Angular Material"]
        }
      ]);
    }
  }, [language, t, resumeData]);

  // 3D Project Card component with enhanced visual effects
  const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const cardInView = useInView(cardRef, { once: false, margin: "-10%" });
    
    // Mouse movement handling for card tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Transform values for parallax effect
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    // Handle mouse movement for 3D tilt effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Calculate center point
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;
      
      // Calculate distance from center
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Update motion values
      x.set(mouseX);
      y.set(mouseY);
    };

    // Reset values when mouse leaves
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ 
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="h-full"
      >
        <motion.div 
          className="perspective-1000 h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out"
          }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <Card className="h-full overflow-hidden flex flex-col border border-slate-200/70 dark:border-slate-700/70 rounded-2xl shadow-xl relative bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm">
            {/* 特色项目标记 */}
            {project.featured && (
              <div className="absolute top-0 right-0 z-20">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rotate-[32deg] translate-x-7 -translate-y-2 shadow-md">
                  {t('projects.featured')}
                </div>
              </div>
            )}
            
            {/* 图片部分 */}
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-indigo-200/30 dark:from-blue-900/20 dark:to-indigo-900/20 z-0"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            {/* 内容部分 */}
            <div className="flex-grow p-5 flex flex-col">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
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
                  <Badge key={index} variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/20">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              {/* 技术栈演进历史 */}
              {project.evolution && project.evolution.length > 0 && (
                <TechEvolution steps={project.evolution} />
              )}
              
              {/* 技术栈关联项目 */}
              <TechRelations techIds={project.techIds} allProjects={projects} />
              
              {/* 操作按钮 */}
              <div className="flex gap-2 mt-4">
                {project.liveLink && (
                  <Button variant="outline" size="sm" className="flex items-center gap-1 flex-1">
                    <ExternalLink size={14} />
                    <span>{t('projects.actions.view')}</span>
                  </Button>
                )}
                {project.repoLink && (
                  <Button variant="outline" size="sm" className="flex items-center gap-1 flex-1">
                    <Github size={14} />
                    <span>{t('projects.actions.code')}</span>
                  </Button>
                )}
              </div>
            </div>
            
            {/* 代码装饰 */}
            <CodeDecoration />
            
            {/* 装饰元素 */}
            <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-blue-400/10 rounded-full blur-xl opacity-70 pointer-events-none"></div>
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-400/10 rounded-full blur-xl opacity-70 pointer-events-none"></div>
          </Card>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{t('projects.title')}</h2>
        <Separator className="flex-grow ml-6 dark:bg-slate-700" />
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
