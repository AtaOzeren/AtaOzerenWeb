import { Component, onMount, createSignal } from 'solid-js';
import { gsap } from 'gsap';
import { THEME } from '../constants';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground';

const Projects: Component = () => {
    const [hoveredProject, setHoveredProject] = createSignal<string | null>(null);
    const [isFlipped, setIsFlipped] = createSignal(false);
    const [showIcon, setShowIcon] = createSignal(false);

    // Proje listesi
    const projects = [
        { name: 'Erdemli Mimarlik', image: '/project-images/ErdemliMimarlik.jpg' },
        { name: 'Ege Mimarlik', image: '/project-images/EgeMimarlik.jpg' },
        { name: 'EjeStudio', image: '/project-images/EjeStudio.jpg' },
        { name: 'Delta Fidancilik', image: '/project-images/DeltaFidancilik.jpg' },
        { name: 'Saner Konutlari', image: '/project-images/SanerKonutlari.jpg' },
        { name: 'Savuncell', image: '/project-images/Savuncell.jpg' },
        { name: 'Turanlar Holding', image: '/project-images/TuranlarHolding.jpg' },
        { name: 'Ykt Global', image: '/project-images/YktGlobal.jpg' }
    ];

    onMount(() => {
        // Initial animation for project list
        const projectItems = document.querySelectorAll('.project-item');

        gsap.fromTo(projectItems, {
            opacity: 0,
            x: -100
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.5
        });
    });

    const handleMouseEnter = (projectName: string, event: MouseEvent) => {
        setHoveredProject(projectName);
        const target = event.currentTarget as HTMLElement;

        // Project name animation
        gsap.to(target, {
            duration: 0.3,
            x: 20,
            scale: 1.05,
            ease: "power2.out"
        });

        // Image animation - çok daha güzel ve yavaş
        const imageElement = document.querySelector('.project-image');
        if (imageElement) {
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
                duration: 1.2,
                ease: "power3.out",
                transformOrigin: "center center"
            });
        }
    };

    const handleMouseLeave = (event: MouseEvent) => {
        const target = event.currentTarget as HTMLElement;

        // Reset project name animation only
        gsap.to(target, {
            duration: 0.3,
            x: 0,
            scale: 1,
            ease: "power2.out"
        });

        // Image kalsın - sadece proje değiştiğinde değişsin
        // setHoveredProject(null); - Bu satırı kaldırdık
    };

    const handleImageHover = () => {
        setShowIcon(true);
        const iconElement = document.querySelector('.flip-icon');
        if (iconElement) {
            gsap.fromTo(iconElement, {
                opacity: 0,
                scale: 0.5,
                rotation: -180
            }, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "back.out(1.7)"
            });
        }
    };

    const handleImageLeave = () => {
        if (!isFlipped()) {
            setShowIcon(false);
            const iconElement = document.querySelector('.flip-icon');
            if (iconElement) {
                gsap.to(iconElement, {
                    opacity: 0,
                    scale: 0.5,
                    rotation: 180,
                    duration: 0.3,
                    ease: "power2.in"
                });
            }
        }
    };

    const handleFlip = () => {
        const isCurrentlyFlipped = isFlipped();
        setIsFlipped(!isCurrentlyFlipped);

        const cardElement = document.querySelector('.project-card');
        if (cardElement) {
            gsap.to(cardElement, {
                rotationY: isCurrentlyFlipped ? 0 : 180,
                duration: 0.8,
                ease: "power2.inOut",
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
                                    onMouseEnter={(e) => handleMouseEnter(project.name, e)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <h2 class={`text-3xl md:text-4xl font-extralight text-white hover:text-gray-300 transition-colors duration-300 uppercase tracking-widest`}>
                                        {project.name}
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
                                                src={projects.find(p => p.name === hoveredProject())?.image}
                                                alt={hoveredProject() || ''}
                                                class="w-full h-full object-cover"
                                                style="object-fit: cover;"
                                            />

                                            {/* Flip Icon */}
                                            {showIcon() && (
                                                <div class="flip-icon absolute top-4 right-4 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg hover:bg-white/40 hover:scale-110 transition-all duration-300">
                                                    <svg
                                                        class="w-6 h-6 text-white drop-shadow-md"
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
                                            class="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center"
                                            style="transform: rotateY(180deg);"
                                        >
                                            <div class="text-center text-white p-8">
                                                <h3 class="text-4xl font-light mb-4">{hoveredProject()}</h3>
                                                <p class="text-xl text-gray-300">Test</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Projects;
