import { useLanguage } from "@/lib/i18n";
import { useState, useEffect } from "react";
import { Calendar, MapPin, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// 成就/STAR分析点
interface Achievement {
  id: string | number;
  title?: string;
  description?: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
}

// 工作经历项目
interface ExperienceItem {
  id: string | number;
  title: string;
  period?: string;
  position?: string;
  summary?: string;
  achievements: Achievement[];
  category?: string;
  type?: string;
}

// 公司信息
interface ExperienceCompany {
  id: string | number;
  company: string;
  position: string;
  location: string;
  period: string;
  description?: string;
  items: ExperienceItem[];
}

const Experience = () => {
  const { t, language, getResumeData } = useLanguage();
  const [companies, setCompanies] = useState<ExperienceCompany[]>([]);
  const resumeData = getResumeData();

  useEffect(() => {
    if (resumeData.experiences && resumeData.experiences.length > 0) {
      setCompanies(resumeData.experiences as ExperienceCompany[]);
    } else {
      setCompanies([]);
    }
  }, [resumeData]);

  // 提取关键数字和技术关键词
  const extractKeyMetrics = (achievement: Achievement) => {
    const text = achievement.result || achievement.description || "";
    const metrics = text.match(/\d+[\d.,]*\s*[%ms天日分钟秒]/g) || [];
    return metrics.slice(0, 2); // 只取前2个关键指标
  };

  // 提取技术栈
  const extractTechStack = (item: ExperienceItem) => {
    const summary = item.summary || "";
    // 匹配常见技术栈模式，兼容中英文
    const techMatch = summary.match(/基于(.+?)的|using (.+?)[,.]|技术栈[：:](.+?)[。，]|based on (.+?)[,.]|stack (?:includes|:)\s*(.+?)[,.]/i);
    if (techMatch) {
      const captured = techMatch.slice(1).find(segment => segment && segment.trim());
      if (captured) {
        return captured
          .split(/[、,，、]/)
          .map(t => t.replace(/\b(such as|including)\b/gi, "").trim())
          .filter(Boolean)
          .slice(0, 6);
      }
    }
    return [];
  };

  return (
    <div className="resume-section">
      <div className="resume-header">
        <h2 className="resume-title">{t('experience.title')}</h2>
        <div className="resume-divider"></div>
      </div>

      <div className="experience-timeline-modern">
        {companies.map((company, companyIndex) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: companyIndex * 0.1 }}
            className="experience-company-block"
          >
            {/* 时间线节点 */}
            <div className="timeline-node">
              <div className="timeline-dot"></div>
              <div className="timeline-line"></div>
            </div>

            {/* 公司信息卡片 - 毛玻璃风格 */}
            <div className="company-card-glass">
              {/* 公司头部 */}
              <div className="company-header">
                <div className="company-info-main">
                  <h3 className="company-name">{company.company}</h3>
                  <div className="company-meta">
                    <span className="position-badge">{company.position}</span>
                    <span className="meta-separator">•</span>
                    <div className="meta-item">
                      <MapPin size={14} />
                      <span>{company.location}</span>
                    </div>
                    <span className="meta-separator">•</span>
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{company.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 公司描述 */}
              {company.description && (
                <p className="company-description">{company.description}</p>
              )}

              {/* 项目列表 - 扁平化设计 */}
              <div className="projects-list">
                {company.items.map((item, itemIndex) => {
                  const techStack = extractTechStack(item);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                      className="project-item"
                    >
                      {/* 项目标题行 */}
                      <div className="project-header">
                        <div className="project-title-wrapper">
                          <Sparkles size={16} className="project-icon" />
                          <h4 className="project-title">{item.title}</h4>
                          {item.category && (
                            <span className="project-tag tag-category">{item.category}</span>
                          )}
                          {item.type && (
                            <span className="project-tag tag-type">{item.type}</span>
                          )}
                        </div>
                        {item.period && (
                          <span className="project-period">{item.period}</span>
                        )}
                      </div>

                      {/* 项目描述 - 简洁版 */}
                      {item.summary && (
                        <p className="project-summary">{item.summary}</p>
                      )}

                      {/* 技术栈标签 */}
                      {techStack.length > 0 && (
                        <div className="tech-stack">
                          {techStack.map((tech, idx) => (
                            <span key={idx} className="tech-tag">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 核心成就 - 精简列表 */}
                      {item.achievements.length > 0 && (
                        <div className="achievements-list">
                          {item.achievements.map((achievement) => {
                            const metrics = extractKeyMetrics(achievement);
                            const headline = achievement.title || achievement.task || "";

                            // 构建兼顾中英文的简洁成就描述
                            let displayText = "";
                            if (language === "en") {
                              if (achievement.result && achievement.action) {
                                displayText = headline
                                  ? `${headline}: ${achievement.result} — ${achievement.action}`
                                  : `${achievement.result} — ${achievement.action}`;
                              } else if (achievement.result) {
                                displayText = headline
                                  ? `${headline}: ${achievement.result}`
                                  : achievement.result;
                              } else if (achievement.action) {
                                displayText = headline
                                  ? `${headline}: ${achievement.action}`
                                  : achievement.action;
                              } else if (achievement.description) {
                                displayText = achievement.description;
                              } else {
                                displayText = headline;
                              }
                            } else {
                              if (achievement.result && achievement.action) {
                                displayText = headline
                                  ? `${headline}：${achievement.result}（方案：${achievement.action}）`
                                  : `${achievement.result}（方案：${achievement.action}）`;
                              } else if (achievement.result) {
                                displayText = headline
                                  ? `${headline}：${achievement.result}`
                                  : achievement.result;
                              } else if (achievement.action) {
                                displayText = headline
                                  ? `${headline}：${achievement.action}`
                                  : achievement.action;
                              } else if (achievement.description) {
                                displayText = achievement.description;
                              } else {
                                displayText = headline;
                              }
                            }

                            return (
                              <div key={achievement.id} className="achievement-item">
                                <div className="achievement-bullet"></div>
                                <div className="achievement-content">
                                  <div className="achievement-text">
                                    <span className="achievement-desc">{displayText}</span>
                                  </div>
                                  {/* 关键指标徽章 */}
                                  {metrics.length > 0 && (
                                    <div className="metrics-badges">
                                      {metrics.map((metric, idx) => (
                                        <span key={idx} className="metric-badge">
                                          <TrendingUp size={12} />
                                          {metric}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
