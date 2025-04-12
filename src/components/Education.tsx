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
  const education = resumeData.education[0]; // 只获取第一个学历

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
      
      <div className="max-w-2xl mx-auto">
        <div className="fade-right opacity-0">
          <Card className="p-8 overflow-hidden dark:bg-slate-800/80 dark:border-slate-700 enhanced-card transition-bounce hover:shadow-md text-center">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4 flex-shrink-0 border-2 border-blue-300 dark:border-blue-600 shadow-md">
                <GraduationCap className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">{education.degree}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-xl mt-2">{education.institution}</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-700/30 py-3 px-6 rounded-full w-fit mx-auto">
                <Calendar className="mr-2 flex-shrink-0 text-blue-500 dark:text-blue-400" size={18} />
                <span className="text-slate-700 dark:text-slate-300">{education.period}</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 shadow-inner">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{education.field}</p>
                <p className="text-slate-600 dark:text-slate-400 mt-3">{education.description}</p>
              </div>
              
              {education.achievements && education.achievements.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-4">{t('education.achievements')}</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {education.achievements.map((achievement, i) => (
                      <Badge key={i} className="bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 text-blue-800 dark:text-blue-400 py-1.5 px-3 border border-blue-200 dark:border-blue-800/30 text-sm">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-400 py-2 px-4">
                  {education.location}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Education;
