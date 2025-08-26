import { createContext, createSignal, useContext, Component, JSX } from 'solid-js';
import { tr, en, type Locale } from '../locales';
import { useLocalStorage, getBrowserLanguage } from '../hooks';
import { APP_CONFIG } from '../constants';
import type { I18nContextType, Language } from '../types';

const I18nContext = createContext<I18nContextType>();

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

interface I18nProviderProps {
    children: JSX.Element;
}

// Translation utility function
const getNestedValue = (obj: any, path: string): string => {
    const result = path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);

    return result !== undefined ? String(result) : path;
};

export const I18nProvider: Component<I18nProviderProps> = (props) => {
    const { getValue: getStoredLanguage, setValue: setStoredLanguage } = useLocalStorage('language', APP_CONFIG.defaultLanguage);

    // Development: Clear localStorage to test default language change
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        const stored = getStoredLanguage();
        if (stored === 'tr' && APP_CONFIG.defaultLanguage === 'en') {
            localStorage.removeItem('language');
        }
    }

    // Initialize locale based on stored preference or browser language
    const getInitialLocale = (): Language => {
        const stored = getStoredLanguage();
        if (APP_CONFIG.supportedLanguages.includes(stored as Language)) {
            return stored as Language;
        }

        const browserLang = getBrowserLanguage();
        if (browserLang.startsWith('tr')) {
            return 'tr';
        }
        if (browserLang.startsWith('en')) {
            return 'en';
        }

        return APP_CONFIG.defaultLanguage;
    };

    const [locale, setLocale] = createSignal<Language>(getInitialLocale());

    // Handle locale changes
    const handleSetLocale = (newLocale: Language) => {
        if (!APP_CONFIG.supportedLanguages.includes(newLocale)) {
            console.warn(`Unsupported language: ${newLocale}`);
            return;
        }

        setLocale(newLocale);
        setStoredLanguage(newLocale);
    };

    // Get current translations
    const getTranslations = (): Locale => {
        switch (locale()) {
            case 'tr':
                return tr;
            case 'en':
                return en;
            default:
                return tr;
        }
    };

    // Translation function
    const t = (key: string): string => {
        const result = getNestedValue(getTranslations(), key);
        if (result === key) {
            console.warn(`Translation missing for key: ${key}`);
        }
        return result;
    };

    const value: I18nContextType = {
        t,
        locale,
        setLocale: handleSetLocale,
    };

    return (
        <I18nContext.Provider value={value}>
            {props.children}
        </I18nContext.Provider>
    );
};
