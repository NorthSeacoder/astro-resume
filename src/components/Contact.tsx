
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/i18n";

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <div className="content-spacing">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{t('contact.title')}</h2>
        <Separator className="flex-grow ml-6 dark:bg-slate-700" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-full">
        <Card className="w-full p-8 shadow-lg dark:bg-slate-800/80 dark:border-slate-700 hover:shadow-xl transition-all duration-500 tilt-effect bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/90 enhanced-card">
          <div className="grid grid-cols-1 gap-8">
            <div className="flex items-start group hover-lift">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-5 flex-shrink-0 border-2 border-blue-300 dark:border-blue-600 float-effect shadow-md transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                <Mail className="text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" size={24} />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white text-lg mb-2">Email</h4>
                <a href="mailto:your.email@example.com" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg">your.email@example.com</a>
              </div>
            </div>
            
            <div className="flex items-start group hover-lift">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-5 flex-shrink-0 border-2 border-blue-300 dark:border-blue-600 float-effect shadow-md transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                <Phone className="text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" size={24} />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white text-lg mb-2">Phone</h4>
                <a href="tel:+1234567890" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg">+1 (234) 567-890</a>
              </div>
            </div>
            
            <div className="flex items-start group hover-lift">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-5 flex-shrink-0 border-2 border-blue-300 dark:border-blue-600 float-effect shadow-md transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                <MapPin className="text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110" size={24} />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white text-lg mb-2">Location</h4>
                <p className="text-slate-600 dark:text-slate-300 text-lg">City, Country</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="w-full p-8 shadow-lg dark:bg-slate-800/80 dark:border-slate-700 hover:shadow-xl transition-all duration-500 scale-effect bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/90 enhanced-card">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">{t('contact.connectWithMe')}</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <a href="#" className="group flex flex-col items-center p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3 shadow-md group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/20 transition-all duration-300 float-effect">
                <Github className="text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={22} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">GitHub</span>
            </a>
            
            <a href="#" className="group flex flex-col items-center p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3 shadow-md group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/20 transition-all duration-300 float-effect">
                <Linkedin className="text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={22} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">LinkedIn</span>
            </a>
            
            <a href="#" className="group flex flex-col items-center p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3 shadow-md group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/20 transition-all duration-300 float-effect">
                <Twitter className="text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={22} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Twitter</span>
            </a>
          </div>
          
          <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-slate-700 shadow-inner hover:shadow-md transition-all duration-300 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/15 dark:hover:to-indigo-900/15">
            <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
              {t('contact.message')}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
