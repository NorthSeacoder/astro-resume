import { User, Mail, Phone, MapPin, Download, GraduationCap, Calendar, Award, Briefcase, BarChart, CheckCircle2, Layers, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import { createToast } from "@/components/ui/toast";

const Hero = () => {
  const { t, language, getResumeData } = useLanguage();
  
  // 获取简历数据
  const resumeData = getResumeData();
  const education = resumeData.education[0]; // 只获取第一个学历
  const keyPoints = resumeData.about.keyPoints; // 从JSON中获取关键点
  
  const handleDownload = () => {
    const pdfFile = `/resume/resume_${language}.pdf`;
    
    // 跟踪下载事件
    if (window.umami) {
      window.umami.track('download-resume', {
        language: language,
        source: 'hero-section'
      });
    }
    
    // 直接使用fetch获取并下载文件
    fetch(pdfFile)
      .then(response => {
        if (response.ok) {
          // 获取文件响应并转换为blob
          return response.blob().then(blob => {
            // 创建blob URL
            const blobUrl = URL.createObjectURL(blob);
            
            // 创建临时链接元素进行下载
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `resume_${language}.pdf`;
            document.body.appendChild(link);
            link.click();
            
            // 清理：移除链接元素并释放blob URL
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            
            // 使用统一的toast组件显示成功消息
            toast(createToast.success({
              title: t('common.download'),
              message: t('common.downloadSuccess')
            }));
          });
        } else {
          // 文件不存在时的提示
          toast(createToast.error({
            title: t('common.downloadError'),
            message: t('common.fileNotFound')
          }));
        }
      })
      .catch(error => {
        console.error('Download error:', error);
        toast(createToast.error({
          title: t('common.downloadError'),
          message: t('common.downloadError')
        }));
      });
  };
  
  // 统计数据卡片的详细信息
  const statsCards = [
    {
      id: 'years',
      icon: <Award size={20} />,
      value: resumeData.about.stats.yearsExperience,
      label: t('about.stats.yearsExperience'),
      description: resumeData.about.stats.yearsDescription
    },
    {
      id: 'projects',
      icon: <Layers size={20} />,
      value: resumeData.about.stats.projectsCompleted,
      label: t('about.stats.projectsCompleted'),
      description: resumeData.about.stats.projectsDescription
    },
    {
      id: 'clients',
      icon: <Users size={20} />,
      value: resumeData.about.stats.happyClients,
      label: t('about.stats.happyClients'),
      description: resumeData.about.stats.clientsDescription
    }
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
        <div className="w-40 h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full overflow-hidden mb-6 border-4 border-white dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <img 
            src="/placeholder.svg" 
            alt={t('common.profile')} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <Card className="w-full p-6 shadow-md dark:bg-slate-800/80 dark:border-slate-700 hover:shadow-lg transition-all duration-300 enhanced-card bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/90">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">{t('about.contact.info')}</h2>
          <div className="space-y-3">
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <Mail className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <a href="mailto:your.email@example.com" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('about.contact.email')}</a>
            </div>
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <Phone className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <a href="tel:+1234567890" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('about.contact.phone')}</a>
            </div>
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <MapPin className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <span className="text-slate-700 dark:text-slate-300">{t('about.contact.location')}</span>
            </div>
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <User className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('about.contact.linkedin')}</a>
            </div>
            
            {/* 弱化教育信息展示方式 */}
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <GraduationCap className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <span className="text-slate-700 dark:text-slate-300">{education.degree}, {education.institution}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 hover:scale-[1.02] shadow-md btn-touch"
              onClick={handleDownload}
              data-umami-event="download-resume"
              data-umami-event-language={language}
            >
              <Download className="mr-2" size={16} />
              {t('common.download')}
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="lg:col-span-8">
        <div className="bg-white dark:bg-slate-800/80 rounded-xl shadow-md p-6 mb-6 dark:border dark:border-slate-700 transition-all duration-300 hover:shadow-lg enhanced-card bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/90">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white flex items-center">
            <Briefcase className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
            {t('about.summary')}
          </h3>
          
          {/* 更精致的关键点设计 */}
          <div className="space-y-5">
            {keyPoints.map((point, index) => (
              <div 
                key={index} 
                className="relative pl-10 pr-4 py-4 rounded-lg border border-blue-100 dark:border-blue-800/40 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/10 dark:to-indigo-900/10 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-lg"></div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-blue-100 dark:border-blue-800/40">
                  <CheckCircle2 className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <p className="text-slate-700 dark:text-slate-300 ml-6">{point}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* 简化教育信息与统计数据 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* 教育信息卡片 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-4 hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                <GraduationCap className="text-blue-600 dark:text-blue-400" size={18} />
              </div>
              <h3 className="text-base font-medium text-slate-800 dark:text-white">{t('education.title')}</h3>
            </div>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{education.institution}</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm my-1">{education.degree}</p>
            <div className="flex items-center mt-2 text-slate-500 dark:text-slate-400 text-xs">
              <Calendar className="mr-1" size={12} />
              <span>{education.period}</span>
            </div>
          </div>
          
          {/* 统计数据卡片 - 简化版 */}
          {statsCards.map(card => (
            <div key={card.id} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                  <span className="text-blue-600 dark:text-blue-400">{card.icon}</span>
                </div>
                <h3 className="text-base font-medium text-slate-800 dark:text-white">{card.label}</h3>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{card.value}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
