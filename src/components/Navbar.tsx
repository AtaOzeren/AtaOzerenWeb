import { Component, onMount, createSignal } from 'solid-js';
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

const HAMBURGER_ANIMATION = {
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1,
    menuDuration: 0.8,
    menuEase: "power4.out",
    linkStagger: 0.15
};

// Navigation links configuration
const NAVIGATION_LINKS = [
    { href: '/about', key: 'nav.about' },
    { href: '/projects', key: 'nav.projects' },
    { href: '#contact', key: 'nav.contact' },
];

const Navbar: Component = () => {
    const { t } = useI18n();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);

    /**
     * Toggle mobile menu with GSAP animations
     */
    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen();
        setIsMobileMenuOpen(newState);

        const hamburgerLines = document.querySelectorAll('.hamburger-line');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        const backdrop = document.querySelector('.mobile-backdrop');
        const closeBtn = document.querySelector('.mobile-close-btn');
        const menuHeader = document.querySelector('.mobile-menu h2');
        const menuSubtitle = document.querySelector('.mobile-menu p');

        if (newState) {
            // Open menu animation

            // Hamburger to X animation
            gsap.to(hamburgerLines[0], {
                duration: HAMBURGER_ANIMATION.duration,
                rotation: 45,
                y: 8,
                ease: HAMBURGER_ANIMATION.ease
            });
            gsap.to(hamburgerLines[1], {
                duration: HAMBURGER_ANIMATION.duration,
                opacity: 0,
                x: 20,
                ease: HAMBURGER_ANIMATION.ease
            });
            gsap.to(hamburgerLines[2], {
                duration: HAMBURGER_ANIMATION.duration,
                rotation: -45,
                y: -8,
                ease: HAMBURGER_ANIMATION.ease
            });

            // Show backdrop
            if (backdrop) {
                gsap.set(backdrop, { display: 'block' });
                gsap.fromTo(backdrop, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: HAMBURGER_ANIMATION.menuDuration,
                    ease: HAMBURGER_ANIMATION.menuEase
                });
            }

            // Show menu
            if (mobileMenu) {
                gsap.set(mobileMenu, { display: 'flex' });
                gsap.fromTo(mobileMenu, {
                    x: '100%',
                    opacity: 0
                }, {
                    x: '0%',
                    opacity: 1,
                    duration: HAMBURGER_ANIMATION.menuDuration,
                    ease: HAMBURGER_ANIMATION.menuEase
                });
            }

            // Animate close button
            if (closeBtn) {
                gsap.fromTo(closeBtn, {
                    opacity: 0,
                    rotation: -180,
                    scale: 0.5
                }, {
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    duration: HAMBURGER_ANIMATION.menuDuration,
                    ease: HAMBURGER_ANIMATION.menuEase,
                    delay: 0.3
                });
            }

            // Animate header text
            if (menuHeader) {
                gsap.fromTo(menuHeader, {
                    opacity: 0,
                    y: -30,
                    scale: 0.8
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: HAMBURGER_ANIMATION.menuDuration,
                    ease: HAMBURGER_ANIMATION.menuEase,
                    delay: 0.4
                });
            }

            if (menuSubtitle) {
                gsap.fromTo(menuSubtitle, {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: HAMBURGER_ANIMATION.menuDuration,
                    ease: HAMBURGER_ANIMATION.menuEase,
                    delay: 0.5
                });
            }

            // Animate links
            gsap.fromTo(mobileLinks, {
                opacity: 0,
                x: 50,
                rotationY: 90
            }, {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: HAMBURGER_ANIMATION.menuDuration,
                ease: HAMBURGER_ANIMATION.menuEase,
                stagger: HAMBURGER_ANIMATION.linkStagger,
                delay: 0.2
            });

        } else {
            // Close menu animation

            // X to hamburger animation
            gsap.to(hamburgerLines[0], {
                duration: HAMBURGER_ANIMATION.duration,
                rotation: 0,
                y: 0,
                ease: HAMBURGER_ANIMATION.ease
            });
            gsap.to(hamburgerLines[1], {
                duration: HAMBURGER_ANIMATION.duration,
                opacity: 1,
                x: 0,
                ease: HAMBURGER_ANIMATION.ease
            });
            gsap.to(hamburgerLines[2], {
                duration: HAMBURGER_ANIMATION.duration,
                rotation: 0,
                y: 0,
                ease: HAMBURGER_ANIMATION.ease
            });

            // Hide links first
            gsap.to(mobileLinks, {
                opacity: 0,
                x: -30,
                rotationY: -45,
                duration: 0.3,
                ease: "power2.in",
                stagger: 0.05
            });

            // Hide menu
            if (mobileMenu) {
                gsap.to(mobileMenu, {
                    x: '100%',
                    opacity: 0,
                    duration: HAMBURGER_ANIMATION.menuDuration,
                    ease: "power3.in",
                    delay: 0.2,
                    onComplete: () => {
                        gsap.set(mobileMenu, { display: 'none' });
                    }
                });
            }

            // Hide backdrop
            if (backdrop) {
                gsap.to(backdrop, {
                    opacity: 0,
                    duration: HAMBURGER_ANIMATION.menuDuration,
                    ease: "power2.in",
                    delay: 0.1,
                    onComplete: () => {
                        gsap.set(backdrop, { display: 'none' });
                    }
                });
            }
        }
    };

    /**
     * Close mobile menu when clicking on a link
     */
    const closeMobileMenu = () => {
        if (isMobileMenuOpen()) {
            toggleMobileMenu();
        }
    };
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
        <>
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
                                    <A href={link.href} class={linkStyles()}>
                                        {t(link.key)}
                                    </A>
                                ))}
                            </div>

                            {/* Language Switcher Component */}
                            <div class={`${ANIMATIONS.transition} opacity-90`}>
                                <LanguageSwitcher isScrolled={false} />
                            </div>

                            {/* Mobile Hamburger Button */}
                            <button
                                class="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer z-50"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                            >
                                <div class="hamburger-line w-6 h-0.5 bg-white transition-all duration-300 ease-out origin-center"></div>
                                <div class="hamburger-line w-6 h-0.5 bg-white transition-all duration-300 ease-out origin-center"></div>
                                <div class="hamburger-line w-6 h-0.5 bg-white transition-all duration-300 ease-out origin-center"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Backdrop */}
            <div
                class="mobile-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden"
                onClick={closeMobileMenu}
            ></div>

            {/* Mobile Menu */}
            <div class="mobile-menu fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-l border-white/10 z-50 hidden flex-col justify-between items-center py-8">

                {/* Close Button */}
                <div class="w-full flex justify-end px-6">
                    <button
                        class="mobile-close-btn w-10 h-10 flex items-center justify-center cursor-pointer group"
                        onClick={closeMobileMenu}
                        aria-label="Close mobile menu"
                    >
                        <svg
                            class="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Header with ATA OZEREN */}
                <div class="flex flex-col items-center gap-4 mt-4">
                    <h2 class="text-3xl font-bold text-white tracking-widest">ATA OZEREN</h2>
                    <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    <p class="text-sm text-white/60 uppercase tracking-wider">Full Stack Developer</p>
                </div>

                {/* Mobile Navigation Links */}
                <div class="flex flex-col items-center gap-8">
                    {NAVIGATION_LINKS.map(link => (
                        <A
                            href={link.href}
                            class="mobile-nav-link text-2xl font-extralight text-white/90 hover:text-white uppercase tracking-widest transition-colors duration-300 relative group"
                            onClick={closeMobileMenu}
                        >
                            {t(link.key)}
                            {/* Animated underline */}
                            <div class="absolute -bottom-2 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></div>
                        </A>
                    ))}
                </div>

                {/* Mobile Language Switcher */}
                <div class="mb-4">
                    <LanguageSwitcher isScrolled={false} />
                </div>
            </div>
        </>
    );
};

export default Navbar;
