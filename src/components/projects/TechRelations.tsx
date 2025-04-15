import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { GitBranch } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface Project {
  id: string | number;
  title: string;
}

const TechRelations = ({ relatedIds, allProjects }: { relatedIds?: number[], allProjects: Project[] }) => {
  const { t } = useLanguage();
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  useEffect(() => {
    if (relatedIds && relatedIds.length > 0) {
      const related = allProjects.filter(project => 
        relatedIds.includes(Number(project.id))
      ).slice(0, 3);
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

export default TechRelations; 