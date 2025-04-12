import React from 'react';
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-6">
      <div className="max-w-6xl mx-auto py-10 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {t('footer.about')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              {t('footer.connectText')}
            </p>
            
            <div className="flex flex-col space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <a href="mailto:your.email@example.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                {t('about.contact.email')}
              </a>
              <a href="tel:+1234567890" className="hover:text-blue-600 dark:hover:text-blue-400">
                {t('about.contact.phone')}
              </a>
              <p>{t('about.contact.location')}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  {t('hero.aboutMe')}
                </a>
              </li>
              <li>
                <a href="#experience" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  {t('experience.title')}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  {t('projects.title')}
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:text-right">
            <div className="flex md:justify-end space-x-4 mb-6">
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 group"
                aria-label="GitHub"
              >
                <Github className="text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors" size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors" size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors" size={18} />
              </a>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="shadow-sm hover:shadow-md transition-all" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑ {t('footer.backToTop')}
            </Button>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} {t('footer.rights')}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
            {t('footer.designed')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
