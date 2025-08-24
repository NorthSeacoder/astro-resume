import { useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import useMediaQuery from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import throttle from "lodash/throttle";

// Project 类型定义（与 Projects.tsx 保持一致）
interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  techIds: string[];
  liveLink?: string;
  repoLink?: string;
  featured?: boolean;
  evolution?: string[];
  related?: number[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  TechEvolution: React.FC<{ steps: string[] }>;
  TechRelations: React.FC<{ relatedIds?: number[]; allProjects: Project[] }>;
  projects: Project[];
}

const CodeDecoration = () => (
  <div className="absolute -top-5 -right-5 opacity-5 dark:opacity-10 pointer-events-none">
    <div className="text-xs font-mono text-slate-800 dark:text-slate-200 transform rotate-12">
      <div>{'<ProjectCard />'}</div>
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, TechEvolution, TechRelations, projects }) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cardInView = useInView(cardRef, { once: true, amount: 0.1, margin: "-25% 0px" });
  const animationDelay = isMobile ? Math.min(index * 0.02, 0.04) : Math.min(index * 0.04, 0.08);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [1, -1]);
  const rotateY = useTransform(x, [-100, 100], [-1, 1]);
  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  }, 16);
  const handleMouseLeave = () => {
    animate(x, 0, { duration: 0.2, type: "tween" });
    animate(y, 0, { duration: 0.2, type: "tween" });
  };
  const shouldApplyEffects = cardInView && !isMobile;
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={cardInView
        ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: animationDelay } }
        : { opacity: 0, y: 20 }
      }
      className="group h-full w-full relative"
      style={{
        transform: shouldApplyEffects
          ? `perspective(1000px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg) scale3d(1.01, 1.01, 1.01)`
          : "none",
        transition: "transform 0.2s ease-out",
      }}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >
      <div className={`project-item h-full flex flex-col ${project.featured ? 'ring-2 ring-primary/20' : ''}`}>
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <span className="professional-badge">
              {t('projects.featured')}
            </span>
          </div>
        )}
        
        <div className="h-48 overflow-hidden relative rounded-t-xl border-b border-border">
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
            loading="lazy"
          />
        </div>
        
        <div className="flex-grow p-6 flex flex-col">
          <h3 className="project-title group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="project-description flex-grow">
            {project.description}
          </p>
          
          <div className="mt-4">
            <div className="project-tech">
              {project.technologies.map((tech, index) => (
                <span key={index} className="skill-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {project.evolution && project.evolution.length > 0 && (
            <TechEvolution steps={project.evolution} />
          )}
          
          <TechRelations relatedIds={project.related} allProjects={projects} />
          
          <div className="flex gap-3 mt-6">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
                data-umami-event="project-view"
                data-umami-event-project={project.title}
              >
                  <ExternalLink size={14} />
                  <span>{t('projects.actions.view')}</span>
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex-1 flex items-center justify-center gap-2"
                data-umami-event="project-code"
                data-umami-event-project={project.title}
              >
                  <Github size={14} />
                  <span>{t('projects.actions.code')}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 