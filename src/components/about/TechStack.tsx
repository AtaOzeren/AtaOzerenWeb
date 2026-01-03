import { Component, onMount } from 'solid-js';
import { gsap } from 'gsap';
import { Github, Database } from 'lucide-solid';
import { siHtml5, siCss, siJavascript, siTypescript, siVuedotjs, siNextdotjs, siNuxt, siReact, siCloudflare, siSqlite, siMongodb, siTailwindcss, siGit, siSass, siExpo, siMysql, siPython } from "simple-icons";
import SimpleIcon from '../SimpleIcon';

const TechStack: Component = () => {
    let technologiesRef: HTMLDivElement | undefined;

    onMount(() => {
        // Technologies animation
        if (technologiesRef) {
            const techIcons = technologiesRef.querySelectorAll('.cursor-pointer');
            gsap.fromTo(Array.from(techIcons),
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out",
                    delay: 1.5
                }
            );
        }
    });

    return (
        <div ref={el => technologiesRef = el} class="mt-16 space-y-8">

            {/* Programming Languages */}
            <div class="group">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-1 h-6 bg-white/90 rounded-full"></div>
                    <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Programming Languages</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siJavascript} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">JavaScript</span>
                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siTypescript} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">TypeScript</span>
                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siPython} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">Python</span>
                    </div>
                </div>
            </div>

            {/* Frontend & Styling */}
            <div class="group">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-1 h-6 bg-white/90 rounded-full"></div>
                    <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Frontend & Styling</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siHtml5} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">HTML</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siCss} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">CSS</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siSass} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">SCSS</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siTailwindcss} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">Tailwind</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siJavascript} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">JavaScript</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siTypescript} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">TypeScript</span>

                    </div>
                </div>
            </div>

            {/* Frameworks */}
            <div class="group">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-1 h-6 bg-white/90 rounded-full"></div>
                    <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Frameworks</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siReact} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">React</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siVuedotjs} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">Vue.js</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siNextdotjs} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">Next.js</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siNuxt} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">Nuxt.js</span>

                    </div>
                </div>
            </div>

            {/* Mobile Development */}
            <div class="group">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-1 h-6 bg-white/90 rounded-full"></div>
                    <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Mobile Development</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siReact} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">React Native</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siExpo} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">Expo</span>

                    </div>
                </div>
            </div>

            {/* Database & Cloud */}
            <div class="group">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-1 h-6 bg-white/90 rounded-full"></div>
                    <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Database & Cloud</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siSqlite} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">SQLite</span>
                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siMongodb} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">MongoDB</span>
                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siMysql} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">MySQL</span>
                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <Database size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">D1</span>
                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siCloudflare} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">Cloudflare</span>
                    </div>
                </div>
            </div>

            {/* Tools & Version Control */}
            <div class="group">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-1 h-6 bg-white/90 rounded-full"></div>
                    <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Tools & Version Control</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <SimpleIcon icon={siGit} size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">Git</span>

                    </div>
                    <div class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <Github size={18} class="text-white/80" />
                        <span class="text-white/80 text-sm font-medium">GitHub</span>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default TechStack;
