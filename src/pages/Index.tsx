import {useState, useEffect, useRef, lazy, Suspense} from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
// 懒加载复杂组件
const Experience = lazy(() => import('@/components/Experience'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
import Footer from '@/components/Footer';
import {getInitialTheme, saveTheme} from '@/lib/theme-utils';
import SEO from '@/components/SEO';
import Analytics from '@/components/Analytics';
import { useLanguage } from '@/lib/i18n';
import React from 'react';

// 组件懒加载包装器
const LazyComponentLoader = ({children}: {children: React.ReactNode}) => (
    <Suspense
        fallback={
            <div className='lazy-loader'>
                <div className='lazy-loader-pulse'>
                    <div className='lazy-loader-dot'></div>
                    <div className='lazy-loader-dot'></div>
                    <div className='lazy-loader-dot'></div>
                </div>
            </div>
        }>
        {children}
    </Suspense>
);

// Change the return type from VNode to ReactNode for better compatibility
const Index = () => {
    const [activeSection, setActiveSection] = useState('about');
    const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme());
    const sectionsRef = useRef<HTMLElement[]>([]);
    const { t, language } = useLanguage();

    // Apply theme to document
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        saveTheme(theme);
    }, [theme]);

    // 统一的滚动处理：同时处理导航高亮和动画
    useEffect(() => {
        // 保存当前活动部分的局部变量，避免闭包问题
        let currentActiveSection = 'about';
        
        // 初始化：获取所有section元素
        const updateSectionRefs = () => {
            const sections = document.querySelectorAll("section[id]");
            sectionsRef.current = Array.from(sections) as HTMLElement[];
        };

        // 立即执行一次获取sections
        updateSectionRefs();
        
        // 滚动处理函数：处理导航高亮和动画
        const handleScroll = () => {
            // 如果sectionsRef为空，重新获取
            if (sectionsRef.current.length === 0) {
                updateSectionRefs();
                if (sectionsRef.current.length === 0) return; // 如果还是空，直接返回
            }
            
            // 获取滚动位置 - 使用document.body.scrollTop
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY || 0;
            
            // 特殊处理顶部位置 - 总是将顶部视为about部分
            if (scrollTop < 200) {
                if (currentActiveSection !== 'about') {
                    console.log(`设置活动部分为about (顶部位置), 当前滚动位置: ${scrollTop}`);
                    setActiveSection("about");
                    currentActiveSection = 'about';
                }
                return;
            }

            // 检查各部分位置
            for (let i = sectionsRef.current.length - 1; i >= 0; i--) {
                const section = sectionsRef.current[i];
                const rect = section.getBoundingClientRect();
                
                // 当元素的顶部进入视口的特定位置时，将其视为活动状态
                if (rect.top <= 180) {
                    if (section.id !== currentActiveSection) {
                        console.log(`设置活动部分为${section.id}, 距顶部: ${rect.top}px, 滚动位置: ${scrollTop}`);
                        setActiveSection(section.id);
                        currentActiveSection = section.id;
                    }
                    break;
                }
            }
            
            // 处理滚动动画
            sectionsRef.current.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                if (rect.top < viewportHeight * 0.8) {
                    section.classList.add('animate-in');
                }
            });
        };
        
        // 注册滚动事件监听器 - 使用document.body
        document.body.addEventListener('scroll', handleScroll, {passive: true});
        
        // 初始检查 - 确保DOM已完全加载
        const initialCheckTimeout = setTimeout(() => {
            // 再次更新sections引用
            updateSectionRefs();
            
            // 初始执行一次滚动处理
            handleScroll();
            
            // 强制检查：如果在顶部，设置about为活动部分
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY || 0;
            if (scrollTop < 200) {
                console.log("初始化设置about为活动部分");
                setActiveSection('about');
                currentActiveSection = 'about';
            }
        }, 500);
        
        // 清理函数
        return () => {
            document.body.removeEventListener('scroll', handleScroll);
            clearTimeout(initialCheckTimeout);
        };
    }, []); // 仅在组件挂载时运行一次

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // 使用语言包中的SEO数据
    const seoData = {
        title: t('seo.title'),
        description: t('seo.description'),
        keywords: t('seo.keywords')
    };

    return (
        <>
            <SEO {...seoData} />
            
            <div className='resume-layout'>
                <Header
                    activeSection={activeSection}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />

                <main className='resume-container pt-20'>
                    <section id='about' className='resume-section scroll-mt-20'>
                        <About />
                    </section>

                    <section id='experience' className='resume-section scroll-mt-20'>
                        <LazyComponentLoader>
                            <Experience />
                        </LazyComponentLoader>
                    </section>

                    <section id='skills' className='resume-section scroll-mt-20'>
                        <LazyComponentLoader>
                            <Skills />
                        </LazyComponentLoader>
                    </section>

                    <section id='projects' className='resume-section scroll-mt-20'>
                        <LazyComponentLoader>
                            <Projects />
                        </LazyComponentLoader>
                    </section>
                </main>

                <Footer />
            </div>
            
            {/* Umami Analytics */}
            <Analytics websiteId={import.meta.env.VITE_UMAMI} />
        </>
    );
};

export default Index;
