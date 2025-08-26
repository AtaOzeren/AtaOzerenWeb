import { Component } from 'solid-js';
import { useI18n } from '../contexts/I18nContext';
import { useScrolled } from '../hooks';
import { THEME, ANIMATIONS } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: Component = () => {
    const isScrolled = useScrolled();
    const { t } = useI18n();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Dynamic styles based on scroll state
    const navStyles = () =>
        `fixed top-0 left-0 right-0 z-50 ${ANIMATIONS.transition} ${isScrolled() ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`;

    const logoStyles = () =>
        `text-xl font-bold ${ANIMATIONS.transition} ${isScrolled() ? THEME.colors.text.dark : THEME.colors.text.primary
        }`;

    const linkStyles = () =>
        `${ANIMATIONS.transition} ${isScrolled()
            ? 'text-gray-600 hover:text-gray-800'
            : 'text-white/80 hover:text-white'
        }`;

    const navigationLinks = [
        { href: '#home', key: 'nav.home' },
        { href: '#about', key: 'nav.about' },
        { href: '#projects', key: 'nav.projects' },
        { href: '#contact', key: 'nav.contact' },
    ];

    return (
        <nav class={navStyles()}>
            <div class={`container mx-auto ${THEME.spacing.containerPadding}`}>
                <div class={`flex items-center justify-between ${THEME.spacing.navHeight}`}>
                    {/* Logo */}
                    <button onClick={scrollToTop} class={logoStyles()}>
                        {t('hero.name')}
                    </button>

                    {/* Navigation Links & Language Switcher */}
                    <div class="flex items-center gap-6">
                        <div class="hidden md:flex items-center gap-6">
                            {navigationLinks.map(link => (
                                <a href={link.href} class={linkStyles()}>
                                    {t(link.key)}
                                </a>
                            ))}
                        </div>

                        {/* Language Switcher */}
                        <div class={`${ANIMATIONS.transition} ${isScrolled() ? 'opacity-100' : 'opacity-90'
                            }`}>
                            <LanguageSwitcher isScrolled={isScrolled()} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
