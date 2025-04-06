import { useEffect } from 'preact/hooks';
import { useLanguage } from '@/lib/i18n';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    noindex?: boolean;
    canonical?: string;
}

export default function SEO({
    title,
    description,
    keywords,
    ogImage = '/og-image.png',
    noindex = false,
    canonical
}: SEOProps) {
    const { language } = useLanguage();
    
    // 获取完整的网站 URL
    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
    
    useEffect(() => {
        // 设置文档标题
        document.title = title ? `${title} | Your Name` : 'Your Name - Professional Portfolio';
        
        // 设置 HTML 语言
        document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
        
        // 定义所有需要的 meta 标签
        const metaTags = [
            { name: 'description', content: description || '资深前端工程师个人简历网站,展示专业技能、工作经验与项目案例' },
            { name: 'keywords', content: keywords || '前端开发,React,TypeScript,Web开发,软件工程师' },
            { property: 'og:locale', content: language === 'zh' ? 'zh_CN' : 'en_US' },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: title || 'Your Name - Professional Portfolio' },
            { property: 'og:description', content: description || '资深前端工程师个人简历网站' },
            { property: 'og:image', content: `${siteUrl}${ogImage}` },
            { property: 'og:url', content: canonicalUrl },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title || 'Your Name - Professional Portfolio' },
            { name: 'twitter:description', content: description || '资深前端工程师个人简历网站' },
            { name: 'twitter:image', content: `${siteUrl}${ogImage}` },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'application-name', content: 'Your Portfolio' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
            { name: 'apple-mobile-web-app-title', content: 'Your Portfolio' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'mobile-web-app-capable', content: 'yes' }
        ];
        
        if (noindex) {
            metaTags.push({ name: 'robots', content: 'noindex,nofollow' });
        }

        // 定义所有需要的 link 标签
        const links = [
            { rel: 'canonical', href: canonicalUrl },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
        ];

        // 更新 meta 标签
        metaTags.forEach(({ name, property, content }) => {
            // 移除旧的 meta 标签
            if (name) {
                const existingMeta = document.querySelector(`meta[name="${name}"]`);
                if (existingMeta) {
                    existingMeta.remove();
                }
            }
            if (property) {
                const existingMeta = document.querySelector(`meta[property="${property}"]`);
                if (existingMeta) {
                    existingMeta.remove();
                }
            }
            
            // 创建新的 meta 标签
            const meta = document.createElement('meta');
            if (name) meta.setAttribute('name', name);
            if (property) meta.setAttribute('property', property);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        });

        // 更新 link 标签
        links.forEach(({ rel, href, ...rest }) => {
            // 移除旧的 link 标签
            const existingLink = document.querySelector(`link[rel="${rel}"]${rest.sizes ? `[sizes="${rest.sizes}"]` : ''}`);
            if (existingLink) {
                existingLink.remove();
            }
            
            // 创建新的 link 标签
            const link = document.createElement('link');
            link.setAttribute('rel', rel);
            link.setAttribute('href', href);
            Object.entries(rest).forEach(([key, value]) => {
                link.setAttribute(key, value);
            });
            document.head.appendChild(link);
        });

        // 清理函数
        return () => {
            // 清理 meta 标签
            metaTags.forEach(({ name, property }) => {
                if (name) {
                    const meta = document.querySelector(`meta[name="${name}"]`);
                    if (meta) meta.remove();
                }
                if (property) {
                    const meta = document.querySelector(`meta[property="${property}"]`);
                    if (meta) meta.remove();
                }
            });
            
            // 清理 link 标签
            links.forEach(({ rel, ...rest }) => {
                const link = document.querySelector(`link[rel="${rel}"]${rest.sizes ? `[sizes="${rest.sizes}"]` : ''}`);
                if (link) link.remove();
            });
        };
    }, [title, description, keywords, ogImage, noindex, canonical, language, siteUrl]);

    // 这个组件不需要渲染任何内容
    return null;
}
