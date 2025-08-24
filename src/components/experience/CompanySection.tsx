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
    <div className={`experience-item ${company.items.length > 0 ? 'cursor-pointer' : ''}`}>
      <div 
        className="card-modern p-6 hover:shadow-md transition-all duration-300"
        onClick={() => {
          if (company.items.length > 0) setExpanded(!expanded);
        }}
      >
        <div className="experience-header">
          <div className="flex items-center gap-4 mb-4">
            <div className="contact-icon">
              <Briefcase size={20} />
            </div>
            <div className="flex-grow">
              <h3 className="experience-title">{company.position}</h3>
              <div className="experience-company">{company.company}</div>
              <div className="flex items-center gap-2 text-caption">
                <span>{company.location}</span>
                <span>•</span>
                <span>{company.period}</span>
              </div>
            </div>
            {company.items.length > 0 && (
              <div className="text-muted-foreground">
                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            )}
          </div>
          
          {company.description && (
            <p className="text-body">{company.description}</p>
          )}
        </div>
        
        {/* 展开的内容 */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-4 pt-4 border-t border-border">
            {company.items.map(item => (
              <ExperienceItemComponent key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySection;

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