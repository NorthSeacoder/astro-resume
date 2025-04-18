import { useState } from "react";
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import ExperienceItemComponent from "./ExperienceItemComponent";

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
}

interface ExperienceCompany {
  id: string | number;
  company: string;
  position: string;
  location: string;
  period: string;
  description?: string;
  items: ExperienceItem[];
}

interface CompanySectionProps {
  company: ExperienceCompany;
}

const CompanySection = ({ company }: CompanySectionProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div 
      className={`company-section bg-white dark:bg-slate-800/30 rounded-lg shadow-sm hover:shadow transition-all duration-300 ${company.items.length > 0 ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (company.items.length > 0) setExpanded(!expanded);
      }}
    >
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 px-4 pt-4`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100/80 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800 flex-shrink-0">
            <Briefcase size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{company.position}</h3>
            <div className="flex flex-wrap items-center gap-1 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 text-sm">{company.company}</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-600 dark:text-slate-300 text-sm">{company.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">{company.period}</span>
          <span className="ml-2 text-slate-400">{expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
        </div>
      </div>
      {company.description && (
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 px-4 pt-2">{company.description}</p>
      )}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-[5000px] opacity-100 p-4 pb-5' : 'max-h-0 opacity-0 p-0'}`}
        style={{ transitionDelay: expanded ? '0ms' : '0ms' }}
        onClick={(e) => e.stopPropagation()}
      >
        {company.items.map(item => (
          <ExperienceItemComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CompanySection; 