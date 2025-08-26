import { Component } from 'solid-js';
import { useI18n } from '../contexts/I18nContext';
import { ANIMATIONS } from '../constants';
import type { LanguageSwitcherProps } from '../types';

const LanguageSwitcher: Component<LanguageSwitcherProps> = (props) => {
    const { locale, setLocale } = useI18n();

    const toggleLanguage = () => {
        setLocale(locale() === 'tr' ? 'en' : 'tr');
    };

    const buttonStyles = () =>
        `flex items-center gap-2 px-3 py-1.5 rounded-lg ${ANIMATIONS.transition} ${props.isScrolled
            ? 'bg-gray-100 border border-gray-300 text-gray-800 hover:bg-gray-200'
            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
        }`;

    const getLanguageDisplay = () => locale() === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN';
    const getTooltip = () => locale() === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç';

    return (
        <button
            onClick={toggleLanguage}
            class={buttonStyles()}
            title={getTooltip()}
            aria-label={getTooltip()}
        >
            <span class="text-sm font-medium">
                {getLanguageDisplay()}
            </span>
        </button>
    );
};

export default LanguageSwitcher;
