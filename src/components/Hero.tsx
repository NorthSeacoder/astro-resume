import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n';
import { toast } from '@/hooks/use-toast';

const Hero = () => {
  const { t, getResumeData } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true, amount: 0.3 });
  
  const resumeData = getResumeData();
  const { about, personal } = resumeData;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/resume/resume_zh.pdf');
      if (!response.ok) {
        throw new Error('文件未找到');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${personal.name}_简历.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "下载成功",
        description: t('common.downloadSuccess'),
      });
    } catch (error) {
      console.error('下载失败:', error);
      toast({
        title: "下载失败",
        description: t('common.downloadError'),
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div ref={heroRef} className="resume-hero">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        {/* 头像区域 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="avatar-professional mx-auto">
            <img
              src="https://img.mengpeng.tech/i/2025/04/22/68079c4214f8c.webp"
              alt={t('common.profile')}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* 姓名和职位 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <h1 className="resume-hero-title mb-2">
            {personal.name}
          </h1>
          <p className="resume-hero-subtitle">
            高级前端开发工程师
          </p>
        </motion.div>

        {/* 个人简介 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <p className="resume-hero-description">
            {about.bio}
          </p>
        </motion.div>

        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto"
        >
          <Card className="stats-card">
            <div className="stats-number">{about.stats.yearsExperience}</div>
            <div className="stats-label">{about.stats.yearsDescription}</div>
          </Card>
          <Card className="stats-card">
            <div className="stats-number">{about.stats.projectsCompleted}+</div>
            <div className="stats-label">{about.stats.projectsDescription}</div>
          </Card>
          <Card className="stats-card">
            <div className="stats-number">{about.stats.happyClients}</div>
            <div className="stats-label">{about.stats.clientsDescription}</div>
          </Card>
        </motion.div>

        {/* 联系方式和下载按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn-primary group"
          >
            <Download size={18} className="mr-2 group-hover:animate-bounce" />
            {isDownloading ? '下载中...' : t('common.download')}
          </Button>
          
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="social-link"
              aria-label="发送邮件"
            >
              <Mail size={18} />
            </a>
            <a
              href={`tel:${personal.mobile}`}
              className="social-link"
              aria-label="拨打电话"
            >
              <Phone size={18} />
            </a>
            <div className="social-link" title={`微信: ${personal.wechat}`}>
              <MessageCircle size={18} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 关键亮点 */}
      {about.keyPoints && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="card-elevated p-8">
            <h3 className="text-xl font-semibold text-heading mb-6 text-center">
              {t('about.summary')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {about.keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <p className="text-body leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;