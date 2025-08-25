import React, { useCallback } from 'react';
import { useLanguage } from "@/lib/i18n";
import { Github, ArrowUp, Mail, Phone, MapPin } from "lucide-react";

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
    <footer className="footer-professional">
      <div className="footer-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-heading">
              {t('footer.about')}
            </h3>
            <p className="text-body">
              {t('footer.connectText')}
            </p>
            
            <div className="space-y-2">
              <a 
                href={`mailto:${personal.email}`}
                className="contact-item justify-center md:justify-start"
              >
                <Mail size={16} />
                <span>{personal.email}</span>
              </a>
              <a 
                href={`tel:${personal.mobile}`}
                className="contact-item justify-center md:justify-start"
              >
                <Phone size={16} />
                <span>{personal.mobile}</span>
              </a>
              <div className="contact-item justify-center md:justify-start">
                <MapPin size={16} />
                <span>{personal.city}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-heading">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-body hover:text-primary transition-colors duration-200 inline-flex items-center gap-2">
                  <span>{t('hero.aboutMe')}</span>
                </a>
              </li>
              <li>
                <a href="#experience" className="text-body hover:text-primary transition-colors duration-200 inline-flex items-center gap-2">
                  <span>{t('experience.title')}</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="text-body hover:text-primary transition-colors duration-200 inline-flex items-center gap-2">
                  <span>{t('projects.title')}</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4 text-center md:text-right">
            <h3 className="text-lg font-semibold text-heading">
              {t('footer.connect')}
            </h3>
            <div className="social-links justify-center md:justify-end">
              <a 
                href="https://github.com/northseacoder" 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
            <div className="flex justify-center md:justify-end">
              <button 
                className="social-link" 
                onClick={scrollToTop}
                aria-label="返回顶部"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border">
          <div className="footer-content">
            <p className="text-caption mb-2">
              © {currentYear} {t('footer.rights')}
            </p>
            <p className="text-caption">
              {t('footer.designed')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
