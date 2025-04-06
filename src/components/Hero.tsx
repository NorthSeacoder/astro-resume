
import { User, Mail, Phone, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
        <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full overflow-hidden mb-8 border-4 border-white dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <img 
            src="/placeholder.svg" 
            alt="Profile" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <Card className="w-full p-7 shadow-md dark:bg-slate-800/80 dark:border-slate-700 hover:shadow-lg transition-all duration-300 enhanced-card bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/90">
          <h2 className="text-xl font-semibold mb-5 text-slate-800 dark:text-white">{t('about.contact.info')}</h2>
          <div className="space-y-4">
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <Mail className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <a href="mailto:your.email@example.com" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">your.email@example.com</a>
            </div>
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <Phone className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <a href="tel:+1234567890" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+1 (234) 567-890</a>
            </div>
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <MapPin className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <span className="text-slate-700 dark:text-slate-300">City, Country</span>
            </div>
            <div className="flex items-center group">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                <User className="text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" size={18} />
              </div>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">linkedin.com/in/yourprofile</a>
            </div>
          </div>
          
          <div className="mt-7">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 hover:scale-[1.02] shadow-md btn-touch"
              onClick={() => window.print()}
            >
              <Download className="mr-2" size={16} />
              {t('common.download')}
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="lg:col-span-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white mb-4">{t('about.title')}</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold gradient-text mb-8">{t('about.subtitle')}</h2>
        
        <div className="bg-white dark:bg-slate-800/80 rounded-xl shadow-md p-8 mb-8 dark:border dark:border-slate-700 transition-all duration-300 hover:shadow-lg enhanced-card bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/90">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">{t('about.title')}</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {t('about.bio')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="enhanced-card p-5 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-3">5+</div>
            <div className="text-slate-700 dark:text-slate-300 font-medium">{t('about.stats.yearsExperience')}</div>
          </div>
          <div className="enhanced-card p-5 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-3">20+</div>
            <div className="text-slate-700 dark:text-slate-300 font-medium">{t('about.stats.projectsCompleted')}</div>
          </div>
          <div className="enhanced-card p-5 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-3">10+</div>
            <div className="text-slate-700 dark:text-slate-300 font-medium">{t('about.stats.happyClients')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
