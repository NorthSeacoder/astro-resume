import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language, t, getResumeData } = useLanguage();
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // 获取当前语言的resume数据
  const resumeData = getResumeData();
  const education = resumeData.education[0]; // 只获取第一个学历

  return (
    <div ref={sectionRef} className="resume-section">
      <div className="resume-header">
        <h2 className="resume-title">
          {t('education.title')}
        </h2>
        <div className="resume-divider"></div>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="card-elevated p-8 text-center">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-4 shadow-sm">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-semibold text-heading mb-2">{education.degree}</h3>
              <p className="text-primary font-medium text-lg">{education.field}</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span>{education.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>{education.location}</span>
                </div>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-heading mb-3">{education.institution}</h4>
                <p className="text-body leading-relaxed">{education.description}</p>
              </div>
              
              {education.achievements && education.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-heading mb-4">{t('education.achievements')}</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {education.achievements.map((achievement, i) => (
                      <Badge 
                        key={i} 
                        variant="outline"
                        className="bg-primary-light text-primary border-primary/20 px-3 py-1"
                      >
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;