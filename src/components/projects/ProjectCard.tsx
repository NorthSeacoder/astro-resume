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

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, TechEvolution, TechRelations, projects }) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cardInView = useInView(cardRef, { once: true, amount: 0.1, margin: "-25% 0px" });
  const animationDelay = isMobile ? Math.min(index * 0.02, 0.04) : Math.min(index * 0.04, 0.08);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={cardInView
        ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: animationDelay } }
        : { opacity: 0, y: 20 }
      }
      className="h-full w-full relative"
    >
      <div className={cn(
        "project-item group",
        project.featured && "ring-2 ring-primary/20"
      )}>
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <span className="professional-badge">
              {t('projects.featured')}
            </span>
          </div>
        )}
        
        <div className="h-48 overflow-hidden relative rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            className="project-image w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="flex-grow p-6 flex flex-col">
          <h3 className="project-title">
            {project.title}
          </h3>
          <p className="project-description">
            {project.description}
          </p>
          
          <div className="project-tech">
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="skill-tag">
                {tech}
              </span>
            ))}
          </div>
          
          {project.evolution && project.evolution.length > 0 && (
            <TechEvolution steps={project.evolution} />
          )}
          
          <TechRelations relatedIds={project.related} allProjects={projects} />
          
          <div className="project-actions">
            {project.liveLink && (
              <Button
                asChild
                variant="default"
                size="sm"
                className="flex-1"
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
                asChild
                variant="outline"
                size="sm"
                className="flex-1"
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
      </div>
    </motion.div>
  );
};

export default ProjectCard;