// Common types used across the application

export type Language = 'tr' | 'en';

export interface I18nContextType {
    t: (key: string) => string;
    locale: () => Language;
    setLocale: (locale: Language) => void;
}

export interface ComponentProps {
    children?: any;
    class?: string;
}

export interface NavbarProps extends ComponentProps {
    isScrolled?: boolean;
}

export interface LanguageSwitcherProps {
    isScrolled?: boolean;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
