import { Component, createSignal, For, Show } from 'solid-js';
import { gsap } from 'gsap';
import { PROJECT_DETAILS, PROJECT_CATEGORIES, getProjectsByCategory, type ProjectCategory, type ProjectDetail } from '../constants/projects';
import { useI18n } from '../contexts/I18nContext';

// Icons for categories
const CategoryIcon = (props: { icon: string; class?: string }) => {
    const icons: Record<string, () => any> = {
        layout: () => (
            <svg class={props.class || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        ),
        server: () => (
            <svg class={props.class || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        ),
        smartphone: () => (
            <svg class={props.class || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        users: () => (
            <svg class={props.class || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        cpu: () => (
            <svg class={props.class || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
        activity: () => (
            <svg class={props.class || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    };

    const IconComponent = icons[props.icon];
    return IconComponent ? <IconComponent /> : null;
};

// Persistent state module-level variable
const visitedCategories = new Set<string>();

const ProjectCategories: Component = () => {
    const { t } = useI18n();
    const [activeCategory, setActiveCategory] = createSignal<ProjectCategory>('frontend');
    const [selectedProject, setSelectedProject] = createSignal<ProjectDetail | null>(null);
    const [isTransitioning, setIsTransitioning] = createSignal(false);

    // Initial load: mark default category as visited
    visitedCategories.add('frontend');

    const handleCategoryChange = (category: ProjectCategory) => {
        if (category === activeCategory() || isTransitioning()) return;

        // If category was already visited, switch instantly without animation
        if (visitedCategories.has(category)) {
            setActiveCategory(category);
            return;
        }

        setIsTransitioning(true);
        visitedCategories.add(category);

        // Fade out current projects
        gsap.to('.project-card', {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in',
            onComplete: () => {
                setActiveCategory(category);
                setSelectedProject(null);

                // Fade in new projects
                setTimeout(() => {
                    gsap.fromTo('.project-card',
                        { opacity: 0, y: 30, scale: 0.9 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.5,
                            stagger: 0.08,
                            ease: 'power2.out',
                            onComplete: () => { setIsTransitioning(false); }
                        }
                    );
                }, 50);
            }
        });
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
        <div class="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Category Tabs */}
            <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
                <For each={PROJECT_CATEGORIES}>
                    {(category) => (
                        <button
                            onClick={() => handleCategoryChange(category.id as ProjectCategory)}
                            class={`
                                relative flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl
                                font-medium text-sm md:text-base uppercase tracking-wider
                                transition-all duration-300 ease-out
                                ${activeCategory() === category.id
                                    ? 'bg-white text-gray-900 shadow-lg shadow-white/20'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                                }
                            `}
                        >
                            <CategoryIcon icon={category.icon} class="w-4 h-4 md:w-5 md:h-5" />
                            <span>{t(`projects.categories.${category.id}`)}</span>
                        </button>
                    )}
                </For>
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
