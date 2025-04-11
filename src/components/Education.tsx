
import { GraduationCap, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";

const Education = () => {
  const sectionRef = useRef(null);
  const { language, t, getResumeData } = useLanguage();
  
  // 获取当前语言的resume数据
  const resumeData = getResumeData();
  const educations = resumeData.education;

  useEffect(() => {
    // 创建IntersectionObserver来监视元素何时进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当元素进入视口时
          if (entry.isIntersecting) {
            // 找到所有需要动画的元素
            const animatedElements = entry.target.querySelectorAll('.fade-right, .animate-child');
            
            // 添加动画类
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-in');
              }, index * 100); // 错开动画时间
            });
            
            // 一旦触发动画，就停止观察
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // 当10%的元素可见时触发
        rootMargin: '0px 0px -100px 0px' // 视口底部偏移100px
      }
    );

    // 开始观察section元素
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 清理函数
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="content-spacing">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{t('education.title')}</h2>
        <Separator className="flex-grow ml-6 dark:bg-slate-700" />
      </div>
      
      <div className="space-y-8">
        {educations.map((edu) => (
          <div key={edu.id} className="fade-right opacity-0">
            <Card className="p-6 overflow-hidden dark:bg-slate-800/80 dark:border-slate-700 enhanced-card transition-bounce">
              <div className="flex flex-col space-y-5">
                {/* Education header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-4 flex-shrink-0 border-2 border-blue-300 dark:border-blue-600 rotate-hover shadow-md group">
                      <GraduationCap className="text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{edu.degree} in {edu.field}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 dark:text-slate-300">{edu.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-300 sm:mt-0 ml-14 sm:ml-0 bg-slate-100 dark:bg-slate-700/30 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-700/50">
                    <Calendar className="mr-2 flex-shrink-0" size={16} />
                    <span>{edu.period}</span>
                  </div>
                </div>
                
                {/* Education description */}
                <div className="ml-0 sm:ml-14">
                  <p className="text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">{edu.description}</p>
                
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3 whitespace-nowrap">{t('education.achievements')}:</h4>
                    <ul className="list-inside text-slate-700 dark:text-slate-300 space-y-2.5">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="animate-child fade-left opacity-0 flex items-start">
                          <span className="inline-block w-4 h-4 mt-1 mr-2 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-full"></span>
                          <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
