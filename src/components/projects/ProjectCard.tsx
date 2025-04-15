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
      className={cn(
        "group h-full w-full overflow-hidden rounded-2xl transition-all mb-10",
        project.featured
          ? "shadow-md shadow-blue-900/10 dark:shadow-blue-500/5"
          : "shadow-md shadow-slate-200 dark:shadow-slate-700/20",
        "relative"
      )}
      style={{
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
          "bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950",
          "backdrop-blur-sm transition-all duration-300",
          project.featured
            ? "ring-1 ring-blue-500/20 dark:ring-blue-500/30 border border-slate-100 dark:border-blue-800/30"
            : "border border-slate-100 dark:border-slate-700/50",
          "hover:shadow-lg dark:hover:shadow-slate-700/30"
        )}
      >
        {project.featured && (
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap">
              {t('projects.featured')}
            </div>
          </div>
        )}
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
        <div className="flex-grow p-5 flex flex-col">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-100 text-sm flex-grow">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">
              {t('projects.technologies')}:
            </span>
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-slate-700 dark:text-slate-100 border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700">
                {tech}
              </Badge>
            ))}
          </div>
          {project.evolution && project.evolution.length > 0 && (
            <TechEvolution steps={project.evolution} />
          )}
          <TechRelations relatedIds={project.related} allProjects={projects} />
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
        <CodeDecoration />
        <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-blue-400/10 rounded-full blur-xl opacity-70 pointer-events-none"></div>
        <div className="absolute -top-5 -left-5 w-20 h-20 bg-indigo-400/10 rounded-full blur-xl opacity-70 pointer-events-none"></div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard; 