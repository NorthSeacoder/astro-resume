import { useState } from "react";
import { Building, MapPin, Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  position?: string;
  summary?: string;
  achievements: Achievement[];
  category?: string;
}

interface Company {
  id: string | number;
  company: string;
  position: string;
  location: string;
  period: string;
  description?: string;
  items: ExperienceItem[];
}

const CompanySection = ({ company }: { company: Company }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <Card className="card-elevated overflow-hidden">
        {/* 公司头部信息 */}
        <div 
          className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-heading">{company.company}</h3>
                  <p className="text-primary font-medium">{company.position}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{company.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{company.location}</span>
                </div>
              </div>
              
              {company.description && (
                <p className="text-body mt-3 leading-relaxed">{company.description}</p>
              )}
            </div>
            
            <div className="ml-4">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
          </div>
        </div>

        {/* 项目列表 */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 space-y-4">
                {company.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ExperienceItemComponent item={item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default CompanySection;