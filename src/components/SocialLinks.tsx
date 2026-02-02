import { Component, onMount } from 'solid-js';
import { gsap } from 'gsap';
import { SOCIAL_LINKS, type SocialLink } from '../constants/socials';

interface SocialLinksProps {
    links?: SocialLink[];
}

const SocialLinks: Component<SocialLinksProps> = (props) => {
    // Default links from constants
    const defaultLinks = SOCIAL_LINKS;

    const links = () => props.links || defaultLinks;

    onMount(() => {
        const socialLinks = document.querySelectorAll('.social-link');
        const cleanups: (() => void)[] = [];

        socialLinks.forEach((link, index) => {
            const linkElement = link as HTMLElement;
            const icon = linkElement.querySelector('.social-icon') as HTMLElement;
            const background = linkElement.querySelector('.social-bg') as HTMLElement;

            // Initial animation - staggered entrance
            gsap.fromTo(linkElement, {
                x: -100,
                opacity: 0,
                scale: 0.5
            }, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "back.out(1.7)"
            });

            // Event listeners
            const onMouseEnter = () => {
                // Icon animation - only the icon moves and scales
                gsap.to(icon, {
                    duration: 0.4,
                    scale: 1.4,
                    rotation: 360,
                    y: -2,
                    ease: "back.out(1.7)"
                });

                // Icon glow effect
                icon.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))';

                // Subtle icon bounce
                gsap.to(icon, {
                    duration: 0.6,
                    y: -4,
                    yoyo: true,
                    repeat: -1,
                    ease: "power2.inOut",
                    delay: 0.4
                });
            };

            const onMouseLeave = () => {
                // Reset icon - kill all icon animations
                gsap.killTweensOf(icon);
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    y: 0,
                    ease: "power2.out"
                });

                // Remove glow effect
                icon.style.filter = 'none';
            };

            const onClick = () => {
                gsap.to(icon, {
                    duration: 0.1,
                    scale: 0.8,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            };

            linkElement.addEventListener('mouseenter', onMouseEnter);
            linkElement.addEventListener('mouseleave', onMouseLeave);
            linkElement.addEventListener('click', onClick);

            // Access cleanup function and add listeners removal
            // Note: In SolidJS, onCleanup inside the map/loop or strict cleanup is better, 
            // but since these are static refs, we can cleanup in the onMount return or using a registered cleanup.
            // Using a simple array to store cleanups would be safer if re-renders happened, but onMount runs once.
            // We will push cleanup functions to an array.
            cleanups.push(() => {
                linkElement.removeEventListener('mouseenter', onMouseEnter);
                linkElement.removeEventListener('mouseleave', onMouseLeave);
                linkElement.removeEventListener('click', onClick);
            });
        });

        // Register final cleanup with SolidJS
        return () => {
            cleanups.forEach(cleanup => cleanup());
        };
    });

    return (
        <div class="fixed left-4 bottom-4 z-50 lg:block">
            {/* Desktop: Sol alt köşede dikey */}
            <div class="hidden lg:flex flex-col gap-3">
                {links().map((link) => (
                    <a
                        href={link.url}
                        target={link.name === 'mail' ? '_self' : '_blank'}
                        rel={link.name === 'mail' ? '' : 'noopener noreferrer'}
                        class="social-link relative flex items-center justify-center w-10 h-10 cursor-pointer overflow-hidden"
                        title={link.label}
                        aria-label={link.label}
                    >
                        {/* Background element for GSAP */}
                        <div class="social-bg absolute inset-0 backdrop-blur-sm border rounded-full" />

                        {/* Icon element for GSAP */}
                        <svg
                            class="social-icon relative w-5 h-5 text-white z-10"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d={link.icon} />
                        </svg>
                    </a>
                ))}
            </div>

            {/* Mobile/Tablet: Alt ortada yatay */}
            <div class="global-social-links fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
                <div class="flex flex-row gap-4 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    {links().map((link) => (
                        <a
                            href={link.url}
                            target={link.name === 'mail' ? '_self' : '_blank'}
                            rel={link.name === 'mail' ? '' : 'noopener noreferrer'}
                            class="social-link relative flex items-center justify-center w-10 h-10 cursor-pointer overflow-hidden"
                            title={link.label}
                            aria-label={link.label}
                        >
                            {/* Background element for GSAP */}
                            <div class="social-bg absolute inset-0 backdrop-blur-sm border rounded-full" />

                            {/* Icon element for GSAP */}
                            <svg
                                class="social-icon relative w-5 h-5 text-white z-10"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d={link.icon} />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialLinks;
