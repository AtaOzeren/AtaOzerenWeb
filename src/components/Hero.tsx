import { Component } from 'solid-js';
import { useI18n } from '../contexts/I18nContext';
import { THEME, ANIMATIONS } from '../constants';

const Hero: Component = () => {
    const { t } = useI18n();

    const ctaButtons = [
        {
            href: '#projects',
            text: 'hero.cta',
            isPrimary: true,
            styles: `px-8 py-3 bg-gradient-to-r ${THEME.colors.primary.gradient} rounded-lg font-semibold ${THEME.colors.text.primary} hover:${THEME.colors.primary.gradientHover} ${ANIMATIONS.hover.scale} ${ANIMATIONS.transition} shadow-lg`
        },
        {
            href: '#contact',
            text: 'hero.contact',
            isPrimary: false,
            styles: `px-8 py-3 border-2 border-white/40 rounded-lg font-semibold ${THEME.colors.text.primary} ${ANIMATIONS.hover.bg} hover:border-white/60 ${ANIMATIONS.transition}`
        }
    ];

    return (
        <section
            id="home"
            class={`min-h-screen bg-gradient-to-br ${THEME.colors.background.hero} ${THEME.colors.text.primary} flex items-center justify-center`}
        >
            <div class={`container mx-auto ${THEME.spacing.containerPadding} text-center`}>
                <div class="mb-8">
                    <h1 class={`text-5xl md:text-7xl font-bold mb-6 ${THEME.colors.text.primary}`}>
                        {t('hero.name')}
                    </h1>
                    <p class={`text-xl md:text-2xl ${THEME.colors.text.secondary} mb-4 max-w-2xl mx-auto`}>
                        {t('hero.title')}
                    </p>
                    <p class={`text-lg ${THEME.colors.text.tertiary} mb-12 max-w-3xl mx-auto`}>
                        {t('hero.description')}
                    </p>

                    {/* CTA Buttons */}
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {ctaButtons.map(button => (
                            <a href={button.href} class={button.styles}>
                                {t(button.text)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
