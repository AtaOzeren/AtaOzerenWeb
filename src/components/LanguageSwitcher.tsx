import { Component, createSignal } from 'solid-js';
import { useI18n } from '../contexts/I18nContext';
import { ANIMATIONS } from '../constants';
import type { LanguageSwitcherProps } from '../types';

const LanguageSwitcher: Component<LanguageSwitcherProps> = (props) => {
    const { locale, setLocale } = useI18n();
    const [isOpen, setIsOpen] = createSignal(false);

    const languages = [
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' }
    ];

    const currentLanguage = () => languages.find(lang => lang.code === locale()) || languages[0];

    const selectLanguage = (langCode: string) => {
        setLocale(langCode as 'tr' | 'en');
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen());
    };

    const buttonStyles = () =>
        `relative flex items-center gap-2 px-2 py-2 rounded-lg border ${ANIMATIONS.transition} ${props.isScrolled
            ? 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
            : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
        }`;

    const dropdownStyles = () =>
        `absolute top-full right-0 mt-1 min-w-[140px] rounded-lg border shadow-lg z-50 ${ANIMATIONS.transition} ${props.isScrolled
            ? 'bg-white border-gray-200'
            : 'bg-white/95 backdrop-blur-sm border-white/20'
        } ${isOpen() ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`;

    const optionStyles = () =>
        `flex items-center gap-3 px-3 py-2 text-sm ${ANIMATIONS.transition} ${props.isScrolled
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-gray-800 hover:bg-gray-100'
        } first:rounded-t-lg last:rounded-b-lg cursor-pointer`;

    return (
        <div class="relative">
            <button
                onClick={toggleDropdown}
                class={buttonStyles()}
                aria-label="Select Language"
            >
                <span class="text-lg">{currentLanguage().flag}</span>
                <svg
                    class={`w-4 h-4 ${ANIMATIONS.transition} ${isOpen() ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div class={dropdownStyles()}>
                {languages.map(lang => (
                    <div
                        onClick={() => selectLanguage(lang.code)}
                        class={`${optionStyles()} ${lang.code === locale() ? 'bg-gray-100 font-medium' : ''}`}
                    >
                        <span class="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                    </div>
                ))}
            </div>

            {/* Backdrop to close dropdown */}
            {isOpen() && (
                <div
                    class="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default LanguageSwitcher;
