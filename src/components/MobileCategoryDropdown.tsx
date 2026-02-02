import { Component, For, Show } from 'solid-js';
import { ProjectCategory, PROJECT_CATEGORIES } from '../constants/projects';
import CategoryIcon from '~/components/CategoryIcon';

interface MobileCategoryDropdownProps {
    activeCategory: ProjectCategory;
    isDropdownOpen: boolean;
    setIsDropdownOpen: (isOpen: boolean) => void;
    handleCategoryChange: (category: ProjectCategory) => void;
    t: (key: string) => string;
}

export const MobileCategoryDropdown: Component<MobileCategoryDropdownProps> = (props) => {
    return (
        <div class="lg:hidden relative">
            <button
                onClick={() => props.setIsDropdownOpen(!props.isDropdownOpen)}
                class="w-full flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium transition-all active:bg-white/20"
            >
                <div class="flex items-center gap-3">
                    <CategoryIcon
                        icon={PROJECT_CATEGORIES.find(c => c.id === props.activeCategory)?.icon || 'layout'}
                        class="w-5 h-5 text-white/90"
                    />
                    <span class="uppercase tracking-wide">{props.t(`projects.categories.${props.activeCategory}`)}</span>
                </div>
                <svg
                    class={`w-5 h-5 transition-transform duration-300 ${props.isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <div
                class={`
            absolute top-full left-0 right-0 mt-2 
            bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-30 
            transition-all duration-300 origin-top
            ${props.isDropdownOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                    }
        `}
            >
                <div class="py-2">
                    <For each={PROJECT_CATEGORIES}>
                        {(category) => (
                            <button
                                onClick={() => {
                                    props.handleCategoryChange(category.id as ProjectCategory);
                                    props.setIsDropdownOpen(false);
                                }}
                                class={`
                            w-full flex items-center gap-3 px-6 py-3 text-left transition-colors
                            ${props.activeCategory === category.id
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }
                        `}
                            >
                                <CategoryIcon icon={category.icon} class="w-5 h-5" />
                                <span class="uppercase text-sm tracking-wider">{props.t(`projects.categories.${category.id}`)}</span>
                                {props.activeCategory === category.id && (
                                    <svg class="w-4 h-4 ml-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
};
