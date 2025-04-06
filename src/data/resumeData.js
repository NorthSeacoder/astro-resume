export const resumeData = {
    languages: ['en', 'zh'],
    content: {
        en: {
            header: {
                name: 'Li Ming',
                title: 'Frontend Developer',
                location: 'Beijing'
            },
            contact: {
                email: 'liming@example.com',
                phone: '+86 123-456-7890',
                linkedin: 'linkedin.com/in/liming'
            },
            summary:
                'A dedicated Frontend Developer with over 5 years of experience in web development, specializing in React and Vue.js. Proficient in building scalable, high-performance web applications with a focus on user experience and accessibility.',
            experience: [
                {
                    company: 'Tech Corp',
                    period: '2020 - Present',
                    role: 'Frontend Developer',
                    projects: [
                        {
                            name: 'E-Commerce Platform Revamp',
                            period: '2021.01 - 2022.06',
                            techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Grafana'],
                            background:
                                'The project aimed to revamp an outdated e-commerce platform to improve user engagement and performance.',
                            achievements: [
                                'Increased user engagement by 73% through dynamic content rendering with 1.8 million lines of Next.js code.',
                                'Reduced FMP P95 to 3.5 seconds using Grafana for Session Replay optimization.'
                            ],
                            role: 'Led the frontend development, focusing on performance optimization and UI/UX improvements.'
                        },
                        {
                            name: 'Interactive Data Visualization Dashboard',
                            period: '2022.07 - 2023.12',
                            techStack: ['React', 'Pixi.js', 'ECharts'],
                            background:
                                'Developed a dashboard for real-time data visualization to support 1,000+ high-traffic pages.',
                            achievements: [
                                'Enhanced user experience with interactive animations using Pixi.js.',
                                'Achieved a 20% increase in user retention through improved visualization features.'
                            ],
                            role: 'Implemented interactive features and ensured cross-browser compatibility.'
                        }
                    ]
                },
                {
                    company: 'StartUp Inc',
                    period: '2018 - 2020',
                    role: 'Junior Frontend Developer',
                    projects: [
                        {
                            name: 'Corporate Website Redesign',
                            period: '2018.06 - 2019.03',
                            techStack: ['Vue.js', 'Ant Design', 'Webpack'],
                            background:
                                'Redesigned the corporate website to improve responsiveness and user engagement.',
                            achievements: [
                                'Supported 70% of user traffic on PC and mobile.',
                                'Reduced load times by 30% through optimized Vue.js components.'
                            ],
                            role: 'Developed responsive interfaces and integrated Ant Design components.'
                        },
                        {
                            name: 'Internal Admin Panel',
                            period: '2019.04 - 2020.01',
                            techStack: ['React', 'TypeScript', 'husky', 'lint-staged'],
                            background:
                                'Built an admin panel for internal use, focusing on code quality and maintainability.',
                            achievements: [
                                'Integrated 30+ business hooks and 10+ global components.',
                                'Ensured code quality with husky + lint-staged, adhering to ESLint and Prettier standards.'
                            ],
                            role: 'Focused on code quality assurance and component development.'
                        }
                    ]
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Science in Computer Science',
                    school: 'University of Beijing',
                    period: '2014 - 2018'
                }
            ],
            skills: {
                overview: [
                    'Over 5 years of experience in frontend development, specializing in React and Vue.js.',
                    'Proficient in building scalable, high-performance web applications.',
                    'Strong focus on user experience, accessibility, and cross-browser compatibility.'
                ],
                professional: [
                    {
                        category: 'Frontend Development Basics',
                        details:
                            'Proficient in JavaScript (ES6+), CSS3, and HTML5, familiar with TypeScript to enhance code quality and maintainability.'
                    },
                    {
                        category: 'Frameworks & Libraries',
                        details: 'Experienced with React (Hooks), Vue.js (2.x, 3.x), Next.js, and Ant Design.'
                    },
                    {
                        category: 'Tools & Technologies',
                        details: 'Skilled in Webpack, Vite, ECharts, Pixi.js, HTTP/2, and Git.'
                    }
                ]
            }
        },
        zh: {
            header: {
                name: '李明',
                title: '前端开发工程师',
                location: '北京'
            },
            contact: {
                email: 'liming@example.com',
                phone: '+86 123-456-7890',
                linkedin: 'linkedin.com/in/liming'
            },
            summary:
                '一名专注的前端开发工程师，拥有超过5年的Web开发经验，擅长React和Vue.js。精通构建可扩展、高性能的Web应用程序，注重用户体验和可访问性。',
            experience: [
                {
                    company: '科技公司',
                    period: '2020 - 至今',
                    role: '前端开发工程师',
                    projects: [
                        {
                            name: '电商平台重构',
                            period: '2021.01 - 2022.06',
                            techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Grafana'],
                            background: '该项目旨在重构一个过时的电商平台，以提升用户参与度和性能。',
                            achievements: [
                                '通过180万行Next.js代码实现动态内容渲染，用户参与度提升73%。',
                                '使用Grafana优化Session Replay，将FMP P95降至3.5秒。'
                            ],
                            role: '领导前端开发，专注于性能优化和UI/UX改进。'
                        },
                        {
                            name: '交互式数据可视化仪表板',
                            period: '2022.07 - 2023.12',
                            techStack: ['React', 'Pixi.js', 'ECharts'],
                            background: '开发一个实时数据可视化仪表板，支持1000+高流量页面。',
                            achievements: [
                                '使用Pixi.js实现交互式动画，提升用户体验。',
                                '通过改进可视化功能，用户留存率增加20%。'
                            ],
                            role: '实现交互功能并确保跨浏览器兼容性。'
                        }
                    ]
                },
                {
                    company: '创业公司',
                    period: '2018 - 2020',
                    role: '初级前端开发工程师',
                    projects: [
                        {
                            name: '企业网站重设计',
                            period: '2018.06 - 2019.03',
                            techStack: ['Vue.js', 'Ant Design', 'Webpack'],
                            background: '重新设计企业网站，以提升响应性和用户参与度。',
                            achievements: ['支持70%的PC和移动端用户流量。', '通过优化的Vue.js组件将加载时间缩短30%。'],
                            role: '开发响应式界面并集成Ant Design组件。'
                        },
                        {
                            name: '内部管理面板',
                            period: '2019.04 - 2020.01',
                            techStack: ['React', 'TypeScript', 'husky', 'lint-staged'],
                            background: '构建一个内部使用的管理面板，注重代码质量和可维护性。',
                            achievements: [
                                '集成30+业务Hooks和10+全局组件。',
                                '使用husky + lint-staged确保代码质量，符合ESLint和Prettier标准。'
                            ],
                            role: '专注于代码质量保障和组件开发。'
                        }
                    ]
                }
            ],
            education: [
                {
                    degree: '计算机科学学士学位',
                    school: '北京大学',
                    period: '2014 - 2018'
                }
            ],
            skills: {
                overview: [
                    '拥有超过5年的前端开发经验，擅长React和Vue.js。',
                    '精通构建可扩展、高性能的Web应用程序。',
                    '注重用户体验、可访问性和跨浏览器兼容性。'
                ],
                professional: [
                    {
                        category: '前端开发基础',
                        details: '精通JavaScript (ES6+)、CSS3和HTML5，熟悉TypeScript以提升代码质量和可维护性。'
                    },
                    {
                        category: '框架与库',
                        details: '熟练使用React (Hooks)、Vue.js (2.x, 3.x)、Next.js和Ant Design。'
                    },
                    {
                        category: '工具与技术',
                        details: '熟练掌握Webpack、Vite、ECharts、Pixi.js、HTTP/2和Git。'
                    }
                ]
            }
        }
    }
};
