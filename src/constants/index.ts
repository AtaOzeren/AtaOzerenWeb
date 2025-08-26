// Application constants
export const APP_CONFIG = {
    name: 'Ata Özeren',
    title: 'Personal Website',
    defaultLanguage: 'en' as const,
    supportedLanguages: ['tr', 'en'] as const,
    scrollThreshold: 50,
    transitionDuration: 300,
} as const;

// Theme constants
export const THEME = {
    colors: {
        primary: {
            gradient: 'from-gray-800 to-black',
            gradientHover: 'from-gray-700 to-gray-900',
        },
        background: {
            hero: 'from-black via-gray-900 to-gray-100',
            page: 'bg-gray-50',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-200',
            tertiary: 'text-gray-300',
            dark: 'text-gray-900',
            muted: 'text-gray-600',
        },
    },
    spacing: {
        navHeight: 'h-16',
        containerPadding: 'px-6',
        sectionPadding: 'py-12',
    },
} as const;

// Animation constants
export const ANIMATIONS = {
    transition: 'transition-all duration-300',
    hover: {
        scale: 'transform hover:scale-105',
        bg: 'hover:bg-white/20',
    },
} as const;
