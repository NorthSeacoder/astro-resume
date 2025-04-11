
import {useState, useEffect} from 'react';
import {Menu, X, Moon, Sun, Globe} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {useNavigate} from 'react-router-dom';
import {useLanguage} from '@/lib/i18n';
import {AnimatePresence, motion} from 'framer-motion';

interface HeaderProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Header = ({activeSection, setActiveSection, theme, toggleTheme}: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {language, setLanguage, t} = useLanguage();

    const navItems = [
        {id: 'about', label: t('nav.about')},
        {id: 'experience', label: t('nav.experience')},
        {id: 'education', label: t('nav.education')},
        {id: 'skills', label: t('nav.skills')},
        {id: 'projects', label: t('nav.projects')},
        {id: 'contact', label: t('nav.contact')}
    ];

    const languageLabels = {
        en: 'En',
        zh: '中文'
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        handleScroll(); // 初始检查
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
            setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'zh' : 'en');
    };

    return (
        <header
            className='fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-md'
            style={{
                backgroundColor: isScrolled ? 'var(--header-bg-scrolled, rgba(255,255,255,0.95))' : 'transparent',
                boxShadow: isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                padding: isScrolled ? '0.5rem 0' : '1rem 0'
            }}>
            <div className='container mx-auto px-4 flex justify-between items-center'>
                <a
                    href='#'
                    className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform'
                    aria-label='首页'>
                    YOUR NAME
                </a>

                {/* Mobile menu button */}
                <div className='flex items-center gap-2 md:hidden'>
                    {/* Theme toggle on mobile */}
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={toggleTheme}
                        aria-label='Toggle theme'
                        className='text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-0 hover:border-transparent'>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </Button>

                    {/* Language toggle on mobile */}
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={toggleLanguage}
                        aria-label='Toggle language'
                        className='text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-0 hover:border-transparent flex items-center justify-center'>
                        <span className='text-xs font-medium'>{languageLabels[language]}</span>
                    </Button>

                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label='Toggle menu'
                        className='text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-0 hover:border-transparent'>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className='header-mobile-menu'>
                        <nav className='flex flex-col space-y-4'>
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`header-mobile-link ${
                                        activeSection === item.id ? 'active' : 'text-slate-700 dark:text-slate-300'
                                    }`}>
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Desktop navigation */}
                <div className='hidden md:flex items-center space-x-6'>
                    <nav className='flex space-x-8 mr-6'>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`header-nav-link focus:outline-none focus:ring-0 ${
                                    activeSection === item.id ? 'active' : 'text-slate-700 dark:text-slate-300'
                                }`}>
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Language Toggle Button */}
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={toggleLanguage}
                            aria-label='Toggle language'
                            className='rounded-full w-9 h-9 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-0 hover:border-transparent'>
                            <span className='text-xs font-medium'>{languageLabels[language]}</span>
                        </Button>

                    {/* Theme Toggle */}
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={toggleTheme}
                            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                            className='rounded-full w-9 h-9 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-0 hover:border-transparent'>
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;

