
import { Briefcase, Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Experience = () => {
  const { t, getResumeData } = useLanguage();
  const resumeData = getResumeData();
  const experiences = resumeData.experiences;
  
  // State to track which experience cards are expanded (now defaulting to collapsed)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    experiences.reduce((acc, job) => ({...acc, [job.id]: false}), {})
  );

  // Toggle the expanded state of a card
  const toggleCard = (id: number) => {
    setExpandedCards(prev => ({...prev, [id]: !prev[id]}));
  };

  return (
    <div className="content-spacing">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{t('experience.title')}</h2>
        <Separator className="flex-grow ml-6 dark:bg-slate-700" />
      </div>
      
      <div className="space-y-8">
        {experiences.map((job) => (
          <motion.div 
            key={job.id} 
            className="fade-right"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 shadow-md overflow-hidden dark:border-slate-700 hover:shadow-lg transition-all duration-500 enhanced-card rounded-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/50">
              <div className="flex flex-col space-y-5">
                {/* Company header with toggle button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center flex-grow">
                    <div className="w-12 h-12 rounded-full bg-blue-100/80 dark:bg-blue-900/40 flex items-center justify-center mr-4 flex-shrink-0 border-2 border-blue-300 dark:border-blue-600 rotate-hover shadow-md group">
                      <Briefcase className="text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{job.position}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{job.company}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 dark:text-slate-300">{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-slate-500 dark:text-slate-300 sm:mt-0 ml-14 sm:ml-0 bg-slate-100 dark:bg-slate-700/30 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-700/50">
                      <Calendar className="mr-2 flex-shrink-0" size={16} />
                      <span>{job.period}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCard(job.id)}
                      className="flex-shrink-0 rounded-full bg-slate-100/80 dark:bg-slate-700/30 hover:bg-slate-200 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-0"
                      aria-label={expandedCards[job.id] ? t('common.collapse') : t('common.expand')}
                    >
                      {expandedCards[job.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                  </div>
                </div>
                
                {/* Company description */}
                <AnimatePresence initial={false}>
                  {expandedCards[job.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-14">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{job.description}</p>
                      </div>
                      
                      {/* Projects */}
                      <div className="ml-14 space-y-6 mt-5">
                        <h4 className="font-semibold text-lg text-slate-800 dark:text-white border-b pb-2 dark:border-slate-700 whitespace-nowrap">{t('experience.projects')}</h4>
                        
                        {job.projects.map((project) => (
                          <motion.div 
                            key={project.id} 
                            className="tilt-effect transition-bounce"
                            initial={{ scale: 1 }}
                          >
                            <div className="bg-gradient-to-br from-slate-50/95 to-blue-50/70 dark:from-slate-800/95 dark:to-slate-700/70 rounded-xl p-5 shadow-md border border-slate-100/80 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800/30 transition-all duration-300">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                                <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{project.name}</h5>
                                <Badge 
                                  variant="outline" 
                                  className="text-blue-600 dark:text-blue-400 dark:border-blue-900/50 self-start sm:self-center backdrop-blur-sm bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
                                >
                                  {project.period}
                                </Badge>
                              </div>
                              
                              <div className="mb-5">
                                <h6 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 whitespace-nowrap">{t('experience.background')}:</h6>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{project.background}</p>
                              </div>
                              
                              {/* STAR Method */}
                              <div className="mt-5 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-4 backdrop-blur-sm border border-slate-100/80 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group">
                                  <h6 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 whitespace-nowrap flex items-center">
                                    <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-2 flex items-center justify-center text-xs text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">S</span>
                                    {t('experience.star.situation')}
                                  </h6>
                                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{project.star.situation}</p>
                                </div>
                                
                                <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-4 backdrop-blur-sm border border-slate-100/80 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group">
                                  <h6 className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2 whitespace-nowrap flex items-center">
                                    <span className="w-5 h-5 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-2 flex items-center justify-center text-xs text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">T</span>
                                    {t('experience.star.task')}
                                  </h6>
                                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{project.star.task}</p>
                                </div>
                                
                                <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-4 backdrop-blur-sm border border-slate-100/80 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group">
                                  <h6 className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2 whitespace-nowrap flex items-center">
                                    <span className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mr-2 flex items-center justify-center text-xs text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">A</span>
                                    {t('experience.star.action')}
                                  </h6>
                                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{project.star.action}</p>
                                </div>
                                
                                <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-4 backdrop-blur-sm border border-slate-100/80 dark:border-slate-700/50 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group">
                                  <h6 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2 whitespace-nowrap flex items-center">
                                    <span className="w-5 h-5 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-2 flex items-center justify-center text-xs text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">R</span>
                                    {t('experience.star.result')}
                                  </h6>
                                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{project.star.result}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
