import {useState, useEffect} from 'react';
import {Menu, X, Moon, Sun} from 'lucide-react';
import {useLanguage} from '@/lib/i18n';

interface HeaderProps {
    activeSection: string;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Header = ({activeSection, theme, toggleTheme}: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {language, setLanguage, t, getResumeData} = useLanguage();
    const resumeData = getResumeData();
    const personal = resumeData.personal;

    const navItems = [
        {id: 'about', label: t('nav.about')},
        {id: 'experience', label: t('nav.experience')},
        {id: 'skills', label: t('nav.skills')},
        {id: 'projects', label: t('nav.projects')},
        {id: 'education', label: t('nav.education')}
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
            // setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'zh' : 'en');
    };

    return (
        <header className={`nav-professional ${isScrolled ? 'nav-scrolled' : ''}`}>
            <div className='nav-container'>
                <a href='#' className='nav-brand focus-ring' aria-label={t('aria.home')}>
                    {personal.name}
                </a>

                {/* Mobile menu button */}
                <div className='flex items-center gap-2 md:hidden'>
                    {/* Theme toggle on mobile */}
                    <button
                        onClick={toggleTheme}
                        aria-label={t('aria.toggleTheme')}
                        className='theme-toggle'>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {/* Language toggle on mobile */}
                    <button
                        onClick={toggleLanguage}
                        aria-label={t('aria.toggleLanguage')}
                        className='language-toggle'>
                        <span className='text-xs font-medium'>{languageLabels[language]}</span>
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={t('aria.toggleMenu')}
                        className='nav-mobile-toggle'>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className='nav-mobile-menu'>
                        <nav className='space-y-2'>
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`nav-mobile-link ${
                                        activeSection === item.id ? 'active' : ''
                                    }`}>
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Desktop navigation */}
                <div className='hidden md:flex items-center gap-6'>
                    <nav className='nav-menu'>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`nav-link focus-ring ${
                                    activeSection === item.id ? 'active' : ''
                                }`}>
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Language Toggle Button */}
                    <button
                        onClick={toggleLanguage}
                        aria-label={t('aria.toggleLanguage')}
                        className='language-toggle'>
                            <span className='text-xs font-medium'>{languageLabels[language]}</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'light' ? t('aria.toggleThemeDark') : t('aria.toggleThemeLight')}
                        className='theme-toggle'>
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

