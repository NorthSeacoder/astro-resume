import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/lib/i18n';

const About = () => {
  const { t, getResumeData } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const resumeData = getResumeData();
  const { about, personal } = resumeData;

  const contactItems = [
    {
      icon: <Mail size={18} />,
      label: t('about.contact.email'),
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: <Phone size={18} />,
      label: t('about.contact.phone'),
      value: personal.mobile,
      href: `tel:${personal.mobile}`,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: <MapPin size={18} />,
      label: t('about.contact.location'),
      value: personal.city,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: <MessageCircle size={18} />,
      label: t('about.contact.wechat'),
      value: personal.wechat,
      color: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  return (
    <div ref={sectionRef} className="resume-section">
      <div className="resume-header">
        <h2 className="resume-title">
          {t('about.title')}
        </h2>
        <div className="resume-divider"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 个人简介 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="card-elevated p-8 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="contact-icon">
                <User size={20} />
              </div>
              <h3 className="text-xl font-semibold text-heading">
                {t('about.summary')}
              </h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-body text-lg leading-relaxed">
                {about.bio}
              </p>
              
              {about.keyPoints && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-heading">{t('common.coreStrengths')}</h4>
                  <div className="space-y-3">
                    {about.keyPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 bg-primary-light text-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-body leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* 联系信息 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <Card className="card-elevated p-6 h-full">
            <h3 className="text-lg font-semibold text-heading mb-6">
              {t('about.contact.title')}
            </h3>
            
            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="contact-item group"
                      target={item.href.startsWith('mailto:') || item.href.startsWith('tel:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                    >
                      <div className={`contact-icon ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        <div className="font-medium text-heading group-hover:text-primary transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="contact-item">
                      <div className={`contact-icon ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        <div className="font-medium text-heading">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;