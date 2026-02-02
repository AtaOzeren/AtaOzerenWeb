// Application constants
export const APP_CONFIG = {
    name: 'Ata Özeren',
    title: 'Personal Website',
    description: "Ata Özeren's personal website containing his portfolio, blog and contact information.",
    defaultLanguage: 'en' as const,
    supportedLanguages: ['tr', 'en', 'de', 'fr', 'es'] as const,
    scrollThreshold: 50,
    transitionDuration: 300,
    siteUrl: 'https://ataozeren.com',
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
    buttons: {
        variants: {
            'ata-black': 'bg-gradient-to-r from-gray-800 to-black text-white hover:from-gray-700 hover:to-gray-900 shadow-lg',
            'ata-trans': 'border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60',
        },
        base: 'px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block text-center',
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

// Re-export from projects
export * from './projects';
