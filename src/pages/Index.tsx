import {useState, useEffect, useRef, lazy, Suspense} from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
// 懒加载复杂组件
const Experience = lazy(() => import('@/components/Experience'));
const Education = lazy(() => import('@/components/Education'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));
import Footer from '@/components/Footer';
import {getInitialTheme, saveTheme} from '@/lib/theme-utils';
import SEO from '@/components/SEO';
import Analytics from '@/components/Analytics';
import { useLanguage } from '@/lib/i18n';
// Remove the h and VNode imports, as they cause type conflicts
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
        // 初始化：获取所有section元素
        const updateSectionRefs = () => {
            const sections = document.querySelectorAll("section[id]");
            sectionsRef.current = Array.from(sections) as HTMLElement[];
        };

        // 立即执行一次获取sections
        updateSectionRefs();
        
        // 滚动处理函数：处理导航高亮和动画
        const handleScroll = (e) => {
          // 如果sectionsRef为空，重新获取
          if (sectionsRef.current.length === 0) {
            updateSectionRefs();
            if (sectionsRef.current.length === 0) return; // 如果还是空，直接返回
          }
          
          const scrollY = e.target.scrollTop;
          const scrollPosition = scrollY + 100; // 用于导航高亮的偏移量
          // 1. 处理导航高亮
          
            // 特殊处理回到顶部的情况
            if (scrollY < 300) {
                setActiveSection("about");
            } 
            // 特殊处理 experience 部分
            else {
                const experienceSection = document.getElementById("experience");
                let foundActive = false;
                
                if (experienceSection) {
                    const expTop = experienceSection.offsetTop - 100;
                    const expBottom = expTop + experienceSection.offsetHeight + 100;
                    
                    if (scrollPosition >= expTop && scrollPosition < expBottom) {
                        setActiveSection("experience");
                        foundActive = true;
                    }
                }
                
                // 如果不是experience部分，检查其他部分
                if (!foundActive) {
                    for (const section of sectionsRef.current) {
                        const sectionTop = section.offsetTop - 50;
                        const sectionBottom = sectionTop + section.offsetHeight;
                        
                        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                            setActiveSection(section.id);
                            break;
                        }
                    }
                }
            }
            
            // 2. 处理滚动动画
            sectionsRef.current.forEach((section) => {
                const sectionTop = section.offsetTop - window.innerHeight * 0.8;
                
                if (scrollY > sectionTop) {
                    section.classList.add('animate-in');
                }
            });
        };

        // 注册滚动事件监听器
        document.body.addEventListener('scroll', handleScroll, {passive: true});
        
        // 初始检查 - 确保DOM已完全加载，特别是对于懒加载组件
        const initialCheckTimeout = setTimeout(() => {
            // 再次更新sections引用
            updateSectionRefs();
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

    // 根据当前语言获取 SEO 信息
    const getSEOData = () => {
        if (language === 'zh') {
            return {
                title: '个人简历 | 前端开发工程师',
                description: '资深前端工程师个人简历网站，专注于React、TypeScript和现代Web开发技术',
                keywords: '前端开发,React,TypeScript,Web开发,前端工程师,简历'
            };
        }
        return {
            title: 'Portfolio | Frontend Developer',
            description: 'Professional portfolio of a senior frontend developer specialized in React, TypeScript and modern web development',
            keywords: 'frontend development,React,TypeScript,web development,frontend engineer,portfolio'
        };
    };

    const seoData = getSEOData();

    return (
        <>
            <SEO {...seoData} />
            
            <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/60 dark:from-slate-900 dark:to-slate-800/90 transition-colors duration-500 w-full'>
                <div className='fixed inset-0 bg-hero-pattern opacity-30 dark:opacity-10 pointer-events-none z-0'></div>
                <Header
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />

                <main className='container mx-auto px-4 py-6 sm:px-6 lg:px-8 relative z-10 pt-20'>
                    <section id='about' className='py-12 md:py-16 scroll-mt-20 min-h-[200px]'>
                        <Hero />
                    </section>

                    <section id='experience' className='py-12 md:py-16 scroll-mt-20 min-h-[300px]'>
                        <LazyComponentLoader>
                            <Experience />
                        </LazyComponentLoader>
                    </section>

                    <section id='education' className='py-12 md:py-16 scroll-mt-20 min-h-[200px]'>
                        <LazyComponentLoader>
                            <Education />
                        </LazyComponentLoader>
                    </section>

                    <section id='skills' className='py-12 md:py-16 scroll-mt-20 min-h-[200px]'>
                        <LazyComponentLoader>
                            <Skills />
                        </LazyComponentLoader>
                    </section>

                    <section id='projects' className='py-12 md:py-16 scroll-mt-20 min-h-[300px]'>
                        <LazyComponentLoader>
                            <Projects />
                        </LazyComponentLoader>
                    </section>

                    <section id='contact' className='py-12 md:py-16 scroll-mt-20 min-h-[200px]'>
                        <LazyComponentLoader>
                            <Contact />
                        </LazyComponentLoader>
                    </section>
                </main>

                <Footer />
            </div>
            
            {/* Umami Analytics */}
            <Analytics websiteId={import.meta.env.VITE_UMAMI_WEBSITE_ID} />
        </>
    );
};

export default Index;
