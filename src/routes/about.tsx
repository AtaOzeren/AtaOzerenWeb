import { Title } from "@solidjs/meta";
import { useI18n } from "~/contexts/I18nContext";
import AnimatedBackground from "~/components/AnimatedBackground";
import { onMount } from "solid-js";
import gsap from "gsap";
import { Github, Code, Database, Cloud, Palette } from "lucide-solid";
import { siHtml5, siCss, siJavascript, siTypescript, siVuedotjs, siNextdotjs, siNuxt, siReact, siCloudflare, siSqlite, siMongodb, siTailwindcss, siGit, siSass, siExpo } from "simple-icons";

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

    // Hover efektleri için GSAP
    const createHoverEffect = (iconRef: HTMLDivElement | undefined, text: string) => {
      if (!iconRef) return;

      const icon = iconRef.querySelector('svg');
      const textElement = iconRef.querySelector('.tech-text');

      if (icon && textElement) {
        iconRef.addEventListener('mouseenter', () => {
          gsap.to(icon, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.out" });
          gsap.to(textElement, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        });

        iconRef.addEventListener('mouseleave', () => {
          gsap.to(icon, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(textElement, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.out" });
        });
      }
    };

    // Tüm iconlara hover efekti ekle
    createHoverEffect(html5Ref, 'HTML');
    createHoverEffect(cssRef, 'CSS');
    createHoverEffect(sassRef, 'SCSS');
    createHoverEffect(jsRef, 'JavaScript');
    createHoverEffect(tsRef, 'TypeScript');
    createHoverEffect(gitRef, 'Git');
    createHoverEffect(githubRef, 'GitHub');
    createHoverEffect(vueRef, 'Vue');
    createHoverEffect(nextRef, 'Next.js');
    createHoverEffect(nuxtRef, 'Nuxt.js');
    createHoverEffect(reactRef, 'React');
    createHoverEffect(reactNativeRef, 'React Native');
    createHoverEffect(expoRef, 'Expo Go');
    createHoverEffect(sqliteRef, 'SQLite');
    createHoverEffect(mongodbRef, 'MongoDB');
    createHoverEffect(cloudflareRef, 'Cloudflare');
    createHoverEffect(tailwindRef, 'Tailwind CSS');
  });

  return (
    <main class="min-h-screen relative overflow-hidden pt-20">
      <Title>{t('about.title')} - {t('hero.name')}</Title>

      {/* Animated Background Layer */}
      <AnimatedBackground variant="dark" intensity="high" />

      {/* Content overlay */}
      <div class="relative z-10 container mx-auto px-6 py-12">
        <div class="max-w-4xl mx-auto">

          {/* Profile Image */}
          <div class="flex justify-center mb-12">
            <img
              ref={el => profileImageRef = el}
              src="/project-images/me/me.jpg"
              alt="Ata Özeren"
              class="w-64 h-64 md:w-72 md:h-72 object-cover rounded-full border-4 border-white/20 shadow-2xl select-none cursor-pointer transition-all duration-300"
              style="transform-style: preserve-3d;"
            />
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

              {/* Frontend & Styling */}
              <div class="group">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
                  <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Frontend & Styling</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                  <div ref={el => html5Ref = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siHtml5} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">HTML</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => cssRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siCss} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">CSS</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => sassRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siSass} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">SCSS</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => tailwindRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siTailwindcss} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Tailwind</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => jsRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siJavascript} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">JavaScript</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => tsRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siTypescript} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">TypeScript</span>
                    <span class="tech-text hidden"></span>
                  </div>
                </div>
              </div>

              {/* Frameworks */}
              <div class="group">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                  <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Frameworks</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                  <div ref={el => reactRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siReact} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">React</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => vueRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siVuedotjs} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Vue.js</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => nextRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siNextdotjs} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Next.js</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => nuxtRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siNuxt} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Nuxt.js</span>
                    <span class="tech-text hidden"></span>
                  </div>
                </div>
              </div>

              {/* Mobile Development */}
              <div class="group">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full"></div>
                  <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Mobile Development</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                  <div ref={el => reactNativeRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siReact} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">React Native</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => expoRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siExpo} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Expo</span>
                    <span class="tech-text hidden"></span>
                  </div>
                </div>
              </div>

              {/* Database & Cloud */}
              <div class="group">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-1 h-6 bg-gradient-to-b from-orange-400 to-amber-400 rounded-full"></div>
                  <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Database & Cloud</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                  <div ref={el => sqliteRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siSqlite} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">SQLite</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => mongodbRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siMongodb} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">MongoDB</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => cloudflareRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siCloudflare} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Cloudflare</span>
                    <span class="tech-text hidden"></span>
                  </div>
                </div>
              </div>

              {/* Tools & Version Control */}
              <div class="group">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-1 h-6 bg-gradient-to-b from-rose-400 to-red-400 rounded-full"></div>
                  <h3 class="text-white/90 text-sm font-semibold uppercase tracking-wider">Tools & Version Control</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                  <div ref={el => gitRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <SimpleIcon icon={siGit} size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">Git</span>
                    <span class="tech-text hidden"></span>
                  </div>
                  <div ref={el => githubRef = el} class="relative flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Github size={18} class="text-white/80" />
                    <span class="text-white/80 text-sm font-medium">GitHub</span>
                    <span class="tech-text hidden"></span>
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
