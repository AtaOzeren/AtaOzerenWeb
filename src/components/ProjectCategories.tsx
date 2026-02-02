import { Component, createSignal, For, Show, onCleanup } from 'solid-js';
import { gsap } from 'gsap';
import { PROJECT_DETAILS, PROJECT_CATEGORIES, getProjectsByCategory, type ProjectCategory, type ProjectDetail } from '../constants/projects';
import CategoryIcon from '~/components/CategoryIcon';
import { MobileCategoryDropdown } from './MobileCategoryDropdown';
import { useI18n } from '../contexts/I18nContext';

// Persistent state module-level variable
const visitedCategories = new Set<string>();

const ProjectCategories: Component = () => {
    const { t } = useI18n();
    const [activeCategory, setActiveCategory] = createSignal<ProjectCategory>('frontend');
    const [selectedProject, setSelectedProject] = createSignal<ProjectDetail | null>(null);
    const [isTransitioning, setIsTransitioning] = createSignal(false);
    const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);

    let containerRef: HTMLDivElement | undefined;
    let ctx: gsap.Context | undefined;

    // Cleanup GSAP context on unmount

    onCleanup(() => {
        if (ctx) ctx.revert();
    });



    const handleCategoryChange = (category: ProjectCategory) => {
        if (category === activeCategory() || isTransitioning()) return;

        // If category was already visited, switch instantly without animation
        if (visitedCategories.has(category)) {
            setActiveCategory(category);
            return;
        }

        setIsTransitioning(true);
        visitedCategories.add(category);

        // Fade out current projects (Blur out)
        // Use gsap.context to ensure all tweens are collected and can be cleaned up
        ctx = gsap.context(() => {
            gsap.to('.project-card', {
                opacity: 0,
                scale: 0.95,
                filter: 'blur(10px)',
                duration: 0.25,
                stagger: 0.03,
                ease: 'power2.in',
                onComplete: () => {
                    setActiveCategory(category);
                    setSelectedProject(null);

                    // Fade in new projects (Blur Reveal: Slide up + Unblur)
                    setTimeout(() => {
                        // Re-run context here if needed or just use scoped selector
                        // Note: nested setTimeout breaks out of context recording unless strictly managed
                        // relying on simple global selector scoped by parent class in CSS is common,
                        // but here we just ensure we target this component's cards.
                        gsap.fromTo('.project-card',
                            {
                                opacity: 0,
                                y: 20,
                                scale: 0.98,
                                filter: 'blur(10px)'
                            },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: 'blur(0px)',
                                duration: 0.4,
                                stagger: 0.06,
                                ease: 'power2.out',
                                onComplete: () => { setIsTransitioning(false); }
                            }
                        );
                    }, 20);
                }
            });
        }, containerRef);
    };

    const handleProjectClick = (project: ProjectDetail) => {
        setSelectedProject(project);

        // Animate modal entrance
        setTimeout(() => {
            gsap.fromTo('.project-modal',
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            );
        }, 10);
    };

    const closeModal = () => {
        gsap.to('.project-modal', {
            opacity: 0,
            scale: 0.9,
            y: 20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => setSelectedProject(null)
        });
    };

    const currentProjects = () => getProjectsByCategory(activeCategory());

    return (
        <div ref={containerRef} class="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Category Navigation */}
            <div class="mb-12 relative z-20">
                {/* Desktop/Laptop Tabs (Hidden on Mobile/Tablet) */}
                <div class="hidden lg:flex flex-wrap justify-center gap-4">
                    <For each={PROJECT_CATEGORIES}>
                        {(category) => (
                            <button
                                onClick={() => handleCategoryChange(category.id as ProjectCategory)}
                                class={`
                                    relative flex items-center gap-2 px-6 py-3 rounded-xl
                                    font-medium text-base uppercase tracking-wider
                                    transition-all duration-300 ease-out
                                    ${activeCategory() === category.id
                                        ? 'bg-white text-gray-900 shadow-lg shadow-white/20'
                                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                                    }
                                `}
                            >
                                <CategoryIcon icon={category.icon} class="w-5 h-5" />
                                <span>{t(`projects.categories.${category.id}`)}</span>
                            </button>
                        )}
                    </For>
                </div>

                {/* Mobile/Tablet Dropdown (Visible only on smaller screens) */}
                <MobileCategoryDropdown
                    activeCategory={activeCategory()}
                    isDropdownOpen={isDropdownOpen()}
                    setIsDropdownOpen={setIsDropdownOpen}
                    handleCategoryChange={handleCategoryChange}
                    t={t}
                />
            </div>

            {/* Projects Grid */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={currentProjects()}>
                    {(project) => (
                        <div
                            class="project-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            onClick={() => handleProjectClick(project)}
                        >
                            {/* Project Image */}
                            <div class="relative h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Project Info */}
                            <div class="p-5">
                                <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-gray-100">
                                    {project.name}
                                </h3>
                                <p class="text-sm text-white/60 mb-4 line-clamp-2">
                                    {/* @ts-ignore */}
                                    {t(project.description)}
                                </p>

                                {/* Technologies */}
                                <div class="flex flex-wrap gap-2">
                                    <For each={project.technologies.slice(0, 3)}>
                                        {(tech) => (
                                            <span class="px-2 py-1 text-xs bg-white/10 text-white/80 rounded-md">
                                                {tech}
                                            </span>
                                        )}
                                    </For>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span class="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm">
                                    {t('projects.viewProject')}
                                </span>
                            </div>
                        </div>
                    )}
                </For>

                {/* Empty State */}
                <Show when={currentProjects().length === 0}>
                    <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <div class="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center">
                            <CategoryIcon
                                icon={PROJECT_CATEGORIES.find(c => c.id === activeCategory())?.icon || 'layout'}
                                class="w-10 h-10 text-white/40"
                            />
                        </div>
                        <h3 class="text-xl font-semibold text-white/80 mb-2">
                            {t('projects.noProjects')}
                        </h3>
                        <p class="text-white/50 max-w-md">
                            {t('projects.noProjectsDesc')}
                        </p>
                    </div>
                </Show>
            </div>

            {/* Project Detail Modal */}
            <Show when={selectedProject()}>
                <div
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && closeModal()}
                >
                    <div class="project-modal relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Modal Image */}
                        <div class="relative h-64 overflow-hidden">
                            <img
                                src={selectedProject()!.image}
                                alt={selectedProject()!.name}
                                class="w-full h-full object-cover"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                        </div>

                        {/* Modal Content */}
                        <div class="p-8">
                            <h2 class="text-3xl font-bold text-white mb-2">
                                {selectedProject()!.name}
                            </h2>
                            <p class="text-sm text-white/50 uppercase tracking-wider mb-4">
                                {selectedProject()!.company} • {(Array.isArray(selectedProject()!.category)
                                    ? (selectedProject()!.category as ProjectCategory[]).map(c => t(`projects.categories.${c}`)).join(' & ')
                                    : t(`projects.categories.${selectedProject()!.category}`)
                                )}
                            </p>
                            <p class="text-white/70 mb-6">
                                {/* @ts-ignore */}
                                {t(selectedProject()!.description!)}
                            </p>

                            {/* Technologies */}
                            <div class="flex flex-wrap gap-2 mb-8">
                                <For each={selectedProject()!.technologies}>
                                    {(tech) => (
                                        <span class="px-3 py-1.5 bg-white/10 border border-white/20 text-white/90 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    )}
                                </For>
                            </div>

                            {/* Actions */}
                            <div class="flex gap-4">
                                {selectedProject()!.publishStatus === 'pending' ? (
                                    <div class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-xl font-medium">
                                        <span>{t('projects.descriptions.pendingPublication')}</span>
                                    </div>
                                ) : (
                                    selectedProject()!.url && selectedProject()!.url !== '#' && (
                                        <a
                                            href={selectedProject()!.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                                        >
                                            <span>{t('projects.visitSite')}</span>
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    );
};

export default ProjectCategories;
