import { useState } from "react";
import { Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AchievementItem from "./AchievementItem";

interface Achievement {
  id: string | number;
  title?: string;
  description?: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
}

interface ExperienceItem {
  id: string | number;
  title: string;
  period?: string;
  company?: string;
  position?: string;
  location?: string;
  type?: string;
  summary?: string;
  achievements: Achievement[];
  category?: string;
}

const ExperienceItemComponent = ({ item }: { item: ExperienceItem }) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.achievements.length > 0) setExpanded(prev => !prev);
  };
  return (
    <div className="pb-1">
      <div
        className="flex flex-col p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors duration-200"
        onClick={handleToggle}
        style={{ cursor: item.achievements.length > 0 ? 'pointer' : 'default' }}
      >
        <div
          className={`flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <h4 className="text-base font-medium text-slate-800 dark:text-slate-200 flex items-center flex-wrap gap-2">
              {item.title}
              {item.category && (
                <span className="inline-block px-2 py-0.5 ml-1 rounded bg-indigo-50 dark:bg-indigo-900/30 text-xs text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 align-middle">
                  {item.category}
                </span>
              )}
              {item.type && (
                <span className="inline-block px-2 py-0.5 ml-1 rounded bg-blue-50 dark:bg-blue-900/30 text-xs text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 align-middle">
                  {item.type}
                </span>
              )}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            {item.period && (
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <Calendar size={12} className="mr-1" />
                <span>{item.period}</span>
              </div>
            )}
            {item.achievements.length > 0 && (
              <span className="text-slate-400 transition-colors">
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {item.position && (
            <span className="text-xs font-medium px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              {item.position}
            </span>
          )}
          {item.summary && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 w-full">
              {item.summary}
            </p>
          )}
        </div>
        <AnimatePresence>
          {expanded && item.achievements.length > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-3"
              onClick={e => e.stopPropagation()}
            >
              <div className="pl-0 space-y-2">
                {item.achievements.map(achievement => (
                  <AchievementItem key={achievement.id} item={achievement} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceItemComponent; 