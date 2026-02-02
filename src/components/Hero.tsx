import { Component, onMount, createSignal } from 'solid-js';
import { gsap } from 'gsap';
import { useI18n } from '../contexts/I18nContext';
import { THEME, ANIMATIONS } from '../constants';
import Button from './Button';
import AnimatedBackground from './AnimatedBackground';
import SocialLinks from './SocialLinks';

// Constants for name animation
const HERO_NAME = "ATA OZEREN";
const ANIMATION_CONFIG = {
    letterDelay: 0.05,
    totalDuration: 1.2,
    initialDelay: 0.5,
    ease: "back.out(1.2)"
};

const Hero: Component = () => {
    const { t } = useI18n();
    const [nameRef, setNameRef] = createSignal<HTMLHeadingElement>();

    /**
     * Initialize hero name letter animation using GSAP
     */
    const initializeNameAnimation = () => {
        const nameElement = nameRef();
        if (!nameElement) return;

        // Check if we're on mobile/tablet (screen width < 1024px)
        const isMobileOrTablet = window.innerWidth < 1024;

        let nameMarkup: string;

        if (isMobileOrTablet) {
            // Mobile/Tablet: Split into two lines (ATA / OZEREN)
            const firstName = "ATA";
            const lastName = "OZEREN";

            const firstLineSpans = firstName.split('').map((letter, index) =>
                `<span class="inline-block letter-${index}">${letter}</span>`
            ).join('');

            const secondLineSpans = lastName.split('').map((letter, index) =>
                `<span class="inline-block letter-${index + firstName.length}">${letter}</span>`
            ).join('');

            nameMarkup = `
                <div class="flex flex-col items-center leading-none lg:hidden">
                    <div class="mb-1">${firstLineSpans}</div>
                    <div>${secondLineSpans}</div>
                </div>
                <div class="hidden lg:block">
                    ${HERO_NAME.split('').map((letter, index) => {
                if (letter === ' ') {
                    return `<span class="inline-block">&nbsp;</span>`;
                }
                return `<span class="inline-block letter-${index}">${letter}</span>`;
            }).join('')}
                </div>
            `;
        } else {
            // Desktop: Single line
            const letterSpans = HERO_NAME.split('').map((letter, index) => {
                if (letter === ' ') {
                    return `<span class="inline-block">&nbsp;</span>`;
                }
                return `<span class="inline-block letter-${index}">${letter}</span>`;
            }).join('');

            nameMarkup = letterSpans;
        }

        nameElement.innerHTML = nameMarkup;

        // Get all letter elements for animation
        const letterElements = nameElement.querySelectorAll('span[class*="letter-"]');

        // Set initial state: hidden and positioned below
        gsap.set(letterElements, {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: "center bottom"
        });

        // Animate letters appearing one by one
        gsap.to(letterElements, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: ANIMATION_CONFIG.ease,
            stagger: {
                amount: ANIMATION_CONFIG.totalDuration,
                from: "start"
            },
            delay: ANIMATION_CONFIG.initialDelay
        });

        // Re-initialize animation on window resize
        const handleResize = () => {
            const newIsMobileOrTablet = window.innerWidth < 1024;
            if (newIsMobileOrTablet !== isMobileOrTablet) {
                setTimeout(() => initializeNameAnimation(), 100);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function for resize listener
        return () => window.removeEventListener('resize', handleResize);
    };

    onMount(() => {
        let resizeCleanup: (() => void) | undefined;

        const ctx = gsap.context(() => {
            resizeCleanup = initializeNameAnimation();
        });

        // Return cleanup function
        return () => {
            if (resizeCleanup) resizeCleanup();
            ctx.revert();
        };
    });

    return (
        <section
            id="home"
            class="min-h-screen relative flex items-center justify-center overflow-hidden"
        >
            {/* Animated Background Layer */}
            <AnimatedBackground variant="dark" intensity="high" />

            {/* Main Content Container */}
            <div class={`relative z-10 container mx-auto ${THEME.spacing.containerPadding} text-center ${THEME.colors.text.primary}`}>
                <div class="mb-8">
                    {/* Subtitle: "I AM" */}
                    <p
                        class={`text-base sm:text-xl md:text-2xl font-extralight uppercase tracking-widest ${THEME.colors.text.secondary} mb-4 opacity-90 text-center max-w-4xl mx-auto lg:transform lg:translate-x-[-300px]`}
                    >
                        I AM
                    </p>

                    {/* Main Hero Name */}
                    <h1
                        ref={setNameRef}
                        class={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-bold mb-6 ${THEME.colors.text.primary} text-center`}
                        style={{ perspective: "1000px" }}
                    >
                        {/* Content will be populated by GSAP animation */}
                    </h1>

                    {/* Role Description */}
                    <p
                        class={`text-sm sm:text-base md:text-lg lg:text-xl font-extralight uppercase tracking-widest ${THEME.colors.text.secondary} mb-12 opacity-90 text-center max-w-4xl mx-auto lg:transform lg:translate-x-[220px]`}
                    >
                        Full Stack Developer
                    </p>

                    {/* Call-to-Action Buttons */}
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            variant="ata-black"
                            href="/projects"
                            aria-label={t('hero.cta')}
                        >
                            {t('hero.cta')}
                        </Button>

                        <Button
                            variant="ata-trans"
                            href="/contact"
                            aria-label={t('hero.contact')}
                        >
                            {t('hero.contact')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Social Media Links - Fixed Position */}
            <SocialLinks />
        </section>
    );
};

export default Hero;