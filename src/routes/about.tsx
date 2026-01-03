import { Title } from "@solidjs/meta";
import { useI18n } from "~/contexts/I18nContext";
import AnimatedBackground from "~/components/AnimatedBackground";
import { onMount } from "solid-js";
import gsap from "gsap";
import { Github, Code, Database, Cloud, Palette } from "lucide-solid";
import { siHtml5, siCss, siJavascript, siTypescript, siVuedotjs, siNextdotjs, siNuxt, siReact, siCloudflare, siSqlite, siMongodb, siTailwindcss, siGit, siSass, siExpo, siMysql, siPython } from "simple-icons";

// Simple Icon Component
const SimpleIcon = (props: { icon: any; size?: number; class?: string }) => {
  const { icon, size = 24, class: className = "" } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      class={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
};

export default function About() {
  const { t, locale } = useI18n();

  let paragraph1Ref: HTMLParagraphElement | undefined;
  let paragraph2Ref: HTMLParagraphElement | undefined;
  let paragraph3Ref: HTMLParagraphElement | undefined;
  let technologiesRef: HTMLDivElement | undefined;
  let profileImageRef: HTMLImageElement | undefined;

  // Icon refs
  let html5Ref: HTMLDivElement | undefined;
  let cssRef: HTMLDivElement | undefined;
  let sassRef: HTMLDivElement | undefined;
  let jsRef: HTMLDivElement | undefined;
  let tsRef: HTMLDivElement | undefined;
  let gitRef: HTMLDivElement | undefined;
  let githubRef: HTMLDivElement | undefined;
  let vueRef: HTMLDivElement | undefined;
  let nextRef: HTMLDivElement | undefined;
  let nuxtRef: HTMLDivElement | undefined;
  let reactRef: HTMLDivElement | undefined;
  let reactNativeRef: HTMLDivElement | undefined;
  let sqliteRef: HTMLDivElement | undefined;
  let mongodbRef: HTMLDivElement | undefined;
  let cloudflareRef: HTMLDivElement | undefined;
  let tailwindRef: HTMLDivElement | undefined;
  let expoRef: HTMLDivElement | undefined;
  let mysqlRef: HTMLDivElement | undefined;
  let d1Ref: HTMLDivElement | undefined;
  let pythonRef: HTMLDivElement | undefined;

  onMount(() => {
    // Profile image animation
    if (profileImageRef) {
      gsap.fromTo(profileImageRef,
        {
          opacity: 0,
          scale: 0.5,
          y: -50,
          rotationY: 180
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 1.5,
          ease: "back.out(1.7)"
        }
      );

      // Hover effects for profile image
      profileImageRef.addEventListener('mouseenter', () => {
        if (profileImageRef) {
          gsap.to(profileImageRef, {
            scale: 1.1,
            rotationY: 10,
            rotationX: 5,
            boxShadow: "0 25px 50px rgba(255,255,255,0.3)",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });

      profileImageRef.addEventListener('mouseleave', () => {
        if (profileImageRef) {
          gsap.to(profileImageRef, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            boxShadow: "0 0 0 rgba(255,255,255,0)",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }

    // Paragraphs animation with delay
    const paragraphs = [paragraph1Ref, paragraph2Ref, paragraph3Ref].filter(Boolean) as HTMLParagraphElement[];
    gsap.fromTo(paragraphs,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        delay: 0.8
      }
    );

    // Technologies animasyonu
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
    <main class="min-h-screen relative overflow-hidden pt-20">
      <Title>{t('about.title')} - {t('hero.name')}</Title>

      {/* Animated Background Layer */}
      <AnimatedBackground variant="dark" intensity="high" />

      {/* Content overlay */}
      <div class="relative z-10 container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">

          {/* Hero Section - Profile on left, GitHub Chart on right */}
          <div class="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            {/* Left - Profile Image */}
            <div class="flex flex-col items-center">
              <img
                ref={el => profileImageRef = el}
                src="/project-images/me/me.jpg"
                alt="Ata Özeren"
                class="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full border-4 border-white/20 shadow-2xl select-none cursor-pointer transition-all duration-300 mb-4"
                style="transform-style: preserve-3d;"
              />

              {/* Social Media Links */}
              <div class="flex gap-3">
                <a href="https://github.com/AtaOzeren" target="_blank" rel="noopener noreferrer" class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/ata-%C3%B6zeren-946a4b29a/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://www.instagram.com/ata_ozrn/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="https://x.com/Ata_Ozrn" target="_blank" rel="noopener noreferrer" class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>

            {/* Right - GitHub Contributions Chart */}
            <div class="flex-1 max-w-2xl">
              <div class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                {/* GitHub Icon */}
                <a href="https://github.com/AtaOzeren" target="_blank" rel="noopener noreferrer" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <img
                  src="https://ghchart.rshah.org/AtaOzeren"
                  alt="GitHub Contributions"
                  class="w-full rounded-lg"
                  style="filter: brightness(1.1);"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div >
            <div class="prose prose-xl max-w-none">
              <p ref={el => paragraph1Ref = el} class="text-white leading-relaxed mb-6">
                {t('about.content.paragraph1')}
              </p>
              <p ref={el => paragraph2Ref = el} class="text-white leading-relaxed mb-6">
                {t('about.content.paragraph2')}
              </p>
              <p ref={el => paragraph3Ref = el} class="text-white leading-relaxed">
                {t('about.content.paragraph3')}
              </p>
            </div>

            {/* Technologies Section */}
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
                  <div ref={el => pythonRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
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
                  <div ref={el => html5Ref = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siHtml5} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">HTML</span>

                  </div>
                  <div ref={el => cssRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siCss} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">CSS</span>

                  </div>
                  <div ref={el => sassRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siSass} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">SCSS</span>

                  </div>
                  <div ref={el => tailwindRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siTailwindcss} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Tailwind</span>

                  </div>
                  <div ref={el => jsRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siJavascript} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">JavaScript</span>

                  </div>
                  <div ref={el => tsRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
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
                  <div ref={el => reactRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siReact} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">React</span>

                  </div>
                  <div ref={el => vueRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siVuedotjs} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Vue.js</span>

                  </div>
                  <div ref={el => nextRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siNextdotjs} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Next.js</span>

                  </div>
                  <div ref={el => nuxtRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
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
                  <div ref={el => reactNativeRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siReact} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">React Native</span>

                  </div>
                  <div ref={el => expoRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
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
                  <div ref={el => sqliteRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siSqlite} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">SQLite</span>
                  </div>
                  <div ref={el => mongodbRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siMongodb} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">MongoDB</span>
                  </div>
                  <div ref={el => mysqlRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siMysql} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">MySQL</span>
                  </div>
                  <div ref={el => d1Ref = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Database size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">D1</span>
                  </div>
                  <div ref={el => cloudflareRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
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
                  <div ref={el => gitRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siGit} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Git</span>

                  </div>
                  <div ref={el => githubRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Github size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">GitHub</span>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
