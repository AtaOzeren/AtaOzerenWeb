import { Component } from 'solid-js';
import { useI18n } from '../contexts/I18nContext';
import AnimatedBackground from './AnimatedBackground';

interface AppShowcaseProps {
    id?: string;
    className?: string;
    showBackground?: boolean;
    backgroundVariant?: 'light' | 'dark';
    backgroundIntensity?: 'low' | 'medium' | 'high';
}

const AppShowcase: Component<AppShowcaseProps> = (props) => {
    const { t } = useI18n();

    return (
        <div
            id={props.id || "app-showcase"}
            class={`min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden ${props.className || ''}`}
        >
            {/* Background */}
            {(props.showBackground !== false) && (
                <AnimatedBackground
                    variant={props.backgroundVariant || "dark"}
                    intensity={props.backgroundIntensity || "medium"}
                />
            )}

            <div class="relative z-10 container mx-auto px-10 py-20">
                {/* Header */}
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
                    <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 class="text-2xl font-light text-white">Mobil Uygulama 1</h3>
                        </div>
                        <p class="text-white/70 mb-4">App detayları buraya gelecek. Modern teknolojiler kullanılarak geliştirilmiş innovative bir mobil uygulama.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300">React Native</span>
                            <span class="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-300">Node.js</span>
                            <span class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300">MongoDB</span>
                        </div>
                    </div>

                    <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 class="text-2xl font-light text-white">Web Uygulaması</h3>
                        </div>
                        <p class="text-white/70 mb-4">Gelişmiş web teknolojileri ile oluşturulmuş modern ve performanslı web uygulaması.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-300">SolidJS</span>
                            <span class="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-300">TypeScript</span>
                            <span class="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-xs text-pink-300">Tailwind CSS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppShowcase;
