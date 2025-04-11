
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

const Footer = () => {
    const { t } = useLanguage();
    
    return (
        <footer className='bg-gradient-to-br from-slate-50 to-blue-50/60 dark:from-slate-900 dark:to-slate-800/90 text-slate-800 dark:text-white py-12 transition-colors duration-300 border-t border-slate-200/70 dark:border-slate-700/30 backdrop-blur-md relative z-10 shadow-xl'>
            <div className='container mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 space-y-6 md:space-y-0'>
                    {/* About Section */}
                    <div className='hover-lift bg-white/80 dark:bg-slate-800/50 rounded-xl p-6 transition-all duration-300 hover:bg-white/90 dark:hover:bg-slate-800/70 shadow-lg hover:shadow-xl'>
                        <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-5 relative inline-block group'>
                            {t('about.title')}
                            <span className='absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-16 transition-all duration-300'></span>
                        </h2>
                        <p className='text-slate-700 dark:text-slate-300 mb-6 leading-relaxed'>
                            {t('about.bio')}
                        </p>
                        <div className='flex space-x-4'>
                            {[
                                { Icon: Facebook, href: '#' },
                                { Icon: Instagram, href: '#' },
                                { Icon: Linkedin, href: '#' },
                                { Icon: Twitter, href: '#' }
                            ].map(({ Icon, href }, index) => (
                                <Button 
                                    key={index} 
                                    variant="outline" 
                                    size="icon" 
                                    className='hover:bg-blue-600/20 transition-all duration-300 hover:scale-110 hover:border-blue-500 bg-white/80 dark:bg-slate-800/80 dark:border-slate-700'
                                >
                                    <Icon className='text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400' />
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='hover-lift bg-white/80 dark:bg-slate-800/50 rounded-xl p-6 transition-all duration-300 hover:bg-white/90 dark:hover:bg-slate-800/70 shadow-lg hover:shadow-xl'>
                        <h3 className='text-xl font-semibold text-slate-900 dark:text-white mb-5 relative inline-block group'>
                            {t('footer.quickLinks')}
                            <span className='absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-14 transition-all duration-300'></span>
                        </h3>
                        <div className='grid grid-cols-2 gap-3'>
                            {[
                                { label: t('nav.about'), href: '#about' },
                                { label: t('nav.experience'), href: '#experience' },
                                { label: t('nav.education'), href: '#education' },
                                { label: t('nav.skills'), href: '#skills' },
                                { label: t('nav.projects'), href: '#projects' },
                                { label: t('nav.contact'), href: '#contact' }
                            ].map(({ label, href }, index) => (
                                <Button 
                                    key={index} 
                                    variant="ghost" 
                                    className='justify-start hover:bg-blue-600/10 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-300 text-slate-700 dark:text-slate-300'
                                >
                                    <a href={href} className='w-full text-left'>{label}</a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information - Simplified to avoid duplication */}
                    <div className='hover-lift bg-white/80 dark:bg-slate-800/50 rounded-xl p-6 transition-all duration-300 hover:bg-white/90 dark:hover:bg-slate-800/70 shadow-lg hover:shadow-xl'>
                        <h3 className='text-xl font-semibold text-slate-900 dark:text-white mb-5 relative inline-block group'>
                            {t('footer.contactInfo')}
                            <span className='absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-14 transition-all duration-300'></span>
                        </h3>
                        <div className='space-y-4'>
                            <p className='text-slate-700 dark:text-slate-300 mb-2'>{t('footer.connectText')}</p>
                            <div className='flex space-x-4 justify-center sm:justify-start'>
                                {[
                                    { Icon: Mail, href: 'mailto:your.email@example.com' },
                                    { Icon: Phone, href: 'tel:+1234567890' },
                                    { Icon: Linkedin, href: '#' },
                                    { Icon: Twitter, href: '#' }
                                ].map(({ Icon, href }, index) => (
                                    <Button 
                                        key={index} 
                                        variant="outline" 
                                        size="icon" 
                                        className='hover:bg-blue-600/20 transition-all duration-300 hover:scale-110 hover:border-blue-500 bg-white/80 dark:bg-slate-800/80 dark:border-slate-700'
                                    >
                                        <a href={href}>
                                            <Icon className='text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400' />
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className='border-t border-slate-200/50 dark:border-slate-700/50 pt-6 flex flex-col sm:flex-row justify-between items-center'>
                    <p className='text-slate-600 dark:text-slate-400 text-sm'>
                        © {new Date().getFullYear()} Your Name. {t('footer.rights')}
                    </p>
                    <p className='text-slate-500 dark:text-slate-500 text-xs mt-3 sm:mt-0'>
                        {t('footer.designed')}
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'></div>
                <div className='absolute -top-10 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-100/20 dark:to-slate-800/20'></div>
                
                {/* Background Decorations */}
                <div className='absolute -top-20 right-20 w-64 h-64 bg-blue-600/5 dark:bg-blue-600/10 rounded-full filter blur-3xl'></div>
                <div className='absolute bottom-10 left-10 w-48 h-48 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full filter blur-3xl'></div>
            </div>
        </footer>
    );
};

export default Footer;
