
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const Footer = () => {
    const { t } = useLanguage();
    
    return (
        <footer className='bg-gradient-to-r from-slate-800/95 via-slate-800/98 to-slate-900/95 text-white py-20 transition-colors duration-300 border-t border-slate-700/30 dark:border-slate-700/10 backdrop-blur-md relative z-10'>
            <div className='container mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-14'>
                    <div className='hover-lift'>
                        <h2 className='text-2xl font-bold text-white mb-5 relative inline-block'>
                            {t('about.title')}
                            <span className='absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500'></span>
                        </h2>
                        <p className='text-slate-300 dark:text-slate-400 mb-6 leading-relaxed'>
                            {t('about.bio')}
                        </p>
                        <div className='flex space-x-5 mt-5'>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-full bg-slate-700/50 hover:bg-blue-600/80 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-blue-900/20'>
                                <span className='sr-only'>LinkedIn</span>
                                <svg className='w-5 h-5 text-slate-300 hover:text-white transition-colors' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-full bg-slate-700/50 hover:bg-blue-600/80 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-blue-900/20'>
                                <span className='sr-only'>GitHub</span>
                                <svg className='w-5 h-5 text-slate-300 hover:text-white transition-colors' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                                    <path
                                        fillRule='evenodd'
                                        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-full bg-slate-700/50 hover:bg-blue-600/80 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-blue-900/20'>
                                <span className='sr-only'>Twitter</span>
                                <svg className='w-5 h-5 text-slate-300 hover:text-white transition-colors' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                                    <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className='hover-lift'>
                        <h3 className='text-xl font-semibold text-white mb-5 relative inline-block'>
                            {t('footer.quickLinks')}
                            <span className='absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-blue-500 to-indigo-500'></span>
                        </h3>
                        <ul className='space-y-3 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <li>
                                <a href='#about' className='text-slate-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300'></span>
                                    {t('nav.about')}
                                </a>
                            </li>
                            <li>
                                <a href='#experience' className='text-slate-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300'></span>
                                    {t('nav.experience')}
                                </a>
                            </li>
                            <li>
                                <a href='#education' className='text-slate-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300'></span>
                                    {t('nav.education')}
                                </a>
                            </li>
                            <li>
                                <a href='#skills' className='text-slate-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300'></span>
                                    {t('nav.skills')}
                                </a>
                            </li>
                            <li>
                                <a href='#projects' className='text-slate-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300'></span>
                                    {t('nav.projects')}
                                </a>
                            </li>
                            <li>
                                <a href='#contact' className='text-slate-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300'></span>
                                    {t('nav.contact')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className='hover-lift'>
                        <h3 className='text-xl font-semibold text-white mb-5 relative inline-block'>
                            {t('contact.title')}
                            <span className='absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-blue-500 to-indigo-500'></span>
                        </h3>
                        <div className='space-y-4'>
                            <a href="mailto:your.email@example.com" className='text-slate-300 flex items-center gap-3 hover:text-blue-400 transition-all duration-300 group hover:translate-x-1'>
                                <div className='w-9 h-9 rounded-full bg-slate-700/60 flex items-center justify-center group-hover:bg-blue-600/50 transition-all duration-300'>
                                    <Mail size={16} className='text-blue-400 group-hover:text-white' />
                                </div>
                                <span>your.email@example.com</span>
                            </a>
                            <a href="tel:+1234567890" className='text-slate-300 flex items-center gap-3 hover:text-blue-400 transition-all duration-300 group hover:translate-x-1'>
                                <div className='w-9 h-9 rounded-full bg-slate-700/60 flex items-center justify-center group-hover:bg-blue-600/50 transition-all duration-300'>
                                    <Phone size={16} className='text-blue-400 group-hover:text-white' />
                                </div>
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className='text-slate-300 flex items-center gap-3 group'>
                                <div className='w-9 h-9 rounded-full bg-slate-700/60 flex items-center justify-center'>
                                    <MapPin size={16} className='text-blue-400' />
                                </div>
                                <span>City, Country</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border-t border-slate-700/50 pt-8 flex flex-col sm:flex-row justify-between items-center'>
                    <p className='text-slate-400 text-sm'>
                        © {new Date().getFullYear()} Your Name. {t('footer.rights')}
                    </p>
                    <p className='text-slate-500 text-xs mt-3 sm:mt-0'>
                        {t('footer.designed')}
                    </p>
                </div>

                {/* 装饰元素 */}
                <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'></div>
                <div className='absolute -top-10 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-800/20'></div>
                
                {/* 添加背景装饰 */}
                <div className='absolute -top-20 right-20 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl'></div>
                <div className='absolute bottom-10 left-10 w-48 h-48 bg-indigo-600/10 rounded-full filter blur-3xl'></div>
            </div>
        </footer>
    );
};

export default Footer;
