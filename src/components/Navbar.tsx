import { Component, onMount } from 'solid-js';
import { useI18n } from '../contexts/I18nContext';
import { THEME, ANIMATIONS } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';
import { gsap } from 'gsap';
import { A } from '@solidjs/router';

// Animation configuration constants
const LOGO_ANIMATION = {
    duration: 0.4,
    glowShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)",
    ease: "power2.out"
};

const LINK_ANIMATION = {
    duration: 0.3,
    letterDuration: 0.8,
    hoverDelay: 800,
    letterStagger: 0.05,
    scale: 1.05,
    ease: "power2.out"
};

// Navigation links configuration
const NAVIGATION_LINKS = [
    { href: '#about', key: 'nav.about' },
    { href: '/projects', key: 'nav.projects' },
    { href: '#contact', key: 'nav.contact' },
];

const Navbar: Component = () => {
    const { t } = useI18n();

    /**
     * Initialize GSAP animations for logo hover effect
     */
    const initializeLogoAnimation = () => {
        const logoElement = document.querySelector('.logo-ata');
        if (!logoElement) return;

        logoElement.addEventListener('mouseenter', () => {
            gsap.to(logoElement, {
                duration: LOGO_ANIMATION.duration,
                textShadow: LOGO_ANIMATION.glowShadow,
                ease: LOGO_ANIMATION.ease
            });
        });

        logoElement.addEventListener('mouseleave', () => {
            gsap.to(logoElement, {
                duration: LOGO_ANIMATION.duration,
                textShadow: "none",
                ease: LOGO_ANIMATION.ease
            });
        });
    };

    /**
     * Create underline element for navigation links
     */
    const createUnderlineElement = (): HTMLDivElement => {
        const underline = document.createElement('div');
        underline.className = 'nav-underline';
        underline.style.cssText = `
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 1px;
            background: currentColor;
            transform: scaleX(0);
            transform-origin: center;
        `;
        return underline;
    };

    /**
     * Split text into individual letter spans for animation
     */
    const createLetterSpans = (text: string): string => {
        return text.split('').map(letter =>
            `<span class="letter" style="display: inline-block;">${letter === ' ' ? '&nbsp;' : letter}</span>`
        ).join('');
    };

    /**
     * Animate letters disappearing and reappearing
     */
    const createLetterAnimation = (letterElements: NodeListOf<Element>) => {
        let isAnimating = false;

        return () => {
            if (isAnimating) return;
            isAnimating = true;

            // Phase 1: Letters disappear from left to right
            gsap.to(letterElements, {
                duration: LINK_ANIMATION.letterDuration,
                opacity: 0,
                x: 30,
                ease: "power2.in",
                stagger: LINK_ANIMATION.letterStagger,
                onComplete: () => {
                    // Phase 2: Reset position and reappear
                    gsap.set(letterElements, { x: -30 });
                    gsap.to(letterElements, {
                        duration: LINK_ANIMATION.letterDuration,
                        opacity: 1,
                        x: 0,
                        ease: LINK_ANIMATION.ease,
                        stagger: LINK_ANIMATION.letterStagger,
                        onComplete: () => {
                            isAnimating = false;
                        }
                    });
                }
            });
        };
    };

    /**
     * Initialize navigation link animations
     */
    const initializeNavLinkAnimations = () => {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach((link) => {
            const linkElement = link as HTMLElement;
            const originalText = linkElement.textContent || '';
            let hoverTimeout: number;

            // Convert text to letter spans
            linkElement.innerHTML = createLetterSpans(originalText);
            const letterElements = linkElement.querySelectorAll('.letter');

            // Add underline element
            const underline = createUnderlineElement();
            linkElement.style.position = 'relative';
            linkElement.appendChild(underline);

            // Create letter animation function
            const animateLetters = createLetterAnimation(letterElements);

            // Mouse enter event
            linkElement.addEventListener('mouseenter', () => {
                // Scale and underline animation
                gsap.to(linkElement, {
                    duration: LINK_ANIMATION.duration,
                    scale: LINK_ANIMATION.scale,
                    ease: LINK_ANIMATION.ease
                });
                gsap.to(underline, {
                    duration: LINK_ANIMATION.duration,
                    scaleX: 1,
                    ease: LINK_ANIMATION.ease
                });

                // Delayed letter animation
                hoverTimeout = window.setTimeout(animateLetters, LINK_ANIMATION.hoverDelay);
            });

            // Mouse leave event
            linkElement.addEventListener('mouseleave', () => {
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }

                gsap.to(linkElement, {
                    duration: LINK_ANIMATION.duration,
                    scale: 1,
                    ease: LINK_ANIMATION.ease
                });
                gsap.to(underline, {
                    duration: LINK_ANIMATION.duration,
                    scaleX: 0,
                    ease: LINK_ANIMATION.ease
                });
            });
        });
    };

    onMount(() => {
        initializeLogoAnimation();
        initializeNavLinkAnimations();
    });

    // Component styles
    const navStyles = () =>
        `absolute top-0 left-0 right-0 z-50 ${ANIMATIONS.transition} bg-transparent`;

    const logoStyles = () =>
        `text-3xl font-bold ${ANIMATIONS.transition} ${THEME.colors.text.primary}`;

    const linkStyles = () =>
        `nav-link font-extralight text-sm uppercase tracking-wider ${ANIMATIONS.transition} text-white/80 hover:text-white`;

    return (
        <nav class={navStyles()}>
            <div class="mx-auto px-10">
                <div class={`flex items-center justify-between w-full ${THEME.spacing.navHeight}`}>
                    {/* Logo Section */}
                    <div class="flex-shrink-0 -ml-2">
                        <A href="/" class={`logo-ata cursor-pointer ${logoStyles()}`}>
                            ATA
                        </A>
                    </div>

                    {/* Navigation Links & Language Switcher */}
                    <div class="flex items-center gap-6 ml-auto -mr-2">
                        {/* Desktop Navigation Links */}
                        <div class="hidden md:flex items-center gap-6">
                            {NAVIGATION_LINKS.map(link => (
                                <a href={link.href} class={linkStyles()}>
                                    {t(link.key)}
                                </a>
                            ))}
                        </div>

                        {/* Language Switcher Component */}
                        <div class={`${ANIMATIONS.transition} opacity-90`}>
                            <LanguageSwitcher isScrolled={false} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
