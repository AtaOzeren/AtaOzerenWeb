import { Component, onMount, createSignal } from 'solid-js';
import { gsap } from 'gsap';
import { THEME, PROJECT_DETAILS } from '../constants';
import { useI18n } from '../contexts/I18nContext';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground';

// Animation configuration constants
const ANIMATIONS = {
    projectItems: {
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
    },
    syconxGlow: {
        duration: 0.6,
        glowShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)",
        hoverShadow: "0 0 25px rgba(255,255,255,1), 0 0 50px rgba(255,255,255,0.6)",
        interval: 1000,
        ease: "power2.inOut"
    },
    projectHover: {
        duration: 0.3,
        scale: 1.05,
        translation: 20,
        ease: "power2.out"
    },
    imageTransition: {
        duration: 1.2,
        ease: "power3.out"
    },
    flipCard: {
        duration: 0.8,
        ease: "power2.inOut"
    },
    flipIcon: {
        duration: 0.4,
        ease: "back.out(1.7)"
    }
};

// Component URLs and links
const SYCONX_URL = "https://syconx.com/";

const Projects: Component = () => {
    const { t } = useI18n();
    const [hoveredProject, setHoveredProject] = createSignal<string | null>(null);
    const [isFlipped, setIsFlipped] = createSignal(false);
    const [showIcon, setShowIcon] = createSignal(false);

    // Transform project details into component-friendly format
    const projects = PROJECT_DETAILS.map(project => ({
        name: `projects.${project.id}`,
        image: project.image,
        id: project.id,
        type: project.type
    }));

    /**
     * Initialize project list entrance animation
     */
    const initializeProjectAnimation = () => {
        const projectItems = document.querySelectorAll('.project-item');

        gsap.fromTo(projectItems, {
            opacity: 0,
            x: -100
        }, {
            opacity: 1,
            x: 0,
            duration: ANIMATIONS.projectItems.duration,
            stagger: ANIMATIONS.projectItems.stagger,
            ease: ANIMATIONS.projectItems.ease,
            delay: ANIMATIONS.projectItems.delay
        });
    };

    /**
     * Start continuous glowing animation for SyconX links
     */
    const startSyconxGlowAnimation = (): void => {
        const syconxLinks = document.querySelectorAll('.syconx-link');

        syconxLinks.forEach(link => {
            gsap.to(link, {
                textShadow: ANIMATIONS.syconxGlow.glowShadow,
                duration: ANIMATIONS.syconxGlow.duration,
                ease: ANIMATIONS.syconxGlow.ease,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    setTimeout(startSyconxGlowAnimation, ANIMATIONS.syconxGlow.interval);
                }
            });
        });
    };

    /**
     * Setup hover animations for SyconX links
     */
    const setupSyconxHoverAnimations = () => {
        const syconxLinks = document.querySelectorAll('.syconx-link');

        syconxLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.killTweensOf(link); // Stop current animations
                gsap.to(link, {
                    duration: ANIMATIONS.projectHover.duration,
                    scale: 1.1,
                    textShadow: ANIMATIONS.syconxGlow.hoverShadow,
                    ease: ANIMATIONS.projectHover.ease
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    duration: ANIMATIONS.projectHover.duration,
                    scale: 1,
                    textShadow: "0 0 10px rgba(255,255,255,0.3)",
                    ease: ANIMATIONS.projectHover.ease,
                    onComplete: () => {
                        // Resume normal glow animation after hover
                        setTimeout(startSyconxGlowAnimation, 500);
                    }
                });
            });
        });
    };

    onMount(() => {
        initializeProjectAnimation();

        // Start SyconX glow animation after initial delay
        setTimeout(startSyconxGlowAnimation, ANIMATIONS.syconxGlow.interval);

        // Setup hover animations with delay to ensure elements are loaded
        setTimeout(setupSyconxHoverAnimations, 1500);
    });

    /**
     * Handle mouse enter event for project items
     */
    const handleMouseEnter = (projectId: string, event: MouseEvent) => {
        setHoveredProject(projectId);
        const target = event.currentTarget as HTMLElement;

        // Animate project name on hover
        gsap.to(target, {
            duration: ANIMATIONS.projectHover.duration,
            x: ANIMATIONS.projectHover.translation,
            scale: ANIMATIONS.projectHover.scale,
            ease: ANIMATIONS.projectHover.ease
        });

        // Animate project image entrance
        animateProjectImage();
    };

    /**
     * Animate project image with smooth entrance effect
     */
    const animateProjectImage = () => {
        const imageElement = document.querySelector('.project-image');
        if (!imageElement) return;

        gsap.killTweensOf(imageElement);
        gsap.fromTo(imageElement, {
            opacity: 0,
            scale: 0.7,
            y: 40,
            rotationY: -20,
            rotationX: 10,
            filter: "blur(15px) brightness(0.7)",
            transformOrigin: "center center"
        }, {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            filter: "blur(0px) brightness(1)",
            duration: ANIMATIONS.imageTransition.duration,
            ease: ANIMATIONS.imageTransition.ease,
            transformOrigin: "center center"
        });
    };

    /**
     * Handle mouse leave event for project items
     */
    const handleMouseLeave = (event: MouseEvent) => {
        const target = event.currentTarget as HTMLElement;

        // Reset project name animation
        gsap.to(target, {
            duration: ANIMATIONS.projectHover.duration,
            x: 0,
            scale: 1,
            ease: ANIMATIONS.projectHover.ease
        });
    };

    /**
     * Handle mouse enter event for project image (shows flip icon)
     */
    const handleImageHover = () => {
        setShowIcon(true);
        animateFlipIcon(true);
    };

    /**
     * Handle mouse leave event for project image (hides flip icon)
     */
    const handleImageLeave = () => {
        if (!isFlipped()) {
            setShowIcon(false);
            animateFlipIcon(false);
        }
    };

    /**
     * Animate flip icon appearance/disappearance
     */
    const animateFlipIcon = (show: boolean) => {
        const iconElement = document.querySelector('.flip-icon');
        if (!iconElement) return;

        if (show) {
            gsap.fromTo(iconElement, {
                opacity: 0,
                scale: 0.5,
                rotation: -180
            }, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: ANIMATIONS.flipIcon.duration,
                ease: ANIMATIONS.flipIcon.ease
            });
        } else {
            gsap.to(iconElement, {
                opacity: 0,
                scale: 0.5,
                rotation: 180,
                duration: ANIMATIONS.projectHover.duration,
                ease: "power2.in"
            });
        }
    };

    /**
     * Handle project card flip animation
     */
    const handleFlip = () => {
        const isCurrentlyFlipped = isFlipped();
        setIsFlipped(!isCurrentlyFlipped);

        const cardElement = document.querySelector('.project-card');
        if (cardElement) {
            gsap.to(cardElement, {
                rotationY: isCurrentlyFlipped ? 0 : 180,
                duration: ANIMATIONS.flipCard.duration,
                ease: ANIMATIONS.flipCard.ease,
                transformOrigin: "center center"
            });
        }
    };
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Projects Page Content */}
            <main class="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <AnimatedBackground variant="dark" intensity="high" />

                {/* Content overlay */}
                <div class={`relative z-10 flex items-center justify-center min-h-screen ${THEME.spacing.containerPadding} pt-20`}>
                    <div class="flex w-full max-w-6xl">
                        {/* Left Side - Project List */}
                        <div class="flex-1 flex flex-col justify-center space-y-8">
                            {projects.map((project) => (
                                <div
                                    class="project-item cursor-pointer"
                                    onMouseEnter={(e) => handleMouseEnter(project.id, e)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <h2 class={`text-xl md:text-2xl font-extralight text-white hover:text-gray-300 transition-colors duration-300 uppercase tracking-widest`}>
                                        {t(project.name)} <span class="text-xs text-gray-400 lowercase">({t(`projects.projectTypes.${project.type}`)})</span>
                                    </h2>
                                </div>
                            ))}
                        </div>

                        {/* Right Side - Project Image */}
                        <div class="flex-1 flex items-center justify-center pl-16">
                            {hoveredProject() && (
                                <div
                                    class="project-image relative w-[500px] h-[500px] perspective-1000"
                                    onMouseEnter={handleImageHover}
                                    onMouseLeave={handleImageLeave}
                                >
                                    {/* Flip Card Container */}
                                    <div
                                        class="project-card relative w-full h-full preserve-3d cursor-pointer"
                                        style="transform-style: preserve-3d;"
                                        onClick={handleFlip}
                                    >
                                        {/* Front Side - Image */}
                                        <div class="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-2xl overflow-hidden">
                                            <img
                                                src={projects.find(p => p.id === hoveredProject())?.image}
                                                alt={hoveredProject() || ''}
                                                class="w-full h-full object-cover"
                                                style="object-fit: cover;"
                                            />

                                            {/* Flip Icon */}
                                            {showIcon() && (
                                                <div class="flip-icon absolute top-4 right-4 w-12 h-12 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-gray-300/60 shadow-xl hover:bg-black/90 hover:scale-110 transition-all duration-300">
                                                    <svg
                                                        class="w-6 h-6 text-white drop-shadow-lg"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2.5"
                                                    >
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Back Side - Info */}
                                        <div
                                            class="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col justify-between p-8"
                                            style="transform: rotateY(180deg);"
                                        >
                                            {(() => {
                                                const projectDetail = PROJECT_DETAILS.find(p => p.id === hoveredProject());
                                                if (!projectDetail) return null;

                                                return (
                                                    <>
                                                        {/* Header */}
                                                        <div class="text-center">
                                                            <h3 class="text-4xl font-light text-white mb-1">{projectDetail.name}</h3>
                                                            <p class="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                                                                {/* Project Type Icon */}
                                                                {projectDetail.type === 'corporate' ? (
                                                                    // Kurumsal ikon (Building)
                                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                    </svg>
                                                                ) : projectDetail.type === 'crm' ? (
                                                                    // CRM ikon (Users Group)
                                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                    </svg>
                                                                ) : (
                                                                    // E-ticaret ikon (Shopping Cart)
                                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a1 1 0 001 1h8a1 1 0 001-1v-6M7 13L5 8m9 5a1 1 0 100 2 1 1 0 000-2zm-7 0a1 1 0 100 2 1 1 0 000-2z" />
                                                                    </svg>
                                                                )}
                                                                <span>{t(`projects.projectTypes.${projectDetail.type}`)}</span>
                                                            </p>
                                                            <p class="text-sm text-gray-400 uppercase tracking-wider mb-6">
                                                                <a
                                                                    href="https://syconx.com/"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    class="syconx-link text-white hover:text-gray-200 transition-all duration-300 no-underline font-medium"
                                                                    style="text-shadow: 0 0 10px rgba(255,255,255,0.3);"
                                                                >
                                                                    {projectDetail.company}
                                                                </a> {t('projects.developedBy')}
                                                            </p>
                                                        </div>

                                                        {/* Technologies - Now at top */}
                                                        <div class="text-center flex-1 flex flex-col justify-center">
                                                            <div class="flex flex-wrap gap-2 justify-center">
                                                                {projectDetail.technologies.map(tech => (
                                                                    <span class="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-200 font-light">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Visit Button - Smaller and at bottom */}
                                                        <div class="text-center">
                                                            <a
                                                                href={projectDetail.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                class="inline-flex items-center gap-1 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                                                            >
                                                                <span>{t('projects.visitSite')}</span>
                                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Second Section - App Showcase */}
                <div id="app-showcase" class="min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
                    <AnimatedBackground variant="dark" intensity="medium" />

                    <div class="relative z-10 container mx-auto px-10 py-20">
                        <div class="text-center mb-16">
                            <h2 class="text-4xl md:text-5xl font-extralight text-white mb-4 uppercase tracking-widest">
                                {t('projects.appShowcase')}
                            </h2>
                            <p class="text-white/70 text-lg">
                                {t('projects.appShowcaseDesc')}
                            </p>
                        </div>

                        {/* App showcase content - şimdilik placeholder */}
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                                <h3 class="text-2xl font-light text-white mb-4">Mobil Uygulama 1</h3>
                                <p class="text-white/70">App detayları buraya gelecek...</p>
                            </div>
                            <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                                <h3 class="text-2xl font-light text-white mb-4">Mobil Uygulama 2</h3>
                                <p class="text-white/70">App detayları buraya gelecek...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Projects;
