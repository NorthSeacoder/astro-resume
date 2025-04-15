import { useState } from "react";
import { Star, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
  id: string | number;
  title?: string;
  description?: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
}

const AchievementItem = ({ item }: { item: Achievement }) => {
  const [expanded, setExpanded] = useState(false);
  const isStarFormat = item.situation && item.task && item.action && item.result;
  return (
    <div className="mt-2 pl-3 border-l border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => isStarFormat && setExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
            <Star size={10} />
          </span>
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {item.title}
          </h5>
        </div>
        {isStarFormat && (
          <span className="text-slate-400 text-xs flex items-center">
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
        )}
      </div>
      {item.description && (
        <p className="text-xs text-slate-600 dark:text-slate-400 ml-6 mt-1">{item.description}</p>
      )}
      <AnimatePresence>
        {isStarFormat && expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden ml-6 mt-2 space-y-2"
          >
            <div className="text-xs bg-blue-50/50 dark:bg-blue-900/20 text-slate-700 dark:text-slate-300 p-2 rounded-sm border-l-2 border-blue-300 dark:border-blue-700">
              <span className="font-medium text-blue-600 dark:text-blue-400">情境：</span> {item.situation}
            </div>
            <div className="text-xs bg-amber-50/50 dark:bg-amber-900/20 text-slate-700 dark:text-slate-300 p-2 rounded-sm border-l-2 border-amber-300 dark:border-amber-700">
              <span className="font-medium text-amber-600 dark:text-amber-400">任务：</span> {item.task}
            </div>
            <div className="text-xs bg-emerald-50/50 dark:bg-emerald-900/20 text-slate-700 dark:text-slate-300 p-2 rounded-sm border-l-2 border-emerald-300 dark:border-emerald-700">
              <span className="font-medium text-emerald-600 dark:text-emerald-400">行动：</span> {item.action}
            </div>
            <div className="text-xs bg-purple-50/50 dark:bg-purple-900/20 text-slate-700 dark:text-slate-300 p-2 rounded-sm border-l-2 border-purple-300 dark:border-purple-700">
              <span className="font-medium text-purple-600 dark:text-purple-400">结果：</span> {item.result}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementItem; 