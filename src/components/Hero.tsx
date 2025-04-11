import { User, Mail, Phone, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import { createToast } from "@/components/ui/toast";

const Hero = () => {
  const { t, language } = useLanguage();
  
  const handleDownload = () => {
    const pdfFile = `/resume/resume_${language}.pdf`;
    
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
          </div>
          
          <div className="mt-6">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 hover:scale-[1.02] shadow-md btn-touch"
              onClick={handleDownload}
            >
              <Download className="mr-2" size={16} />
              {t('common.download')}
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="lg:col-span-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white mb-3">{t('about.title')}</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold gradient-text mb-6">{t('about.subtitle')}</h2>
        
        <div className="bg-white dark:bg-slate-800/80 rounded-xl shadow-md p-6 mb-6 dark:border dark:border-slate-700 transition-all duration-300 hover:shadow-lg enhanced-card bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/90">
          <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{t('about.summary')}</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {t('about.bio')}
          </p>
          
          {/* Bulleted list for 3 key points */}
          <ul className="mt-4 space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-3 h-3 mt-1.5 mr-2 flex-shrink-0 bg-blue-500 dark:bg-blue-600 rounded-full"></span>
              <span className="text-slate-700 dark:text-slate-300">{t('about.keyPoints.first')}</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-3 h-3 mt-1.5 mr-2 flex-shrink-0 bg-blue-500 dark:bg-blue-600 rounded-full"></span>
              <span className="text-slate-700 dark:text-slate-300">{t('about.keyPoints.second')}</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-3 h-3 mt-1.5 mr-2 flex-shrink-0 bg-blue-500 dark:bg-blue-600 rounded-full"></span>
              <span className="text-slate-700 dark:text-slate-300">{t('about.keyPoints.third')}</span>
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="enhanced-card p-4 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">{t('about.stats.years')}</div>
            <div className="text-slate-700 dark:text-slate-300 font-medium">{t('about.stats.yearsExperience')}</div>
          </div>
          <div className="enhanced-card p-4 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">{t('about.stats.projects')}</div>
            <div className="text-slate-700 dark:text-slate-300 font-medium">{t('about.stats.projectsCompleted')}</div>
          </div>
          <div className="enhanced-card p-4 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">{t('about.stats.clients')}</div>
            <div className="text-slate-700 dark:text-slate-300 font-medium">{t('about.stats.happyClients')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
