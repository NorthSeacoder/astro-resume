import { Separator } from "@/components/ui/separator";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { PortfolioProject as BasePortfolioProject } from "@/types/resume";
import ProjectCard from './projects/ProjectCard';
import TechEvolution from './projects/TechEvolution';
import TechRelations from './projects/TechRelations';

// 扩展PortfolioProject接口以添加所需的其他属性
interface Project extends BasePortfolioProject {
  related?: number[];
  imageUrl?: string;
  techEvolution?: {
    nodes: any[];
    edges: any[];
  };
}

const Projects: React.FC = () => {
  const { t, language, getResumeData } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { 
    once: true, 
    amount: 0.15,
    margin: "0px 0px -10% 0px" 
  });
  const resumeData = getResumeData();
  useEffect(() => {
    if (resumeData.portfolioProjects && resumeData.portfolioProjects.length > 0) {
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
        related: project.related
      }));
      setProjects(portfolioProjects);
    } else {
      setProjects([]);
    }
  }, [language, t, resumeData]);
  return (
    <div ref={containerRef} className="space-y-0">
      <div className="flex items-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
          {t('projects.title')}
        </h2>
        <Separator className="flex-grow ml-6 dark:bg-slate-700" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            TechEvolution={TechEvolution}
            TechRelations={TechRelations}
            projects={projects}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
