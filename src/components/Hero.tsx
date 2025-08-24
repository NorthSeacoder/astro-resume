import { User, Mail, Phone, MapPin, Download, GraduationCap, Calendar, Award, Briefcase, CheckCircle2, Layers, Users,MessagesSquare } from "lucide-react";
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
  const personal = resumeData.personal;
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
    <div className="resume-hero">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* 头像和基本信息 */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="avatar-professional mb-6">
          <img 
            src="https://img.mengpeng.tech/i/2025/04/22/68079c4214f8c.webp" 
            alt={t('common.profile')} 
              className="w-full h-full object-cover"
          />
        </div>
          
          {/* 联系信息卡片 */}
          <div className="card-modern w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-heading">{t('about.contact.info')}</h3>
            <div className="space-y-1">
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                <a href={`mailto:${personal.email}`} className="text-body hover:text-primary transition-colors">
                  {personal.email}
                </a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={18} />
                </div>
                <a href={`tel:${personal.mobile}`} className="text-body hover:text-primary transition-colors">
                  {personal.mobile}
                </a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={18} />
                </div>
                <span className="text-body">{personal.city}</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <MessagesSquare size={18} />
                </div>
                <span className="text-body">{personal.wechat}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                className="download-btn w-full"
                onClick={handleDownload}
              >
                <Download className="mr-2" size={16} />
                {t('common.download')}
              </button>
            </div>
          </div>
        </div>
      
        {/* 主要内容区域 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 个人简介 */}
          <div className="card-modern p-8">
            <div className="resume-header">
              <h1 className="resume-hero-title">{personal.name}</h1>
              <div className="resume-divider"></div>
            </div>
            <h2 className="resume-hero-subtitle mb-6">{t('about.summary')}</h2>
            
            <div className="space-y-6">
              {keyPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <p className="text-body">{point}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* 统计数据和教育信息 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 教育信息 */}
            <div className="stats-card">
              <div className="contact-icon mb-3">
                <GraduationCap size={20} />
              </div>
              <h4 className="font-medium text-heading mb-1">{t('education.title')}</h4>
              <p className="text-primary text-sm font-medium">{education.institution}</p>
              <p className="text-caption">{education.degree}</p>
            </div>
            
            {/* 统计数据 */}
            {statsCards.map(card => (
              <div key={card.id} className="stats-card">
                <div className="contact-icon mb-3">
                  {card.icon}
                </div>
                <div className="stats-number">{card.value}</div>
                <div className="stats-label">{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

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
