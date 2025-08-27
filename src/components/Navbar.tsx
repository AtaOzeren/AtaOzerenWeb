import { Component, onMount } from 'solid-js';
import { useI18n } from '../contexts/I18nContext';
import { THEME, ANIMATIONS } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';
import { gsap } from 'gsap';
import { A } from '@solidjs/router';

const Navbar: Component = () => {
    const { t } = useI18n();

    // GSAP animations for navbar links
    onMount(() => {
        // ATA logo hover animation
        const logoElement = document.querySelector('.logo-ata');
        if (logoElement) {
            logoElement.addEventListener('mouseenter', () => {
                // Sadece parlama efekti
                gsap.to(logoElement, {
                    duration: 0.4,
                    textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)",
                    ease: "power2.out"
                });
            });

            logoElement.addEventListener('mouseleave', () => {
                // Parlama efektini kaldır
                gsap.to(logoElement, {
                    duration: 0.4,
                    textShadow: "none",
                    ease: "power2.out"
                });
            });
        } const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach((link) => {
            const linkElement = link as HTMLElement;
            const originalText = linkElement.textContent || '';
            let hoverTimeout: number;
            let isAnimating = false;

            // Split text into individual letters with spans
            const letters = originalText.split('').map(letter =>
                `<span class="letter" style="display: inline-block;">${letter === ' ' ? '&nbsp;' : letter}</span>`
            ).join('');
            linkElement.innerHTML = letters;

            const letterElements = linkElement.querySelectorAll('.letter');

            // Create underline element
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
            linkElement.style.position = 'relative';
            linkElement.appendChild(underline);

            // Letter disappear and reappear animation
            const animateLetters = () => {
                if (isAnimating) return;
                isAnimating = true;

                // First, animate letters disappearing from left to right
                gsap.to(letterElements, {
                    duration: 0.8,
                    opacity: 0,
                    x: 30,
                    ease: "power2.in",
                    stagger: 0.05,
                    onComplete: () => {
                        // Reset position and animate letters appearing from left to right
                        gsap.set(letterElements, { x: -30 });
                        gsap.to(letterElements, {
                            duration: 0.8,
                            opacity: 1,
                            x: 0,
                            ease: "power2.out",
                            stagger: 0.05,
                            onComplete: () => {
                                isAnimating = false;
                            }
                        });
                    }
                });
            };

            // Hover animations
            linkElement.addEventListener('mouseenter', () => {
                gsap.to(linkElement, {
                    duration: 0.3,
                    scale: 1.05,
                    ease: "power2.out"
                });
                gsap.to(underline, {
                    duration: 0.3,
                    scaleX: 1,
                    ease: "power2.out"
                });

                // Start timer for letter animation
                hoverTimeout = window.setTimeout(() => {
                    animateLetters();
                }, 800); // Wait 800ms before starting letter animation
            });

            linkElement.addEventListener('mouseleave', () => {
                // Clear the timeout if mouse leaves before animation starts
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }

                gsap.to(linkElement, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
                gsap.to(underline, {
                    duration: 0.3,
                    scaleX: 0,
                    ease: "power2.out"
                });
            });
        });
    });

    // Dynamic styles based on scroll state
    const navStyles = () =>
        `absolute top-0 left-0 right-0 z-50 ${ANIMATIONS.transition} bg-transparent`;

    const logoStyles = () =>
        `text-3xl font-bold ${ANIMATIONS.transition} ${THEME.colors.text.primary}`;

    const linkStyles = () =>
        `nav-link font-extralight text-sm uppercase tracking-wider ${ANIMATIONS.transition} text-white/80 hover:text-white`;

    const navigationLinks = [
        { href: '#about', key: 'nav.about' },
        { href: '/projects', key: 'nav.projects' },
        { href: '#contact', key: 'nav.contact' },
    ];

    return (
        <nav class={navStyles()}>
            <div class="mx-auto px-10">
                <div class={`flex items-center justify-between w-full ${THEME.spacing.navHeight}`}>
                    {/* Logo - En sola */}
                    <div class="flex-shrink-0 -ml-2">
                        <A href="/" class={`logo-ata cursor-pointer ${logoStyles()}`}>
                            ATA
                        </A>
                    </div>

                    {/* Navigation Links & Language Switcher - En sağa */}
                    <div class="flex items-center gap-6 ml-auto -mr-2">
                        <div class="hidden md:flex items-center gap-6">
                            {navigationLinks.map(link => (
                                <a href={link.href} class={linkStyles()}>
                                    {t(link.key)}
                                </a>
                            ))}
                        </div>

                        {/* Language Switcher */}
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
