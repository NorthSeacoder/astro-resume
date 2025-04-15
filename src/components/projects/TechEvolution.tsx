import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

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

export default TechEvolution; 