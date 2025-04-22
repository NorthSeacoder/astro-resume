import React, { useCallback } from 'react';
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const { t, getResumeData } = useLanguage();
  const currentYear = new Date().getFullYear();
  const resumeData = getResumeData();
  const personal = resumeData.personal;

  const scrollToTop = useCallback(() => {
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <footer className="bg-background border-t border-border mt-12">
      <div className="max-w-6xl mx-auto py-12 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t('footer.about')}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.connectText')}
            </p>
            
            <div className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <a 
                href={`mailto:${personal.email}`}
                className="hover:text-primary transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>{personal.email}</span>
              </a>
              <a 
                href={`tel:${personal.mobile}`}
                className="hover:text-primary transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>{personal.mobile}</span>
              </a>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{personal.city}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center space-x-2">
                  <span>→</span>
                  <span>{t('hero.aboutMe')}</span>
                </a>
              </li>
              <li>
                <a href="#experience" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center space-x-2">
                  <span>→</span>
                  <span>{t('experience.title')}</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center space-x-2">
                  <span>→</span>
                  <span>{t('projects.title')}</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground md:text-right">
              {t('footer.connect')}
            </h3>
            <div className="flex md:justify-end space-x-4">
              <a 
                href="https://github.com/northseacoder" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github className="group-hover:scale-110 transition-transform duration-300" size={20} />
              </a>
              {/* <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="group-hover:scale-110 transition-transform duration-300" size={20} />
              </a> */}
              {/* <a 
                href="https://twitter.com/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="group-hover:scale-110 transition-transform duration-300" size={20} />
              </a> */}
            </div>
            <div className="flex md:justify-end mt-6">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full w-10 h-10 hover:scale-110 transition-all duration-300" 
                onClick={scrollToTop}
              >
                <ArrowUp size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {t('footer.rights')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('footer.designed')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
